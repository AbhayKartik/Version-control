const mongoose = require("mongoose");
const Repository = require("../model/repoModel");
const Issue = require("../model/issueModel");
const User = require("../model/userModel");

const createRepository = async (req, res) => {
  const { name, description, content, visibility, owner, issues } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: "Repository Name is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "owner ID is required" });
    }

    const newRepository = new Repository({
      name,
      description,
      content,
      visibility,
      owner,
      issues,
    });

    const result = await newRepository.save();
    res
      .status(201)
      .json({ message: "Repository Created", repositoryId: result._id });
  } catch (error) {
    console.error("Error During Creating Repo", error.message);
    res.status(500).send("Server Error");
  }
};

const getAllRepository = async (req, res) => {
  res.send("got All Repo");
};

const fecthRepositoryById = async (req, res) => {
  res.send(" here is your Repo by id");
};

const fecthRepositoryByName = async (req, res) => {
  res.send(" here is your Repo by name ");
};

const fecthRepositoryForCurrentUser = async (req, res) => {
  res.send(" repo  for logged in user");
};

const updateRepositoryById = async (req, res) => {
  res.send("repo is updated");
};

const toggleVisibilityById = async (req, res) => {
  res.send("visiblity changed");
};

const deleteRepositoryById = async (req, res) => {
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
