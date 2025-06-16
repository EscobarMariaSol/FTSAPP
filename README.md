# 📁 Transferencia Segura de Archivos con TLS

Este proyecto implementa un sistema de transferencia de archivos cifrada punto a punto utilizando **TLS (Transport Layer Security)**. Permite subir (`PUT`), descargar (`GET`) y ejecutar comandos (`LIST`, `DELETE`, etc.) a través de una conexión segura entre cliente y servidor.

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
    |-- web-server.js # Servidor HTTPS con Express (frontend)
    |-- secure-server.js # Servidor TLS que recibe archivos
    |-- secure-client.js # Cliente en su versión de consola para pruebas 
    |-- tls-client.js # Cliente en TLS que sube/descarga archivos
|-- README.md # Este archivo


## ⚙️ Configuración Inicial

1. **Generar certificados TLS autofirmados:**

```bash
mkdir certs
openssl req -x509 -newkey rsa:4096 -keyout certs/server-key.pem -out certs/server-cert.pem -days 365 -nodes
