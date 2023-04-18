var QueryModel = require('../models/queryModel.js');

/**
 * queryController.js
 *
 * @description :: Server-side logic for managing querys.
 */
module.exports = {

    /**
     * queryController.list()
     */
    list: function (req, res) {
        QueryModel.find(function (err, querys) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting query.',
                    error: err
                });
            }

            return res.json(querys);
        });
    },

    /**
     * queryController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        QueryModel.findOne({_id: id}, function (err, query) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting query.',
                    error: err
                });
            }

            if (!query) {
                return res.status(404).json({
                    message: 'No such query'
                });
            }

            return res.json(query);
        });
    },

    /**
     * queryController.create()
     */
    create: function (req, res) {
        var query = new QueryModel({

        });

        query.save(function (err, query) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating query',
                    error: err
                });
            }

            return res.status(201).json(query);
        });
    },

    /**
     * queryController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        QueryModel.findOne({_id: id}, function (err, query) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting query',
                    error: err
                });
            }

            if (!query) {
                return res.status(404).json({
                    message: 'No such query'
                });
            }

            
            query.save(function (err, query) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating query.',
                        error: err
                    });
                }

                return res.json(query);
            });
        });
    },

    /**
     * queryController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        QueryModel.findByIdAndRemove(id, function (err, query) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the query.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
