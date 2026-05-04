import { getDependency } from "../dependency.js";

export function configureUserRouter(router) {
    const UserService = getDependency('userService');

    console.log('Configurando rutas de usuario');
    router.get('/users', (req, res) => {
        const users = UserService.getList();
        res.json(users.map(user => ({ name: user.name})));
    });
    router.post('/users', (req, res) => {
        const user = req.body;
        const newUser = UserService.add(user);
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