/**
 * @author Logee, Quinn
 * @version 0.01
 *@summary rates, averages ratings, and sorts movies
 * @todo nothing
 */

"use strict";
const PROMPT = require(`readline-sync`);
const IO = require('fs');

let continueResponse;
let numCustomers, menuChoice , counter = 1, price = 0;
let customers = [], customerBonus = [];
// let newCustomers = customers.length;
const CUT_PRICE = 45, STYLE_PRICE = 35, DYE_PRICE = 50, ALL_PRICE = 100;

/**
 * @method
 * @desc The dispatch method for our program
 * @returns {null}
 */
function main() {
    loadCustomers();
    if (continueResponse !== 0 && continueResponse !== 1) {
        setContinueResponse();
    }
    while (continueResponse === 1) {
        modifyCustomers();
        /*switch (customers[newCustomers][2]) {
            case 1: price += CUT_PRICE;
                console.log(`${price}`);
                break;
            case 2: price += STYLE_PRICE;
                console.log(`${price}`);
                break;
            case 3: price += DYE_PRICE;
                console.log(`${price}`);
                break;
            case 4: price += ALL_PRICE;
                console.log(`${price}`);
                break;
            default: console.log(`! ERROR !`);
        }*/
        setContinueResponse();
    }
    writeCustomers();
}

main();

/**
 * @method
 * @desc continue Response mutator
 * @returns {null}
 */
function setContinueResponse() {
    if (continueResponse === 1 || continueResponse === 0) {
        continueResponse = Number(PROMPT.question(`\nDo you want to continue? (0=no, 1=yes): `));
        while (continueResponse !== 0 && continueResponse !== 1) {
            console.log(`${continueResponse} is an incorrect value. Please try again.`);
            continueResponse = Number(PROMPT.question(`\nDo you want to continue? (0=no, 1=yes): `));
        }
    } else {
        continueResponse = 1;
    }
}

/**
 * @method
 * @desc Customer array
 * @returns null
 */
function modifyCustomers() {
    // let /*counter = 1,*/ price = 0;
    // const CUT_PRICE = 45, STYLE_PRICE = 35, DYE_PRICE = 50, ALL_PRICE = 100;
    let newCustomers = customers.length;
    customers[newCustomers] = [];
    while (!customers[newCustomers][0] || !/^[a-zA-Z -]{1,30}$/.test(customers[newCustomers][0])) {
        customers[newCustomers][0] = PROMPT.question(`Please enter last name: `);
        if (!/^[a-zA-Z -]{1,30}$/.test(customers[newCustomers][0])) {
            console.log(`${customers[newCustomers][0]} is invalid. Please try again.`);
        }
    }
    while (!customers[newCustomers][1] || !/^[a-zA-Z -]{1,30}$/.test(customers[newCustomers][1])) {
        customers[newCustomers][1] = PROMPT.question(`Please enter first name: `);
        if (!/^[a-zA-Z -]{1,30}$/.test(customers[newCustomers][1])) {
            console.log(`${customers[newCustomers][1]} is invalid. Please try again.`);
        }
    }
    while (!customers[newCustomers][2] || !/^[1-4]$/.test(customers[newCustomers][2])) {
        customers[newCustomers][2] = Number(PROMPT.question(`What would you like? \n1) Cut \n2) Style \n3) Dye \n4) All   `));
    }
    /*while (!customers[newCustomers][3] || customers[newCustomers][3] < STYLE_PRICE && customers[newCustomers][3] > ALL_PRICE){
        switch (customers[newCustomers][2]) {
            case 1: price += CUT_PRICE;
            console.log(`wack`);
                console.log(`${price}`);
                break;
            case 2: price += STYLE_PRICE;
                console.log(`${price}`);
                break;
            case 3: price += DYE_PRICE;
                console.log(`${price}`);
                break;
            case 4: price += ALL_PRICE;
                console.log(`${price}`);
                break;
            default: console.log(`! ERROR !`);
                break;
        }
    }*/
    counter++;
}

/**
 * @method
 * @desc puts customer array into I/O
 * @returns {null}
 */
function loadCustomers() {
    let customersFile = IO.readFileSync(`data/salon-data.csv`, 'utf8');
    let lines = customersFile.toString().split(/\r?\n/); // Automatically creates SD array on newlines
    for (let i = 0; i < lines.length; i++) {
        customers.push(lines[i].toString().split(/,/)); // Makes students array MD by pushing data between commas in
    }
}

/**
 * @method
 * @desc Writes the customer array to a different file
 * @returns {null}
 */
function writeCustomers() {
    const COLUMNS = 4;
    for (let i = 0; i < customers.length; i++) {
        if (customers[i]) {
            for (let j = 0; j < COLUMNS; j++) {
                if (j < COLUMNS - 1) {
                    IO.appendFileSync(`data/dataX.csv`, `${customers[i][j]},`);
                } else if (i < customers.length - 1) {
                    IO.appendFileSync(`data/dataX.csv`, `${customers[i][j]}\n`);
                } else {
                    IO.appendFileSync(`data/dataX.csv`, `${customers[i][j]}`);
                }
            }
        }
    }
    IO.unlinkSync(`data/salon-data.csv`);
    IO.renameSync(`data/dataX.csv`, `data/salon-data.csv`);
}
