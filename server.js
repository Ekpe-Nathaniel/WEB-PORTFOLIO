import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Validation middleware
const validateContactForm = (req, res, next) => {
  const { name, email, message } = req.body;
  
  // Check if all fields are present
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: "All fields are required." 
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: "Please provide a valid email address." 
    });
  }

  // Validate name length
  if (name.length < 2 || name.length > 50) {
    return res.status(400).json({ 
      success: false, 
      message: "Name must be between 2 and 50 characters." 
    });
  }

  // Validate message length
  if (message.length < 10 || message.length > 1000) {
    return res.status(400).json({ 
      success: false, 
      message: "Message must be between 10 and 1000 characters." 
    });
  }

  next();
};

// Rate limiting middleware (simple implementation)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

const rateLimit = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!rateLimitMap.has(clientIP)) {
    rateLimitMap.set(clientIP, []);
  }
  
  const requests = rateLimitMap.get(clientIP);
  // Remove requests older than the window
  const recentRequests = requests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({ 
      success: false, 
      message: "Rate limit exceeded. Please try again later." 
    });
  }
  
  recentRequests.push(now);
  rateLimitMap.set(clientIP, recentRequests);
  next();
};

app.post("/api/send-email", rateLimit, validateContactForm, async (req, res) => {
  try {
    const { name, email, message } = req.body;

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
      from: `"${name}" <${email}>`, // sender address
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
    
    res.status(200).json({ 
      success: true, 
      message: "Email successfully sent!" 
    });
  } catch (error) {
    console.error("Error sending email:", error);
    
    // Check for authentication errors
    if (error.responseCode === 535 || error.message.includes('authentication')) {
      return res.status(500).json({ 
        success: false, 
        message: "Email configuration error. Please contact the administrator." 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Something went wrong. Please try again later." 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});