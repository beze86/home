const Contact = require('../models/Contact');

// exports.getAllContacts = async (req, res) => {
//   try {
//     const contacts = await new Contact().getAllContacts();
//     res.status(200).json(contacts);
//   } catch (error) {
//     console.log(`Contacts not found: ${error}`);
//     res.status(500);
//   }
// };

exports.getAllContactsByUser = async (req, res) => {
  const userId = req.userId;
  try {
    const contacts = await new Contact().getAllContactsByUser({ userId });
    res.status(201).json(contacts);
  } catch (error) {
    console.log(`Contacts for user not found: ${error}`);
    res.status(500);
  }
};

exports.createContact = async (req, res) => {
  const { fullName } = req.body;
  const userId = req.userId;
  const payload = {
    userId,
    fullName,
  };
  try {
    const insertedId = await new Contact().createContact(payload);
    res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`Contact not created: ${error}`);
    res.status(500);
  }
};

exports.deleteContact = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const payload = {
    userId,
    id,
  };
  try {
    await new Contact().deleteContact(payload);
    res.status(200).json({ msg: `Contact deleted id: ${payload.id}` });
  } catch (error) {
    console.log(`Contact not deleted: ${error}`);
    res.status(500);
  }
};
