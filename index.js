#!/usr/bin/env node
let shell = require("shelljs");
let colors = require("colors");
let fs = require("fs-extra");

let appName = process.argv[2];
let appDirectory = `${process.cwd()}/${appName}`;

const run = async () => {
  let success = await createReactApp();
  if (!success) {
    console.log(
      "Something went wrong while trying to create a new React app using create-react-app"
        .red
    );
    return false;
  }
  await cdIntoNewApp();
  await installPackages();
  await updateTemplates();
  console.log("All done");
};

const createReactApp = () => {
  return new Promise(resolve => {
    if (appName) {
      shell.exec(`create-react-app ${appName}`, code => {
        console.log("Exited with code ", code);
        console.log("Created react app");
        resolve(true);
      });
    } else {
      console.log("\nNo app name was provided.".red);
      console.log("\nProvide an app name in the following format: ");
      console.log("\ncreate-react-redux-router-app ", "app-name\n".cyan);
      resolve(false);
    }
  });
};

const cdIntoNewApp = () => {
  return new Promise(resolve => {
    shell.cd(appDirectory);
    resolve();
  });
};

const installPackages = () => {
  return new Promise(resolve => {
    console.log("\nInstalling Dependencies\n".cyan);
    shell.exec(
      `npm install -D typescript node-sass axios react-router react-router-dom lodash framer-motion reset-css moment @types/node @types/axios @types/lodash @types/react-router @types/react-router-dom @types/moment`,
      () => {
        console.log("\nFinished installing packages\n".green);
        resolve();
      }
    );
  });
};

const updateTemplates = () => {
  return new Promise(resolve => {
    let promises = [];

    //remove files
    Object.keys([`App.js`, `App.css`, `logo.svg`]).forEach((fileName, i) => {
      promises.push(
        new Promise(res => {
          fs.unlink(`${appDirectory}/src/${fileName}`, err => {
            if (err) return console.log(err);
            res();
          });
        })
      );
    });

    //add files
    promises.push(
      fs.copy(
        `${process.cwd()}/templates`,
        `${appDirectory}/src/`,
        {},
        function(err) {
          if (err) return console.log(err);
          res();
        }
      )
    );

    Promise.all(promises).then(resolve);
  });
};

run();
