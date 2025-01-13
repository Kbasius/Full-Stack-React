import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  // Looks for the token in the authorization header.
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // if no token send unauthorized error.
  if (!token) {
    return res.sendStatus(401);
  }
  // this tries to verify the token if one is found.
  jwt.verify(token, process.env.JWT_SECRET as string, (err: jwt.VerifyErrors | null, user: JwtPayload | undefined) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};
