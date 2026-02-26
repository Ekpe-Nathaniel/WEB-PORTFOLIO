# Contact Form Setup Guide

## Overview
Your portfolio website now includes a fully functional contact form that allows visitors to send you messages directly from the site. The form includes validation, rate limiting, and secure email delivery.

## Features
- **Input Validation**: Validates name, email, and message fields
- **Rate Limiting**: Prevents spam by limiting submissions per IP
- **Secure Email Delivery**: Sends emails via Gmail's SMTP service
- **Responsive UI**: Shows loading states and success/error messages
- **CORS Support**: Configured for both development and production environments

## Configuration

### 1. Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# Your Gmail address
EMAIL_USER=your-email@gmail.com

# Your Gmail App Password (NOT your regular password)
EMAIL_PASS=your-gmail-app-password

# Backend API base URL (optional, defaults to http://localhost:3001)
VITE_API_BASE_URL=http://localhost:3001

# Frontend URL for CORS (used in production)
FRONTEND_URL=https://yourdomain.com

# Node environment (development/production)
NODE_ENV=development
```

### 2. Gmail Setup
To use Gmail for sending emails, you need to:

1. Enable 2-Factor Authentication on your Google account
2. Generate an "App Password":
   - Go to Google Account settings
   - Navigate to Security > 2-Step Verification > App passwords
   - Generate a new app password for "Mail"
   - Use this 16-character password in the `EMAIL_PASS` variable

### 3. Alternative Email Providers
While the current setup uses Gmail, you can modify the transporter configuration in `server.js` to use other email services like SendGrid, Mailgun, or custom SMTP servers.

## API Endpoints

### POST `/api/send-email`
Sends an email with the contact form data.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email successfully sent!"
}
```

**Validation Rules:**
- Name: 2-50 characters
- Email: Valid email format
- Message: 10-1000 characters
- Rate limit: Max 5 requests per 15 minutes per IP

## Frontend Integration
The contact form in `src/sections/Contact.jsx` is already configured to:
- Validate inputs before submission
- Show loading states
- Display success/error messages
- Handle API communication

## Running the Application

### Development
```bash
npm run dev
```

This will start both the frontend (Vite) and backend (Node.js) servers simultaneously.

### Production
```bash
npm run build  # Build the frontend
npm start      # Run the backend server
```

## Troubleshooting

### Common Issues:

1. **Email Authentication Error**: 
   - Verify your Gmail App Password is correct
   - Ensure 2FA is enabled on your Google account

2. **CORS Errors**:
   - Check that `FRONTEND_URL` is properly set in production
   - Ensure the frontend is served from the allowed origin

3. **Rate Limiting**:
   - Default is 5 requests per 15 minutes per IP
   - Adjust `MAX_REQUESTS_PER_WINDOW` and `RATE_LIMIT_WINDOW` in `server.js` if needed

4. **Connection Timeout**:
   - Verify the backend server is running
   - Check that the correct port is being used

## Security Notes
- Never commit your `.env` file to version control
- Use strong, unique app passwords
- Monitor your email sending limits
- The rate limiting helps prevent spam but can be customized as needed