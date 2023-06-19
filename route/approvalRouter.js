const express = require('express');
const router = express.Router();
const Persons = require('../schema/ApprovalSchema');
const jwt = require('jsonwebtoken');

const validuser = (req,res,next) =>{
    var token = req.header('auth');
    req.token = token;
    next();
  }

  //postmethod
router.post('/',validuser, async(req,res) => {0
    console.log('5555555555555555',res)
    jwt.verify(req.token,'periyRegasisiyam',async (err,data) =>{
        if (err) {
          res.sendStatus(403);
        }else{
        const postPerson = await new Persons({
        reportee_team : req.body.reportee_team,
        reportee_countermeasure_brief_if : req.body.reportee_countermeasure_brief_if,
        final_approval : req.body.final_approval,
        brief_if : req.body.brief_if,
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
    console.log('pppp',data)
    
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
      const updPersons = await Persons.updateOne({_id:req.params.id},{$set:{reportee_team:req.body.reportee_team,reporter_id:req.body.reporter_id,
        reportee_countermeasure_brief_if:req.body.reportee_countermeasure_brief_if,final_approval:req.body.final_approval,brief_if:req.body.brief_if}});
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