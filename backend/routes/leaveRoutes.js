const express = require('express');
const Leave = require('../models/Leave');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leave applications' });
  }
});

router.post('/', async (req, res) => {
  const {
    name,
    registerNumber,
    semester,
    year,
    leaveDateFrom,
    leaveDateTo,
    reason,
    leaveAlreadyAvailed,
    labSessionOnLeaveDate,
    labDetails,
  } = req.body;

  const totalLeaveDays = Math.ceil((new Date(leaveDateTo) - new Date(leaveDateFrom)) / (1000 * 60 * 60 * 24)) + 1;

  const newLeave = new Leave({
    name,
    registerNumber,
    semester,
    year,
    leaveDateFrom,
    leaveDateTo,
    totalLeaveDays,
    reason,
    leaveAlreadyAvailed,
    labSessionOnLeaveDate,
    labDetails: labSessionOnLeaveDate ? labDetails : ''
  });

  try {
    const savedLeave = await newLeave.save();
    res.json(savedLeave);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting leave application' });
  }
});

module.exports = router;
