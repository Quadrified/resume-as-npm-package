#!/usr/bin/env node
'use strict';

var inquirer = require('inquirer');
var chalk = require('chalk');

var response = chalk.bold.cyan;

var resume = require('./resume.json');

var resumePrompts = {
  type: 'list',
  name: 'resumeOptions',
  message: 'What do you want to know about me?',
  choices: [...Object.keys(resume), 'Exit'],
};

function main() {
  console.log(' ');
  console.log(' ');
  resumeHandler();
}

function resumeHandler() {
  console.log(
    "Hello, World! 👋🏻 I'm Omer Quadri, and welcome to my resume (npm style)!"
  );
  inquirer.prompt(resumePrompts).then((answer) => {
    if (answer.resumeOptions == 'Exit') {
      console.clear();
      return;
    }
    var option = answer.resumeOptions;
    console.log(response('--------------------------------------'));
    resume[`${option}`].forEach((info) => {
      console.log('\n' + response('|   => ' + info));
    });
    console.log('\n' + response('--------------------------------------'));
    // console.log(resume[`${option}`]);
    inquirer
      .prompt({
        type: 'list',
        name: 'exitBack',
        message: 'Go back or Exit?',
        choices: ['Back', 'Exit'],
      })
      .then((choice) => {
        if (choice.exitBack == 'Back') {
          console.clear();
          resumeHandler();
        } else {
          return;
        }
      });
  });
}

main();
