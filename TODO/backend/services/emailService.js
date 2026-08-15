import nodemailer from "nodemailer";

// Send emails for reports or notifications using the configured SMTP settings.
export const sendEmail = async (to, subject, html) => {
    try {
        const smtpConfig = {
            host: process.env.SMTP_HOST || "smtp.ethereal.email",
            port: process.env.SMTP_PORT || 587,
            auth: {
                user: process.env.SMTP_USER || "ethereal_user",
                pass: process.env.SMTP_PASS || "ethereal_pass",
            },
        };

        if (!process.env.SMTP_USER) {
            console.warn("⚠️ SMTP credentials missing. Email may fail or use default Ethereal accounts.");
        }

        const transporter = nodemailer.createTransport(smtpConfig);
        const info = await transporter.sendMail({
            from: '"Zenith AI" <zenith@ai.com>',
            to,
            subject,
            html,
        });

        console.log("Email sent successfully!");
        return info;
    } catch (error) {
        console.error("Critical Email Error:", error.message);
        throw new Error("Email service is temporarily unavailable. Please contact support.");
    }
};
