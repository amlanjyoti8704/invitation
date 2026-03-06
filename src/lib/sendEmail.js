import nodemailer from "nodemailer";

export async function sendTicketEmail(email, eventTitle, qrCode) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // remove base64 prefix
  const base64Data = qrCode.replace(/^data:image\/png;base64,/, "");

  await transporter.sendMail({
    from: `"EventHub" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Your Ticket for ${eventTitle}`,

    html: `
      <h2>Your Ticket</h2>
      <p>Event: ${eventTitle}</p>
      <p>Show this QR code at the event entrance.</p>

      <img src="cid:qrcode" width="200"/>

      <p>Thank you for booking with EventHub 🎉</p>
    `,

    attachments: [
      {
        filename: "ticket.png",
        content: base64Data,
        encoding: "base64",
        cid: "qrcode",
      },
    ],
  });
}