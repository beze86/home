type AreaId = string;

type Area = AreaCreation & {
  _id: AreaId;
  area: string;
};

type AreaCreation = {
  area: string;
};

type AreaRepository = {
  getAllAreasByUser: () => Promise<Area[]>;
  deleteArea: (id: AreaId) => Promise<void>;
  createArea: (area: AreaCreation) => Promise<void>;
};

export type { AreaId, Area, AreaCreation, AreaRepository };
