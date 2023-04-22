require('../models/db');
const Entry = require('../models/test');

/*
* /api/test/ 
* GET All Entries
*/
exports.listEntries = async(req, res) => {
  let { limit = 10, page = 1, category, q } = req.query;

  const limitRecords = parseInt(limit);
  const skip = (page -1) * limit;

  let query = {};
  if(q) {
    query = {$text: {$search: q}};
  }
  if(category) query.category = category;
 

  try {
    const entries = await Entry.find(query).limit(limitRecords).skip(skip);
    res.json({ page: page, limit:limitRecords, entries});
  } catch (error) {
    res.status(400).json( {message: error })
  } 
}


/*
* /api/test/ 
* POST Single Entry
*/
exports.insertSingleEntry = async(req, res) => {

  const newEntry = new Entry({
    name: req.body.name,
    description: req.body.description,
    thumbnail: req.body.thumbnail 
  });

  try {
    await newEntry.save();
    res.json(newEntry);
  } catch (error) {
    res.status(400).json( { message: error })
  }
}



/**
* /api/test/:id
* PATCH Single Entry
*/
exports.updateSingleEntry = async(req, res) => {
  let paramID = req.params.id;
  let name = req.body.name;

  try {
    const updateEntry = await Entry.updateOne({ _id:paramID }, { name:name });
    res.json(updateEntry);
  } catch (error) {
    res.status(400).json( { message: error })
  }
}



/**
* /api/test/:id
* DELETE Single Entry
*/
exports.deleteSingleEntry = async(req, res) => {
  let paramID = req.params.id;

  try {
    const data = await Entry.deleteOne({ _id:paramID });
    res.json(data);
  } catch (error) {
    res.status(400).json( { message: err })
  }
}


async function insertEntries(){
    try {
        await Entry.insertMany([
            {
                "name": "Drva",
                "description": "Drva Drva",
                "thumbnail": "drva.jpg"
            },
            {
                "name": "Avto",
                "description": "Avto Avto",
                "thumbnail": "avto.jpeg"
            }
        ]);
        console.log("Succesful entry of dummy data!")
    } catch(error) {
        console.log(error);
    }
}

insertEntries();
