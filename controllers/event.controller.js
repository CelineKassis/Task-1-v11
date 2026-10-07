const Event = require("../models/event.model");


// Create an event
const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);

        res.status(201).json(event);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Event already exists"
            });
        }

        res.status(500).json({
            message: error.message
        });
    }
};


// Get all events
const getEvents = async (req, res) => {
    try {
        const filter = {};

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.isFree !== undefined) {
            filter.isFree = req.query.isFree === "true";
        }

        const events = await Event.find(filter);

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get one event
const getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Update an event
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json(event);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Event already exists"
            });
        }

        res.status(500).json({
            message: error.message
        });
    }
};


// Delete an event
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get upcoming events
const getUpcomingEvents = async (req, res) => {
    try {
        const events = await Event.find({
            date: { $gt: new Date() }
        }).sort({ date: 1 });

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent,
    getUpcomingEvents
};