const express = require('express');
const rbacController = require('../controllers/rbacController.js');
const { identifier } = require('../middlewares/identification.js');
const { authorizeRole } = require('../middlewares/roleMiddleware.js');

const router = express.Router();

router.get('/permissions', identifier, authorizeRole("Admin"), rbacController.listPermissions);            // list canonical permissions.
router.get('/roles', identifier, authorizeRole("Admin"), rbacController.listRoles);                  // list roles with permission keys.
router.post('/roles', identifier, authorizeRole("Admin"), rbacController.createRole);                  // create role (key, description, permissions[])
router.patch('/roles/:key', identifier, authorizeRole("Admin"), rbacController.updatePermissions);            // add/remove permission keys.
router.patch('/users/:id/role', identifier, authorizeRole("Admin"), rbacController.setRole);        // set user role.
router.patch('/users/:id/permissions', identifier, authorizeRole("Admin"), rbacController.setPermissions); // grant/revoke direct permission keys.

module.exports = router;