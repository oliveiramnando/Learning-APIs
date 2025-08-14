const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema(
    {
        userId: {
            // type: mongoose.Schema.Types.ObjectId,
            type: String,
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