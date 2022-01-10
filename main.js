const prompt = require('prompt-sync')({sigint: true});

// import the field module
let fields = require('./field-class.js');
let Field = fields.Field;




/**************************************************************
 * Game functions
 */
const transformDirection = userInput => {
    let direction ="nowhere";

        switch(userInput){
            case ("z"):
            direction = 'up';
            break;
            case ("s"):
            direction = 'down';
            break;
            case("q"):
            direction = 'left';
            break;
            case("d"):
            direction = 'right';
            break;
            default:
            console.log('invalid input');
            break;
        }

    return direction;
}

/**************************************************************
 * GAME
 */

//Game variables initialization
let gameStatus = "on";
const myField = new Field(Field.generateField(10,10,25));

//Asking player's name
const name = prompt('Welcome to "Find Your Hat"! Please fill your name then press Enter: ');

while(gameStatus == "on"){
    console.clear();
    console.log(`Hey there ${name}. Here is your playground. Will you manage to find your hat?`);
    console.log(`Use the following keys to move : z for up, s for down, q for letf, d for right`);
    
    myField.print();
    
    const userInput = prompt('Which way ?');
    
    const direction = transformDirection(userInput);
    
    if(direction =="nowhere") continue; //skipping if user did not enter valid input
    
    gameStatus=myField.updatePosition(direction);
}

if(gameStatus == "won") console.log('Well done, you found your hat!');
if(gameStatus == "dead") console.log('You are dead!');
if(gameStatus == "off") console.log('You lost yourself in the limbo!');