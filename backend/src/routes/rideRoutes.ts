import { Router } from 'express';
import { requestRide, getRideHistory } from '../controllers/rideController';

const router = Router();

router.post('/request-ride', requestRide);
router.get('/ride-history', getRideHistory);

export default router;
