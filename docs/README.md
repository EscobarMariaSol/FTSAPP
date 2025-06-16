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
- Instalar Node.js:
    - Visitar https://nodejs.org/
- Descargar el instalador para tu sistema operativo (Windows, macOS o Linux).
- Seguir los pasos del instalador.
- Para verificar que Node.js se instaló correctamente se debe abrir la terminal y correr los siguientes comandos:
   ```
   - node -v
   - npm -v
   ```
   
Ambos comandos deben devolver un número de versión.
## 📘 ¿Qué hace este proyecto?

Este proyecto implementa un sistema de transferencia de archivos cifrada punto a punto utilizando **TLS (Transport Layer Security)**. Permite subir (`PUT`), descargar (`GET`) y ejecutar comandos (`LIST`, `DELETE`, etc.) a través de una conexión segura entre cliente y servidor.

### 🌐 Interfaz web (directorio public/)
El directorio [public/] contiene los archivos que se muestran en el navegador. Son cargados por el servidor web cuando se accede desde un navegador.

#### Archivos principales:
- index.html: Define la estructura básica de la página web. Es el punto de entrada visual del proyecto.
- main.js: Contiene el código JavaScript que maneja las acciones del usuario en la interfaz (como seleccionar un archivo o enviar un comando) y se comunica con el backend vía HTTP.
- style.css: Define el estilo visual de la página, incluyendo colores, márgenes, fuentes, tamaños y disposición de elementos.

### 🧠 Estructura del código fuente (src/)
El directorio src/ contiene el código fuente principal del sistema. Aquí se ubican los directorios y archivos que definen la lógica del proyecto:

#### 🧩 Detalle de los componentes principales
Esta sección describe el propósito y funcionamiento de los archivos clave que conforman el sistema de transferencia de archivos con conexión segura:

- **📄 secure-server.js – Servidor TLS (Transferencia segura)**

    Este archivo implementa un servidor TLS puro, que escucha conexiones seguras desde clientes intermedios (tls-client.js) para realizar operaciones de archivos:
    - Escucha en el puerto 6000 usando un certificado y clave privada (server-cert.pem y server-key.pem).
    - Soporta comandos como:
        - LIST: devuelve una lista de archivos disponibles.
        - GET <archivo>: envía un archivo solicitado.
        - PUT <archivo>: recibe y guarda un archivo.
    - Verifica la integridad del comando recibido antes de ejecutar acciones.
    - Solo responde a clientes que usen TLS con certificado verificado.
    - Es el núcleo de almacenamiento seguro del sistema.

- **📄 secure-client.js – Cliente Web (Express + HTTPS)**
    Este archivo es un servidor web con Express que expone una interfaz web segura para el usuario final. Sus principales características:
    - Utiliza HTTPS con TLS, montado sobre Express.
    - Sirve el contenido estático desde el directorio public (HTML, JS y CSS).
    - Expone rutas como:
        - GET /: muestra el frontend (index.html).
        - POST /upload: permite subir archivos. 
        - GET /files/:filename: descarga archivos.
    - Actúa como puente entre el navegador del usuario y el cliente TLS (tls-client.js), enviando los comandos apropiados al backend seguro.
    - Es el interfaz web segura del sistema.

- **📄 tls-client.js – Cliente TLS intermediario**
    Este módulo conecta el servidor Express (secure-client.js) con el servidor TLS (secure-server.js) y maneja las operaciones seguras:
    - Provee funciones:
        - sendCommand: para enviar comandos como LIST.
        - getFile: para descargar archivos.
        - putFile: para subir archivos con confirmación del servidor.
    - Se asegura de esperar el READY: PUT antes de subir un archivo.
    - Verifica que la subida fue exitosa antes de borrar el archivo temporal.
    - Es el módulo intermedio que traduce acciones web en comandos TLS.

- **📄 web-server.js – Alternativa simple sin TLS**
    Este archivo levanta un servidor HTTP Express sin cifrado, útil para pruebas locales rápidas:
    - Sirve el contenido del directorio public.
    - No implementa rutas de subida ni conexión TLS.
    - Útil para desarrollo sin certificados ni puertos seguros.
    - Es una alternativa básica de desarrollo que se puede usar mientras se prueba el frontend.

