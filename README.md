# API con Fastify, Prisma y PostgreSQL

Esta API está construida con Fastify y utiliza Prisma como ORM para interactuar con una base de datos PostgreSQL. La API proporciona endpoints para administrar usuarios y productos, y requiere autenticación para ciertas operaciones.

## Requisitos

- Node.js (versión X.X.X)
- PostgreSQL (versión X.X.X)
- Postman (para probar los endpoints)

## Configuración

1. Clona este repositorio:

git clone <URL_DEL_REPOSITORIO>

2. Instala las dependencias:

cd <DIRECTORIO_DEL_PROYECTO>
npm install

3. Configura la base de datos PostgreSQL en el archivo `.env`:

DB_URL=postgresql://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE_NAME>

4. Ejecuta las migraciones de la base de datos:

npx prisma migrate dev

5. Inicia el servidor:

npm start


El servidor estará disponible en `http://localhost:3000`.

## Endpoints

### Usuarios

- `POST /api/users` - Registro de usuarios.

  **Body:**
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "password": "password123"
  }

- `POST /api/users/login` - Inicio de sesión de usuarios.
  
  **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }


- `GET /api/users` - Obtener todos los usuarios (requiere autenticación).

### Productos
- `POST /api/products` - Crear un nuevo producto (requiere autenticación).

    **Body:**
    ```json
    {
    "title": "Producto 1",
    "price": 9.99,
    "content": "Descripción del producto 1"
    }


- `GET /api/products` - Obtener todos los productos del usuario autenticado.

### Pruebas con Postman

Puedes utilizar la colección de Postman proporcionada para probar los endpoints de la API. Antes de realizar las pruebas, asegúrate de configurar la variable de entorno host con la URL del servidor en Postman.

1. Ejecuta la solicitud Create user para registrar un nuevo usuario.
2. Ejecuta la solicitud Login para obtener el token de acceso.
3. Utiliza el token de acceso en las solicitudes autenticadas como Bearer Token.
Prueba las demás solicitudes de acuerdo a tus necesidades.
4. Recuerda que algunos endpoints requieren autenticación y debes proporcionar el token de acceso obtenido al iniciar sesión.

