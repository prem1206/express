const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticate');
const departmentcontroller = require('../controllers/department');

router.get('/', departmentcontroller.GET_DEPT_ALL);
router.get('/:deptNo', departmentcontroller.GET_DEPT_BYNO);
router.post('/', departmentcontroller.add_department);

module.exports = router;
