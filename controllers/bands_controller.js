// DEPEDENCIES
const bands = require("express").Router();
const db = require("../models"); // gives access to folder and all the models at once w/o having to require each one individually
const { Band, MeetGreet, SetTime, Event } = db; // with this variable we can access each model by using db.Modelname
const { Op } = require("sequelize"); //destructure the Op class from requiring the sequlize package

//GET route that goes to / - FIND ALL BANDS
/* bands.get("/", async (req, res) => {
  try {
    const foundBands = await Band.findAll();
    res.status(200).json(foundBands);
  } catch (error) {
    res.status(500).json(error);
  }
});*/

/* 2.FIND ALL BANDS - tells sequelize to find any band that contains the provided name query in any part of their name
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name}%` }
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})*/

// FIND ALL BANDS - INDEX ROUTE (returns all the bands. should still work when attaching a name query)
bands.get("/", async (req, res) => {
  try {
    const foundBands = await Band.findAll({
      order: [["available_start_time", "ASC"]],
      where: {
        name: { [Op.like]: `%${req.query.name ? req.query.name : ""}%` },
      },
    });
    res.status(200).json(foundBands);
  } catch (error) {
    res.status(500).json(error);
  }
});

/* //THE SHOW ROUTE - FIND A SPECIFIC BAND
bands.get("/:id", async (req, res) => {
  try {
    const foundBand = await Band.findOne({
      where: { band_id: req.params.id },
    });
    res.status(200).json(foundBand);
  } catch (error) {
    res.status(500).json(error);
  }
}); */

// SHOW - search by name instead of id
// FIND A SPECIFIC BAND
bands.get("/:name", async (req, res) => {
  try {
    const foundBand = await Band.findOne({
      where: { name: req.params.name },
      include: [
        {
          model: MeetGreet,
          as: "meet_greets",
          include: {
            model: Event,
            as: "event",
            where: {
              name: {
                [Op.like]: `%${req.query.event ? req.query.event : ""}%`,
              },
            },
          },
        },
        {
          model: SetTime,
          as: "set_times",
          include: {
            model: Event,
            as: "event",
            where: {
              name: {
                [Op.like]: `%${req.query.event ? req.query.event : ""}%`,
              },
            },
          },
        },
      ],
    });
    res.status(200).json(foundBand);
  } catch (error) {
    res.status(500).json(error);
  }
});

//CREATE - CREATE A BAND
bands.post("/", async (req, res) => {
  try {
    const newBand = await Band.create(req.body);
    res.status(200).json({
      message: "Successfully inserted a new band",
      data: newBand,
    });
  } catch (err) {
    console.log("errrrr", err);
    res.status(500).json(err);
  }
});

// UPDATE - A BAND
bands.put("/:id", async (req, res) => {
  try {
    const updatedBands = await Band.update(req.body, {
      where: {
        band_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully updated ${updatedBands} band(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE - A BAND
bands.delete("/:id", async (req, res) => {
  try {
    const deletedBands = await Band.destroy({
      where: {
        band_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedBands} band(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//EXPORT
module.exports = bands;
