import { createTransport } from 'nodemailer';

export default defineEventHandler(async (event) => {
    try {
        const { body } = await readBody(event);

        // Validar parámetros
        if (!body) {
            throw createError({
                statusCode: 400,
                message: 'Se requiere cuerpo del mensaje'
            });
        }

        // Configurar transporte SMTP
        const transporter = createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'peripeteiadigital@gmail.com',
                pass: process.env.SMTP_PASSWORD,
            }
        });

        // Enviar email
        await transporter.sendMail({
            from: 'peripeteiadigital@gmail.com',
            to: 'info@goral.com',
            subject: 'Nuevo formulario de contacto - Goral',
            text: body,
        });

        return {
            status: 'success',
            message: 'Email enviado correctamente'
        };

    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Error al enviar email'
        });
    }
});
