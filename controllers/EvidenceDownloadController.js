const { supabase } = require('../config');
const { validateWalletAddress } = require('../middleware/verifyAdmin');
const { generateWatermarkText, logDownloadAction } = require('../services/evidenceHelpers');
const blockchainService = require('../services/blockchain/blockchainService');
const ipfsStorageService = require('../services/storage/ipfsStorageService');
const archiver = require('archiver');

// Download single evidence file with watermark
const downloadEvidence = async (req, res) => {
  try {
    const { id } = req.params;
    const { userWallet } = req.body;

    if (!validateWalletAddress(userWallet)) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', userWallet)
      .eq('is_active', true)
      .single();

    if (userError || !user) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    if (user.role === 'public_viewer') {
      return res.status(403).json({ error: 'Public viewers cannot download evidence' });
    }

    const { data: evidence, error: evidenceError } = await supabase
      .from('evidence')
      .select('*')
      .eq('id', id)
      .single();

    if (evidenceError || !evidence) {
      return res.status(404).json({ error: 'Evidence not found' });
    }

    const watermarkText = generateWatermarkText(userWallet, evidence.case_number, new Date());

    let fileBuffer;
    let contentType;
    let filename;

    if (evidence.file_type?.startsWith('image/')) {
      fileBuffer = Buffer.from('Mock image data for evidence ' + id);
      contentType = evidence.file_type;
      filename = `evidence_${id}_watermarked.jpg`;
    } else if (evidence.file_type === 'application/pdf') {
      fileBuffer = Buffer.from('Mock PDF data for evidence ' + id);
      contentType = 'application/pdf';
      filename = `evidence_${id}_watermarked.pdf`;
    } else {
      fileBuffer = Buffer.from('Mock file data for evidence ' + id);
      contentType = 'application/octet-stream';
      filename = `evidence_${id}_watermarked.bin`;
    }

    await logDownloadAction(userWallet, id, 'evidence_download', {
      evidence_id: id,
      evidence_name: evidence.name,
      file_type: evidence.file_type,
      watermark_applied: true,
      download_timestamp: new Date().toISOString(),
    });

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('X-Watermark-Applied', 'true');
    res.setHeader('X-Downloaded-By', userWallet.slice(0, 8) + '...');

    res.send(fileBuffer);
  } catch (error) {
    console.error('Evidence download error:', error);
    res.status(500).json({ error: 'Failed to download evidence' });
  }
};

// Bulk export multiple evidence files as ZIP
const bulkExport = async (req, res) => {
  try {
    const { evidenceIds, userWallet } = req.body;

    if (!validateWalletAddress(userWallet)) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }

    if (!evidenceIds || !Array.isArray(evidenceIds) || evidenceIds.length === 0) {
      return res.status(400).json({ error: 'Evidence IDs array is required' });
    }

    if (evidenceIds.length > 50) {
      return res.status(400).json({ error: 'Maximum 50 files per bulk export' });
    }

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', userWallet)
      .eq('is_active', true)
      .single();

    if (userError || !user) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    if (user.role === 'public_viewer') {
      return res.status(403).json({ error: 'Public viewers cannot export evidence' });
    }

    const { data: evidenceItems, error: evidenceError } = await supabase
      .from('evidence')
      .select('*')
      .in('id', evidenceIds);

    if (evidenceError || !evidenceItems || evidenceItems.length === 0) {
      return res.status(404).json({ error: 'No evidence found with provided IDs' });
    }

    const archive = archiver('zip', { zlib: { level: 9 } });
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const zipFilename = `evidence_export_${timestamp}.zip`;

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${zipFilename}"`);
    res.setHeader('X-Export-Count', evidenceItems.length.toString());
    res.setHeader('X-Exported-By', userWallet.slice(0, 8) + '...');

    archive.pipe(res);

    const metadata = {
      export_info: {
        exported_by: userWallet,
        export_timestamp: new Date().toISOString(),
        total_files: evidenceItems.length,
        watermark_applied: true,
      },
      evidence_items: evidenceItems.map((item) => ({
        id: item.id,
        name: item.name,
        case_number: item.case_number,
        file_type: item.file_type,
        hash: item.hash,
        submitted_by: item.submitted_by,
        timestamp: item.timestamp,
        blockchain_verified: true,
      })),
    };

    archive.append(JSON.stringify(metadata, null, 2), { name: 'export_metadata.json' });

    for (const evidence of evidenceItems) {
      const watermarkText = generateWatermarkText(userWallet, evidence.case_number, new Date());
      let fileBuffer = Buffer.from(`Mock evidence data for ${evidence.name} (ID: ${evidence.id})`);
      let filename = `${evidence.id}_${evidence.name || 'evidence'}`;

      if (evidence.file_type?.startsWith('image/')) {
        filename += '_watermarked.jpg';
      } else if (evidence.file_type === 'application/pdf') {
        filename += '_watermarked.pdf';
      } else {
        filename += '_watermarked.bin';
      }

      archive.append(fileBuffer, { name: filename });
    }

    await logDownloadAction(userWallet, null, 'evidence_bulk_export', {
      evidence_ids: evidenceIds,
      total_files: evidenceItems.length,
      export_format: 'zip',
      watermark_applied: true,
      export_timestamp: new Date().toISOString(),
    });

    archive.finalize();
  } catch (error) {
    console.error('Bulk export error:', error);
    res.status(500).json({ error: 'Failed to export evidence' });
  }
};

