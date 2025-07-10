#!/usr/bin/env python3
import os
import shutil
import re

def migrate_jsx_to_tsx(src_dir):
    """Migrate all .jsx files to .tsx files and update imports"""
    jsx_files = []
    
    # Find all .jsx files
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.jsx'):
                jsx_files.append(os.path.join(root, file))
    
    # Rename files
    for jsx_file in jsx_files:
        tsx_file = jsx_file.replace('.jsx', '.tsx')
        print(f"Renaming {jsx_file} -> {tsx_file}")
        os.rename(jsx_file, tsx_file)
    
    # Update imports in all files
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r') as f:
                    content = f.read()
                
                # Replace .jsx imports with .tsx
                updated_content = re.sub(r"from\s+['\"]([^'\"]+)\.jsx['\"]", r"from '\1.tsx'", content)
                updated_content = re.sub(r"import\s*\(\s*['\"]([^'\"]+)\.jsx['\"]\s*\)", r"import('\1.tsx')", updated_content)
                
                if updated_content != content:
                    print(f"Updating imports in {file_path}")
                    with open(file_path, 'w') as f:
                        f.write(updated_content)

if __name__ == "__main__":
    migrate_jsx_to_tsx("/app/src")
    print("Migration completed!")