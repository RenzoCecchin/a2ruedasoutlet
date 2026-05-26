import sgMail from '@sendgrid/mail';

export function initializeEmail() {
  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    console.warn('⚠ SENDGRID_API_KEY no configurada. Usando consola para emails (dev mode).');
    return;
  }

  sgMail.setApiKey(apiKey);
  console.log('✓ SendGrid configurado');
}

export async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const emailFrom = process.env.EMAIL_FROM || 'noreply@a2ruedas.com';
  const emailFromName = process.env.EMAIL_FROM_NAME || 'A2 Ruedas Outlet';

  if (!apiKey) {
    // Dev mode: mostrar en consola
    console.log(`
📧 EMAIL (dev mode):
To: ${to}
Subject: ${subject}
---
${html}
---`);
    return;
  }

  try {
    await sgMail.send({
      to,
      from: { email: emailFrom, name: emailFromName },
      subject,
      html,
    });
    console.log(`✓ Email enviado a ${to}`);
  } catch (error) {
    console.error('✗ Error enviando email:', error);
    throw error;
  }
}
