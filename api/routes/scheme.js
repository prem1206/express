const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticate');
const schemecontroller = require('../controllers/scheme');


router.get('/:deptNo', schemecontroller.get_scheme_by_deptno);
router.post('/', schemecontroller.add_scheme);

module.exports = router;
