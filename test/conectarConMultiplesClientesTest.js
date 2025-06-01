const { spawn } = require('child_process');

const NUM_CLIENTES = 5; // Número de clientes que voy a conectar
let clientesTerminados = 0;

console.log('Iniciando prueba de múltiples clientes...\n');

// 1. Inicio el servidor
const server = spawn('node', ['src/server.js']);

server.stdout.on('data', (data) => {
    const output = data.toString();
    console.log('[SERVIDOR]', output.trim());

    // 2. Cuando el servidor esté listo, lanzo los clientes
    if (output.includes('escuchando')) {
        for (let i = 1; i <= NUM_CLIENTES; i++) {
            lanzarCliente(i);
        }
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


// 3. Función para lanzar un cliente 
function lanzarCliente(id) {

    // Ejecuto el cliente una vez que el servidor está listo
    const client = spawn('node', ['src/client.js']);
    
    client.stdout.on('data', (data) => {
        // Muestro la respuesta del cliente
        console.log(`[CLIENTE ${id}]`, data.toString());
    });

    // Respuesta en caso de que el cliente falle
    client.stderr.on('data', (data) => {
        console.error(`[CLIENTE ${id}] ERROR`, data.toString());
    });

    // Mensaje de cierre del cliente
    client.on('close', (code) => {
        console.log(`[CLIENTE ${id}] Finalizó con código ${code}`);
        clientesTerminados++;

        // 4. Cuando todos los clientes terminen, finalizo el servidor
        if (clientesTerminados === NUM_CLIENTES) {
            console.log('\nTodos los clientes han terminado. Cerrando servidor...');
            server.kill();
        }
    });
}
