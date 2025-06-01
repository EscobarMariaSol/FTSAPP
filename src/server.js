// server.js
// Este archivo constituye la base del servidor para el proyecto FTSApp.
// Utilizaremos Node.js y el módulo 'net' para crear un servidor TCP básico que acepte conexiones de clientes
// y envíe un mensaje de bienvenida.

// Importamos el módulo 'net' de Node.js, que nos permite trabajar con sockets TCP.
const net = require('net');

// Define el número de puerto en el que el servidor escuchará las solicitudes. 
// Este número puede elegirse libremente (siempre y cuando no esté en uso y se tenga permiso), 
// pero debe ser consistente con el puerto que el cliente utilice para conectarse.
const PORT = 5000;

// Crea un servidor TCP. 
// La función callback que se pasa como argumento se ejecuta cada vez que un nuevo cliente
// establece una conexión.
// socket: Es el objeto que representa la conexión con el cliente. 
// A través de este objeto se pueden enviar y recibir datos.
const server = net.createServer((socket) => {
    // Muestra en la consola la dirección IP y el puerto del cliente que se conectó, 
    // lo que ayuda a verificar que el servidor está recibiendo conexiones correctamente.
    // socket.remoteAddress y socket.remotePort contienen la dirección IP y el puerto del cliente que se conecta.
    console.log('Conexión establecida con:', socket.remoteAddress, 'en el puerto', socket.remotePort);
    
    // Enviamos un mensaje de bienvenida al cliente.
    // socket.write() se utiliza para enviar datos a través del socket.
    socket.write('Bienvenido a FTSApp - Servidor en Node.js\n');

    // Después de enviar el mensaje, cerramos la conexión.  
    // Este método indica que no se enviarán más datos y cierra la conexión de forma ordenada
    // socket.end() finaliza la conexión, enviando una señal de cierre al cliente.
    socket.end();
});

// Configura el servidor para que escuche en el puerto especificado. 
// Cuando el servidor esté listo, la función callback se ejecuta y muestra un mensaje en la consola 
// confirmando que el servidor está en funcionamiento.
// La función callback pasada a server.listen() se ejecuta cuando el servidor comienza a escuchar.
server.listen(PORT, () => {
    console.log(`Servidor FTSApp escuchando en http://localhost:${PORT}`);
});
