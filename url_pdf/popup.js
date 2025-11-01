document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("download-pdf");

  btn.addEventListener("click", async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab || !tab.id) {
        alert("No active tab found.");
        return;
      }

      await new Promise((resolve, reject) => {
        chrome.debugger.attach({ tabId: tab.id }, "1.3", () => {
          if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);
          resolve();
        });
      });

      await new Promise((resolve, reject) => {
        chrome.debugger.sendCommand(
          { tabId: tab.id },
          "Page.enable",
          {},
          () => {
            if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);
            resolve();
          }
        );
      });

      await new Promise((resolve, reject) => {
        chrome.debugger.sendCommand(
          { tabId: tab.id },
          "Emulation.setEmulatedMedia",
          { media: "screen" },
          () => {
            if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);
            resolve();
          }
        );
      });

      const pdfResult = await new Promise((resolve, reject) => {
        chrome.debugger.sendCommand(
          { tabId: tab.id },
          "Page.printToPDF",
          {
            printBackground: true,
            displayHeaderFooter: false,
            landscape: false,
            scale: 1,                
            paperWidth: 8.27,        
            paperHeight: 11.69,      
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            preferCSSPageSize: true  
          },
          (result) => {
            if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);
            resolve(result);
          }
        );
      });

      await new Promise((resolve) => {
        chrome.debugger.detach({ tabId: tab.id }, () => resolve());
      });

      const base64 = pdfResult.data;
      const byteChars = atob(base64);
      const byteNumbers = new Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++) byteNumbers[i] = byteChars.charCodeAt(i);
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);
      chrome.downloads.download({
        url,
        filename: "page.pdf",
        saveAs: true
      }, () => {
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      });
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Failed to generate PDF. See console for details.");
    }
  });
});
