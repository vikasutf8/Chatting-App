import { Router } from 'express';
import { register,login,uploadAssignment } from '../controllers/User.controllers';
import auth from '../middlewares/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/upload', auth, uploadAssignment);

export default router;