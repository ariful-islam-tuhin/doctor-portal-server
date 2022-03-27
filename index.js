
const express = require('express');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(express.json());


// middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d4i3w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
  try {
    await client.connect();
    // console.log("connected to database")
    const database = client.db('doctors-portal-website');
    const appointmentsCollection = database.collection('appointment')
    // const usersCollection = database.collection('users');
    
    app.post('/appointment',async(req,res) =>{
      const appointment = req.body;
      const result = await appointmentsCollection.insertOne(appointment);
  

      // console.log(appointment);
      res.json(result)
    }); 

    app.get('/appointment',async(req,res) =>{
      const email = req.query.email;
      const date = new Date(req.query.date).toLocaleDateString();
      const query = {email:email, date:date}
      console.log(query);
      // console.log(date);
   
      const cursor = appointmentsCollection.find(query);
      const appointment = await cursor.toArray();
      res.json(appointment);
    })

    // ==-register dia users database a store kora---

    // app.post('/users',async(req,res) =>{
    //   const user = req.body;
    //   const result = await usersCollection.insertOne(user);
    //   console.log(result);
    //   res.json(result);
    // })

    // with login email save user information


// app.put('/users',async(req,res) =>{
//   const user = req.body;
//   const filter = {email:user.email};
//   const options = {upsert:true};
//   const updateDoc = {$set:user};
//   const result = usersCollection.updateOne(filter, updateDoc,options);
//   res.json(result)
  
// });

  }
  finally {

  }
}

run().catch(console.dir);



app.get("/", (req, res) => {
  res.send("doctors portal server side running ");
});

app.listen(port, () => {
  console.log(`hello doctors http://localhost:${port}`);
});