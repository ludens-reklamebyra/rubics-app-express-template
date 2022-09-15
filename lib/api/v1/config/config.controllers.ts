import { Request, Response, NextFunction } from 'express';
import { IConfig } from '../../../models/Config/config.types.js';

export async function editConfig(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body as Partial<IConfig>;

    req.state.config = (await req.models.Config.findOneAndUpdate(
      { _id: req.state.config._id },
      {
        $set: {
          setting: body.setting,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ))!;

    res.json(req.state.config);
  } catch (e) {
    next(e);
  }
}
