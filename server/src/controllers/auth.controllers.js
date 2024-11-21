import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const client = new PrismaClient();

export const logginUsers = async (req, res) => {
    try {
        const { password, usernameoremail } = req.body;
       
        const user = await client.user.findFirst({
            where: {
                OR: [
                    { email: usernameoremail },
                    { username: usernameoremail }
                ]
            }
            

        });
    

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

       
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

     
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } 
        );

    
        res.status(200)
            .cookie("authToken", token, { httpOnly: true })
            .json({ message: "Login successful", user: { id: user.id, username: user.username, role: user.role } });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

