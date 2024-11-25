import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

async function validateUserInformation(req, res, next) {
  const { firstname, lastname, email, username, password } = req.body;

  if (!firstname) {
    return res.status(400).json({ message: "First name is required" });
  }

  if (!lastname) {
    return res.status(400).json({ message: "Last name is required" });
  }

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const userWithEmail = await client.user.findFirst({
    where: { email: email },
  });

  if (userWithEmail) {
    return res.status(400).json({ message: "Email address already taken" });
  }

  next();
}

export default validateUserInformation;
