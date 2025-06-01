// client.js
// Este archivo constituye la base del cliente para el proyecto FTSApp.
// El cliente se conectará al servidor para recibir el mensaje de bienvenida.

// Importa el módulo "net" que es parte del core de Node.js. 
// Este módulo permite crear servidores y clientes utilizando sockets TCP, 
// lo que es fundamental para la comunicación en red.

const net = require('net');

// Definimos el puerto y la dirección del servidor al que nos conectaremos.
// Estas constantes deben coincidir con las definidas en el servidor.
// Estas constantes definen la dirección y el puerto a los que el cliente se conectará. 
// Es vital que coincidan con los del servidor para que la conexión se establezca correctamente.

const PORT = 5000;
const HOST = 'localhost';

// Creamos un nuevo socket para el cliente usando el constructor net.Socket().
// Crea un nuevo objeto de tipo Socket que se utilizará para conectarse al servidor. 
// Este objeto proporciona métodos para establecer conexiones, enviar y recibir datos.
const client = new net.Socket();

// Conectamos al servidor FTSApp utilizando client.connect().
// El primer argumento es el puerto y el segundo es la dirección del servidor.
// Conecta el cliente al servidor. Cuando la conexión se establece, 
// se ejecuta el callback que imprime un mensaje en la consola indicando que la conexión fue exitosa.
client.connect(PORT, HOST, () => {
    console.log('Conectado al servidor FTSApp en Node.js');
});

// Escuchamos el evento 'data' del cliente, que se dispara cuando se reciben datos del servidor.
// Este evento se dispara cuando el cliente recibe datos del servidor.
// data: Es un objeto Buffer que contiene la información recibida. Se convierte a cadena con
// data.toString() para mostrarla en la consola.
// Después de recibir el mensaje, se cierra la conexión utilizando client.destroy()
client.on('data', (data) => {
    // data es un Buffer; usamos toString() para convertirlo en una cadena legible.
    console.log('Mensaje recibido del servidor:', data.toString());
    // Una vez recibidos los datos, cerramos la conexión con client.destroy().
    client.destroy();
});

// Manejamos el evento 'error' para capturar y mostrar cualquier error en la conexión.
// Esto es útil para depurar problemas en la comunicación.
client.on('error', (err) => {
    console.error('Error en la conexión:', err.message);
});
