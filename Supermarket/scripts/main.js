/**
 * @file main.js - program that manages a list of supermarket goods filtered by expiry date
 * @author : Paolo Gippa
 * This Javascript program outputs a list of supermarket goods filtered by expiry date
 */

/**
 * Array that contains month names in
 * the correct order
 */
let months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

/**
 * Object that contains the general configuration variables for
 * the program itself
 */
let config = {
  secondsOutput: 3000, //R
  productWeek: 6, //M
  shelfExpiry: 3, //N
  plusDay: 5, // K
  runningWeeks: 6, //X
  char: "*",
};

let { secondsOutput, productWeek, shelfExpiry, plusDay, runningWeeks, char } =
  config;

let market = []; //Variable that contains the Object products[] from marketStart()
let currentWeek = weekIncrement(plusDay); //Variable that sets the current week and increments it for the days to add
let minDate = new Date(currentWeek); //Variable that represents the minimum date from the program to start generating expiration dates for products
let id = 1; //Variable that allows not to start generating randoms id from 0

/**
 * Function that increment id
 * @returns incremented id
 */
function generateUniqueId() {
  return id++;
}

/**
 * Function that choose a random name from the "list" array
 * @returns random name from given set
 */
function generateRandomName() {
  let list = [
    "Saikebon",
    "Pan Di Stelle",
    "Daygum Microtech",
    "Lemon Soda",
    "Nutella",
    "Spaghetti",
    "Gocciole",
    "Budino Muu Muu",
    "Tonno Rio Mare",
    "Latte",
    "Coca Cola",
    "Simmenthal",
  ];
  let randName = list[randomN(0, list.length)];

  return randName;
}

/**
 * Function that generate the structure of the products
 * @param {Date} week the current week
 * @returns products
 */
function structProducts(week) {
  let products = {
    id: generateUniqueId(),
    name: generateRandomName(),
    expDate: generateRandomDate(minDate),
    state: "",
    check: 0,
  };

  if (week >= products.expDate) {
    products.state = "expired";
  } else {
    products.state = "new";
  }
  return products;
}

/**
 * Function that increment the current week with the config.plusDay
 * @param {Date} dateIncr
 * @returns date
 */
function weekIncrement(dateIncr) {
  let date = new Date();
  date.setDate(date.getDate() + dateIncr);

  return date;
}

/**
 * Function that push all the random generated products into the array object market[]
 * @param {number} prodWeek
 * @param {Date} startDateProgram
 */
function marketStart(prodWeek, startDateProgram) {
  for (let i = 0; i < prodWeek; i++) {
    market.push(structProducts(startDateProgram));
  }
}

/**
 * Function that assign the status to the product, determined by the expiry date
 * @param {Date} week
 */
function statusAssign(week) {
  market.forEach((products) => {
    products.check = products.check + 1;

    if (week > products.expDate) {
      products.state = "expired";
    } else if (
      products.check !== 0 &&
      products.check < shelfExpiry &&
      products.state !== "expired"
    ) {
      products.state = "valid";
    } else if (products.check >= shelfExpiry && products.state !== "expired") {
      products.state = "old";
    }
  });
}

/**
 * Function that generate a random number between max and min
 * @param {number} min
 * @param {number} max
 * @returns the result of the operation
 */
function randomN(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Function that generate a random date
 * @param {Date} startingDay
 * @returns end
 */
function generateRandomDate(startingDay) {
  let end = new Date(startingDay);

  let daysPlus = randomN(0, 7 * (runningWeeks * 2));

  end.setDate(end.getDate() + daysPlus);

  return end;
}

/**
 * Function that picks up the month in number format from the date and prints it in the corresponding format from the months[] array
 * @param {Date} date
 * @returns
 */
function formatDate(date) {
  let finalDate;

  for (let i = 0; i < months.length; i++) {
    if (date.getMonth() === i) {
      finalDate = date.getDate() + " " + months[i] + " " + date.getFullYear();
    }
  }

  //if that checks if a number of day has only one digit
  if (finalDate[1] === " ") {
    finalDate = "0" + finalDate;
  }
  return finalDate;
}

/**
 * Function that print the date
 * @param {Date} strDate
 */
function printDate(currentWeek) {
  let newDate = formatDate(currentWeek);
  console.log("\nWeek of " + newDate);
  console.log("---------------------------------------------------------");
}

/**
 * Function that makes the padding (example 01 or 001) for the ids
 * @param {number} id
 * @returns
 */
function padId(id) {
  let str;
  str = id.toString().padStart(3, "0");

  return str;
}

/**
 * Function that makes the padding for the names and the states (example: ****Nutella****)
 * @param {string} str
 * @param {number} dim
 * @param {string} char
 * @returns
 */
function padNameState(str, dim, char) {
  let string = str
    .padStart((str.length + dim) / 2, char)
    .padEnd(dim, char)
    .toString()
    .replace(/\s/g, char);

  return string;
}

/**
 * Function that print the Final Output in printFinalOutput()
 */
function finalOutput() {
  market.forEach((products) => {
    let { id, name, expDate, state, check } = products;

    let output;

    let strId = padId(id);
    let strName = padNameState(name, 20, char);
    let strDate = formatDate(expDate);
    let strState = padNameState(state, 15, char);
    let strChecks = check;
    if (strChecks === 0 || strChecks > 1) {
      output =
        strId +
        ": " +
        strName +
        " " +
        strDate +
        " " +
        strState +
        " [" +
        strChecks +
        " checks]";
      outputColors(output);
    } else if (strChecks === 1) {
      output =
        strId +
        ": " +
        strName +
        " " +
        strDate +
        " " +
        strState +
        " [" +
        strChecks +
        " check]";
      outputColors(output);
    }
  });
}

/**
 * Function that assign colors for the outputs based on the states
 * @param {string} msg
 */

function outputColors(msg) {
  if (msg.includes("new")) {
    console.log(
      "%c" + msg,
      "background-color: green; font-weight: bold;color: white"
    );
  } else if (msg.includes("valid")) {
    console.log("%c" + msg, "background-color: aqua; font-weight: bold");
  } else if (msg.includes("old")) {
    console.log(
      "%c" + msg,
      "background-color: brown;  font-weight: bold;color: white"
    );
  } else if (msg.includes("expired")) {
    console.log(
      "%c" + msg,
      "background-color: red;  font-weight: bold; color: white"
    );
  }
}

/**
 * Function that makes the filter for the final output based on the products.state
 */
function finalOutputFilter() {
  for (let i = 0; i < market.length; i++) {
    if (market[i].state === "expired" || market[i].state === "old") {
      market.splice(i, 1);
      i = -1;
    }
  }
}

/**
 * Function that print the final output after the index button "Run Code" is pressed
 */
function printFinalOutput() {
  marketStart(productWeek, minDate);
  setTimeout(() => {
    printDate(currentWeek);
    finalOutput();

    console.log("Filtered");
    console.log("--------");
    finalOutputFilter();
    finalOutput();
  }, secondsOutput);

  let c = 1;
  let time = setInterval(() => {
    currentWeek.setDate(currentWeek.getDate() + 7);

    statusAssign(currentWeek);
    marketStart(productWeek, currentWeek);
    printDate(currentWeek);
    finalOutput();

    console.log("Filtered");
    console.log("--------");
    finalOutputFilter();
    finalOutput();

    c = c + 1;
    if (c === runningWeeks) {
      clearInterval(time);
    }
  }, 3000 + secondsOutput);
}
