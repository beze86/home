const Area = require('../models/Area');

exports.getAllAreas = async (req, res) => {
  try {
    const areas = await new Area().getAllAreas();
    res.status(200).json(areas);
  } catch (error) {
    console.log(`Areas not found: ${error}`);
    res.status(500);
  }
};

exports.createArea = async (req, res) => {
  try {
    const { areaName } = req.body;
    const { insertedId } = await new Area().createArea(areaName);
    res.status(200).json({ insertedId });
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
  try {
    const { id } = req.params;
    await new Area().deleteArea(id);
    res.status(200).json({ msg: `Area deleted id: ${id}` });
  } catch (error) {
    console.log(`Area not deleted: ${error}`);
    res.status(500);
  }
};
