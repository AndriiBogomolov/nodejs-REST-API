const HttpError = require("./HttpError");
const ctrlWrapper = require("./ctrlWrapper");
const handleMongooseError = require("./handleMongooseError");

module.exports = {
  HttpError,
  ctrlWrapper,
  handleMongooseError,
};

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://Andrii:evUWo36TJ3JuWoPJ@cluster0.xwik2t1.mongodb.net/db-contacts?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    // console.log(
    //   //"Pinged your deployment. You successfully connected to MongoDB!"
    //   "Database connection successful"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
