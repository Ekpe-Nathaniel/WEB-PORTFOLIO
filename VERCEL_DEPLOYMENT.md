# Vercel Deployment Guide

## Quick Start

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Get Your Gmail App Password

**Important:** You need to generate an App Password for your Gmail account:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Scroll to **App passwords** and click it
4. Select "Mail" and your device, then click **Generate**
5. Copy the 16-character password

### 3. Update Environment Variables

Edit `.env` with your Gmail App Password:
```env
EMAIL_USER=eyramnathaniel@gmail.com
EMAIL_PASS=your-16-character-app-password
```

### 4. Deploy to Vercel

```bash
# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Deploy to production
vercel --prod
```

### 5. Set Environment Variables on Vercel

After deploying, set your environment variables in the Vercel dashboard:

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Settings** → **Environment Variables**
3. Add:
   - `EMAIL_USER` = `eyramnathaniel@gmail.com`
   - `EMAIL_PASS` = `your-app-password`
   - `NODE_ENV` = `production`
4. Redeploy: `vercel --prod`

## Testing Locally with Vercel

```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Run Vercel dev server
vercel dev
```

Then visit `http://localhost:3000` to test your contact form.

## Important Notes

- **Never commit `.env` to Git** - it's already in `.gitignore`
- Environment variables must be set in Vercel dashboard for production
- The contact form will send emails to `eyramnathaniel@gmail.com`
- Rate limiting: 5 submissions per 15 minutes per IP

## Troubleshooting

### Email not sending?
- Verify your App Password is correct (16 characters, no spaces)
- Check Vercel function logs: `vercel logs`
- Ensure 2FA is enabled on your Google account

### CORS errors?
- Make sure `FRONTEND_URL` is set in Vercel environment variables

## Useful Commands

```bash
vercel          # Deploy to preview
vercel --prod   # Deploy to production
vercel logs     # View function logs
vercel env      # Manage environment variables
```
