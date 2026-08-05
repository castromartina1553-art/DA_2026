import { getDependency } from '../dependency.js';
import bcrypt from 'bcrypt';

export class loginService {
    constructor(){
        this.UserService = getDependency('userService');
        this.SessionService = getDependency('sessionService');
        this.sessionRepo = getDependency('sessionRepo');   
    }
     
    createToken(){
        const array = new Uint32Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');  
    }

    async login(data){
        if (!data.username)
            throw new Error('El nombre es obligatorio');

        if (!data.password)
            throw new Error('La contraseña es obligatoria');

        const user = await this.UserService.getByUsername(data.username);
    
        if (!user)
            throw new Error('Usuario o contraseña incorrectos');

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch)
            throw new Error('Contraseña incorrecta');

        //if (user.password != data.password)
        //    throw new Error('Contraseña incorrecta');

        var authorizationToken;
        do{ 
            authorizationToken = this.createToken();
        } while (await this.sessionRepo.findOne({authorizationToken}));

        const session =  await this.SessionService.createForUser(user);

        return {
            authorizationToken: session.authorizationToken,
            username: session.username,
            role: user.role
        };
    }
    
}