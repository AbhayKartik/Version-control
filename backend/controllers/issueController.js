const mongoose = require("mongoose");
const Repository = require("../model/repoModel");
const Issue = require("../model/issueModel");
const User = require("../model/userModel");

const createIssue = async (req, res) => {
  const { tittle, description } = req.body;
  const { id } = req.params;
  try {
    const issue = new Issue({
      tittle,
      description,
      repository: id,
    });
    await issue.save();
    res.json(issue);
  } catch (error) {
    console.error("Error During Creating a issue", error.message);
    res.status(500).send("Server Error");
  }
};

const updateIssueById = async (req, res) => {
  const { id } = req.params;
  const { tittle, description, status } = req.body;
  try {
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ error: "No issue found" });
    }
    issue.tittle = tittle;
    issue.description = description;
    issue.status = status;
    await issue.save();

    res.json(issue);
  } catch (error) {
    console.error("Error During Updating a issue", error.message);
    res.status(500).send("Server Error");
  }
};

const deleteIssueById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedIssue = await Issue.findByIdAndDelete(id);
    if (!deletedIssue) {
      return res.status(404).json({ error: "No issue found" });
    }
    res.json({ message: `${deletedIssue.tittle} is Deleted` });
  } catch (error) {
    console.error("Error During Deleting a issue", error.message);
    res.status(500).send("Server Error");
  }
};

const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find({});
    if (!issues) {
      return res.status(404).json({ error: "No issue found" });
    }
    res.status(200).json(issues);
  } catch (error) {
    console.error("Error During finding all issue", error.message);
    res.status(500).send("Server Error");
  }
};

const getIssueById = async (req, res) => {
  const { id } = req.params;
  try {
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ error: "No issue found" });
    }

    res.json(issue);
  } catch (error) {
    console.error("Error During getting a issue by id", error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssues,
  getIssueById,
};
