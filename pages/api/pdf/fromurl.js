// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import html_to_pdf from 'html-pdf-node';
import montime from '../../../lib/montime';
import stream from 'stream';

export default async function handler(req, res) {
  if (req.method !== "POST") { //Must be POST
    return res.status(400);
  }

  let { filename, html_url } = req.body;

  if (!html_url) {
    return res.status(400).send("Must specify a source url");
  }
  if (!filename) {
    filename = "monc_" + montime.todayDateString();
  }

  const options = {
    format: 'A4',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu'
    ]
  };

  const file = {
    url: html_url
  }

  const pdfBuff = await html_to_pdf.generatePdf(file, options);
  
  const readStream = new stream.PassThrough();
  readStream.end(pdfBuff);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-Type', 'application/pdf');

  readStream.pipe(res);
}
