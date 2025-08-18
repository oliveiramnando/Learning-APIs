const mongoose = require('mongoose');
// const User = require('./user.models');

const ProjectSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        descri: { // description
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;