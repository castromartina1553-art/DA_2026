import { configureUserRouter } from './user_router.js';
import { configureLoginRouter } from './login_router.js';

export function configureRouter(router){
    console.log('Configurando rutas..')
    configureUserRouter(router);
    configureLoginRouter(router);
}
///agregamos en user y lo colocamos aca