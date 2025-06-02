const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',
    [
        body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
        body('fullname.lastname').optional().isLength({min: 3}).withMessage('Last name must be at least 3 characters long'),
        body('email').isEmail().withMessage('Please provide a valid email address'),
        body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
        body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
        body('vehicle.plate').isLength({min: 3}).withMessage('Vehicle plate must be at least 3 characters long'),
        body('vehicle.capacity').isInt({min: 1}).withMessage('Vehicle capacity must be at least 1'),
        body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be one of car, motorcycle, or auto')
    ],
    captainController.registerCaptain
);

module.exports = router;