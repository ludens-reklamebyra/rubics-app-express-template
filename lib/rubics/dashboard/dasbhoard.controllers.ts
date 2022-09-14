import { Request, Response } from 'express';
import { IConfig } from '../../models/Config/config.types.js';
import { renderDashboard } from './dashboard.utils.js';

export async function renderDashboardContent(req: Request, res: Response) {
  return renderDashboard(req, res, {
    config: req.state.config.toJSON() as unknown as IConfig,
  });
}

export async function postDashboardConfig(req: Request, res: Response) {
  const { teamtailorToken } = req.body;
  if (teamtailorToken) {
    req.state.config = (await req.models.Config.findByIdAndUpdate(
      req.state.config._id,
      {
        $set: {
          ...(teamtailorToken ? { teamtailorToken } : {}),
        },
      },
      {
        new: true,
      }
    ))!;
  }

  return renderDashboard(req, res, {
    config: req.state.config.toJSON() as any,
  });
}
