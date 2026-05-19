import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

/**
 * Strips UI fluff, emojis, and styling to provide a clean technical spec.
 */
export const cleanForgeSpec = (content: string): string => {
  return content
    .replace(/[\u1000-\uFFFF]*/g, "") // Basic emoji/special char strip attempt (simplified)
    .replace(/[^\x00-\x7F]/g, "") // Strip non-ASCII (emojis etc)
    .replace(/━━━━━━━━━━━━━━━━━━━━━━━━━━/g, "--------------------------------")
    .replace(/JEMMA VALIDATION — /i, "")
    .trim();
};

/**
 * Exports a clean technical spec to PDF.
 */
export const exportJemmaPDF = (title: string, content: string) => {
  const clean = cleanForgeSpec(content);
  const doc = new jsPDF();
  const pdfWidth = doc.internal.pageSize.getWidth();
  const pdfHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pdfWidth - (margin * 2);
  let cursorY = 20;

  // Title
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(18);
  doc.text(title.toUpperCase(), margin, cursorY);
  cursorY += 10;

  // Metadata
  doc.setFontSize(8);
  doc.setFont("Helvetica", "normal");
  doc.text(`EXPORTED: ${new Date().toLocaleString()} | FORGE STABILITY EXPORT`, margin, cursorY);
  cursorY += 5;
  doc.setLineWidth(0.5);
  doc.line(margin, cursorY, pdfWidth - margin, cursorY);
  cursorY += 10;

  // Content
  doc.setFontSize(10);
  const lines = doc.splitTextToSize(clean, maxWidth);
  
  lines.forEach((line: string) => {
    if (cursorY > pdfHeight - 20) {
      doc.addPage();
      cursorY = 20;
    }
    
    // Check if it's a header line to apply bold
    const isHeader = /^(ROOT LAYER|CONTROL LAW|SEQUENCE LAW|AUTO REJECT|PASS CRITERIA|TECHNICAL FAULTS|VERDICT|FELLINI)/.test(line);
    if (isHeader) {
      doc.setFont("Helvetica", "bold");
      cursorY += 2; // Extra space before header
    } else {
      doc.setFont("Helvetica", "normal");
    }

    doc.text(line, margin, cursorY);
    cursorY += 6;
  });

  const filename = `FORGE_SPEC_${title.replace(/\s+/g, "_")}.pdf`;
  doc.save(filename);
};

/**
 * Exports a clean technical spec to Word (.docx).
 */
export const exportJemmaDocx = async (title: string, content: string) => {
  const clean = cleanForgeSpec(content);
  const lines = clean.split("\n");

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: title.toUpperCase(),
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          ...lines.map(line => {
            const isHeader = /^(ROOT LAYER|CONTROL LAW|SEQUENCE LAW|AUTO REJECT|PASS CRITERIA|TECHNICAL FAULTS|VERDICT|FELLINI)/.test(line);
            return new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  bold: isHeader,
                  size: isHeader ? 24 : 20,
                  font: "Helvetica",
                }),
              ],
              spacing: { before: isHeader ? 240 : 120 },
            });
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const filename = `FORGE_SPEC_${title.replace(/\s+/g, "_")}.docx`;
  saveAs(blob, filename);
};

/**
 * Copies the clean technical spec to clipboard.
 */
export const copyCleanSpec = async (content: string): Promise<boolean> => {
  try {
    const clean = cleanForgeSpec(content);
    await navigator.clipboard.writeText(clean);
    return true;
  } catch (err) {
    console.error("Failed to copy spec:", err);
    return false;
  }
};
