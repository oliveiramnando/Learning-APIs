const express = require('express');
const rbacController = require('../controllers/rbacController.js');
const { identifier } = require('../middlewares/identification.js');
const { authorizeRole } = require('../middlewares/roleMiddleware.js');

const router = express.Router();

router.get('/permissions', identifier, authorizeRole("admin"), rbacController.listPermissions);            // list canonical permissions.
router.get('/roles', identifier, authorizeRole("admin"), rbacController.listRoles);                  // list roles with permission keys.
router.post('/roles', identifier, authorizeRole("admin"), rbacController.createRole);                  // create role (key, description, permissions[])
// router.patch('/roles/:key', identifier, authorizeRole("Admin"), rbacController.updatePermissions);            // add/remove permission keys.
router.patch('/users/:id/role', identifier, authorizeRole("admin"), rbacController.setRole);        // set user role.
// router.patch('/users/:id/permissions', identifier, authorizeRole("Admin"), rbacController.setPermissions); // grant/revoke direct permission keys.

module.exports = router;