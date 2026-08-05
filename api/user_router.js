import { getDependency } from "../dependency.js";
import checkRoleMiddleware from "../middlewares/check_role_middleware.js";

export function configureUserRouter(router) {
    const UserService = getDependency('userService');

    console.log('Configurando rutas de usuario');
   
    router.get('/users', checkRoleMiddleware (['admin']), async (req, res) => {
        const users = await UserService.getList();
        res.json(users.map(user => ({ 
            username: user.username,
            displayName: user.displayName,
            email: user.email,
            role: user.role
        })));
    });

    router.get('/users/:username', async (req, res) => {
        const name = req.params.username;
        const user = await UserService.getByName(name);
        if (user) {
            res.json({ 
                username: user.username,
                displayName: user.displayName,
                email: user.email,
                role: user.role
            });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    });

    router.post('/users', checkRoleMiddleware(['admin']), async (req, res) => { //agregar middlware check
        const user = req.body; 
        const newUser = await UserService.add(user);
        res.json({ newUser });
    });

    router.delete('/users/:username', async (req, res) => {
        const deleted = await UserService.deleteByName(req.params.username);
        if (!deleted) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json({ message: "Usuario eliminado" });
    });

    router.patch('/users/:username', async (req, res) => {
        const name = req.params.username;
        const updates = req.body;
        const updatedUser = await UserService.updateByName(name, updates);
    });
}
//funciones asincronicas