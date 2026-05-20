import { getDependency } from "../dependency.js";

export function configureUserRouter(router) {
    const UserService = getDependency('userService');

    console.log('Configurando rutas de usuario');
    router.get('/users', async (req, res) => {
        const users = await UserService.getList();
        res.json(users.map(user => ({ 
            username: user.username,
            displayName: user.displayName,
            email: user.email,
            role: user.role
        })));
    });
    router.post('/users', async (req, res) => {
        const user = req.body;
        const newUser = await UserService.add(user);
        res.json({ newUser });
    });
    router.delete('/users/:name', (req, res) => {
        const name = req.params.name;
        UserService.deleteByName(name);
        res.json({ message: 'Usuario eliminado' });
    });
    router.patch('/users/:name', (req, res) => {
        const name = req.params.name;
        const user = req.body;
        UserService.updateByName(name, user);
        res.json({ message: 'Usuario actualizado' });
    });
}
//funciones asincronicas
//instalar libreria