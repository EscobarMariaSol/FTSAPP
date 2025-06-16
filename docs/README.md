# 📁 Proyecto FTSAPP: Transferencia Segura de Archivos con TLS

Proyecto integrador de la materia Programación sobre Redes, el mismo consiste de un sistema que implementa un cliente y un servidor TLS
en Node.js para la transferencia segura de archivos, asegurando la comunicación cifrada entre los componentes. 
Incluye funcionalidades para listar, subir, descargar y eliminar archivos, con manejo de errores y validaciones básicas.
## 🔐 Tecnologías Utilizadas

- Node.js
- TLS (módulo `tls`)
- HTTPS (Express.js para el servidor web)
- Certificados autofirmados para pruebas
- Módulo `fs` para manejo de archivos

## 📦 Estructura del Proyecto
    |-- node_modules/ # Almacena todas las dependencias (librerías y módulos)
    |-- public/ # Interfaz web estática (HTML/JS)
        |-- index.html
        |-- main.js
        |-- style.css
    |-- src/ # Código funte del proyecto
        |-- certs/ # Certificados TLS (clave y certificado)
            |-- server-cert.pem
            |-- server-csr.pem
            |-- server-key.pem
        |-- downloads/
        |-- files/
        |-- uploads/
        |-- web-server.js # Servidor Web HTTPS con Express (backend que expone la API REST + sirve la UI)
        |-- secure-server.js # Servidor TLS que gestiona archivos
        |-- secure-client.js # Cliente en su versión de consola para pruebas 
        |-- tls-client.js # Cliente en TLS que sube/descarga archivos
    |-- README.md # Este archivo


## ⚙️ Configuración Inicial

### ⚙️ Requisitos previos
- Tener instalado Node.js (v18 o superior recomendada).
- Tener acceso a una terminal / consola de comandos.
- (Opcional) Tener instalado Git para clonar el repositorio.

### 🚀 Instalación y ejecución
- Instalar Node.js (si aún no lo tenés):
    - Visitá https://nodejs.org/
- Descargá el instalador para tu sistema operativo (Windows, macOS o Linux).
- Seguí los pasos del instalador.
- Para verificar que Node.js se instaló correctamente: abrir la terminal y correr los siguientes comandos
   ```
   - node -v
   - npm -v
   ```
   
Ambos comandos deben devolver un número de versión.
## 📘 ¿Qué hace este proyecto?

Este proyecto implementa un sistema de transferencia de archivos cifrada punto a punto utilizando **TLS (Transport Layer Security)**. Permite subir (`PUT`), descargar (`GET`) y ejecutar comandos (`LIST`, `DELETE`, etc.) a través de una conexión segura entre cliente y servidor.

### 🌐 Interfaz web (directorio public/)
El directorio [public/] contiene los archivos que se muestran en el navegador. Son cargados por el servidor web cuando se accede desde un navegador.

Archivos principales:
    - index.html: Define la estructura básica de la página web. Es el punto de entrada visual del proyecto.
    - main.js: Contiene el código JavaScript que maneja las acciones del usuario en la interfaz (como seleccionar un archivo o enviar un comando) y se comunica con el backend vía HTTP.
    - style.css: Define el estilo visual de la página, incluyendo colores, márgenes, fuentes, tamaños y disposición de elementos.

##  🧪 Como probar el proyecto

### 1.Iniciar el servidor TLS (secure-server.js)
Abrir una terminal y ejecutá el servidor seguro:
   ```bash
   node secure-server.js
```
Salida esperada:

    [SERVER] Servidor TLS escuchando en puerto 6000
    
### 2.Iniciar el servidor web (web-server.js)
Abrir otra terminal (sin cerrar la terminal del servidor) y ejecutá el cliente seguro:
   ```bash
   node web-server.js
```
Salida esperada:

    🔐 UI web segura disponible en https://localhost:3000

### 3.Acceder a la interfaz web
1. Abrir navegador 
2. Ir a: https://localhost:3000
3. Aceptar el riesgo del certificado autofirmado.
4. Deberías ver la tabla de archivos del servidor y el formulario para subir archivos.

### 4. Pruebas que se pueden realizar:
1. Ver archivos existentes (LIST)
    - Si hay archivos en src/files/, deberían aparecer en la tabla.
    - Si no hay, debe mostrar el mensaje "No hay archivos en el servidor".

2. Subir archivo (PUT)
    - Seleccionar un archivo desde el formulario.
    - Click en “Subir”.
    - El archivo debe aparecer en la lista.
    - Verificar que no quede ningún archivo temporal en src/uploads/.

3. Descargar archivo (GET)
    - Click en “Descargar” al lado de un archivo.
    - El navegador debe descargar el archivo correctamente.

4. Eliminar archivo (DELETE)
    - Click en “Eliminar”.
    - Confirmar.
    - El archivo debe desaparecer de la lista y eliminarse en src/files/.

5. Renombrar archivo (RENAME)
    - Click en “Renombrar”.
    - Ingresar nuevo nombre (por ejemplo nuevo.txt).
    - El nombre debe actualizarse en la tabla.
