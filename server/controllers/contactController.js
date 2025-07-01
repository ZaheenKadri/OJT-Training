const Contact = require('../models/contactModel');

// POST: Save a contact form submission
exports.submitContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const saved = await contact.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// GET: Fetch all contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 }); // latest first
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
