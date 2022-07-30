const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *
    FROM users LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


async function getIndividual(id, page = 1){
  console.log(id)
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *
    FROM users WHERE id=${id} LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}



async function create(user){
  console.log(user)
  const result = await db.query(
    `INSERT INTO users 
    (id, name, last_name, password) 
    VALUES 
    (${user.id}, '${user.name}', '${user.last_name}', '${user.password}')`
  );

  let message = 'Error while creating user';

  if (result.affectedRows) {
    message = 'User created successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create, 
  getIndividual
}