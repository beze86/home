const Contact = require('../models/Contact');

exports.getAllContactsByUser = async (req, res) => {
  if (!req.userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const userId = req.userId;

  try {
    const contacts = await new Contact().getAllContactsByUser({ userId });
    return res.status(201).json(contacts);
  } catch (error) {
    console.log(`Error fetching contacts for user: ${error}`);
    return res.status(500).json({ error: 'Failed to fetch contacts for user' });
  }
};

exports.createContact = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const { fullName } = req.body;

  if (!fullName) {
    return res.status(400).json({ error: 'Add missing fields' });
  }

  if (!req.userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const userId = req.userId;
  const payload = {
    userId,
    fullName,
  };
  try {
    const insertedId = await new Contact().createContact(payload);
    return res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`Error creating contact: ${error}`);
    return res.status(500).json({ error: 'Failed to create contact' });
  }
};

exports.deleteContact = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const { id } = req.params;
  if (!req.userId) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const userId = req.userId;
  const payload = {
    userId,
    id,
  };
  try {
    await new Contact().deleteContact(payload);
    return res.status(200).json({ msg: `Contact deleted id: ${payload.id}` });
  } catch (error) {
    console.log(`Error deleting contact: ${error}`);
    return res.status(500).json({ error: 'Failed to delete contact' });
  }
};
