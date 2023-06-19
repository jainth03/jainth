const express = require('express');
const router = express.Router();
const Persons = require('./PersonsSchema');

//postmethod
router.post('/', async(req,res) => {
  try {
    const postPerson = await new Persons({
      Name : req.body.Name,
      Age : req.body.Age
    });
    const savePersons = await postPerson.save();
    res.status(200).json(savePersons); 
  } catch (error) {
    res.json({"err":err});
  }
});
//all data get method 
router.get('/', async(req,res) => {
  try {
    const getall = await Persons.find();
    res.status(200).json(getall); 
  } catch (error) {
    res.json({"err":err});
  }
});

//get method id
router.get('/:id', async(req,res) => {
  try {
    const getById = await Persons.findById(req.params.id);
    res.status(200).json(getById); 
  } catch (error) {
    res.json({"err":err});
  }
});

//update method 
router.put('/:id', async(req,res) => {
  try {
    console.log('22222',req.params.id)
    const updPersons = await Persons.updateOne({_id:req.params.id},{$set:{Name:req.body.Name,Age:req.body.Age}});
    res.status(200).json(updPersons); 
  } catch (error) {
    res.json({"err":err});
  }
});

//delete method 
router.delete('/:id', async(req,res) => {
  try {
    console.log('22222',req.params.id)
    const delPersons = await Persons.remove({_id:req.params.id});
    res.status(200).json(delPersons); 
  } catch (error) {
    res.json({"err":err});
  }
});

module.exports = router;