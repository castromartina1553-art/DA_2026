import { getDependency } from '../dependency.js';

export class SessionService {
    constructor(){
        this.sessionRepo = getDependency('sessionRepo');
    }

    async getByToken(token){
        return await this.sessionRepo.findOne({ authorizationToken: token});
    }

    createToken(){
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => ('0' + byte.toString(16)).slice(-2)).join('');

    }

    async createForUser(user){
        var authorizationToken;
        do{
            authorizationToken = this.createToken();
        } while (await this.getByToken(authorizationToken));

        const session ={
            username: user.username,
            authorizationToken,
            role: user.role,
            open: new Date().toISOString()
        }; 

        return await this.sessionRepo.create(session);
    }
}


