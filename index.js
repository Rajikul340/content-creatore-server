const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const { MongoClient, ServerApiVersion} = require("mongodb");


app.use(cors());
app.use(express.json());

const uri ="mongodb+srv://SunRise:szKxtrEnIi5cADBy@cluster0.lrjyghr.mongodb.net/?retryWrites=true&w=majority"

// const uri = "mongodb://localhost:27017"; // replace with your MongoDB URI

console.log('uri', uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productCollection = client.db("SunRise").collection("products");

async function run() {

  try {

    app.get("/product", async (req, res) => {
      const query = {};
      const result = await productCollection.find(query).toArray();
      console.log('result', result);
      res.send(result);
    });
  } catch (err) {
    console.error(err);
  }


  try {
    app.post("/product", async(req, res)=>{
      const product  = req.body;
      console.log('product', product);
      const result = await productCollection.insertOne(product)
      res.send(result)
    })   

  } catch (error) {
    console.error(error)
    
  }


  try {

    app.delete('/product/:id', async(req, res)=>{
      const id = req.params.id;
      console.log('id', id);
      const query = {_id:Object(id)}
      const result = await productCollection.deleteOne(query);
      res.send(result)
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
