import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;

  try {
    // Looks for a user by their username
    const user = await User.findOne({ where: { username } });
    // Start of an if statement that checks if the user is real.
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // if user is real, it then compares passwords for a match.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // error for miss matching passwords.
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // if everything is still good, we create a token that lasts 1 hour.
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' }); // Server error
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
