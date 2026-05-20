import { getDependency } from '../dependency.js';

export class UserService {
    constructor(){
        this.userRepo = getDependency('userRepo');
    }
    async getList(){
        return await this.userRepo.find(); // el find es un metodo de mongoose que devuelve todos los documentos de la coleccion
    }
    
    async add(user){
        if (!user.username)
            throw new Error('El nombre es obligatorio');

        if (!user.password)
            throw new Error('La contraseña es obligatoria');

        if (user.password == '1234')
            throw new Error('La contraseña no puede ser 1234');

        const existentUser = await this.userRepo.find({ //fin devuelve una lista
            username: user.username
        });
        if (existentUser.length)
            throw new Error('El nombre de usuario ya existe');

        return this.userRepo.create(user);
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