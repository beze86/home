const Area = require('../models/Area');

exports.getAllAreasByUser = async (req, res) => {
  const userId = req.userId;
  try {
    const areas = await new Area().getAllAreasByUser({ userId });
    res.status(201).json(areas);
  } catch (error) {
    console.log(`Contacts for user not found: ${error}`);
    res.status(500);
  }
};

exports.createArea = async (req, res) => {
  const { areaName } = req.body;
  const userId = req.userId;
  const payload = {
    userId,
    area: areaName,
  };
  try {
    const insertedId = await new Area().createArea(payload);
    res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`Area not created: ${error}`);
    res.status(500);
  }
};

exports.getArea = (req, res) => {
  res.send('get area');
};

exports.updateArea = (req, res) => {
  res.send('update area');
};

exports.deleteArea = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const payload = {
    userId,
    id,
  };
  try {
    await new Area().deleteArea(payload);
    res.status(200).json({ msg: `Area deleted id: ${payload.id}` });
  } catch (error) {
    console.log(`Area not deleted: ${error}`);
    res.status(500);
  }
};
