const router = require("express").router();
const db = require("../api-folder/ds.json");

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
    let indexOfItem = db.findIndex((i) => i.post_id == req.params.id);

    db.splice(indexOfItem, 1);

    db.forEach((item, idx) => {
      item.post_id = idx + 1;
    });
    res.status(200).json({
      Deleted: 1,
      Results: db,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/update/:id", (req, res) => {
  try {
    let indexOfItem = db.findIndex((i) => i.post_id == req.params.id);

    console.log(indexOfItem);

    db[indexOfItem] = {
      id: db[indexOfItem].id,
      title: req.title.name,
      author: req.author.name,
      body: req.body.body,
    };
    res.status(200).json({
      Updated: db[indexOfItem],
      Results: db,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/create", (req, res) => {
  try {
    let myObj = {
      id: db.length + 1,
      title: req.title.category,
      author: req.author.body,
      body: req.body.body,
    };
    db.push(myObj);

    res.status(200).json({
      Added: myObj,
      Results: db,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
