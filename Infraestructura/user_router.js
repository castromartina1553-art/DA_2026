export function configureUserRouter(router) {
    router.get('/users', (req, res) => {  // Lógica para obtener usuarios
        res.json('Lista de usuarios');
    });
}