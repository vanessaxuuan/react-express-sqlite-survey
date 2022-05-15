function Question(id, question, qtype, choices, value) {
  this._id = id;
  this.question = question; 
  this.questionType = qtype; // 0: textbox, 1: radio, 2: checkbox
  this.choices = choices;
  this._value = value;
}

export {Question}