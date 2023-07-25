const { ObjectId } = require('mongoose').Types
const { Thought, User } = require('../models')

// Aggregate functions go here

module.exports = {
    async getAllUsers(req, res) {
        try {

        } catch (err) {

        }
    },

    async getSingleUser(req, res) {
        try {

        } catch (err) {
            
        }
    },

    async addUser(req, res) {
        try {

        } catch (err) {
            
        }
    },

    async updateUser(req, res) {
        try {

        } catch (err) {
            
        }
    },

    async deleteUser(req, res) {
        // Bonus is to remove users associated thoughts when deleted
        try {

        } catch (err) {
            
        }
    },

    async addFriendToUser(req, res) {
        try {

        } catch (err) {
            
        }
    },

    async delFriendFromUser(req, res) {
        try {

        } catch (err) {
            
        }
    }
}