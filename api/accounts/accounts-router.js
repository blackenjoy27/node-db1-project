const accounts = require("./accounts-model");
const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique
} = require("./accounts-middleware");

const router = require('express').Router();

router.get('/', (req, res, next) => {
  accounts.getAll()
    .then(allAccounts => {
      res.status(200).json(allAccounts);
    })
    .catch(next);
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.status(200).json(req.account);
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  const name = req.body.name.trim();
  accounts.create({ name: name, budget: req.body.budget })
    .then(newAccount => {
      res.status(201).json(newAccount);
    })
    .catch(next);
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  accounts.updateById(req.params.id, req.body)
    .then(updatedAccount => {
      res.status(200).json(updatedAccount);
    })
    .catch(next);
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  accounts.deleteById(req.params.id)
    .then(deletedAccount => {
      res.status(200).json(deletedAccount);
    })
    .catch(next);
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    status: err.status
  })
})

module.exports = router;
