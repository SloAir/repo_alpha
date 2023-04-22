const SpaceModel = require('../models/spaceModel.js');

module.exports = {
    async list() {
        try {
            return await SpaceModel.find().exec();
        }
        catch(e) {
            console.log(e.message);
        }
    },

   show(req , res) {
       SpaceModel.findById(req.params.id,  (err, space) => {
           if (err) {
               return res.status(500).json({
                   message: 'Error when getting space.',
                   error: err
               });
           }
           if (!space) {
               return res.status(404).json({
                   message: 'No such space'
               });
           }
           return res.status(200).json(space);
       });
   },

   create(req , res) {
       let space = new SpaceModel({

       });
 
       space.save((err, space) =>  {
           if (err) {
               return res.status(500).json({
                   message: 'Error when creating space',
                   error: err
               });
           }
           return res.status(201).json(space);
       });
   },

   update(req , res) {
       SpaceModel.findById(req.params.id ,  (err, space) =>  {
           if (err) {
               return res.status(500).json({
                   message: 'Error when getting space',
                   error: err
               });
           }
           if (!space) {
               return res.status(404).json({
                   message: 'No such space'
               });
           }
           
           space.save((err, space) => {
               if (err) {
                   return res.status(500).json({
                       message: 'Error when updating space.',
                       error: err
                   });
               }
               return res.json(space);
           });
       });
   },

   remove(req , res) {
       SpaceModel.findByIdAndRemove(req.params.id,  (err, space) =>  {
           if (err) {
               return res.status(500).json({
                   message: 'Error when deleting the space.',
                   error: err
               });
           }
           return res.status(204).json();
       });
   }
};