import os
import sys
from pathlib import Path

try:
    from PyPDF2 import PdfReader, PdfWriter
except ImportError:
    print("Error: PyPDF2 is not installed")
    print("Install it using: pip install PyPDF2")
    sys.exit(1)

def read_password():
    """Read password from password.txt file"""
    password_file = Path("password.txt")
    if not password_file.exists():
        print("Error: password.txt file not found")
        sys.exit(1)
    
    with open(password_file, 'r') as f:
        return f.read().strip()

def encrypt_pdf(input_path, output_path, password):
    """Encrypt a single PDF file"""
    try:
        reader = PdfReader(input_path)
        
        # Check if already encrypted
        if reader.is_encrypted:
            print(f"  Already encrypted: {input_path.name}")
            return False
        
        writer = PdfWriter()
        
        # Add all pages
        for page in reader.pages:
            writer.add_page(page)
        
        # Encrypt with password
        writer.encrypt(password)
        
        # Write to temporary file first
        temp_path = output_path.with_suffix('.tmp')
        with open(temp_path, 'wb') as f:
            writer.write(f)
        
        # Replace original file
        os.replace(temp_path, output_path)
        print(f"  ✓ Encrypted: {input_path.name}")
        return True
        
    except Exception as e:
        print(f"  ✗ Failed to encrypt {input_path.name}: {str(e)}")
        return False

def main():
    print("=" * 50)
    print("  PDF Encryption Script")
    print("=" * 50)
    print()
    
    # Read password
    password = read_password()
    print(f"Password loaded from password.txt")
    print()
    
    # Find all PDF files in current directory
    pdf_files = list(Path(".").glob("*.pdf"))
    
    if not pdf_files:
        print("No PDF files found in current directory")
        return
    
    print(f"Found {len(pdf_files)} PDF file(s)")
    print()
    
    encrypted_count = 0
    for pdf_file in pdf_files:
        if encrypt_pdf(pdf_file, pdf_file, password):
            encrypted_count += 1
    
    print()
    print("=" * 50)
    print(f"Encryption complete: {encrypted_count} file(s) encrypted")
    print("=" * 50)

if __name__ == "__main__":
    main()
