const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const { MongoClient, ServerApiVersion, ObjectId} = require("mongodb");


app.use(cors());
app.use(express.json());

const uri ="mongodb+srv://SunRise:szKxtrEnIi5cADBy@cluster0.lrjyghr.mongodb.net/?retryWrites=true&w=majority"

// const uri = "mongodb://localhost:27017"; // replace with your MongoDB URI

console.log('uri', uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const usersCollection = client.db("ContentCreator").collection("users");
const contentCollection = client.db("ContentCreator").collection("content");

async function run() {

   try {
    app.post("/users", async (req, res) => {
        const users = req.body;
        const result = await usersCollection.insertOne(users);
        res.send(result);
      });
    
   } catch (error) {
     console.error(error)
   }
   try {
    app.post("/contents", async (req, res) => {
        const content = req.body;
        const result = await contentCollection.insertOne(content);
        res.send(result);
      });
    
   } catch (error) {
     console.error(error)
   }

   try {
    app.get("/contents", async(req, res)=>{
      const query ={};
      const contentdata = await contentCollection.find(query);
      const  result = await contentdata.toArray();
      // console.log('result', result);
      res.send(result)
    })
   } catch (error) {
    console.error(error)
    
   }
   try {
    app.get("/contents/:id", async(req, res)=>{
      const id = req.params.id
      const query ={_id:new ObjectId(id)};
      const contentdata = await contentCollection.findOne(query);
      res.send(contentdata)
    })
   } catch (error) {
    console.error(error)
    
   }
   try {
    app.delete("/contents/:id", async(req, res)=>{
      const id = req.params.id;
      console.log('id', id);
      const query ={_id:new ObjectId(id)};
      const deleteData = await contentCollection.deleteOne(query);
      res.send(deleteData)
    })
   } catch (error) {
    console.error(error)
    
   }
}

run();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
