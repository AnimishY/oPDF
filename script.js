// Configuration
const CONFIG = {
    // SHA-256 hash of "letsword"
    passwordHash: "1b233c3113dc67085b649728918b5e1c2f1d1f60ff3eaabd31ecdcdf34dfd283",
    pdfFolder: "pdfs/"
};

// PDF records
const pdfFiles = [
    { name: "4   Solution", file: "4 - Solution.pdf" },
    { name: "6   William Stallings   Cryptography And Network Security  Principles And Practice (2014, Pearson)", file: "6 - William Stallings - Cryptography and Network Security_ Principles and Practice (2014, Pearson).pdf" },
    { name: "7   William Stallings   Cryptography And Network Security  Principles And Practice, Global Edition (2017, Pearson)I", file: "7 - William Stallings - Cryptography and Network Security_ Principles and Practice, Global Edition (2017, Pearson)i.pdf" },
    { name: "8   William Stallings   Cryptography And Network Security  Principles And Practice, Global Edition (2022, Pearson)", file: "8 - William Stallings - Cryptography and Network Security_ Principles and Practice, Global Edition (2022, Pearson).pdf" },
    { name: "Ubiquitous Attendance System", file: "Ubiquitous Attendance System.pdf" }
];

// SHA-256 hashing function
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

const loginContainer = document.getElementById('login-container');
const appContainer = document.getElementById('app-container');
const libraryStep = document.getElementById('library-step');
const readerStep = document.getElementById('reader-step');
const pdfListElement = document.getElementById('pdf-list');
const viewer = document.getElementById('pdf-viewer');
const viewerTitle = document.getElementById('current-pdf-title');
const searchInput = document.getElementById('search-input');

window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = sessionStorage.getItem('pdfVaultAuth');
    if (isLoggedIn === 'true') {
        showApp();
    }

    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                checkPassword();
            }
        });
    }
});

async function checkPassword() {
    const input = document.getElementById('password-input');
    const errorMsg = document.getElementById('error-message');

    if (input && input.value) {
        const inputHash = await hashPassword(input.value);
        
        if (inputHash === CONFIG.passwordHash) {
            sessionStorage.setItem('pdfVaultAuth', 'true');
            if (errorMsg) {
                errorMsg.textContent = '';
            }
            showApp();
        } else if (errorMsg) {
            errorMsg.textContent = 'Incorrect password. Please try again.';
            if (input) {
                input.value = '';
                input.focus();
            }
        }
    } else if (errorMsg) {
        errorMsg.textContent = 'Please enter a password.';
    }
}

function showApp() {
    if (loginContainer) {
        loginContainer.classList.add('hidden');
    }
    if (appContainer) {
        appContainer.classList.remove('hidden');
    }

    showLibraryStep();
    loadPDFs();
}

function loadPDFs() {
    if (!pdfListElement) {
        return;
    }

    pdfListElement.innerHTML = '';

    if (pdfFiles.length === 0) {
        pdfListElement.innerHTML = '<p class="empty-state">No PDFs found. Add files to the pdfs folder and rerun update_pdfs.py.</p>';
        return;
    }

    pdfFiles.forEach((pdf) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'pdf-card';
        card.dataset.name = pdf.name.toLowerCase();
        card.onclick = () => openPDF(pdf, card);

        card.innerHTML = `
            <div>
                <div class="pdf-card-title">${pdf.name}</div>
            </div>
        `;

        pdfListElement.appendChild(card);
    });

    filterPDFs();
}

function showLibraryStep() {
    if (readerStep) {
        readerStep.classList.add('hidden');
    }
    if (libraryStep) {
        libraryStep.classList.remove('hidden');
    }
    if (viewer) {
        viewer.src = '';
    }
    if (viewerTitle) {
        viewerTitle.textContent = '';
    }
    document.querySelectorAll('.pdf-card').forEach((item) => {
        item.classList.remove('active');
        item.style.display = 'grid';
    });
}

function showReaderStep() {
    if (libraryStep) {
        libraryStep.classList.add('hidden');
    }
    if (readerStep) {
        readerStep.classList.remove('hidden');
    }
}

function filterPDFs() {
    const query = (searchInput?.value ?? '').trim().toLowerCase();
    const cards = document.querySelectorAll('.pdf-card');

    cards.forEach((card) => {
        const matches = card.dataset.name.includes(query);
        card.style.display = matches ? 'grid' : 'none';
    });
}

function openPDF(pdf, cardElement) {
    showReaderStep();
    document.querySelectorAll('.pdf-card').forEach((card) => card.classList.remove('active'));
    cardElement.classList.add('active');

    if (viewerTitle) {
        viewerTitle.textContent = pdf.name;
    }
    if (viewer) {
        viewer.src = CONFIG.pdfFolder + encodeURI(pdf.file);
    }
}

function backToLibrary() {
    showLibraryStep();
    filterPDFs();
}

function logout() {
    sessionStorage.removeItem('pdfVaultAuth');
    backToLibrary();

    if (appContainer) {
        appContainer.classList.add('hidden');
    }
    if (loginContainer) {
        loginContainer.classList.remove('hidden');
    }

    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.value = '';
    }

    const errorMsg = document.getElementById('error-message');
    if (errorMsg) {
        errorMsg.textContent = '';
    }
}
