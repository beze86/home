type AreaId = string;

type Area = AreaCreation & {
  _id: AreaId;
};

type AreaCreation = {
  area: string;
};

type AreaRepository = {
  getAreas: () => Promise<Area[]>;
  deleteArea: (id: AreaId) => Promise<void>;
  createArea: (area: AreaCreation) => Promise<void>;
};

export type { AreaId, Area, AreaCreation, AreaRepository };
