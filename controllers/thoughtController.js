const { ObjectId } = require('mongoose').Types
const { Thought, User } = require('../models')

// Aggregate functions go here

module.exports = {
    async getAllThoughts(req, res) {
        try {
            
        } catch (err) {

        }
    },

    async getSingleThought(req, res) {
        try {

        } catch (err) {
            
        }
    },

    async addThought(req, res) {
        // Don't forget to push created thoughts to the associated user's thoughts array field
        try {

        } catch (err) {
            
        }
    },

    async updateThought(req, res) {
        try {

        } catch (err) {
            
        }
    },

    async deleteThought(req, res) {
        try {

        } catch (err) {
            
        }
    },

    async addReactionToThought(req, res) {
        try {

        } catch (err) {
            
        }
    },

    async delReactionFromThought(req, res) {
        try {

        } catch (err) {
            
        }
    }
}