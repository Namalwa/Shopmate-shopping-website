import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export async function registerUser(req, res) {
    try {
        const { username, email, password, firstname, lastname, role } = req.body;

       
        if (!firstname || !lastname) {
            return res.status(400).json({ message: "First name and last name are required" });
        }

        
        if (!role || !["ADMIN", "CUSTOMER"].includes(role)) {
            return res.status(400).json({ message: "Invalid role. Must be 'ADMIN' or 'CUSTOMER'." });
        }

      
        const userExists = await client.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            }
        });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

     
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const newUser = await client.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                firstname,
                lastname,
                role
            }
        });

     
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                username: newUser.username,
                role: newUser.role
            }
        });
    } catch (e) {
        console.error("Error in user registration:", e);
        res.status(500).json({ message: "Something went wrong, please try again.", error: e.message });
    }
}
