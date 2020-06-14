const express = require("express");
const router = express.Router();
const Curriculum = require('../../models/Curriculum');

exports.getCurricula( async function (req, res) {
  try{
    const curricula = await Curriculum.findAll()
    res.json(curricula);
  }catch(err){
    console.log(err)
  }
});
exports.postCurriculum(function (req, res) {
  res.send("Got a POST request");
});

exports.getCurriculum( async function (req, res) {
  try{
    const curriculum = new Curriculum(req.params);
    const curriculumFound = await curriculum.findOne()
    res.json(curriculumFound);
  }catch(err) {
    res.redirect('/api/v1');
    console.log(err)
  }
});

exports.updateCurriculm(function (req, res) {
  res.send("Got a POST request");
});

exports.deleteCurriculum(async function (req, res) {
  try{
    const curriculum = new Curriculum(req.params);
    await curriculum.deleteOne()
    res.redirect('/api/v1');
  }catch(err) {
    console.log(err)
  }
});

module.exports = router;
