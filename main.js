#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
console.log(chalk.greenBright("  \n****** COUNTDOWN TIMER ******\n"));
const answer = await inquirer.prompt({
    name: "userName",
    type: "number",
    message: chalk.yellow("Please enter the amount (in seconds):"),
    validate: (input) => {
        if (isNaN(input)) {
            return "Please enter valid number";
        }
        else if (input > 60) {
            return "Seconds must within 60";
        }
        else {
            return true;
        }
    }
});
let input = answer.userName;
function startTime(value) {
    const initialTime = new Date().setSeconds(new Date().getSeconds() + value + 2);
    let intervalTime = new Date(initialTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDifference = differenceInSeconds(intervalTime, currentTime);
        if (timeDifference <= 0) {
            console.log(chalk.blueBright("time has expired"));
            process.exit();
        }
        const min = Math.floor((timeDifference % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDifference % 60);
        console.log(chalk.red(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
    }, 1000);
}
startTime(input);
