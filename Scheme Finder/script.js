// Function to show the main section (Gov vs Bank)
function showSection(type) {
    const govSection = document.getElementById('gov-section');
    const bankSection = document.getElementById('bank-section');

    // Hide both initially
    govSection.classList.add('hidden');
    bankSection.classList.add('hidden');

    // Show the selected one
    if (type === 'gov') {
        govSection.classList.remove('hidden');
        // Smooth scroll to the section
        govSection.scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'bank') {
        bankSection.classList.remove('hidden');
        // Reset bank view to Public by default
        toggleBankType('public');
        bankSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Function to toggle between Public and Private bank schemes
function toggleBankType(type) {
    const publicContent = document.getElementById('public-bank-content');
    const privateContent = document.getElementById('private-bank-content');
    const btnPublic = document.getElementById('btn-public');
    const btnPrivate = document.getElementById('btn-private');

    if (type === 'public') {
        publicContent.classList.remove('hidden');
        privateContent.classList.add('hidden');
        
        // Update button styles
        btnPublic.classList.add('active');
        btnPrivate.classList.remove('active');
    } else {
        privateContent.classList.remove('hidden');
        publicContent.classList.add('hidden');
        
        // Update button styles
        btnPrivate.classList.add('active');
        btnPublic.classList.remove('active');
    }
}