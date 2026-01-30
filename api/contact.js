const { Resend } = require('resend');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const {
    fullName,
    companyName,
    email,
    phone,
    preferredContact,
    role,
    projectType,
    projectAddress,
    squareFootage,
    interiorExterior,
    stories,
    surfaceTypes,
    occupied,
    startDate,
    completionDate,
    plansAvailable,
    budgetRange,
    additionalDetails
  } = req.body;

  // Validate required fields
  if (!fullName || !companyName || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields: name, company, email, and phone are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  // Check if project details were provided
  const hasProjectDetails = projectType || projectAddress || squareFootage ||
    interiorExterior || stories || (surfaceTypes && surfaceTypes.length > 0) ||
    occupied || startDate || completionDate || plansAvailable || budgetRange ||
    additionalDetails;

  try {
    // 1. Send notification email to team
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      replyTo: email,
      to: [process.env.NOTIFICATION_EMAIL],
      subject: `New Quote Request from ${fullName} – ${companyName}`,
      html: buildNotificationEmail({
        fullName, companyName, email, phone, preferredContact,
        role, projectType, projectAddress, squareFootage,
        interiorExterior, stories, surfaceTypes, occupied,
        startDate, completionDate, plansAvailable, budgetRange,
        additionalDetails, hasProjectDetails
      })
    });

    // 2. Send confirmation email to submitter
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: [email],
      subject: 'Louisville Commercial Painters – We Received Your Quote Request',
      html: buildConfirmationEmail(fullName)
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
};

function buildNotificationEmail(data) {
  const labelMap = {
    'general-contractor': 'General Contractor',
    'property-manager': 'Property Manager',
    'building-owner': 'Building Owner'
  };

  const projectTypeMap = {
    'tenant-improvement': 'Tenant Improvement / Buildout',
    'office-commercial': 'Office / Commercial Interior',
    'retail': 'Retail Space',
    'warehouse-industrial': 'Warehouse / Industrial',
    'exterior': 'Exterior / Building Envelope',
    'specialty': 'Specialty Coatings (Epoxy, etc.)',
    'other': 'Other'
  };

  const budgetMap = {
    'under-10k': 'Under $10,000',
    '10k-25k': '$10,000 – $25,000',
    '25k-50k': '$25,000 – $50,000',
    '50k-100k': '$50,000 – $100,000',
    '100k-250k': '$100,000 – $250,000',
    '250k-plus': '$250,000+'
  };

  const row = (label, value) => {
    if (!value) return '';
    return `<tr><td style="padding:8px 12px;font-weight:600;color:#333;border-bottom:1px solid #eee;width:200px;">${label}</td><td style="padding:8px 12px;color:#555;border-bottom:1px solid #eee;">${value}</td></tr>`;
  };

  let projectSection = '';
  if (data.hasProjectDetails) {
    const surfaces = data.surfaceTypes && data.surfaceTypes.length > 0
      ? data.surfaceTypes.map(s => s.replace('-', ' / ')).join(', ')
      : '';

    projectSection = `
      <tr><td colspan="2" style="padding:16px 12px 8px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;font-weight:700;color:#C41E3A;text-transform:uppercase;letter-spacing:0.05em;">Project Details</td></tr>
      ${row('Role', labelMap[data.role] || data.role)}
      ${row('Project Type', projectTypeMap[data.projectType] || data.projectType)}
      ${row('Address / City', data.projectAddress)}
      ${row('Square Footage', data.squareFootage)}
      ${row('Interior / Exterior', data.interiorExterior)}
      ${row('Stories / Floors', data.stories)}
      ${row('Surface Types', surfaces)}
      ${row('Space Occupied', data.occupied)}
      ${row('Plans Available', data.plansAvailable)}
      ${row('Start Date', data.startDate)}
      ${row('Completion Date', data.completionDate)}
      ${row('Budget Range', budgetMap[data.budgetRange] || data.budgetRange)}
      ${row('Additional Details', data.additionalDetails)}
    `;
  } else {
    projectSection = `
      <tr><td colspan="2" style="padding:16px 12px 8px;color:#888;font-style:italic;">No project details provided — contact info only submission.</td></tr>
    `;
  }

  return `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #ddd;">
            <tr><td style="background:#C41E3A;padding:24px 20px;">
              <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">New Quote Request</h1>
            </td></tr>
            <tr><td style="padding:20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td colspan="2" style="padding:0 12px 8px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;font-weight:700;color:#C41E3A;text-transform:uppercase;letter-spacing:0.05em;">Contact Information</td></tr>
                ${row('Name', data.fullName)}
                ${row('Company', data.companyName)}
                ${row('Email', `<a href="mailto:${data.email}" style="color:#C41E3A;">${data.email}</a>`)}
                ${row('Phone', `<a href="tel:${data.phone}" style="color:#C41E3A;">${data.phone}</a>`)}
                ${row('Preferred Contact', data.preferredContact)}
                ${projectSection}
              </table>
            </td></tr>
            <tr><td style="padding:16px 20px;background:#f8f8f8;border-top:1px solid #eee;">
              <p style="margin:0;font-size:12px;color:#999;">Submitted from louisvillecommercialpainting.com on ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}

function buildConfirmationEmail(fullName) {
  return `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #ddd;">
            <tr><td style="background:#C41E3A;padding:24px 20px;">
              <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">Louisville Commercial Painters</h1>
            </td></tr>
            <tr><td style="padding:30px 20px;">
              <h2 style="margin:0 0 16px;font-size:20px;color:#0D0D0D;">Thank you, ${fullName}!</h2>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#555;">We've received your quote request and our team is reviewing your project details. You can expect to hear from us within <strong>24–48 hours</strong>.</p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#555;">If you have any urgent questions in the meantime, feel free to reach us directly:</p>
              <table cellpadding="0" cellspacing="0" style="margin:16px 0;">
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#333;font-weight:600;width:60px;">Phone:</td>
                  <td style="padding:6px 0;font-size:14px;"><a href="tel:5742865700" style="color:#C41E3A;text-decoration:none;">(574) 286-5700</a></td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#333;font-weight:600;">Email:</td>
                  <td style="padding:6px 0;font-size:14px;"><a href="mailto:info@louisvillecommercialpainting.com" style="color:#C41E3A;text-decoration:none;">info@louisvillecommercialpainting.com</a></td>
                </tr>
              </table>
              <p style="margin:16px 0 0;font-size:15px;line-height:1.7;color:#555;">We look forward to working with you.</p>
            </td></tr>
            <tr><td style="padding:16px 20px;background:#f8f8f8;border-top:1px solid #eee;">
              <p style="margin:0;font-size:12px;color:#999;">Louisville Commercial Painters &middot; Louisville, KY &amp; Surrounding Areas</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}
