const router=require('express').Router();
const contactSchema=require('../models/contact');

router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
  console.log("api called")
    try {
      const newContact = new contactSchema({ name, email, message });
      console.log(newContact);

      await newContact.save();
      res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  });

  module.exports=router