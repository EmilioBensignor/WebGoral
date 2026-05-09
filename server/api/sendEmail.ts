import { createTransport } from 'nodemailer';

// Rate limit muy simple en memoria (solo evita spikes obvios; no sirve detrás de N instancias).
// Para producción real, sustituir por una solución como upstash redis o turnstile.
const requestLog = new Map<string, number[]>();
const WINDOW_MS = 60_000; // 1 minuto
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (requestLog.get(ip) || []).filter(ts => now - ts < WINDOW_MS);
    if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
        requestLog.set(ip, recent);
        return true;
    }
    recent.push(now);
    requestLog.set(ip, recent);
    return false;
}

export default defineEventHandler(async (event) => {
    try {
        const ip = getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim()
            || getRequestHeader(event, 'x-real-ip')
            || 'unknown';

        if (isRateLimited(ip)) {
            throw createError({
                statusCode: 429,
                message: 'Too many requests'
            });
        }

        const { body, website } = await readBody(event) as { body?: string; website?: string };

        // Honeypot: si está completo, es un bot
        if (website && website.trim() !== '') {
            // Devolvemos 200 para no avisar al bot que detectamos el truco
            return { status: 'success', message: 'Email enviado correctamente' };
        }

        if (!body || typeof body !== 'string') {
            throw createError({
                statusCode: 400,
                message: 'Se requiere cuerpo del mensaje'
            });
        }

        // Limite razonable para evitar payloads gigantes
        if (body.length > 5000) {
            throw createError({
                statusCode: 413,
                message: 'Mensaje demasiado largo'
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
            to: 'info@goral.com.ar',
            subject: 'Nuevo formulario de contacto - Goral',
            text: body,
        });

        return {
            status: 'success',
            message: 'Email enviado correctamente'
        };

    } catch (error: any) {
        // Rethrow nuestros errores con status code
        if (error?.statusCode) throw error;
        throw createError({
            statusCode: 500,
            message: 'Error al enviar email'
        });
    }
});
