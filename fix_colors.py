import os
import re

replacements = {
    r'(?i)#F4F1E8': '#fcf9f0',
    r'(?i)#FFFDF8': '#ffffff', # Let's use surface-container-lowest for pure white / floating cards, or #fcf9f0? DESIGN.md says surface-container-lowest is #ffffff. Let's use #ffffff.
    r'(?i)#D5D9D2': '#c1c8c4',
    r'(?i)#DDE7DC': '#e5e2da',
    r'(?i)#15342D': '#00241d',
    r'(?i)#66766E': '#717976',
    r'(?i)#A9BDAA': '#81a499',
    r'(?i)#D96C4B': '#9f4123',
    r'(?i)#183A32': '#00241d',
}

# SVG gradients might need adjustment but maybe we just replace hex codes for now.

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.css'):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements.items():
                new_content = re.sub(old, new, new_content)
            
            if new_content != content:
                with open(path, 'w') as f:
                    f.write(new_content)
                print(f"Updated {path}")
