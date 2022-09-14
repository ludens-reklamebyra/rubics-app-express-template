import { Request, Response, NextFunction } from 'express';

export function getPublicData(req: Request, res: Response, next: NextFunction) {
  try {
    res.json({ message: `Public endpoint for ${req.rubics.site}` });
  } catch (e) {
    next(e);
  }
}