#### 🔐 Certificados (certs/)
El directorio certs/ almacena los certificados y claves necesarias para establecer conexiones TLS seguras. Estos archivos permiten que cliente y servidor verifiquen su identidad mutuamente.
- 🧱 server-key.pem: Este archivo contiene la clave privada RSA del servidor. Es crucial para el cifrado TLS, ya que se utiliza para firmar digitalmente los datos que el servidor envía, permite al servidor desencriptar datos que fueron cifrados con su clave pública, y valida que el servidor es quien dice ser (en combinación con su certificado).
- 🧱 server-cert.pem: Este archivo es el certificado digital del servidor. Contiene, la clave pública del servidor, la información sobre el servidor (nombre de dominio, organización, fechas de validez, etc.) y una firma digital que verifica la autenticidad del certificado.
- 🧱 server-csr.pem: Certificate Signing Request (CSR), o Solicitud de Firma de Certificado. 
Archivo que se genera cuando se quiere obtener un certificado digital firmado por una Autoridad Certificadora (CA). 
Este archivo contiene la clave pública del servidor, la información del propietario (nombre, organización, dominio, etc.) y una firma digital generada con la clave privada correspondiente.
- ⚠️ **Sugerencia de buenas prácticas:** Estos archivos no deben compartirse públicamente en entornos reales. En este proyecto se usan solo con fines educativos o de testing local.

#### 📥 Descargas (downloads/)
Este directorio es utilizado por el cliente TLS (tls-client.js) para guardar localmente los archivos descargados desde el servidor.
Cuando se usa el comando GET, el archivo transferido por el servidor se almacena en esta carpeta.

#### 📁 Archivos del servidor (files/)
La carpeta files/ actúa como el almacén principal del servidor TLS. Aquí se guardan los archivos disponibles para ser descargados por los clientes.
- Los archivos que suben los clientes con PUT se almacenan automáticamente aquí.
- Los comandos como LIST o GET se aplican sobre los contenidos de este directorio.

#### 📤 Subidas temporales (uploads/)
Esta carpeta puede ser utilizada por el sistema para manejar archivos temporales subidos desde la interfaz web antes de enviarlos al servidor TLS. Por ejemplo, el servidor web-server.js puede recibir un archivo desde el navegador y dejarlo momentáneamente en uploads/, antes de reenviarlo al secure-server.js.


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

## 📝 Ducumentación de Pruebas realizadas

### Pruebas sobre la terminal

- **Corrida del servidor desde la terminal de VSCode:**
![corrida_secure_server](../docs/img/corrida_secure_server.png)

- **Corrida del servidor Web:**
![corrida_web_server](../docs/img/Corrida_web_server.png)

- **Corrida del cliente desde la terminal:**
![corrida_secure_client](../docs/img/corrida_secure_client.png)

- **Ejecutando los comandos LIST y GET, desde la terminal del cliente:**
![Comandos list a¿y get](../docs/img/get_archivo.png)

- **Ejecutando el comando PUT (captura.png):**

Podemos ver que al ejecutar el comando PUT en nuestro directorio "files" aparece el archivo captura.png, y si hacemos un get
ahora nos trae también este archivo.

![Camando PUT](../docs/img/cliente_put&list.png)

- **Ejecutando el comando RENAME (rename captura.png -> gantt.png):**
![comando rename](../docs/img/rename_terminal.png)

- **Ejecutando el comando DELETE (delete del archivo enviroment):**
![Comando delete](../docs/img/delete_terminal.png)

- **Error por cerrar el servidor:**
![Error de cierre del servidor](../docs/img/cierreDelServidor.png)

- **Respuestas del servidor abriendo varias pestañas desde el navegador:**
![server con varias conexiones](../docs/img/server_varias_conexiones.png)

- **Respuestas del servidor luego de cargar un archivo nuevo:**

Se cargó un archivo desde el navegador:
![Carga de archivo](../docs/img/cargar_nuevo_archivo.png)

Vemos la respuesta del servidor
![Respuesta del servidor](../docs/img/carga.png)

### Pruebas sobre la página web:

- **Carga de la pagina web:**
![Carga_pagina_principal](../docs/img/image.png)

- **Pagina web con archivos cargados:**
![Lista de archivos](../docs/img/localhost_con_archivos_cargados.png)

- **Cargar un nuevo archivo y descargar un archivo:**

Podemos ver que se ha cargado un nuevo archivo llamado "env", además si elegimos descargar un archivo, 
podemos ver que se ha descargado (Pop up del navegado en la esquina superior derecha).
![carga de archivo env](../docs/img/Carga%20de%20aarchivo%20env.png)

- **Eliminar un archivo:**

Si hacemos click en el bcls
otón eliminar a la derecha de un archivo, vemos que se ha eliminado el archivo
captura de pantalla.
![Eliminar un archivo](../docs/img/eliminar_archivo.png)

- **Renombrar un archivo: "env" -> "enviroment":**
![renombrar un archivo](../docs/img/renombrar_archivo.png)
