# Page to PDF Chrome Extension

**Download any web page as a high-fidelity PDF with your original CSS and layout—directly from Chrome.**

## Overview

This extension adds a "Download PDF" button to your Chrome toolbar. Click to instantly generate a PDF of the current tab, preserving full styles, colors, images, and layout—no more skipped or stripped content.

- 🗎 **Preserves** full CSS, backgrounds, and page structure
- 🖥 **Works on any tab** at the click of a button
- ⚡ **No sign-up or Web Store required** (install as unpacked)

---

## Features

- PDF generation using Chrome's DevTools print engine (not plain window.print) for best layout and CSS support.
- Includes all visible content—no hidden elements or stripped styling.
- Lets you choose your save location via Chrome's downloads dialog.
- Fast, lightweight, and open source.

---

## How to Setup

1. **Download or clone this repository:**
    - Press **Code > Download ZIP** on GitHub, then unzip, or run:
      ```
      git clone https://github.com/AdxStackDev/ext_url_to_pdf.git
      ```
2. **Open Chrome and visit:**
    ```
    chrome://extensions/
    ```
3. **Enable Developer Mode:**  
   Toggle the switch at the top right.
4. **Click "Load unpacked":**  
   Select the extracted extension folder (e.g., `page-to-pdf-extension`).
5. **Pin the icon (optional):**  
   Click the puzzle piece next to your address bar and pin "Page to PDF" for quick access.

---

## How to Use

- Navigate to any web page you want to save.
- Click the extension icon and then the **Download PDF** button.
- Choose a save location; your PDF will render with all styles and page layout intact.

---

## Technical Notes

- Uses DevTools `Page.printToPDF` for best layout accuracy; sets media type to "screen" for faithful rendering.
- Requires Chrome extension permissions: `activeTab`, `scripting`, `downloads`, `debugger`.

---

## Privacy & Security

- The extension does **not** collect, store, or transmit your browsing data.
- Runs locally and only when you click "Download PDF".

---

## Troubleshooting

- If the PDF misses images or content, reload the page and scroll to make sure everything is loaded.
- Some internal Chrome pages (like `chrome://settings`) cannot be printed due to browser limits.
- Need more options (landscape, margins)? Edit the print settings inside `popup.js`.

---

## License

MIT — free to use, modify, and share.

---

**Made with ♥ for developers, writers, and researchers who need pixel-perfect web page PDFs.**
