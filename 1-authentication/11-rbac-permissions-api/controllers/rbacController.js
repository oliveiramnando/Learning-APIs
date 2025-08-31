const User = require('../models/userModel.js');
const Permission = require('../models/permissionModel.js');
const Role = require('../models/roleModel.js');


exports.listPermissions = async (req,res) => {
    try {
        const permissions = await Permission.find({});
        return res.status(200).json({ success: true, message: "All permissions", permissions });
    } catch (error) {
        console.log(error);
    }
};

exports.listRoles = async (req,res) => {
    try {
        const roles = await Role.find({});
        return res.status(200).json({ success: true, message: "All roles", roles });
    } catch (error) {
        console.log(error);
    }
};

exports.createRole = async (req,res) => {
    const { key, description, permissions, priority } = req.body;
    try {
        const role = await Role.create({
            key,
            description,
            permissions,
            priority
        });
        return res.status(201).json({ success: true, message: "Role created", role });
    } catch (error) {
        console.log(error);
    }
};

// exports.updatePermissions = async (req,res) => {
//     const { key } = req.params;
//     const { add, remove } = req.body;
//     try {
//         if (!key) {
//             return res.status(400).json({ success: false, message: "Failed to provide role" });
//         }
//         const role = await Role.findOne({ key });
//         if (!role) {
//             return res.status(404).json({ message: false, message: "Role does not exist" });
//         }
//         if (!add && !remove) {
//             return res.status(400).json({ success: false, message: "Please provide add or remove method" });
//         }

//         const update = {};
//         if (add) {
//             role.permissions.push(add);
//         }
//         if (remove) {
//             role.permissions.pull(remove);
//         }
//         await role.save();
//         const result = role.permissions;
//         return res.status(200).json({ success: true, message: "Permissions of role successfully updated", result})
//     } catch (error) {
//         console.log(error);
//     }
// };  

exports.setRole = async (req,res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (!role) {
            return res.status(400).json({ success: false, message: "Please provide role" });
        }
        const existingRole = await Role.findOne({ key: role });
        if (!existingRole) {
            return res.status(404).json({ success: false, message: "Role does not exist" });
        }
        const updatedUser = await User.findByIdAndUpdate(id, 
            {$set: { role }},
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(400).json({ success: false, message: "Something went wrong" });
        }
        return res.status(200).json({ success:true, message: "User successfully updated", updatedUser});
    } catch (error) {
        console.log(error);
    }
};

// exports.setUserPermissions = async (req,res) => {
    
// };