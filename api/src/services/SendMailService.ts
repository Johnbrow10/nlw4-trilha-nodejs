import nodemailer, { Transporter } from "nodemailer";


class SendMailService {
    private client: Transporter
    constructor() {
        nodemailer.createTestAccount().then((account => {
            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: account.user, // generated ethereal user
                    pass: account.pass, // generated ethereal password
                },
            });

            this.client = transporter;
        })).catch()
    }

    async execute(to: string, subject: string, body: string) {
        const message = await this.client.sendMail({
            to,
            subject,
            html: body,
            from: "NPS <noreplay@nps.com.br>"
        });

        console.log("Message sent: %s", message.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));

    }
}

export default new SendMailService();