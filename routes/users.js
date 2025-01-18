var express = require("express");
var router = express.Router();
var mangopay = require("../mangopay/index.js");

/* GET users listing. */
const getMangopayInstance = require("../utils/mangopayInstance");

/* Helper to fetch user details */
const fetchUserDetails = async (mangopayInstance, userId) => {
  return new Promise((resolve, reject) => {
    mangopayInstance.Users.get(userId, (data, response, err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};
const fetchEvents = async (mangopayInstance, parameters) => {
  return new Promise((resolve, reject) => {
    mangopayInstance.Events.getAll({ parameters }, (data, response, err) => {
      if (err) {
        console.error("Error fetching events:", err);
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

router.get("/", async function (req, res, next) {
  try {
    const mangopayInstance = getMangopayInstance();
    const userId = "user_m_01JHQ59WW8E0C419TWRMA8XM95";

    const dataUser = await fetchUserDetails(mangopayInstance, userId);

    if (dataUser) {
      res.status(200).json({ data: dataUser.data });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "An error occurred." });
  }
});
router.get("/events", async (req, res) => {
  try {
    const mangopayInstance = getMangopayInstance();
    const parameters = {
      per_page: req.query.per_page || 10, // Default 10 events per page
      page: req.query.page || 1, // Default to first page
      BeforeDate: req.query.BeforeDate || null, // Optional filters
      AfterDate: req.query.AfterDate || null,
      Nature: req.query.Nature || null,
      Status: req.query.Status || null,
      Type: req.query.Type || null,
    };
    console.log(parameters);
    const events = await fetchEvents(mangopayInstance, parameters);
    res.status(200).json({ data: events.data });
  } catch (error) {
    console.error("Unexpected error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching events." });
  }
});

module.exports = router;
