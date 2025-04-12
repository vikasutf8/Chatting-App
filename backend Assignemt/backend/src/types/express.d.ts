import { Request } from 'express';

import { User } from '../models/User';
import { Assignment } from '../models/Assignment';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Add the user object to the request if you're using authentication middleware
      assignment?: Assignment; // Add the assignment object if needed
    }
  }
}

