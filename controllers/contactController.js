const Contact = require('../models/Contact');

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await new Contact().getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.log(`Contacts not found: ${error}`);
    res.status(500);
  }
};

exports.createContact = async (req, res) => {
  const { fullName } = req.body;
  const payLoad = {
    fullName,
  };
  try {
    const { insertedId } = await new Contact().createContact(payLoad);
    res.status(201).json({ insertedId });
  } catch (error) {
    console.log(`Contact not created: ${error}`);
    res.status(500);
  }
};

exports.deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    await new Contact().deleteContact(id);
    res.status(200).json({ msg: `Contact deleted id: ${id}` });
  } catch (error) {
    console.log(`Contact not deleted: ${error}`);
    res.status(500);
  }
};
