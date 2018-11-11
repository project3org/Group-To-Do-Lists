// Require models
const db = require('../models');

// Exports methods
module.exports = {
    // Targets specific user to add list 
    openLists: (req, res)=>{
        // Gathers all Lists
        // ****Will have to update line 10 to include people in the 'listMembers category' ****
        db.List.find({creatorId: req.params.id})
            // ..and populate all of the lists associated with the user
            .populate("user")
            .then((dbUser)=>{
                // If we find User, they are sent back to the client with the Lists attached
                res.json(dbUser);
            })
            .catch((err)=>{
                // If an error occurs, send the err to the client instead
                res.status(422).json(err);
            });
    },
    // Saves/Updates Users's associated Lists
    saveList: (req, res)=>{
        // Creates List in DB
        db.List.create(req.body)
            .then((dbList)=>{
                // If a List was created successfully, find one User with an `_id` equal to `req.params.id`.
                // Update the User to be associated with the new List
                return db.User.findOneAndUpdate({ _id: req.params.id }, { $push:{lists: dbList._id }}, { safe: true, upsert: true, new: true });
            })
            .then((dbUser)=>{
                // If we were able to successfully update an User, send it back to the client
                res.json(dbUser);
            })
            .catch((err)=>{
                // If an error occurred, send it to the client
                res.status(422).json(err);
            });        
    },
    // Trades List id for List body
    getList: (req, res)=>{
        // Targets List by ID
        db.List.findOne({_id: req.params.id})
            .populate('task')
            .then((dbList)=>{
                res.json(dbList);
            })
            .catch((err)=>{
                // If an error occurs, send the err to the client
                res.status(422).json(err);
            });
    },
    // Updates List
    updateList: (req, res) => {
        db.List.findOneAndUpdate({_id: req.params.id}, req.body)
            .then(dbList => res.json(dbList))
            .catch(err => res.status(422).json(err));
    },
    // Deletes List
    deleteList: (req, res)=>{
        // Targets List to delete
        db.List.remove({_id: req.params.id})
            .then((dbList)=>{
                // If List, send List back to client
                res.json(dbList);
            })
            .catch((err)=>{
                // If an error occurs, send the err to the client
                res.status(422).json(err);
            });
    }
};