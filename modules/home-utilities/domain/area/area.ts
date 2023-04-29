import { ObjectId } from 'mongodb';

import { UserId } from '../../../../models/User';

type AreaId = ObjectId;

type GetAreas = {
  userId: UserId;
};

type DeleteArea = {
  userId: UserId;
  id: AreaId;
};

type CreateArea = {
  userId: UserId;
  area: string;
};

type AreaResult = {
  _id: AreaId;
  userId: UserId;
  area: string;
};

interface AreaRepository {
  getAreas: (data: GetAreas) => Promise<AreaResult[]>;
  deleteArea: (data: DeleteArea) => Promise<void>;
  createArea: (data: CreateArea) => Promise<void>;
}

export type { AreaId, GetAreas, CreateArea, DeleteArea, AreaResult, AreaRepository };
