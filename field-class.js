const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
// field is a bidimensionnal array
    constructor(field){
      this._field = field;
      this._xPos = 0;
      this._yPos = 0;
    }

    //GETTERS & SETTERS
    get field() {
        return this._field;
    }

    get xPos() {
        return this._xPos;
    }

    get yPos() {
        return this._yPos;
    }

    //METHODS

    //print will dsiplay the field on the temrinal, turning the doubel array into several strings
    print(){
        for (var row = 0; row < this.field.length; row++){
            console.log(this.field[row].join('')); //join allows the transformation from an array to a string. the parameter will be the separator between the different elements of the array.
        }
    }

    //Updating the corrdinates of the player according to the direction
    updatePosition(direction){
        
        //storing old coordinates to update symbol
        const oldXPos = this._xPos;
        const oldYPos = this._yPos;

        switch(direction){
            case ('up'):
                this._xPos -= 1;
            break;
            case ('down'):
                this._xPos += 1;
            break;
            case ('left'):
                this._yPos -= 1;
            break;
            case ('right'):
                this._yPos += 1;
            break;
            default:
                console.log('Invalid direction.');
                return -1;
            break;
        }

        //console.log(`Old coordinates: ${oldXPos}, ${oldYPos}`);
        //console.log(`New coordinates: ${this._xPos}, ${this._yPos}`);

        const status = this.checkPosition();

        if(status == 'on'){
            this.field[this._xPos][this.yPos]=pathCharacter;   
        }

        return status;
    }

    //cehcking the new position of the player to see if still in field
    checkPosition(){
        let status = 'on';
        const lowerXLimit = 0;
        const higherXLimit = this.field.length-1;
        const lowerYLimit = 0;
        const higherYLimit = this.field[0].length-1;

        //console.log(`the field has ${this.field.length} lines and ${this.field[0].length} columns`);

        //chek if user is on the hat
        if(this._field[this._xPos][this._yPos] == hat){
            status = "won";
        }

        //check if user has fallen in a hole
        if(this._field[this._xPos][this._yPos] == hole){
            status = "dead";
        }

        //check if user is off limits
        if(this._xPos < lowerXLimit || this._xPos > higherXLimit || this._yPos < lowerYLimit || this._yPos > higherYLimit){
            status = "off";
        }

        return status;
    }

    //random field generation based on the dimensions on the fields
    static generateField(width, height, holesPercentage){
        console.log('Generating a random field.');
        
        //creating the field
        let field = new Array(height);
        for(let row = 0; row < field.length; row++){
            field[row]=new Array(width);
        }

        //filling the field with default symbol
        for(let row = 0; row < field.length; row++){
            for(let col=0;col< field[row].length;col++){
                field[row][col]=fieldCharacter;
            }
        }

        //adding the character symbol
        field[0][0]=pathCharacter;

        //adding holes
        for(let row = 0; row < field.length; row++){
            for(let col=0; col< field[row].length; col++){
                if(col==0 && row==0) continue;
                if(Math.floor(Math.random()*100)<holesPercentage){
                    field[row][col]=hole;
                }
            }
        }

        //adding the hat
        let xHat = 0;
        let yHat = 0;
        while(xHat==0 && yHat ==0){
            xHat = Math.floor(Math.random()*(field.length-1));
            yHat = Math.floor(Math.random()*(field[0].length-1));
        }

        field[xHat][yHat]=hat;
        
        return field;
        // return [
        //     ['*', '░', 'O', '░'],
        //     ['░', 'O', '░', 'O'],
        //     ['░', '^', '░', 'O'],
        // ];
    }
}

module.exports = {
    Field: Field
}