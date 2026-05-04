import { getDependency } from '../dependency.js';

export class UserService {
    constructor(){
        this.userRepo = getDependency('userRepo');
    }
    getList(){
        return this.userRepo.getList();
    }
    
    add(user){
        if (!user.name)
            throw new Error('El nombre es obligatorio');

        if (!user.password)
            throw new Error('La contraseña es obligatoria');

        if (user.password == '1234')
            throw new Error('La contraseña no puede ser 1234');

        const existentUser = this.userRepo.getByName(user.name);
            if (existentUser)
                throw new Error('El nombre de usuario ya existe');

        return this.userRepo.add(user);
    }
    deleteByName(name){
        const user = this.userRepo.getByName(name);
        if (!user)
            throw new Error('El usuario no existe');
        this.userRepo.deleteByName(name);
    }
    updateByName(name, user){
        const existentUser = this.userRepo.getByName(name);
        if (!existentUser)
            throw new Error('El usuario no existe');

        if (user.password == '1234')
            throw new Error('La contraseña no puede ser 1234');

        return this.userRepo.updateByName(name,user);
    }   
}