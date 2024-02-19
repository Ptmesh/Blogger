import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 4000;

let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2024-08-01T10:00:00Z",
  }
];

let lastId = 1;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/posts",(req,res)=>{
  res.json(posts);
});

app.get("/posts/:id",(req,res)=>{
  const id = parseInt(req.params.id);
  const post=posts.find((item)=>item.id === id);
  if (!post) {
    return res
    .status(404)
    .json({message:`Post not found!`});
  }
  res.json(post);
});

app.post("/posts",(req,res)=>{
  const newId= lastId += 1;
  const post={
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date:new Date(),
  };
  lastId= newId;
  posts.push(post);
  res.status(200).json(post);
});

app.patch("/posts/:id",(req,res)=>{
  const id=parseInt(req.params.id);
  const post=posts.find((item)=>item.id === id);
  if (!post) {
    return res.status(404).json({message : ` Post not found!`});
  }
  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;
  res.json(post);
});

app.delete("/posts/:id",(req,res)=>{
  const id=parseInt(req.params.id);
  const index= posts.findIndex((item)=>item.id === id);
  if (index === -1) {
    return res.status(404).json({message:`Post not found!`});
  }
  posts.splice(index,1);
  res.json({message:"Post deleted!"});
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
