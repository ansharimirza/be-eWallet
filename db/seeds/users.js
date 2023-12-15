/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, userName: 'ibnu', createdAt: '2023-12-12 00:00:00'},
    {id: 2, userName: 'adit', createdAt: '2023-12-12 00:00:00'},
    {id: 3, userName: 'alvin', createdAt: '2023-12-12 00:00:00'}
  ]);
};
