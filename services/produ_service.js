import { getDependency } from '../dependency.js';

export class ProductService {
    constructor(){
        this.productRepo = getDependency('productRepo');
    }
    async getList(){
        return await this.productRepo.find(); // el find es un metodo de mongoose que devuelve todos los documentos de la coleccion
    }

    async getByUsername(produname){
        return await this.productRepo.findOne({produname});
    }
    
    async add(produ){
        if (!produ.produname)
            throw new Error('El nombre es obligatorio');

        if (!produ.precio)
            throw new Error('El precio es obligatorio');

        if (!produ.stock)
            throw new Error('El stock es obligatorio');
        const existentProdu = await this.productRepo.findOne({ //fin devuelve una lista
            produname: produ.produname
        });
        if (existentProdu){
            throw new Error('El producto ya existe');
        }
        return await this.productRepo.create(produ);
    }

    async deleteByName(produname){
        const produ = await this.productRepo.findOne({produname});
        if (!produ)
            throw new Error('El producto no existe');
        await this.productRepo.deleteOne({produname});
    }
    async updateByName(produname, produ){
        const existentProdu = await this.productRepo.findOne({produname});
        if (!existentProdu){
            throw new Error('El producto no existe');
        }
        
        return this.productRepo.updateOne({produname}, produ);
    }   
}