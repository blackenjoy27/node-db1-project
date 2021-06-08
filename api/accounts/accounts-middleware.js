const accounts = require("./accounts-model");
const db = require("../../data/db-config");

exports.checkAccountPayload = (req, res, next) => {
  const error = { status: 400 };
  const { name, budget } = req.body;
  if (typeof budget !== "number" && budget !== undefined) {
    error.message = "budget of account must be a number"
  }
  else if (!name || !budget) {
    error.message = "name and budget are required"
  }
  else if (typeof name !== "string") {
    error.message = "name of account must be a string"
  }
  else if (name.trim().length < 3 || name.trim().length > 100) {
    error.message = "name of account must be between 3 and 100"
  }

  else if (budget < 0 || budget > 1000000) {
    error.message = "budget of account is too large or too small"
  }

  if (error.message) {
    next(error);
  } else {
    next();
  }

}

exports.checkAccountNameUnique = async (req, res, next) => {
  const { name } = req.body;
  db("accounts").where("name", name.trim())
    .first().then(account => {
      if (account) {
        next({
          status: 400,
          message: "that name is taken"
        })
      } else {
        next();
      }
    })
    .catch(next);

}

exports.checkAccountId = (req, res, next) => {
  accounts.getById(req.params.id)
    .then(account => {
      if (!account) {
        next({
          message: "account not found",
          status: 404
        });
      } else {
        req.account = account;
        next();
      }
    })
    .catch(next);
}
