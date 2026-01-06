/**
 * Indian Public APIs Integration
 * Fetches real data for form fields
 */

const INDIAN_APIS = {
    // Government departments and agencies
    departments: [
        'Central Bureau of Investigation (CBI)',
        'Enforcement Directorate (ED)',
        'Narcotics Control Bureau (NCB)',
        'Delhi Police',
        'Mumbai Police',
        'Kolkata Police',
        'Chennai Police',
        'Bangalore Police',
        'Hyderabad Police',
        'Pune Police',
        'Ahmedabad Police',
        'Surat Police',
        'Railway Protection Force (RPF)',
        'Border Security Force (BSF)',
        'Central Reserve Police Force (CRPF)',
        'Indo-Tibetan Border Police (ITBP)',
        'Sashastra Seema Bal (SSB)',
        'National Investigation Agency (NIA)',
        'Intelligence Bureau (IB)',
        'Research and Analysis Wing (RAW)'
    ],

    // Indian states and UTs for jurisdiction
    states: [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
        'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
    ],

    // Forensic laboratories
    laboratories: [
        'Central Forensic Science Laboratory (CFSL), New Delhi',
        'Central Forensic Science Laboratory (CFSL), Hyderabad',
        'Central Forensic Science Laboratory (CFSL), Kolkata',
        'Central Forensic Science Laboratory (CFSL), Chandigarh',
        'Central Forensic Science Laboratory (CFSL), Pune',
        'Central Forensic Science Laboratory (CFSL), Guwahati',
        'State Forensic Science Laboratory, Mumbai',
        'State Forensic Science Laboratory, Bangalore',
        'State Forensic Science Laboratory, Chennai',
        'State Forensic Science Laboratory, Lucknow',
        'State Forensic Science Laboratory, Jaipur',
        'Directorate of Forensic Science, Gujarat',
        'Punjab Forensic Science Agency',
        'Haryana State Legal Services Authority',
        'Kerala State Forensic Science Laboratory'
    ],

    // Law firms and organizations
    lawFirms: [
        'Khaitan & Co',
        'Cyril Amarchand Mangaldas',
        'AZB & Partners',
        'Shardul Amarchand Mangaldas & Co',
        'J. Sagar Associates',
        'Trilegal',
        'Luthra and Luthra Law Offices',
        'Desai & Diwanji',
        'Economic Laws Practice',
        'IndusLaw',
        'Majmudar & Partners',
        'Phoenix Legal',
        'Bharucha & Partners',
        'Nishith Desai Associates',
        'S&R Associates'
    ],

    // Law schools
    lawSchools: [
        'National Law School of India University, Bangalore',
        'National Academy of Legal Study and Research, Hyderabad',
        'West Bengal National University of Juridical Sciences, Kolkata',
        'Rajiv Gandhi School of Intellectual Property Law, Kharagpur',
        'Gujarat National Law University, Gandhinagar',
        'Hidayatullah National Law University, Raipur',
        'Rajiv Gandhi National University of Law, Patiala',
        'Chanakya National Law University, Patna',
        'National University of Advanced Legal Studies, Kochi',
        'National Law University, Jodhpur',
        'Faculty of Law, University of Delhi',
        'Government Law College, Mumbai',
        'Symbiosis Law School, Pune',
        'Jamia Millia Islamia, New Delhi',
        'Aligarh Muslim University, Faculty of Law'
    ],

    // Courts
    courts: [
        'Supreme Court of India',
        'Delhi High Court',
        'Bombay High Court',
        'Calcutta High Court',
        'Madras High Court',
        'Karnataka High Court',
        'Kerala High Court',
        'Gujarat High Court',
        'Rajasthan High Court',
        'Madhya Pradesh High Court',
        'Allahabad High Court',
        'Patna High Court',
        'Orissa High Court',
        'Andhra Pradesh High Court',
        'Telangana High Court',
        'Punjab and Haryana High Court',
        'Himachal Pradesh High Court',
        'Uttarakhand High Court',
        'Jharkhand High Court',
        'Chhattisgarh High Court'
    ],

    // Evidence facilities
    evidenceFacilities: [
        'Central Evidence Storage Facility, New Delhi',
        'Mumbai Police Evidence Warehouse',
        'Delhi Police Evidence Storage',
        'Bangalore City Police Evidence Room',
        'Chennai Police Evidence Facility',
        'Hyderabad Police Evidence Storage',
        'Kolkata Police Evidence Warehouse',
        'Pune Police Evidence Room',
        'Ahmedabad Police Evidence Facility',
        'CBI Evidence Storage, New Delhi',
        'NIA Evidence Facility',
        'ED Evidence Warehouse',
        'NCB Evidence Storage'
    ],

    // Government organizations for auditors
    governmentOrgs: [
        'Comptroller and Auditor General of India (CAG)',
        'Central Bureau of Investigation (CBI)',
        'Enforcement Directorate (ED)',
        'Central Vigilance Commission (CVC)',
        'Central Information Commission (CIC)',
        'National Investigation Agency (NIA)',
        'Serious Fraud Investigation Office (SFIO)',
        'Directorate of Revenue Intelligence (DRI)',
        'Income Tax Department',
        'Goods and Services Tax (GST) Department',
        'Reserve Bank of India (RBI)',
        'Securities and Exchange Board of India (SEBI)',
        'Insurance Regulatory and Development Authority (IRDAI)',
        'Competition Commission of India (CCI)',
        'Ministry of Home Affairs',
        'Ministry of Finance'
    ]
};

