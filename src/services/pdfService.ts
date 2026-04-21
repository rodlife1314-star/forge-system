import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Utility to wait for a specified duration
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Utility to wait for animation frames
 */
const waitFrames = (count: number) => new Promise(resolve => {
  let remaining = count;
  const tick = () => {
    if (remaining <= 0) resolve(true);
    else {
      remaining--;
      requestAnimationFrame(tick);
    }
  };
  tick();
});

/**
 * Verifies that the DOM is stable and ready for capture
 * "Render complete is not the same as render stable."
 */
async function waitForStability(container: HTMLElement, timeout = 10000): Promise<boolean> {
  const start = Date.now();
  
  // 1. HARD GATE: Fonts
  if ('fonts' in document) {
    try {
      // Don't wait forever for fonts (increased to 3s for heavy specs)
      await Promise.race([
        (document as any).fonts.ready,
        new Promise(resolve => setTimeout(resolve, 3000))
      ]);
    } catch (e) {
      console.warn("Font loading wait failed or timed out", e);
    }
  }

  // 2. HARD GATE: Images
  const images = Array.from(container.querySelectorAll('img'));
  await Promise.all(images.map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(resolve => {
      img.onload = resolve;
      img.onerror = resolve;
    });
  }));

  // 3. HARD GATE: Initial Buffer (Allow React to commit)
  await delay(800);

  // 4. ACTIVE STABILIZATION LOOP
  while (Date.now() - start < timeout) {
    const pages = container.querySelectorAll('.print-page');
    
    // Check if we even have pages to capture
    if (pages.length === 0) {
      // If capturing a single root element - more relaxed settle threshold
      if (container.offsetHeight > 30 || container.innerText.trim().length > 20) {
        await waitFrames(5);
        return true;
      }
    } else {
      let allSettled = true;
      
      for (const page of Array.from(pages)) {
        const p = page as HTMLElement;
        const rect = p.getBoundingClientRect();
        
        // Revised settle logic: Page must have some height or some content
        if (rect.height < 20 && p.innerText.length < 20) {
          allSettled = false;
          break;
        }
      }

      if (allSettled) {
        // 5. BULLETPROOF DOUBLE FRAME SETTLE
        await waitFrames(5);
        return true;
      }
    }
    
    // Throttle loop
    await delay(200);
  }

  console.error("FORGE PDF ENGINE: Stability Gate Timeout. Capture might be degraded.");
  return false;
}

/**
 * Deeply scrubs oklab/oklch from an element and all its children
 * This is the ultimate defense against html2canvas parsing crashes
 */
function scrubOkLab(root: HTMLElement) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let node = walker.currentNode as HTMLElement;
  
  const scrub = (el: HTMLElement) => {
    const style = el.getAttribute('style') || '';
    if (style.includes('oklab') || style.includes('oklch')) {
      // Physically remove the offending inline styles
      const cleaned = style
        .replace(/oklab\([^)]+\)/g, 'transparent')
        .replace(/oklch\([^)]+\)/g, 'transparent');
      el.setAttribute('style', cleaned);
    }
  };

  while (node) {
    scrub(node);
    node = walker.nextNode() as HTMLElement;
  }
}

