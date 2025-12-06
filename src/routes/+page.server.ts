import { createTransport } from 'nodemailer';
import { fail } from '@sveltejs/kit';
import { EMAIL_USER, EMAIL_PASS } from '$env/static/private';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('user_name');
    const email = data.get('user_email');
    const subject = data.get('subject');
    const message = data.get('message');

    if (!name || !email || !subject || !message) {
      return fail(400, { missing: true });
    }

    // Create a transporter
    // Note: You need to configure these environment variables in your .env file and Amplify console
    const transporter = createTransport({
      service: 'gmail', // Or your preferred email service
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: EMAIL_USER, // Send to yourself
      subject: `[Portfolio Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.toString().replace(/\n/g, '<br>')}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error('Email send error:', error);
      return fail(500, { error: 'Failed to send email' });
    }
  },
};