// Get download history for specific evidence
const getDownloadHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { userWallet } = req.query;

    if (!validateWalletAddress(userWallet)) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('wallet_address', userWallet)
      .eq('is_active', true)
      .single();

    if (userError || !user || !['admin', 'auditor'].includes(user.role)) {
      return res.status(403).json({ error: 'Unauthorized: Admin or Auditor role required' });
    }

    const { data: downloadHistory, error } = await supabase
      .from('activity_logs')
      .select('*')
      .or(`action.eq.evidence_download,action.eq.evidence_bulk_export`)
      .ilike('details', `%"evidence_id":${id}%`)
      .order('timestamp', { ascending: false });

    if (error) {
      throw error;
    }

    const formattedHistory = downloadHistory.map((log) => {
      let details = {};
      try {
        details = JSON.parse(log.details || '{}');
      } catch (_e) {
        details = {};
      }
      return {
        timestamp: log.timestamp,
        user_id: log.user_id,
        action: log.action,
        details,
      };
    });

    res.json({
      success: true,
      evidence_id: id,
      download_history: formattedHistory,
    });
  } catch (error) {
    console.error('Download history error:', error);
    res.status(500).json({ error: 'Failed to retrieve download history' });
  }
};

// Get all evidence
const getAllEvidence = async (req, res) => {
  try {
    const { limit = 50, offset = 0, case_id, status, submitted_by } = req.query;
    const limitNum = parseInt(limit, 10) || 50;
    const offsetNum = parseInt(offset, 10) || 0;

    let query = supabase
      .from('evidence')
      .select('*')
      .order('timestamp', { ascending: false })
      .range(offsetNum, offsetNum + limitNum - 1);

    if (case_id) query = query.eq('case_id', case_id);
    if (status) query = query.eq('status', status);
    if (submitted_by) query = query.eq('submitted_by', submitted_by);

    const { data: evidence, error } = await query;

    if (error) throw error;

    const enrichedEvidence = evidence.map((item) => ({
      ...item,
      explorerUrl: item.blockchain_tx_hash
        ? blockchainService.getExplorerUrl(item.blockchain_tx_hash)
        : null,
      ipfsUrl: item.ipfs_cid ? ipfsStorageService.getGatewayUrl(item.ipfs_cid) : null,
    }));

    res.json({
      success: true,
      evidence: enrichedEvidence,
      total: evidence.length,
    });
  } catch (error) {
    console.error('Get evidence error:', error);
    res.status(500).json({ error: 'Failed to get evidence' });
  }
};

// Get evidence details for preview
const getEvidenceById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data: evidence, error } = await supabase
      .from('evidence')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !evidence) {
      return res.status(404).json({ error: 'Evidence not found' });
    }

    res.json(evidence);
  } catch (error) {
    console.error('Get evidence error:', error);
    res.status(500).json({ error: 'Failed to get evidence' });
  }
};

// Get evidence by case for timeline
const getEvidenceByCase = async (req, res) => {
  try {
    const { caseId } = req.params;

    const { data: evidence, error } = await supabase
      .from('evidence')
      .select('*')
      .eq('case_id', caseId)
      .order('timestamp', { ascending: true });

    if (error) throw error;

    res.json({ success: true, evidence });
  } catch (error) {
    console.error('Get evidence by case error:', error);
    res.status(500).json({ error: 'Failed to get evidence for case' });
  }
};

module.exports = {
  downloadEvidence,
  bulkExport,
  getDownloadHistory,
  getAllEvidence,
  getEvidenceById,
  getEvidenceByCase,
};
