function Question(id, question, qtype, choices) {
  this._id = id;
  this.question = question; 
  this.questionType = qtype; // 0: textbox, 1: radio, 2: checkbox
  this.choices = choices;
}

export {Question}