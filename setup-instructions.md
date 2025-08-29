# Email Setup Instructions

To enable direct email sending from your portfolio contact form, follow these steps:

## 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email account
5. Note down the **Service ID**

## 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact from {{from_name}} - Portfolio

Hello Nikhil,

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down the **Template ID**

## 4. Get Public Key
1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (also called User ID)

## 5. Update Configuration
1. Open `email-config.js` in your portfolio folder
2. Replace the placeholder values:
   - `your_service_id` → Your Service ID from step 2
   - `your_template_id` → Your Template ID from step 3
   - `your_public_key` → Your Public Key from step 4

## Example Configuration
```javascript
const EMAIL_CONFIG = {
    SERVICE_ID: 'service_abc123',
    TEMPLATE_ID: 'template_xyz789',
    PUBLIC_KEY: 'user_def456',
    TO_EMAIL: 'nikhilbhorkade1234@gmail.com'
};
```

## 6. Test the Contact Form
1. Open your portfolio website
2. Fill out the contact form
3. Submit the form
4. Check your email for the message

## Fallback Behavior
If EmailJS is not configured or fails, the form will automatically fall back to opening the user's email client with a pre-filled message (mailto link).

## Free Tier Limits
- EmailJS free tier allows 200 emails per month
- This should be sufficient for a personal portfolio
- Upgrade to paid plan if you need more emails

## Security Notes
- The public key is safe to include in client-side code
- Never include private keys or passwords in your frontend code
- EmailJS handles the secure email sending on their servers
