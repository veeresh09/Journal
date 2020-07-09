const express = require("express"); // required to create api
const Topics = require("./models/topics");
const router = express.Router();
router.post("/", (req, res) => {
  console.log(req.body);
  const t = new Topics({
    topicname: req.body.topicName,
  });
  t.save()
    .then((result) => {
      res.status(200).json({
        message: "Updated!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Unsuccesfull",
      });
    });
});

router.get("/", (req, res) => {
  let fetchedtopics;
  const topicQuery = Topics.find();
  topicQuery
    .then((docs) => {
      fetchedtopics = docs;
      res.status(200).json({
        message: "Success!",
        topics: fetchedtopics,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Unsuccesfull",
        topics: [],
      });
    });
});
module.exports = router;
