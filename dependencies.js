import { addDependency } from './dependency.js';
import { UserService } from './services/user_service.js';
//import { UserMockup } from './mockups/user_mockup.js';
import UserMongo from './mongo-db/user_mongo.js'; //importamos el modelo de usuario de mongo

addDependency('userRepo', UserMongo);
addDependency('userService', new UserService());
