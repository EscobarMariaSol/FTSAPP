/*Pruebas realizadas sobre la versión 1 de FTSAPP*/

const { spawn } = require('child_process');

//Puebo la conexión con un cliente

console.log('Iniciando prueba de conexión cliente-servidor...\n');

// 1. Inicio el servidor
const server = spawn('node', ['src/server.js']);


server.stdout.on('data', (data) => {

    const output = data.toString();
    // Muestro la respuesta del servidor
    console.log('[SERVIDOR]', output);

    if (output.includes('escuchando')) {
        
        // 2. Ejecuto el cliente una vez que el servidor está listo
        const client = spawn('node', ['src/client.js']);

        client.stdout.on('data', (data) => {
            // Muestro la respuesta del cliente
            console.log('[CLIENTE]', data.toString());
        });

        // Respuesta en caso de que el cliente falle
        client.stderr.on('data', (data) => {
            console.error('[CLIENTE ERROR]', data.toString());
        });

        // Mensaje de cierre del cliente
        client.on('close', (code) => {
            console.log(`\nCliente finalizó con código ${code}`);

            // 3. Finalizo el servidor después de prueba
            server.kill();
        });
    }
});

// Respuesta en caso de que el servidor falle
server.stderr.on('data', (data) => {
    console.error('[SERVIDOR ERROR]', data.toString());
});

// Mensaje de cierre del servidor
server.on('close', (code) => {
    console.log(`\nServidor finalizó con código ${code}`);
});
