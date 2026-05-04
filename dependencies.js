import { addDependency } from './dependency.js';
import { UserService } from './services/user_service.js';
import { UserMockup } from './mockups/user_mockup.js';

addDependency('userRepo', new UserMockup());
addDependency('userService', new UserService());
