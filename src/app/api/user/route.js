import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Usa bcryptjs en lugar de bcrypt

const SECRET_KEY = "asdasdasd"; // 🔑 Cambia esto por una clave segura

export async function POST(req) {
    const { email, password } = await req.json();

    try {
        // Obtener la lista de usuarios desde MockAPI
        const response = await fetch("https://67ca4ce8102d684575c4f5f1.mockapi.io/api/v1/users/users");
        if (!response.ok) {
            throw new Error("Error al obtener los usuarios");
        }

        const users = await response.json();

        // Buscar usuario por email
        const user = users.find(user => user.email === email);
        if (!user) {
            return new Response(JSON.stringify({ error: "Usuario no encontrado" }), { status: 401 });
        }

        // Comparar la contraseña encriptada
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new Response(JSON.stringify({ error: "Contraseña incorrecta" }), { status: 401 });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username },
            SECRET_KEY,
            { expiresIn: "1h" } // Expira en 1 hora
        );

        return new Response(JSON.stringify({ success: true, token }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
