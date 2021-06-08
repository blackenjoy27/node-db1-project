const db = require("../../data/db-config");


const getAll = () => {
  return db("accounts");
}

const getById = id => {
  return db("accounts").where("id", id).first();
}

const create = async account => {
  const id = await db("accounts").insert(account);
  return getById(id);
}

const updateById = async (id, account) => {
  const updatedId = await db("accounts").where({ id }).update(account);
  return getById(updatedId);
}

const deleteById = async id => {
  const deletedId = await db("accounts").where({ id }).del();
  return getById(deletedId);
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
