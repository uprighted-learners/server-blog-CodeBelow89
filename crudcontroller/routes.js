const router = require("express").Router();
const db = require("../api-folder/ds.json");
const fs = require("fs");
const filePath = "./api-folder/ds.json";
function readFile() {
  try {
    const data = fs.readFileSync(filePath);
    console.log(data.toString());
    return JSON.parse(data);
  } catch (err) {
    console.log(`Error trying to read a file: ${error.message}`);
  }
}
function save(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data));
    console.log(data.toString());
  } catch (Error) {
    console.log(`Error trying to read a file: ${error.message}`);
  }
}
// Gets all item to appear at once!!
router.get("/all", (req, res) => {
  try {
    res.status(200).json({
      Results: db,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/one/:id", (req, res) => {
  try {
    console.log("current ID that was passed", req.params.id);
    let filtered = db.filter((i) => i.post_id == req.params.id);
    res.status(200).json({
      Results: filtered.length > 0 ? filtered : "Nothing was found",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete/:id", (req, res) => {
  try {
    let deletePost = readFile();
    let indexOfItem = deletePost.findIndex((i) => i.post_id == req.params.id);
    deletePost.splice(indexOfItem, 1);

    deletePost.forEach((item, idx) => {
      item.post_id = idx + 1;
    });
    save(deletePost);
    res.status(200).json({
      Deleted: 1,
      Results: deletePost,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//Updating our IDs
router.put("/update/:id", (req, res) => {
  try {
    let updatePost = readFile();
    let indexOfItem = updatePost.findIndex((i) => i.post_id == req.params.id);
    console.log(indexOfItem);
    // Which Item are we updating
    updatePost[indexOfItem] = {
      post_id: updatePost[indexOfItem].post_id,
      title: req.body.title,
      author: req.body.author,
      body: req.body.body,
    };
    save(updatePost);
    // Saves our update post
    res.status(200).json({
      Updated: updatePost[indexOfItem],
      Results: updatePost,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/create", (req, res) => {
  try {
    // Get the data from the database
    let blogPost = readFile();
    let myObj = {
      post_id: blogPost.length + 1,
      title: req.body.title,
      author: req.body.author,
      body: req.body.body,
    };
    blogPost.push(myObj);

    save(blogPost);
    // update our database with new edition

    res.status(200).json({
      Added: myObj,
      Results: blogPost,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
