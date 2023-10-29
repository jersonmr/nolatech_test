import nodemailer from "nodemailer";

const registerEmail = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        }
    })

    const { name, surname, email, token } = data;

    await transport.sendMail({
        from: 'nolatech.ai',
        to: email,
        subject: 'Confirma tu cuenta en Nolatech',
        text: 'Confirma tu cuenta en Nolatech',
        html: `
            <p>Hola ${name} ${surname}, confirma tu cuenta con nostros</p>

            <p>Solo debes hacer clic en el siguiente enlace</p>

            <a href="${process.env.APP_URL}:${process.env.PORT ?? 3000}/auth/verify-email/${token}">Confirmar cuenta</a>

            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje.</p>
        `
    });
}

export {registerEmail}
