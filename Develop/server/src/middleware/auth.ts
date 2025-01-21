import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload extends jwt.JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

 
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {

    if (err) {
      return res.sendStatus(403);
    }

    if (decoded) {
      req.user = decoded as JwtPayload;
      return next();
    }
    return res.sendStatus(403);
  });
};
