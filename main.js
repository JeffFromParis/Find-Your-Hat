const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
// field is a bidimensionnal array
    constructor(field){
      this._field = field;
    }

    //GETTERS & SETTERS
    get field() {
        return this._field;
    }

    //METHODS

    //print will dsiplay the field on the temrinal, turning the doubel array into several strings
    print(){
        for (var row = 0; row < this.field.length; row++){
            console.log(this.field[row].join('')); //join allows the transformation from an array to a string. the parameter will be the separator between the different elements of the array.
        }
    }
}

/**************************************************************
 * GAME
 */
const name = prompt('Welcome to "Find Your Hat"! What is your name? ');
console.log(`Hey there ${name}. Here is your playground. Will you manage to find your hat?`);
myField.print();
let direction = prompt('Which direction should you go next?');


/**************************************************************
 * TESTING ZONE
 */
const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

console.log(myField.field);
myField.print();



