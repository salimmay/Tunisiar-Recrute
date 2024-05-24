const express = require('express');
const router = express.Router();
const {
  getInternshipOffers,
  getInternshipOffer,
  createInternshipOffer,
  updateInternshipOffer,
  deleteInternshipOffer
} = require('../controllers/internshipOfferController');

router.get('/', getInternshipOffers);
router.get('/:id', getInternshipOffer);
router.post('/', createInternshipOffer);
router.put('/:id', updateInternshipOffer);
router.delete('/:id', deleteInternshipOffer);

module.exports = router;
