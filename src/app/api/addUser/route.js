import fs from "fs";
import path from "path";

export async function POST(req) {
    const filePath = path.join(process.cwd(), "src", "data", "users.json");
    const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const { username, email, password } = await req.json();

    if (users.some(user => user.email === email)) {
        return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    users.push({ username, email, password }); 

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return new Response(JSON.stringify({ success: true, message:'User added successfully' }), { status: 200 });
}
