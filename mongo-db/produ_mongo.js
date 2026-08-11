import mongoose from 'mongoose';

export default mongoose.model ('produ', new mongoose.Schema({ //definimos un modelo para mongodb
    produname: {type: String, required: true, unique: true},
    precio: {type: String, required: true},
    stock: {type: String, required: true}
})); 

