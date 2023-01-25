type Area = {
  _id: string;
  area: string;
};

type AreaRepository = {
  getAllAreasByUser: () => Promise<Area[]>;
  deleteArea: (id: Area['_id']) => Promise<void>;
  createArea: (area: { area: string }) => Promise<void>;
};

export type { Area, AreaRepository };
