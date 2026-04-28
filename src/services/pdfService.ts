import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const waitForDom = async () => {
  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);
  await new Promise((resolve) => setTimeout(resolve, 800));
};

const forceHexSafeStyles = (root: HTMLElement) => {
  const style = document.createElement("style");
  style.setAttribute("data-forge-pdf-safe", "true");
  style.innerHTML = `
    * {
      color: #000000 !important;
      background-color: transparent !important;
      border-color: #000000 !important;
      fill: #000000 !important;
      stroke: #000000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      box-shadow: none !important;
      text-shadow: none !important;
      transition: none !important;
      animation: none !important;
    }
    .print-page, .pdf-page, .page {
      background: #ffffff !important;
      background-color: #ffffff !important;
      color: #000000 !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    .no-print, .hidden, script, style { display: none !important; }
    
    /* Ensure typography is visible */
    h1, h2, h3, h4, span, div, p {
      opacity: 1 !important;
      visibility: visible !important;
    }
  `;
  root.prepend(style);

  const elements = root.querySelectorAll<HTMLElement>("*");
  elements.forEach((el) => {
     if (el.tagName.toLowerCase() === 'svg') {
       el.setAttribute('fill', '#000000');
       el.setAttribute('stroke', '#000000');
     }
     // Force black text for everything
     el.style.setProperty('color', '#000000', 'important');
  });
};

export const exportToPDF = async (elementIdOrFilename: string, optionalFilename?: string) => {
  // Logic to determine ID and filename
  let elementId = "print-capture-root";
  let filename = "forge-export.pdf";

  if (optionalFilename) {
    elementId = elementIdOrFilename;
    filename = optionalFilename;
  } else if (elementIdOrFilename) {
    if (!elementIdOrFilename.endsWith(".pdf")) {
      elementId = elementIdOrFilename;
    } else {
      filename = elementIdOrFilename;
    }
  }

  const sourceRoot = document.getElementById(elementId);
  if (!sourceRoot) {
    console.warn(`PDF Source ${elementId} not found.`);
    return;
  }

  if (!filename.toLowerCase().endsWith(".pdf")) filename += ".pdf";

  // CLONE to ensure we don't mess with livedom too much
  const clone = sourceRoot.cloneNode(true) as HTMLElement;
  clone.id = "forge-pdf-render-clone";
  
  // Make it visible but hidden from user 
  // Positioning it absolutely and far down/right is safer for html2canvas than fixed/negative
  clone.style.position = "absolute";
  clone.style.top = "10000px";
  clone.style.left = "0";
  clone.style.width = "210mm";
  clone.style.zIndex = "-5000";
  clone.style.background = "white";
  clone.style.display = "block";
  clone.style.visibility = "visible";
  
  document.body.appendChild(clone);

  try {
    forceHexSafeStyles(clone);
    await waitForDom();

    const pdf = new jsPDF("p", "mm", "a4");

    // Get page dimensions and ensure they are valid numbers
    const pageWidth = pdf.internal.pageSize.getWidth() || 210;
    const pageHeight = pdf.internal.pageSize.getHeight() || 297;

    const pages = clone.querySelectorAll(".print-page, .page, [data-pdf-page]");
    
    if (pages.length > 0) {
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;
        
        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: "#ffffff",
          windowWidth: 794,
        });

        if (!canvas.width || !canvas.height) {
          console.warn(`Page ${i} rendered with 0 dimensions: ${canvas.width}x${canvas.height}`);
          continue;
        }

        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        if (i > 0) pdf.addPage();
        
        pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight, undefined, 'FAST');
      }
    } else {
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      if (!canvas.width || !canvas.height || isNaN(canvas.width) || isNaN(canvas.height)) {
        throw new Error(`Invalid canvas dimensions: ${canvas.width}x${canvas.height}`);
      }

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      if (!Number.isFinite(imgHeight) || imgHeight <= 0) {
        throw new Error(`Invalid calculated image height: ${imgHeight}`);
      }

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
      }
    }

    pdf.save(filename);
  } catch (error) {
    console.error("FORGE PDF FAIL:", error);
  } finally {
    clone.remove();
  }
};
