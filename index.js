#!/usr/bin/env node
let shell = require("shelljs");
let colors = require("colors");
let fs = require("fs-extra");

let appName = process.argv[2];
let appDirectory = `${process.cwd()}/${appName}`;

const run = async () => {
  await createReactApp();
  await cdIntoNewApp();
  await installPackages();
  await updateTemplates();
};

const createReactApp = async () => {
  await new Promise((resolve, reject) => {
    if (appName) {
      shell.exec(`yarn create react-app ${appName}`);
    } else {
      console.log("\nNo app name was provided.".red);
      console.log("\nProvide an app name in the following format: ");
      console.log("\ncreate-react-redux-router-app ", "app-name\n".cyan);
      reject();
    }
    resolve()
  });
};

const cdIntoNewApp = async () => {
  await new Promise(resolve => {
    shell.cd(appDirectory);
    resolve();
  });
};

const installPackages = async () => {
  await new Promise(resolve => {
    console.log("\nInstalling Dependencies\n".cyan);
    shell.exec(
      `npm install -D typescript node-sass axios react-router react-router-dom lodash framer-motion reset-css moment @types/node @types/lodash @types/react-router @types/react-router-dom`,
      () => {
        console.log("\nFinished installing packages\n".green);
        resolve();
      }
    );
  });
};

const updateTemplates = async () => {
  await new Promise(resolve => {
    let promises = [];

    //remove files
    [`App.js`, `App.css`, `logo.svg`].forEach((fileName, i) => {
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
      new Promise(res =>
        fs.copy(`${__dirname}/templates`, `${appDirectory}/src/`, {}, err => {
          if (err) console.error(err);
          res();
        })
      )
    );

    await Promise.all(promises);
    resolve();
  });
};

run();
