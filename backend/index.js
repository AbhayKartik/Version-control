const yargs = require("yargs");
const express = require("express");
const app = express();
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");
const { pushRepo } = require("./controllers/push");

yargs(hideBin(process.argv))
  .command("start", "Start a new server", {}, startServer)
  .command("init", "Initialise a new repository", {}, initRepo)
  .command(
    "add <file>",
    " Add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )
  .command(
    "commit <message>",
    "Commit to the staged file",
    (yargs) => {
      yargs.positional("message", {
        describe: "commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    }
  )
  .command("pull", "Pull commits to cloud", {}, pullRepo)
  .command(
    "revert <commitId>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitId", {
        describe: "Commit ID to Revrt to ",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitId);
    }
  )
  .command("push", "Push commits to cloud", {}, pushRepo)
  .demandCommand(1, "You need atleast one command")
  .help().argv;

function startServer() {
  app.listen(3000, () => {
    console.log(`app is listing `);
  });
}
