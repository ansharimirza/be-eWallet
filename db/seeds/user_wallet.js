/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_wallet').del()
  await knex('user_wallet').insert([
    {id: 1, user_id: 1, balance: 10, createdAt: '2023-12-12 00:00:00'},
    {id: 2, user_id: 2, balance: 100, createdAt: '2023-12-12 00:00:00'},
    {id: 3, user_id: 3, balance: 1000, createdAt: '2023-12-12 00:00:00'}
  ]);
};
