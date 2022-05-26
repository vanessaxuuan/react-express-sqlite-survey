/**
 * @returns { Promise<void> } 
 */
const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('choice').del()
  await knex('choice').insert([
    { question_id: 2, option: "blue"},
    { question_id: 2, option: "red"},
    { question_id: 2, option: "green"},
    { question_id: 2, option: "yellow"},
    { question_id: 2, option: "purple"},
    { question_id: 2, option: "pink"},
    { question_id: 3, option: "python"},
    { question_id: 3, option: "java"},
    { question_id: 3, option: "ruby"},
    { question_id: 3, option: "javascript"},
    { question_id: 3, option: "golang"},
    { question_id: 4, option: "english"},
    { question_id: 4, option: "chinese"},
    { question_id: 4, option: "malay"},
    { question_id: 4, option: "tamil"},
    { question_id: 4, option: "hindi"},
    { question_id: 5, option: "yes"},
    { question_id: 5, option: "no"}
  ]);
};

export {seed}
