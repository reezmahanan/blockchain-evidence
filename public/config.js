/**
 * Application Configuration
 * @fileoverview Essential configuration settings for EVID-DGC application
 * @author EVID-DGC Team
 * @version 2.0.0
 */

/**
 * Application configuration object
 * Contains all essential configuration settings including database connections,
 * file upload limits, and network settings
 * @type {Object}
 */
const config = {
    // Supabase Database Configuration
    SUPABASE_URL: 'https://sl5jvmoln26pu5dq0bqqdq.supabase.co',
    SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsNWp2bW9sbjI2cHU1ZHEwYnFxZHEiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNTU2NzI5NCwiZXhwIjoyMDUxMTQzMjk0fQ.sb_publishable_Sl5jvMoln26PU5Dq0BqqdQ_JtetnbJA',
    
    // File Upload Configuration
    MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
    ALLOWED_TYPES: [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'video/mp4', 'video/webm', 'video/avi',
        'audio/mp3', 'audio/wav', 'audio/ogg',
        'application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain', 'text/csv'
    ],
    
    // Network Configuration
    NETWORK_NAME: 'Ethereum Mainnet',
    CHAIN_ID: 1,
    
    // Application Settings
    DEMO_MODE: false,
    VERSION: '2.0.0',
    
    // API Configuration
    API_BASE_URL: window.location.origin + '/api',
    
    // Security Settings
    SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
    
    // UI Configuration
    ITEMS_PER_PAGE: 20,
    ANIMATION_DURATION: 300
};