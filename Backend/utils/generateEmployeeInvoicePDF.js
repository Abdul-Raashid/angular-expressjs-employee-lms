const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Employee = require('../models/Employee');

async function generateInvoicePDF(invoiceData, po, filePath) {
  try {
    const trainer = await Employee.findOne({ name: po.trainerName });

    if (!trainer) {
      return { message: `Trainer not found for purchase order ${po._id}` };
    }

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(fs.createWriteStream(filePath));

    const logoPath = path.join(__dirname, '../utils/download.jpg');
    const startY = 50;

    // ===== Company Logo and Invoice Heading =====
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, startY, { width: 100 });
    }
    doc
      .fontSize(20)
      .font('Helvetica-Bold')
      .text('INVOICE', 400, startY, { align: 'right' });

    doc.moveDown(2);

    // ===== Invoice Info =====
    doc
      .fontSize(12)
      .font('Helvetica')
      .text(`Invoice Number: ${invoiceData.invoiceNumber}`, 50, doc.y)
      .text(`Invoice Date: ${new Date(invoiceData.invoiceDate).toDateString()}`);
    
    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // ===== Company Info =====
    doc.fontSize(12).font('Helvetica-Bold').text('From (Company):');
    doc.font('Helvetica')
      .text(invoiceData.clientDetails.name)
      .text(invoiceData.clientDetails.address)
      .text(invoiceData.clientDetails.email)
      .text(invoiceData.clientDetails.phone);

    doc.moveDown();

    // ===== Trainer Info =====
    doc.font('Helvetica-Bold').text('To (Trainer):');
    doc.font('Helvetica')
      .text(invoiceData.trainerDetails.name)
      .text(invoiceData.trainerDetails.address);

    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // ===== Course Details Table =====
    const course = invoiceData.courseDetails;
    doc.font('Helvetica-Bold').text('Course Details:').moveDown(0.5);
    doc.font('Helvetica');
    doc.text(`Course Name: ${course.courseName}`);
    doc.text(`Start Date: ${new Date(course.startDate).toDateString()}`);
    doc.text(`Duration: ${course.numberOfDays} days`);
    doc.text(`Daily Cost: ₹${course.dailyCost.toFixed(2)}`);
    doc.text(`Trainer Cost: ₹${course.trainerCost.toFixed(2)}`);
    doc.text(`Total Cost: ₹${course.totalCost.toFixed(2)}`);
    
    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // ===== Tax Summary =====
    const tax = invoiceData.taxSummary;
    doc.font('Helvetica-Bold').text('Tax Summary:').moveDown(0.5);
    doc.font('Helvetica');
    doc.text(`Subtotal: ₹${tax.subtotal.toFixed(2)}`);
    doc.text(`Tax (${tax.taxRate}): ₹${tax.taxAmount.toFixed(2)}`);
    doc.text(`Total with Tax: ₹${tax.totalWithTax.toFixed(2)}`);

    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // ===== Bank Details =====
    const bank = invoiceData.bankDetails;
    doc.font('Helvetica-Bold').text('Trainer Bank Details:').moveDown(0.5);
    doc.font('Helvetica')
      .text(`Account Holder: ${bank.accountHolder}`)
      .text(`Account Number: ${bank.accountNumber}`)
      .text(`Bank Name: ${bank.bankName}`)
      .text(`IFSC Code: ${bank.ifscCode}`);

    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // ===== Terms =====
    doc.fontSize(10).font('Helvetica-Bold').text('Terms & Conditions:', { underline: true }).moveDown(0.5);
    doc.font('Helvetica');
    invoiceData.terms.forEach(term => {
      doc.text(`• ${term}`);
    });

    // ===== Footer Line =====
    doc.moveDown(2);
    doc.fontSize(10).fillColor('gray')
      .text('Thank you for your business!', { align: 'center' });

    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}

module.exports = generateInvoicePDF;
