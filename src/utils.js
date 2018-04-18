/**
 * Triggers a download dialog box.
 * @param {*} blob The data to be downloaded.
 * @param {*} filename The file to download the blob to.
 */
export function download(blob, filename) {
  var a = document.createElement('a');
  a.style.display = 'none';
  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  // TODO: Isn't working.
  // window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

/**
 * Converts an array of cards to PDF format.
 * @param {*} cards An array of cards to be converted to PDF format.
 * @param {*} message The default message to display on each card.
 */
export function toPDF(cards, message) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: [402.48, 311.76],
      margin: 36,
    });
    const stream = doc.pipe(blobStream());
    cards.forEach((card, i) => {
      if (i !== 0) {
        doc.addPage();
      }
      doc.fontSize(18);
      doc.text(`Thank You!`, { align: 'center' });
      doc.fontSize(12);
      const interpolatedMessage = message
        .replace(/{donor}/g, card.donor)
        .replace(/{gift}/g, card.gift)
        .replace(/{message}/g, card.psmessage);
      doc.text(interpolatedMessage);
    });
    doc.end();
    stream.on('finish', function() {
      const blob = stream.toBlob('application/pdf');
      resolve(blob);
    });
  });
}
