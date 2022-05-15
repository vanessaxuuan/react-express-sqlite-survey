import {Question} from "../logic/question.js"

let qnOne = new Question(1, "What is your full name?", 0, []);
let qnTwo = new Question(2, "What is your favourite colour?", 2, ["Blue", "Red", "Green", "Yellow", "Purple", "Pink"]);
let qnThree = new Question(3, "What is your most familar coding language?", 1, ["Python", "Java", "Ruby", "JavaScript", "Golang"]);
let qnFour = new Question(4, "Which of the languages below can you speak?", 2, ["English", "Chinese", "Malay", "Tamil", "Hindi"]);
let qnFive = new Question(5, "Would you pay $5 for a resume review?", 1, ["Yes", "No"]);

export const questions_list = [qnOne, qnTwo, qnThree, qnFour, qnFive];
export var responses_server = []
