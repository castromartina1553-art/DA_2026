import { getDependency } from "../dependency.js";
import checkRoleMiddleware from "../middlewares/check_role_middleware.js";

export function configureProduRouter(router) {
    const ProductService = getDependency('productService');

    console.log('Configurando ruta de productos');

    router.get('/products', async (req, res) => {
        const products = await ProductService.getList();
        res.json(products.map(product => ({ 
            produname: product.produname,
            precio: product.precio,
            stock: product.stock
        })));
    });

    router.post('/products', checkRoleMiddleware(['admin']), async (req, res) => {
        try{
            const product = req.body; 
            const newProduct = await ProductService.add(product);
            res.json({ newProduct });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    router.delete('/products/:produname',checkRoleMiddleware(['admin']), async (req, res) => {
        try{
        const deleted = await ProductService.deleteByName(req.params.produname);
        res.json({ message: "Producto eliminado" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    router.patch('/products/:produname',checkRoleMiddleware(['admin']), async (req, res) => {
        try {
        const produname = req.params.produname;
        const updates = req.body;  
        const updatedProduct = await ProductService.updateByName(produname, updates);
        res.json({ message: "Producto actualizado", updatedProduct });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
}
