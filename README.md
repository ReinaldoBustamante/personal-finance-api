# Instrucciones

## 1. Preparar entorno

### Crear base de datos local
Sigue los pasos a continuación para configurar y poner en marcha la base de datos local:

1. #### Instalar Docker Desktop.
    - Descarga e instala Docker Desktop desde el siguiente enlace: [Docker desktop](https://www.docker.com/products/docker-desktop/)

2. #### Configurar variables de entorno.
    - Crea un archivo .env a partir de la plantilla proporcionada en el archivo .env.template.

    - Abre el archivo .env.template, personaliza las variables de entorno según tus necesidades y guárdalo como .env en el mismo directorio.

3. Iniciar los contenedores
    - Ejecuta el siguiente comando en tu terminal para levantar los contenedores de Docker en segundo plano:
    
        ```
        docker compose up -d
        ```

> [!NOTE]
> Una vez instalado Docker, reinicia el ordenador 