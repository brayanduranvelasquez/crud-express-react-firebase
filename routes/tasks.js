const removeUndefinedFields = require('../utils/removeUndefinedFields');
const { getFirestore } = require('firebase-admin/firestore');
const app = require('express');
const router = app.Router();
const db = getFirestore();

// get all
router.get('/', async (req, res) => {
  try {
    const tasksRef = db.collection('tasks');
    const response = await tasksRef.get();

    let responseArr = [];

    response.forEach((doc) => {
      responseArr.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).send(responseArr);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get by id
router.get('/:id', async (req, res) => {
  try {
    const tasksRef = db.collection('tasks').doc(req.params.id);
    const response = await tasksRef.get();
    res.status(200).send(response.data());
  } catch (error) {
    res.status(400).send(error);
  }
});

// create
router.post('/', async (req, res) => {
  try {
    const data = { description: req.body.description, status: 'uncompleted' };

    const tasksRef = db.collection('tasks');
    await tasksRef.add(data);

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

// update
router.post('/:id', async (req, res) => {
  try {
    const data = removeUndefinedFields({ description: req.body.description, status: req.body.status });

    const tasksRef = db.collection('tasks').doc(req.params.id);
    await tasksRef.update(data);

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete
router.delete('/:id', async (req, res) => {
  try {
    const tasksRef = db.collection('tasks').doc(req.params.id);
    await tasksRef.delete();
    res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
