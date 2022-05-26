/**
 * @returns { Promise<void> } 
 */
const seed = async function(myKnex) {
  // Deletes ALL existing entries
  await myKnex('question').del()
  await myKnex('question').insert([
    { question: "What is your full name?", type: "textbox"},
    { question: "What is your favourite colour?", type: "checkbox"},
    { question: "What is your most familar coding language?", type: "radio"},
    { question: "Which of the languages below can you speak?", type: "checkbox"},
    { question: "Would you pay $5 for a resume review?", type: "radio"}
  ]);
};

export {seed}
