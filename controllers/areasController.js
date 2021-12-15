const Areas = require('../models/Areas');

exports.getAllAreas = async (req, res) => {
  try {
    const areas = await Areas.getAllAreas();
    res.status(200).json(areas);
  } catch (err) {
    console.log(`get areas error: ${err}`);
    res.status(500);
  }
};

exports.createArea = (req, res) => {
  res.send('create area');
};

exports.getArea = (req, res) => {
  res.send('get area');
};

exports.updateArea = (req, res) => {
  res.send('update area');
};

exports.deleteArea = (req, res) => {
  res.send('delete area');
};
