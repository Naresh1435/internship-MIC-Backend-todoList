const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({
    extended : true
}))

mongoose.connect("mongodb+srv://chat_reader:Naresh_Chat_Reader@cluster1.mfgsg.mongodb.net/internshipDB?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const itemsSchema = new mongoose.Schema({
    name: String
  });
  
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name : "Welcome to my todolist"
  });
  
  const item2 = new Item({
    name : "Click that + to add items"
  });
  
  const defaultItems = [item1,item2];

app.get('/', (req,res)=>{
    Item.find({}).then((data)=>{
        res.json({data:data});
    }) 
});

app.post('/add', (req,res)=>{
    const newItem = new Item({
        name : String(req.body.name)
    })
    newItem.save().then(()=>res.json({res:true})
    ).catch(err=>{
        console.log(err);
        res.json(err);
    })

})

app.listen(3000, (err)=>{
    if(err)
        console.log(err);
    else 
        console.log("Successfully Initiated server");
})