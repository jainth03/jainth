const express = require('express');
const router = express.Router();
const Persons = require('../schema/RegistrationSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//post method
router.post('/Registration', async(req,res) => {
  try {
    const emailExist = await Persons.findOne({email:req.body.email});
    if(emailExist){
      return res.status(400).json("Email already exist"); 
    }
    // password hash
    const hash = await bcrypt.hash(req.body.password,10);
    const postPerson = await new Persons({
      name : req.body.name,
      email : req.body.email,
      password : hash,
    });
    const savePersons = await postPerson.save();
    if (savePersons) {
      res.status(200).json("Registation successfully created");
    }
     
  } catch (error) {
    res.json({"err":err});
  }
});

router.post('/login', async (req,res) => {
  try {
    const userDate = await Persons.findOne({email:req.body.email});
    if(!userDate){
      return res.status(400).json("Email not exist"); 
    }
    var validpsw = await bcrypt.compare(req.body.password,userDate.password);
   if(!validpsw){
    return res.status(400).json('password not valid');
   }
   
  //  var userToken = jwt.sign({email:userDate.email},'periyRegasisiyam');
  //  res.header('auth',userToken).json(userToken);

  const token = generateToken({email:userDate.email});
  const refreshToken = generateRefreshToken({email:userDate.email});
  res.json({ token, refreshToken });

  } catch (err) {
    res.status(400).json(err);
  }
});  

// Generate a new token
function generateToken(user) {
  const token = jwt.sign(user, 'periyRegasisiyam', { expiresIn: '15m' });
  return token;
}

// Generate a new refresh token
function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, 'your_refresh_secret_key', { expiresIn: '30d' });
  return refreshToken;
}

// Verify the token
const validuser = (req,res,next) =>{
  const token = req.header('auth');
   if (!token) {
   return res.status(401).json({ message: 'No token provided.' });
   }
   jwt.verify(token, 'periyRegasisiyam', (err, decoded) => {
    if (err) {
     return res.status(403).json({ message: 'Failed to authenticate token.' });
    }
    req.token = token;
    next();
   });
  
}

//all data get method 
router.get('/getall',validuser, async(req,res) => {
  jwt.verify(req.token,'periyRegasisiyam',async (err,data) =>{
  if (err) {
    res.sendStatus(403)
  }else{
    const data = await Persons.find().select(['-password']);
    res.json(data);
  }
  });
});

//dashboard

// router.get('/dashboard', async (req, res) => {
//   jwt.verify(req.token,'periyRegasisiyam',async (err,data) =>{
// try {
//   // console.log('****************')
//   const Collection1 = mongoose.model('Reporter',ReporterSchema);
//   // const Collection2 = mongoose.model('Approval',ApprovalSchema);
//   console.log('Collection1****************',Collection1)
//   // Fetch the documents from Collection1
//   const collection1Docs = await Collection1.find();
//   // Fetch the documents from Collection2
//   const collection2Docs = await Collection2.find();
//    // Perform the comparison logic
//    const comparisonResult = [];
//     // Compare each document in Collection1 with Collection2
//     for (const doc1 of collection1Docs) {
//       const matchingDoc = collection2Docs.find(
//         (doc2) => doc1.fieldToCompare === doc2.fieldToCompare
//       );
//       console.log('matchingDoc*******',matchingDoc)
//       if (matchingDoc) {
//         comparisonResult.push({
//           document1: doc1,
//           document2: matchingDoc
//         });
//       }
//     }
//     res.json(comparisonResult);
// } catch (error) {
//   res.status(500).json({ error: 'Internal server error' });
// }
//   });
// });

module.exports = router;