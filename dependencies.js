import { addDependency } from './dependency.js';
import { UserService } from './services/user_service.js';
import { loginService } from './services/login_service.js';
import { SessionService } from './services/session_service.js';
import UserMongo from './mongo-db/user_mongo.js'; //importamos el modelo de usuario de mongo
import sessionMongo from './mongo-db/session_mongo.js'; //importamos el modelo de session de mongo

addDependency('userRepo', UserMongo);
addDependency('sessionRepo', sessionMongo);

addDependency('userService', new UserService());
addDependency('loginService', new loginService());
addDependency('sessionService', new SessionService());

