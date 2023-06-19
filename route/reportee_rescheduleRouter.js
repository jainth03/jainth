const express = require('express');
const router = express.Router();
const Persons = require('../schema/Reportee_rescheduleSchema');
const jwt = require('jsonwebtoken');

const validuser = (req,res,next) =>{
    var token = req.header('auth');
    req.token = token;
    next();
  }
//postmethod
router.post('/',validuser, async(req,res) => {
    jwt.verify(req.token,'periyRegasisiyam',async (err,data) =>{
        if (err) {
          res.sendStatus(403);
        }else{
        const postPerson = await new Persons({
        reschedule_reporter_name : req.body.reschedule_reporter_name,
        reschedule_reporter_team : req.body.reschedule_reporter_team,
        re_target_date : req.body.re_target_date,
        breif_if : req.body.breif_if,
        reporter_id : req.body.reporter_id
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
      const updPersons = await Persons.updateOne({_id:req.params.id},{$set:{reschedule_reporter_name:req.body.reschedule_reporter_name,reschedule_reporter_team:req.body.reschedule_reporter_team,
        re_target_date:req.body.re_target_date,breif_if:req.body.breif_if,reporter_id:req.body.reporter_id}});
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