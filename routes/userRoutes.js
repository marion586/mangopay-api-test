const express = require("express");
const { 
  createUserHandler, 
  updateUserHandler, 
  getUserHandler, 
  deleteUserHandler,
  getUserEMoneyController
} = require("../controllers/userController");

const router = express.Router();

// POST /api/users (Create a user)
router.post("/", createUserHandler);

// PUT /api/users/:userId (Edit/update a user)
router.put("/:userId", updateUserHandler);

// GET /api/users/:userId (Get user by ID)
router.get("/:userId", getUserHandler);

// DELETE /api/users/:userId (Delete a user by ID)
router.delete("/:userId", deleteUserHandler);
router.get('/:userId/emoney', getUserEMoneyController);

module.exports = router;
