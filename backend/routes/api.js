const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Kudos = require("../model/kudo");

router.post("/check-name", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a user
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//all user

router.get("/get-all-users", async (req, res) => {
  try {
    const users = await User.find({}, { name: 1 });

    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Send Kudos
router.post("/kudos", async (req, res) => {
  try {
    const kudos = new Kudos(req.body);
    await kudos.save();
    res.status(201).json(kudos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Kudos Analytics

router.get("/analytics", async (req, res) => {
  try {
    const analytics = await Kudos.aggregate([
      {
        $group: {
          _id: { receiver: "$receiver", badge: "$badge" },
          totalKudos: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          receiver: "$_id.receiver",
          badge: "$_id.badge",
          totalKudos: 1,
        },
      },
    ]);
    console.log("Analytics Data:", analytics); // Log analytics output

    const analyticsLeaderboard = await Kudos.aggregate([
      {
        $group: {
          _id: { receiver: "$receiver" },
          totalKudos: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          receiver: "$_id.receiver",
          totalKudos: 1,
        },
      },
    ]);
    console.log("Leaderboard Data:", analyticsLeaderboard); // Log leaderboard output

    res.json({ analytics, analyticsLeaderboard });
  } catch (err) {
    console.error("Error in /analytics route:", err); // Log the error
    res.status(500).json({ error: err.message });
  }
});

//get-all-message
router.get("/get-all-messages", async (req, res) => {
  try {
    const messages = await Kudos.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
