require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient, ReturnDocument } = require("mongodb");
var ObjectId = require("mongodb").ObjectId;
const mongoUrl = process.env.MONGO_URL;

let client;

async function connectClient() {
  if (!client) {
    client = new MongoClient(mongoUrl);

    await client.connect();
  }
}
const getAllUsers = async (req, res) => {
  try {
    await connectClient();
    const db = client.db("MyGithub");
    const usersCollection = db.collection("users");

    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error("ERROR in Fetching", error.message);
    res.status(500).send("Server Error");
  }
};

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await connectClient();
    const db = client.db("MyGithub");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User Already Exist !" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      password: hashedPassword,
      email,
      repositories: [],
      followedUsers: [],
      starRepos: [],
    };

    const result = await usersCollection.insertOne(newUser);

    const token = jwt.sign(
      { id: result.insertedId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    );
    res.json({ token, userId: result.insertedId });
  } catch (error) {
    console.error("ERROR in Sign up", error.message);
    res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    await connectClient();
    const db = client.db("MyGithub");
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token, userId: user._id, username: user.username });
  } catch (error) {
    console.error("ERROR in login", error.message);
    res.status(500).send("Server Error");
  }
};

const getUserProfile = async (req, res) => {
  const currentUser = req.params.id;
  try {
    await connectClient();
    const db = client.db("MyGithub");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({
      _id: new ObjectId(currentUser),
    });

    if (!user) {
      return res.json({ message: "User not found " });
    }

    res.json(user);
  } catch (error) {
    console.error("ERROR in user profile", error.message);
    res.status(500).send("Server Error");
  }
};

const updateUserProfile = async (req, res) => {
  const currentUserID = req.params.id;
  const { email, password } = req.body;
  try {
    await connectClient();
    const db = client.db("MyGithub");
    const usersCollection = db.collection("users");

    let updateField = { email };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateField.password = hashedPassword;
    }

    const result = await usersCollection.findOneAndUpdate(
      {
        _id: new ObjectId(currentUserID),
      },
      { $set: updateField },
      { returnDocument: "after" },
    );
    console.log(result);
    if (!result) {
      res.status(404).json({ message: "User Not Found" });
    }

    res.send(result);
  } catch (error) {
    console.error("ERROR in user profile updating", error.message);
    res.status(500).send("Server Error");
  }
};

const deleteUserProfile = async (req, res) => {
  const currentUserID = req.params.id;

  try {
    await connectClient();
    const db = client.db("MyGithub");
    const usersCollection = db.collection("users");

    const result = await usersCollection.deleteOne({
      _id: new ObjectId(currentUserID),
    });

    if (result.deleteCount == 0) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.json({ message: "User Deleted" });
  } catch (error) {
    console.error("ERROR in user profile deleting", error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllUsers,
  signUp,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
