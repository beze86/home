import { AxiosPromise } from 'axios';

type Area = {
  _id: string;
  area: string;
};

type AreaRepository = {
  getAllAreasByUser: () => AxiosPromise<Area[]>;
  deleteArea: (id: Area['_id']) => AxiosPromise<void>;
  createArea: (areaName: string) => AxiosPromise<{ insertedId: string }>;
};

export type { Area, AreaRepository };
