// Full Documentation - https://docs.turbo360.co
const turbo = require("turbo360")({ site_id: process.env.TURBO_APP_ID });
const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const router = vertex.router();

const Profile = require("../models/Profile");

router.get("/profile", (req, res) => {
  // const query = req.query;
  let filters = req.query;
  if (req.query.age != null) {
    filters = {
      age: { $gt: req.query.age }
    };
  }

  Profile.find(filters)
    .then(profiles => {
      res.json({
        confirmation: "success",
        data: profiles
      });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message
      });
    });
});

//NON-RESTFUL

router.get("profile/update", (req, res) => {
  const query = req.query; //id & key/value pairs
  const profileId = query.id;
  delete query["id"];
  Profile.findByIdAndUpdate(profileId, query, { new: true })
    .then(profile => {
      res.json({
        confirmation: "success",
        data: profile
      });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        data: err.message
      });
    });
});

router.get("/profile/remove", (req, res) => {
  const query = req.query;
  Profile.findByIdAndRemove(query.id)
    .then(data => {
      res.json({
        confirmation: "success",
        data: "Profile with the ID " + query.id + " has been removed!"
      });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        data: err.message
      });
    });
});

router.get("/profile/:id", (req, res) => {
  const id = req.params.id;
  Profile.findById(id)
    .then(profile => {
      res.json({
        confirmation: "success",
        data: profile
      });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message
      });
    });
});

router.post("/profile", (req, res) => {
  Profile.create(req.body)
    .then(profile => {
      res.json({
        confirmation: "success",
        data: profile
      });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message
      });
    });
});

module.exports = router;
