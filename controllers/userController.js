const { createUser, updateUser, getUser, deleteUser ,getUserEMoneyService,getUsers } = require("../services/userService");

// Create user
const createUserHandler = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Birthday, Nationality, CountryOfResidence } = req.body;

    if (!req.body) {
      return res.status(400).json({
        message: "Missing required fields: FirstName, LastName, Email, Birthday, Nationality, CountryOfResidence.",
      });
    }

    // const userObject = {
    //   Address: req.body.Address,
    //   FirstName: FirstName,
    //   LastName: LastName,
    //   Birthday: Birthday,
    //   Nationality: Nationality,
    //   CountryOfResidence: CountryOfResidence,
    //   Tag: req.body.Tag || 'Default user tag',
    //   Email: Email,
    //   TermsAndConditionsAccepted: true,
    //   UserCategory: 'OWNER',
    //   PersonType: 'NATURAL',
    // };

    const user = await createUser(req.body);

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Edit (update) user
const updateUserHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { FirstName, LastName, Email, Birthday, Nationality, CountryOfResidence } = req.body;

    if (!FirstName && !LastName && !Email && !Birthday && !Nationality && !CountryOfResidence) {
      return res.status(400).json({
        message: "No fields to update.",
      });
    }

    const userObject = {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Birthday: Birthday,
      Nationality: Nationality,
      CountryOfResidence: CountryOfResidence,
    };

    const user = await updateUser(userId, userObject);

    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get user by ID
const getUserHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "Missing required parameter: userId." });
    }

    const user = await getUser(userId);

    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    console.log("user all")
    const users = await getUsers()
    return users
  } catch (error) {
     console.error(error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

// Delete user by ID
const deleteUserHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "Missing required parameter: userId." });
    }

    const deletedUser = await deleteUser(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



const getUserEMoneyController = async (req, res) => {
  try {
    const { userId } = req.params; // Extract UserId from the route
    const { year, month } = req.query; // Optional parameters Year and Month

    const result = await getUserEMoneyService(userId, year, month);

    if (!result) {
      return res.status(404).json({ message: 'No data found for the provided UserId.' });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while retrieving user e-money.', error: error.message });
  }
};


module.exports = {
  createUserHandler,
  updateUserHandler,
  getUserHandler,
  deleteUserHandler,
  getUserEMoneyController,
  getAllUsers
};
