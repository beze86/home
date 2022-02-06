import { AxiosPromise } from 'axios';

export type Area = {
  _id: string;
  area: string;
};

export type AreaRepository = {
  getAllAreas: () => AxiosPromise<Area[]>;
  deleteArea: (id: Area['_id']) => AxiosPromise<void>;
  createArea: (areaName: string) => AxiosPromise<void>;
};
