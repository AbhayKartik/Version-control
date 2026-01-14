const createRepository = (req, res) => {
  res.send("Repo was created");
};

const getAllRepository = (req, res) => {
  res.send("got All Repo");
};

const fecthRepositoryById = (req, res) => {
  res.send(" here is your Repo by id");
};

const fecthRepositoryByName = (req, res) => {
  res.send(" here is your Repo by name ");
};

const fecthRepositoryForCurrentUser = (req, res) => {
  res.send(" repo  for logged in user");
};

const updateRepositoryById = (req, res) => {
  res.send("repo is updated");
};

const toggleVisibilityById = (req, res) => {
  res.send("visiblity changed");
};

const deleteRepositoryById = (req, res) => {
  res.send("repo is deleted");
};

module.exports = {
  createRepository,
  getAllRepository,
  fecthRepositoryById,
  fecthRepositoryByName,
  fecthRepositoryForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
};
