import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// TODO: If the user exists and the password is correct, return a JWT token
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  try {
    console.log('Login request received:', { username }); // Log the username received from the client

    const user = await User.findOne({ where: { username } });
    console.log('User found in database:', user ? user.username : null); // Log the username if found, otherwise log null

    if (!user) {
      console.warn('Invalid username'); // Log a warning if the username is not found
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid); // Log the result of the password validation

    if (!isPasswordValid) {
      console.warn('Invalid password'); // Log a warning if the password is invalid
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { username: user.username }, 
      process.env.JWT_SECRET as string, 
      { expiresIn: '1h' }
    );
    console.log('Token generated successfully'); // Log confirmation of token generation

    return res.json({ token });

  } catch (error) {
    console.error('Error in login route:', error); // Log any unexpected errors
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const router = Router();

router.post('/login', login);

export default router;