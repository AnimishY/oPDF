# 📚 AnimishY PDF Vault - Password Protected PDF Viewer

A simple, secure web application to access your PDFs from anywhere with password protection.

## 🚀 Features

- 🔒 Password protection
- 📱 Responsive design (works on mobile, tablet, desktop)
- 🔍 Search functionality
- 👁️ Built-in PDF viewer
- 💾 Session-based authentication
- 🎨 Modern, clean academic UI
- ⚡ Easy update scripts for managing PDFs

## 📋 Setup Instructions

### 1. Add Your PDF Files

1. Place all your PDF files in the `pdfs/` folder
2. Run the update script:

**On Windows:**
```bash
update.bat
```
Double-click `update.bat` or run it from Command Prompt.

**On Mac/Linux:**
```bash
chmod +x update.sh
./update.sh
```

The script will automatically scan the `pdfs/` folder and update `script.js` with all PDF files.

### 2. Manual Update (Alternative)

If you prefer to update manually, run:
```bash
python update_pdfs.py
```

Or edit `script.js` directly and update the `pdfFiles` array:

```javascript
const pdfFiles = [
    { name: "Display Name for PDF 1", file: "actual-filename1.pdf" },
    { name: "Display Name for PDF 2", file: "actual-filename2.pdf" },
    // Add more PDFs here
];
```

### 3. Change Password

In `script.js`, change the default password:

```javascript
const CONFIG = {
    password: "pdf2024", // Change this to your desired password
    pdfFolder: "pdfs/"
};
```

### 4. Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Upload all files (index.html, style.css, script.js, pdfs folder, update scripts, and README)
3. Go to repository Settings → Pages
4. Select the branch (usually `main`) and root folder
5. Click Save
6. Your site will be available at: `https://yourusername.github.io/repositoryname/`

### 5. Access Your PDFs

1. Open the deployed website or `index.html` locally
2. Enter your password
3. Browse and view your PDFs!

## 🔧 Customization

### Change Colors

Edit `style.css` to change the color scheme. The main colors are defined in CSS variables:

```css
:root {
    --page-bg: #f5f5f5;
    --panel: #ffffff;
    --border: #d0d0d0;
    --text: #1a1a1a;
    --muted: #666666;
    --accent: #1a365d;
    --accent-strong: #0f2847;
}
```

### Change Branding

Edit the brand name and logo in `index.html`. Look for the `.brand-logo` sections.

## 📁 File Structure

```
oPDF/
├── index.html          # Main HTML file
├── style.css           # Styles
├── script.js          # JavaScript logic
├── update_pdfs.py     # Python script to auto-update PDF list
├── update.bat         # Windows update script
├── update.sh          # Mac/Linux update script
├── pdfs/              # Folder for your PDF files
│   ├── sample1.pdf
│   ├── sample2.pdf
│   └── ...
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## ⚠️ Security Note

This is a basic password protection suitable for personal use. For sensitive documents, consider:
- Using a stronger authentication system
- Implementing server-side validation
- Using HTTPS (GitHub Pages provides this automatically)
- Not committing sensitive PDFs to public repositories (use private repos)

## 🌐 Browser Compatibility

Works on all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers

## 💡 Tips

- Keep your password secure
- Use a private GitHub repository for sensitive documents
- Test on different devices to ensure compatibility
- Run the update script whenever you add new PDFs to the `pdfs/` folder
- The PDF list is automatically sorted alphabetically

## 🎓 Academic Design

This vault features a professional, academic-inspired design with:
- Square corners for a formal appearance
- Professional color palette
- IBM Plex font family for readability
- Clean, grid-based layout
- Animated branding with the AnimishY logo

---

Made with ❤️ by AnimishY

Enjoy your password-protected PDF library! 🎉
