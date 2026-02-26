import nodemailer from "nodemailer";

// Rate limiting store (simple in-memory for serverless)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

const validateContactForm = (body) => {
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return { valid: false, message: "All fields are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: "Please provide a valid email address." };
  }

  if (name.length < 2 || name.length > 50) {
    return { valid: false, message: "Name must be between 2 and 50 characters." };
  }

  if (message.length < 10 || message.length > 1000) {
    return { valid: false, message: "Message must be between 10 and 1000 characters." };
  }

  return { valid: true };
};

const checkRateLimit = (ip) => {
  const now = Date.now();

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const requests = rateLimitMap.get(ip);
  const recentRequests = requests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);

  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false };
  }

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return { allowed: true };
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || '*' 
    : 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  // Rate limiting
  const clientIP = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';
  const rateLimitResult = checkRateLimit(clientIP);

  if (!rateLimitResult.allowed) {
    return res.status(429).json({
      success: false,
      message: "Rate limit exceeded. Please try again later."
    });
  }

  // Validate form
  const validation = validateContactForm(req.body);
  if (!validation.valid) {
    return res.status(400).json({
      success: false,
      message: validation.message
    });
  }

  const { name, email, message } = req.body;

  try {
    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name} on your portfolio`,
      text: message,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: " + info.response);

    return res.status(200).json({
      success: true,
      message: "Email successfully sent!"
    });
  } catch (error) {
    console.error("Error sending email:", error);

    if (error.responseCode === 535 || error.message?.includes('authentication')) {
      return res.status(500).json({
        success: false,
        message: "Email configuration error. Please contact the administrator."
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later."
    });
  }
}
