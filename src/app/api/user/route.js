import fs from "fs";
import path from "path";

export async function POST(req) {
    const filePath = path.join(process.cwd(), "src", "data", "users.json");
    const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const { email, password } = await req.json();

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    return new Response(JSON.stringify({ success: true, message: "Authenticated" }), { status: 200 });
}
