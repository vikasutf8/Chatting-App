import { Router } from 'express';
import auth from '../middlewares/auth';
import { register,login } from '../controllers/User.controllers';
import { getAssignments,acceptAssignment,rejectAssignment, } from '../controllers/Admin.controllers';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/assignments', auth, getAssignments);
router.post('/assignments/:id/accept', auth, acceptAssignment);
router.post('/assignments/:id/reject', auth, rejectAssignment);

export default router;