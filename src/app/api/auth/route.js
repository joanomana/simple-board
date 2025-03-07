import jwt from "jsonwebtoken";

const SECRET_KEY = "asdasdasd"; // Debe ser la misma clave usada para firmar el token

export function authenticateToken(req) {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Acceso denegado. Token requerido." }), { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded; // Retornamos los datos del usuario autenticado
    } catch (error) {
        return new Response(JSON.stringify({ error: "Token inválido o expirado" }), { status: 403 });
    }
}
