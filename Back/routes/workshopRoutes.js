const express = require('express');
const router = express.Router();
const {
createWorkshop,
getAllWorkshops,
getWorkshopById,
updateWorkshop,
deleteWorkshop,
} = require('../controllers/workshopController');

router.route('/').post(createWorkshop)
router.route('/').get(getAllWorkshops)
router.route('/:id').get(getWorkshopById).put(updateWorkshop).delete(deleteWorkshop)

module.exports = router;