/**
 * Search function for autocomplete
 */
function searchIndianData(category, query) {
    const data = INDIAN_APIs[category] || [];
    if (!query) return data.slice(0, 10);
    
    return data.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10);
}

/**
 * Initialize autocomplete for Indian data fields
 */
function initializeIndianAutocomplete() {
    console.log('Initializing Indian autocomplete...');
    
    const autocompleteFields = {
        'departmentAgency': 'departments',
        'agencyName': 'departments',
        'regDepartmentAgency': 'departments',
        'jurisdiction': 'states',
        'regJurisdiction': 'states',
        'laboratoryName': 'laboratories',
        'regLaboratoryName': 'laboratories',
        'barState': 'states',
        'lawFirm': 'lawFirms',
        'regLawFirm': 'lawFirms',
        'lawSchool': 'lawSchools',
        'regLawSchool': 'lawSchools',
        'courtName': 'courts',
        'regCourtName': 'courts',
        'facilityName': 'evidenceFacilities',
        'regFacilityName': 'evidenceFacilities',
        'auditingAuthority': 'governmentOrgs',
        'regGovOrg': 'governmentOrgs'
    };

    Object.entries(autocompleteFields).forEach(([fieldId, category]) => {
        const field = document.getElementById(fieldId);
        if (field) {
            console.log(`Setting up autocomplete for ${fieldId} with category ${category}`);
            setupAutocomplete(field, category);
        }
    });
    
    // Also setup for fields with data-api attribute
    const apiFields = document.querySelectorAll('[data-api]');
    apiFields.forEach(field => {
        const category = field.getAttribute('data-api');
        if (category) {
            console.log(`Setting up autocomplete for field with data-api: ${category}`);
            setupAutocomplete(field, category);
        }
    });
}

/**
 * Setup autocomplete for a field
 */
function setupAutocomplete(field, category) {
    // Remove existing autocomplete container if any
    const existingContainer = field.parentNode.querySelector('.autocomplete-container');
    if (existingContainer) {
        existingContainer.remove();
    }
    
    const container = document.createElement('div');
    container.className = 'autocomplete-container';
    field.parentNode.insertBefore(container, field.nextSibling);
    
    const dropdown = document.createElement('div');
    dropdown.className = 'autocomplete-dropdown';
    container.appendChild(dropdown);

    field.addEventListener('input', function() {
        const query = this.value;
        const results = searchIndianData(category, query);
        
        dropdown.innerHTML = '';
        
        if (query && results.length > 0) {
            dropdown.style.display = 'block';
            results.forEach(item => {
                const option = document.createElement('div');
                option.className = 'autocomplete-option';
                option.textContent = item;
                option.addEventListener('click', () => {
                    field.value = item;
                    dropdown.style.display = 'none';
                });
                dropdown.appendChild(option);
            });
        } else {
            dropdown.style.display = 'none';
        }
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target) && !field.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}

// Export for global use
window.IndianAPIs = {
    searchIndianData,
    initializeIndianAutocomplete,
    INDIAN_APIS
};