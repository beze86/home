import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import Area from '../../../../../models/Area';
import AreaApplication from '../../../application/area/areaApplication';

class AreaPostController {
  private readonly area: AreaApplication;

  constructor(area: AreaApplication) {
    this.area = area;
  }

  async createArea(req: Request, res: Response) {
    if (!req.userId) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    const userId = req.userId;

    if (!req.body) {
      return res.status(400).json({ error: 'Area name is required' });
    }

    const { area } = req.body;

    if (!area) {
      return res.status(400).json({ error: 'Add missing fields' });
    }

    const payload = {
      userId: new ObjectId(userId),
      area,
    };

    try {
      const insertedId = await this.area.createArea(payload);
      res.status(201).json({ insertedId });
    } catch (error) {
      console.log(`Area not created: ${error}`);
      res.status(500).json({ error: 'Failed to create area' });
    }
  }
}

export default AreaPostController;
