// EmailJS Configuration
// To use this, you need to:
// 1. Sign up at https://www.emailjs.com/
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Replace the IDs below with your actual EmailJS IDs

const EMAIL_CONFIG = {
    SERVICE_ID: 'your_service_id', // Replace with your EmailJS service ID
    TEMPLATE_ID: 'your_template_id', // Replace with your EmailJS template ID
    PUBLIC_KEY: 'your_public_key', // Replace with your EmailJS public key
    TO_EMAIL: 'nikhilbhorkade1234@gmail.com' // Your email address
};

// Email service class
class EmailService {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    async init() {
        try {
            // Load EmailJS library
            if (!window.emailjs) {
                await this.loadEmailJS();
            }
            
            // Initialize EmailJS with public key
            emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
            this.isInitialized = true;
            console.log('EmailJS initialized successfully');
        } catch (error) {
            console.error('Failed to initialize EmailJS:', error);
        }
    }

    loadEmailJS() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async sendEmail(formData) {
        if (!this.isInitialized) {
            throw new Error('EmailJS not initialized');
        }

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: EMAIL_CONFIG.TO_EMAIL,
            reply_to: formData.email
        };

        try {
            const response = await emailjs.send(
                EMAIL_CONFIG.SERVICE_ID,
                EMAIL_CONFIG.TEMPLATE_ID,
                templateParams
            );
            
            console.log('Email sent successfully:', response);
            return { success: true, response };
        } catch (error) {
            console.error('Failed to send email:', error);
            return { success: false, error };
        }
    }
}

// Export for use in other files
window.EmailService = EmailService;
