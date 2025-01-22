import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// TODO: If the user exists and the password is correct, return a JWT token
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  try {
 
    const user = await User.findOne({ where: { username } });

    if (!user) {
  
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { username: user.username }, 
      process.env.JWT_SECRET as string, 
      { expiresIn: '1h' }
    );

    return res.json({ token });

  } catch (error) {
 
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const router = Router();

router.post('/login', login);

export default router;
