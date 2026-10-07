const express = require("express");

const {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent,
    getUpcomingEvents
} = require("../controllers/event.controller");

const router = express.Router();


// Create an event
router.post("/", createEvent);


// Get all events
router.get("/", getEvents);


// Get upcoming events
router.get("/upcoming", getUpcomingEvents);


// Get one event
router.get("/:id", getEvent);


// Update an event
router.put("/:id", updateEvent);


// Delete an event
router.delete("/:id", deleteEvent);


module.exports = router;