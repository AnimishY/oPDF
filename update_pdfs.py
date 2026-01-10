"""
PDF Vault - Auto-update script.js with PDFs from the pdfs folder

This script automatically scans the 'pdfs' folder and updates the pdfFiles 
array in script.js with all found PDF files.

Usage: python update_pdfs.py
"""

import os
import re
import json

def get_pdf_files(pdfs_folder="pdfs"):
    """Scan the pdfs folder and return list of PDF files"""
    if not os.path.exists(pdfs_folder):
        print(f"❌ Error: '{pdfs_folder}' folder not found!")
        print(f"   Creating '{pdfs_folder}' folder...")
        os.makedirs(pdfs_folder)
        return []
    
    pdf_files = []
    for filename in os.listdir(pdfs_folder):
        if filename.lower().endswith('.pdf'):
            # Create display name from filename (remove .pdf and replace underscores/hyphens)
            display_name = filename[:-4].replace('_', ' ').replace('-', ' ').title()
            pdf_files.append({
                'name': display_name,
                'file': filename
            })
    
    # Sort alphabetically by display name
    pdf_files.sort(key=lambda x: x['name'])
    return pdf_files

def update_script_js(pdf_files, script_path="script.js"):
    """Update the pdfFiles array in script.js"""
    if not os.path.exists(script_path):
        print(f"❌ Error: '{script_path}' not found!")
        return False
    
    # Read the current script.js
    with open(script_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Create the new pdfFiles array as a JavaScript array
    if pdf_files:
        pdf_entries = []
        for pdf in pdf_files:
            pdf_entries.append(f'    {{ name: "{pdf["name"]}", file: "{pdf["file"]}" }}')
        pdf_array = ',\n'.join(pdf_entries)
    else:
        pdf_array = '    // Add PDFs here: { name: "Display Name", file: "filename.pdf" }'
    
    new_pdf_section = f"""const pdfFiles = [
{pdf_array}
];"""
    
    # Replace the pdfFiles array using regex
    pattern = r'const pdfFiles = \[[\s\S]*?\];'
    
    if re.search(pattern, content):
        updated_content = re.sub(pattern, new_pdf_section, content)
        
        # Write back to script.js
        with open(script_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        return True
    else:
        print(f"❌ Error: Could not find 'const pdfFiles' array in {script_path}")
        return False

def main():
    print("🔄 PDF Vault - Updating script.js...")
    print("=" * 50)
    
    # Get PDF files from pdfs folder
    pdf_files = get_pdf_files()
    
    if not pdf_files:
        print("⚠️  No PDF files found in 'pdfs' folder")
        print("   Add your PDF files to the 'pdfs' folder and run again")
    else:
        print(f"✅ Found {len(pdf_files)} PDF file(s):")
        for pdf in pdf_files:
            print(f"   📄 {pdf['name']} ({pdf['file']})")
    
    print("\n🔄 Updating script.js...")
    
    # Update script.js
    if update_script_js(pdf_files):
        print("✅ Successfully updated script.js!")
        print("=" * 50)
        print("🎉 Done! Your PDF list is now up to date.")
        if pdf_files:
            print(f"   Open index.html in a browser to view your {len(pdf_files)} PDF(s)")
    else:
        print("❌ Failed to update script.js")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
