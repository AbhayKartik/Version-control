const getAllUsers = (req, res) => {
  res.send("All users get ");
};

const signUp = (req, res) => {
  res.send("User Signed In");
};

const login = (req, res) => {
  res.send("User Logged In");
};

const getUserProfile = (req, res) => {
  res.send("User Profile Fetched");
};

const updateUserProfile = (req, res) => {
  res.send("User Profile update");
};

const deleteUserProfile = (req, res) => {
  res.send("User Profile Deleted");
};

module.exports = {
  getAllUsers,
  signUp,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
