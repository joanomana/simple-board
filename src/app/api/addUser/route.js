import bcrypt from "bcryptjs";

const API_URL = "https://67ca4ce8102d684575c4f5f1.mockapi.io/api/v1/users/users";

export async function POST(req) {
    try {
        const { username, email, password } = await req.json();

        // Verificar si el usuario ya existe en MockAPI
        const checkResponse = await fetch(API_URL);
        if (!checkResponse.ok) {
            throw new Error("Error checking existing users");
        }

        const users = await checkResponse.json();
        if (users.some(user => user.email === email)) {
            return new Response(JSON.stringify({ error: "The user already exists!" }), { status: 400 });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Enviar nuevo usuario a MockAPI con la contraseña encriptada
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password: hashedPassword })
        });

        if (!res.ok) {
            throw new Error("Failed to register user");
        }

        const data = await res.json();
        return new Response(JSON.stringify(data), { status: 201 });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
