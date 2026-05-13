import Event from "../models/Event.js";

// CREATE EVENT
export const addEvent = async (
  req,
  res
) => {

  try {

    const event =
      await Event.create(
        req.body
      );

    res.json(event);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

// GET EVENTS
export const getEvents = async (
  req,
  res
) => {

  try {

    const target =
      req.query.target;

    let events;

    if (
      target &&
      target !== "all"
    ) {

      events =
        await Event.find({
          $or: [
            { target },
            { target: "all" },
          ],
        }).sort({
          createdAt: -1,
        });

    } else {

      events =
        await Event.find().sort({
          createdAt: -1,
        });

    }

    res.json(events);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

// DELETE EVENT
export const deleteEvent =
  async (req, res) => {

    try {

      await Event.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Event deleted",
      });

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });

    }
  };