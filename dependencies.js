import { addDependency } from './dependency.js';
import { UserService } from './services/user_service.js';
import { loginService } from './services/login_service.js';
import { SessionService } from './services/session_service.js';
import UserMongo from './mongo-db/user_mongo.js'; //importamos el modelo de usuario de mongo
import sessionMongo from './mongo-db/session_mongo.js'; //importamos el modelo de session de mongo
import ProductMongo from './mongo-db/produ_mongo.js'; //importamos el modelo de producto de mongo
import { ProductService } from './services/produ_service.js'; //importamos el servicio de producto

addDependency('userRepo', UserMongo);
addDependency('sessionRepo', sessionMongo);
addDependency('productRepo', ProductMongo); 

addDependency('userService', new UserService());
addDependency('sessionService', new SessionService());
addDependency('loginService', new loginService());
addDependency('productService', new ProductService());  

