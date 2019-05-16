const separators = require('./separators');
const errorChecker = require('./error');

class Tokenizer {
  constructor(inputString) {
    this.splitedList = inputString.split('');
    this.tokenizedList = [];
  }

  tokenizing() {
    errorChecker.isData(this.splitedList);
    let word = "";
    this.splitedList.forEach(letter => {
      if (this.isSeparator(letter) || letter === ',') {
        this.addTokenToList(letter, word);
        word = "";
      } else {
        word += letter
      }
    });
    this.tokenizedList = this.tokenizedList.filter( letter => letter !== '');
    errorChecker.dataValidator(this.tokenizedList);
    errorChecker.stringValidator(this.tokenizedList);
    return this.tokenizedList;
  }

  isSeparator(letter) {
    for (const key in separators) {
      if (separators[key] === letter) return true;
    }
  }

  addTokenToList(separator, word) {
    if (word !== "") {
      this.tokenizedList.push(word.trim());
    }
    if (separator !== ',') this.tokenizedList.push(separator);
  }
}

// const tokenizer = new Tokenizer("['asd',[null,false,['11',[112233],112],55, '99'],33, true]");
// console.log(tokenizer.tokenizing());

module.exports = Tokenizer;