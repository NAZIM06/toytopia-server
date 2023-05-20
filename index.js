const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT ||5000;
const { MongoClient, ServerApiVersion, Collection } = require('mongodb');
require('dotenv').config()
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

// uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zmpua4z.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // db and Collection
    
    const db = client.db('toyDB').collection('toy')




    app.post('/addtoy' , async(req,res) => {
      const data = {
          name : req.body.name ,
          image: req.body.image,
          price: parseInt(req.body.price),
          rating : parseInt(req.body.rating),
          quantity : parseInt(req.body.quantity),
          description : req.body.description,
          category : req.body.category,
          sellerName : req.body.sellerName,
          sellerEmail : req.body.sellerEmail,
      }
      const result =await db.insertOne(data)
      res.send(result)
  })




















    app.get('/' , async(req,res) => {
      const result = await db.find().toArray()
      res.send(result)
      
  })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Ready To Generate Toys data')
})
// Start the server
app.listen(port, () => {
  console.log(`Server listening by me at port ${port}`);
});