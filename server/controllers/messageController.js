const express = require("express");
const Message = require("../models/Message");

// Create a new message
exports.createMsg = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all messages
exports.getAllMsg = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json({ messages });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching messages." });
  }
};

// Get a single message by ID
exports.getMsg = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message not found." });
    }
    res.json({ message });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the message." });
  }
};

// Delete a message by ID
exports.deleteMsg = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message not found." });
    }
    res.json({ message });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the message." });
  }
};
