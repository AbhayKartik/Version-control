const mongoose = require("mongoose");
const Repository = require("../model/repoModel");
const Issue = require("../model/issueModel");
const User = require("../model/userModel");

const createRepository = async (req, res) => {
  const { description, content, visibility, owner, issues } = req.body;
  let { name } = req.body;
  try {
    name = name.replace(/ /g, "");
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
  try {
    const repositories = await Repository.find({})
      .populate("owner")
      .populate("issue");

    res.json(repositories);
  } catch (error) {
    console.error("Error During fecthing Repo", error.message);
    res.status(500).send("Server Error");
  }
};

const fecthRepositoryById = async (req, res) => {
  try {
    const repoId = req.params.id;
    const repository = await Repository.findById(repoId)
      .populate("owner")
      .populate("issue");
    res.json(repository);
  } catch (error) {
    console.error("Error During fecthing Repo by id", error.message);
    res.status(500).send("Server Error");
  }
};

const fecthRepositoryByName = async (req, res) => {
  try {
    const repoName = req.params.name;
    const repository = await Repository.find({ name: repoName })
      .populate("owner")
      .populate("issue");
    res.json(repository);
  } catch (error) {
    console.error("Error During fecthing Repo by name", error.message);
    res.status(500).send("Server Error");
  }
};

const fecthRepositoryForCurrentUser = async (req, res) => {
  const userId = req.user;
  try {
    const repositories = await Repository.find({ owner: userId });

    if (!repositories || repositories.length == 0) {
      return res.status(404).json({ error: "No Repos was Found!" });
    }

    res.json({ message: `${repositories.length} Repo Found`, repositories });
  } catch (error) {
    console.error("Error During user Repo", error.message);
    res.status(500).send("Server Error");
  }
};

const updateRepositoryById = async (req, res) => {
  const { id } = req.params;
  const { content, description } = req.body;
  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ error: "No Repos was Found!" });
    }
    repository.content.push(content);
    repository.description = description;

    const result = await repository.save();

    res.json({
      message: "Repository Updated Successfully",
      repository: result,
    });
  } catch (error) {
    console.error("Error During updating Repo", error.message);
    res.status(500).send("Server Error");
  }
};

const toggleVisibilityById = async (req, res) => {
  const { id } = req.params;
  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ error: "No Repos was Found!" });
    }
    repository.visibility = !repository.visibility;

    const result = await repository.save();

    res.json({
      message: "Repository visiblity toggled Successfullt",
      repository: result,
    });
  } catch (error) {
    console.error("Error During toggling visiblity", error.message);
    res.status(500).send("Server Error");
  }
};

const deleteRepositoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedrepo = await Repository.findByIdAndDelete(id);
    if (deletedrepo.length == 0) {
      return res.status(404).json({ error: "No Repos was Found!" });
    }
    res.json({ message: `${deletedrepo.name} deleted successfully` });
  } catch (error) {
    console.error("Error During deleting Repo", error.message);
    res.status(500).send("Server Error");
  }
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
