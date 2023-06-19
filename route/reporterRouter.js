const express = require('express');
const router = express.Router();
const Persons = require('../schema/ReporterSchema');
const jwt = require('jsonwebtoken');

const validuser = (req,res,next) =>{
    var token = req.header('auth');
    req.token = token;
    next();
  }
//postmethod
router.post('/',validuser, async(req,res) => {
    jwt.verify(req.token,'periyRegasisiyam',async (err,data) =>{
        // const nameExist = await Persons.findOne({name:req.body.name});
        // if(nameExist){
        //     return res.status(400).json("Name already exist"); 
        //   }
        if (err) {
          res.sendStatus(403);
        }else{
        const postPerson = await new Persons({
        name : req.body.name,
        team : req.body.team,
        date_of_report : req.body.date_of_report,
        issue_level_indicator : req.body.issue_level_indicator,
        responsible_team : req.body.responsible_team,
        issue_location : req.body.issue_location,
        target : req.body.target,
        brief : req.body.brief,
        changingThisBreaksApplicationSecurity : req.body.changingThisBreaksApplicationSecurity
    });
    const savePersons = await postPerson.save();
    res.status(200).json(savePersons); 
}});});

  //all data get method 
router.get('/',validuser, async(req,res) => {
    jwt.verify(req.token,'periyRegasisiyam',async (err,data) =>{
   try {
    if (err) {
      res.sendStatus(403)
    }else{
      const data = await Persons.find();
      res.status(200).json(data);
    }
    } catch (error) {
      res.json({"err":err});
    }});});

//get method id
router.get('/:id',validuser, async(req,res) => {
    jwt.verify(req.token,'periyRegasisiyam',async (err,data) =>{
    try {
        if (err) {
            res.sendStatus(403)
          }else{
        const getById = await Persons.findById(req.params.id);
        res.status(200).json(getById);
          } 
    } catch (error) {
      res.json({"err":err});
    }
  });});

  //update method 
router.put('/:id',validuser, async(req,res) => {
    jwt.verify(req.token,'periyRegasisiyam',async (err,data) =>{
    try {
        if (err) {
            res.sendStatus(403)
          }else{
      const updPersons = await Persons.updateOne({_id:req.params.id},{$set:{name:req.body.name,team:req.body.team,
        date_of_report:req.body.date_of_report,issue_level_indicator:req.body.issue_level_indicator,responsible_team:req.body.responsible_team,
        target:req.body.target,brief:req.body.brief,changingThisBreaksApplicationSecurity:req.body.changingThisBreaksApplicationSecurity}});
      res.status(200).json(updPersons); 
          }
    } catch (error) {
      res.json({"err":err});
    }
  });});

//delete method 
router.delete('/:id',validuser, async(req,res) => {
    jwt.verify(req.token,'periyRegasisiyam',async (err,data) =>{
    try {
        if (err) {
            res.sendStatus(403)
          }else{
      const delPersons = await Persons.remove({_id:req.params.id});
      res.status(200).json(delPersons);
          } 
    } catch (error) {
      res.json({"err":err});
    }
  });});

module.exports = router;