//thirdparty module
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');
//Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
const Personrouter = require('./PersonsRoute');
const Registrationrouter = require('./route/registration');
const Reporterrouter = require('./route/reporterRouter');
const Reporteerouter = require('./route/reporteeRouter');
const Reportee_reschedulerouter = require('./route/reportee_rescheduleRouter');
const Approvalouter = require('./route/approvalRouter');
app.use('/persons',Personrouter);
app.use('/api',Registrationrouter);
app.use('/reporter',Reporterrouter);
app.use('/reportee',Reporteerouter);
app.use('/reportee_reschedule',Reportee_reschedulerouter);
app.use('/approval',Approvalouter);
//body-parser
// customer body-parser


//cors
// npm i cors

//getall params 
// app.get('/',(req,res) => {
//    res.json(mypersons);
// });

// getbyid
// app.get('/:id',async (req,res) => {
//     const getone = await mypersons.filter(e => e.id === req.params.id);
//     res.status(200).json(getone);
//  });

//localhost
if (process.env.NODE_ENV === 'development') {
    console.log('11111111111')
    const PORT = process.env.PORT || 2000
    app.listen(PORT,() => {
    console.log(`server started on ${PORT}`);
});
  }
   if (process.env.NODE_ENV === 'production') {
    console.log('2222222222')
    const PORT = process.env.PORT || 8080
    app.listen(PORT,() => {
    console.log(`server started on ${PORT}`);
});
   }

//DS server creation
// mongoose.set('useNewUrlParser',true);
// mongoose.set('useUnifiedTopology',true);
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI,(err) =>{
    if (err) {console.log('DB not connected')}
    console.log('DB connected successfully');
});
