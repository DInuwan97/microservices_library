const keys = require("./keys");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// const mongoURI = 'mongodb+srv://rp:rp123@cluster0.i9xwy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongoURI = `mongodb://${keys.mongoHost}:${keys.mongoPort}/${keys.mongoDatabase}`;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
      user: keys.mongoUsername,
      password: keys.mongoPassword,
    },
  })
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

const Book = require("./Book");
const { mongoPort } = require("./keys");

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});

    if (books) {
      res.json(books);
    } else {
      res.status(404).json({ message: "Books Empty" });
    }
  } catch (err) {
    res.json({ error: err });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById({ _id: req.params.id });

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "No such Book Found" });
    }
  } catch (err) {
    res.json({ error: err });
  }
});

app.post("/books", async (req, res) => {
  let newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    publisher: req.body.publisher,
  };
  try {
    let result = await Book.create(newBook);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ msg: "No such food" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

app.listen(4545, () => {
  console.log("Book Service start on PORT 4545");
});