export async function exportToPDF(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return;
  }

  // TRIGGER STABILITY GATE
  const isReady = await waitForStability(element);
  if (!isReady) {
    console.warn("Proceeding with capture despite sub-optimal stability.");
  }

  // Find all pages within the element
  const pages = element.querySelectorAll('.print-page');
  
  if (pages.length === 0) {
    // If no .print-page found, try to capture the whole element
    await captureAndSave(element, filename);
    return;
  }

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i] as HTMLElement;
    
    // Temporarily make visible for capture if needed
    // Note: html2canvas usually captures what's in the DOM even if hidden by media queries
    // but we need to ensure it's not display: none in the actual layout
    
    const canvas = await html2canvas(page, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        // Deeply scrub and force standard colors
        const clonedPage = clonedDoc.body.querySelector('.print-page') || clonedDoc.body;
        scrubOkLab(clonedPage as HTMLElement);

        const style = clonedDoc.createElement('style');
        style.innerHTML = `
          * { 
            color-scheme: light !important;
          }
          /* Force override any oklch/oklab variables that might be leaking in from Tailwind 4 */
          :root {
            --color-gray-50: #f9fafb !important;
            --color-gray-100: #f3f4f6 !important;
            --color-gray-200: #e5e7eb !important;
            --color-gray-300: #d1d5db !important;
            --color-gray-400: #9ca3af !important;
            --color-gray-500: #6b7280 !important;
            --color-gray-600: #4b5563 !important;
            --color-gray-700: #374151 !important;
            --color-gray-800: #1f2937 !important;
            --color-gray-900: #111827 !important;
            
            --color-slate-50: #f8fafc !important;
            --color-slate-100: #f1f5f9 !important;
            --color-slate-200: #e2e8f0 !important;
            --color-slate-300: #cbd5e1 !important;
            --color-slate-400: #94a3b8 !important;
            --color-slate-500: #64748b !important;
            --color-slate-600: #475569 !important;
            --color-slate-700: #334155 !important;
            --color-slate-800: #1e293b !important;
            --color-slate-900: #0f172a !important;
            --color-slate-950: #020617 !important;
            
            --color-zinc-50: #fafafa !important;
            --color-zinc-100: #f4f4f5 !important;
            --color-zinc-200: #e4e4e7 !important;
            --color-zinc-300: #d4d4d8 !important;
            --color-zinc-400: #a1a1aa !important;
            --color-zinc-500: #71717a !important;
            --color-zinc-600: #52525b !important;
            --color-zinc-700: #3f3f46 !important;
            --color-zinc-800: #27272a !important;
            --color-zinc-900: #18181b !important;
            --color-zinc-950: #09090b !important;
            
            --color-red-500: #ef4444 !important;
            --color-red-600: #dc2626 !important;
            --color-red-700: #b91c1c !important;
            
            --color-green-500: #10b981 !important;
            --color-green-600: #059669 !important;
            --color-green-700: #047857 !important;
            
            --color-blue-500: #3b82f6 !important;
            --color-blue-600: #2563eb !important;
            
            --color-orange-500: #f97316 !important;
            
            /* Forge Accent */
            --forge-accent: #c84b31 !important;
          }

          /* Extreme safety: strip all oklab/oklch references from the clone */
          [style*="oklab"], [style*="oklch"] {
            background-color: transparent !important;
            color: inherit !important;
            border-color: transparent !important;
          }
          
          /* Additional safety: ensure text and bg on printed elements use safe colors */
          .print-root, .print-root * {
            border-color: #000000 !important;
          }
        `;
        clonedDoc.head.appendChild(style);
      }
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
    if (i > 0) {
      pdf.addPage();
    }

    // Calculate dimensions to fit A4
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
    // If image is taller than page, we might need to scale it down or split it
    // For unit specs, they are designed to be single pages
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
  }

  pdf.save(`${filename}.pdf`);
}

async function captureAndSave(element: HTMLElement, filename: string) {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    onclone: (clonedDoc) => {
      // Deeply scrub and force standard colors
      scrubOkLab(clonedDoc.body);

      const style = clonedDoc.createElement('style');
      style.innerHTML = `
        * { color-scheme: light !important; }
        /* Force override any oklch/oklab variables that might be leaking in from Tailwind 4 */
        :root {
          --color-gray-50: #f9fafb !important;
          --color-gray-100: #f3f4f6 !important;
          --color-gray-200: #e5e7eb !important;
          --color-gray-300: #d1d5db !important;
          --color-gray-400: #9ca3af !important;
          --color-gray-500: #6b7280 !important;
          --color-gray-600: #4b5563 !important;
          --color-gray-700: #374151 !important;
          --color-gray-800: #1f2937 !important;
          --color-gray-900: #111827 !important;
          
          --color-slate-50: #f8fafc !important;
          --color-slate-100: #f1f5f9 !important;
          --color-slate-200: #e2e8f0 !important;
          --color-slate-300: #cbd5e1 !important;
          --color-slate-400: #94a3b8 !important;
          --color-slate-500: #64748b !important;
          --color-slate-600: #475569 !important;
          --color-slate-700: #334155 !important;
          --color-slate-800: #1e293b !important;
          --color-slate-900: #0f172a !important;
          --color-slate-950: #020617 !important;
          
          --color-zinc-50: #fafafa !important;
          --color-zinc-100: #f4f4f5 !important;
          --color-zinc-200: #e4e4e7 !important;
          --color-zinc-300: #d4d4d8 !important;
          --color-zinc-400: #a1a1aa !important;
          --color-zinc-500: #71717a !important;
          --color-zinc-600: #52525b !important;
          --color-zinc-700: #3f3f46 !important;
          --color-zinc-800: #27272a !important;
          --color-zinc-900: #18181b !important;
          --color-zinc-950: #09090b !important;
          
          --color-red-500: #ef4444 !important;
          --color-red-600: #dc2626 !important;
          --color-red-700: #b91c1c !important;
          
          --color-green-500: #10b981 !important;
          --color-green-600: #059669 !important;
          --color-green-700: #047857 !important;
          
          --color-blue-500: #3b82f6 !important;
          --color-blue-600: #2563eb !important;
          
          --color-orange-500: #f97316 !important;
          
          /* Forge Accent */
          --forge-accent: #c84b31 !important;
        }

        /* Extreme safety: strip all oklab/oklch references from the clone */
        [style*="oklab"], [style*="oklch"] {
          background-color: transparent !important;
          color: inherit !important;
          border-color: transparent !important;
        }
        
        .print-root, .print-root * {
          border-color: #000000 !important;
        }
      `;
      clonedDoc.head.appendChild(style);
    }
  });

  const imgData = canvas.toDataURL('image/jpeg', 1.0);
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeight);
  pdf.save(`${filename}.pdf`);
}
