const express = require('express');
const router = express.Router();
const Persons = require('../schema/ReporteeSchema');
const jwt = require('jsonwebtoken');

const validuser = (req,res,next) =>{
    var token = req.header('auth');
    req.token = token;
    next();
  }
//postmethod
router.post('/',validuser, async(req,res) => {
    jwt.verify(req.token,'periyRegasisiyam',async (err,data) =>{
        // const nameExist = await Persons.findOne({reporter_name:req.body.reporter_name});
        // if(nameExist){
        //     return res.status(400).json("Name already exist"); 
        //   }
        if (err) {
          res.sendStatus(403);
        }else{
        const postPerson = await new Persons({
        reporter_name : req.body.reporter_name,
        reporter_team : req.body.reporter_team,
        reportee_name : req.body.reportee_name,
        team : req.body.team,
        reporter_id : req.body.reporter_id,
        countermeasure_brief_if : req.body.countermeasure_brief_if,
        // re_target_date : req.body.re_target_date,
        // breif_if : req.body.breif_if,
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
      const updPersons = await Persons.updateOne({_id:req.params.id},{$set:{reporter_name:req.body.reporter_name,reporter_team:req.body.reporter_team,
        reportee_name:req.body.reportee_name,team:req.body.team,countermeasure_brief_if:req.body.countermeasure_brief_if,
        changingThisBreaksApplicationSecurity:req.body.changingThisBreaksApplicationSecurity,reporter_id:req.body.reporter_id}});
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