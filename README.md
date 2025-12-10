## <p align="center"> Pet Health Tracker </p>
<img width="1727" height="966" alt="image" src="https://github.com/user-attachments/assets/3479b3b9-a05d-42b2-aa97-a28de31c72b5" />

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)<br>
Pet Health Tracker es un sistema web diseñado para gestionar de manera integral la salud de mascotas, permitiendo administrar perfiles, historial médico, alimentación y recordatorios automáticos. El proyecto está construido con un enfoque escalable, seguro y mantenible.


## Índice

1. [Funcionalidades](#Funcionalidades)
2. [Requerimientos previos](#requerimientos-previos)
3. [Configuración](#configuración)
4. [Swagger](#swagger)
5. [Tecnologías utilizadas](#tecnologías-utilizadas)
6. [Estructura del proyecto](#estructura-del-proyecto)
7. [Modelo entidad-relación](#modelo-entidad-relación)
8. [Licencia](#licencia)


## Funcionalidades

### 1. Gestión de Usuarios
- Autenticación con JWT  
- Cifrado con BCrypt  
- Endpoints:
  - `POST /api/v1/login`
  - `POST /api/v1/users/register`
  - `POST /api/v1/users/request-password-renewal`
  - `POST /api/v1/users/renew-password`

### 2. Gestión de Mascotas
- CRUD completo  
- Validación de campos y archivos  
- Endpoints:
  - `POST /api/pets`
  - `GET /api/pets/:id`
  - `GET /api/pets`
  - `PUT /api/pets/:id`
  - `DELETE /api/pets/:id`

### 3. Registro de Salud
- Tipos: vacunación, desparasitación, consulta veterinaria  
- Adjuntos (PDF/JPG/PNG)  
- Endpoints:
  - `POST /api/v1/vaccination-events`

### 4. Recordatorios Automáticos
- Recordatorios por usuario  
- Alertas por email o notificaciones internas  
- Endpoint:
  - `GET /api/v1/vaccination-events`
  - `GET /api/v1/vaccination-events/:petId/reminders`

### 5. Dashboard
- Agregación de datos  
- Indicadores clave:
  - Próximas vacunas  
  - Alertas  
  - Eventos próximos  
- Endpoint:
  - `GET /dashboard/:petId`


## Requerimientos previos

- **JDK: Java 21 o superior**
- **Gestor de dependencias: Maven 4.0.0**
- **Spring Boot 3.3.5**
- **Base de datos PostgreSQL**

## Configuración 

  1. Clona el repositorio
     
     ```bash
     git clone https://github.com/ncc-projects/equipo-47.git
     cd equipo-47
  2. Configura las variables de entorno para la conexión a la base de datos desde `application-prod.yml`

     ```yaml
     spring:
      datasource:
        url: ${DB_URL:jdbc:postgresql://localhost:5432/pet_db}
        username: ${DB_USER}
        password: ${DB_PASS}
        driver-class-name: org.postgresql.Driver
      jpa:
    
        hibernate:
          ddl-auto: update
        show-sql: true
    
      server:
        port: 8080
    
      konecta:
        cors:
          allowed-origins: "*"
          allowed-methods: "GET,POST,PUT,DELETE,OPTIONS"
          allowed-headers: "*"
    
      security:
        secret: ${JWT_SECRET}  # Get from env vars
        expiration-ms: ${JWT_EXPIRATION_MS:86400000}

  3. Crea un base de datos vacía con el nombre pet_db
  
  4. Ejecuta el proyecto

  5. La aplicación estará disponible en: http://localhost:8080

## Swagger
Swagger está configurado para generar documentación de la API automáticamente. Puedes acceder a la interfaz de Swagger en la siguiente URL cuando el servidor esté en funcionamiento:
```
http://localhost:8080/swagger-ui/index.html
```

<img width="1898" height="944" alt="image" src="https://github.com/user-attachments/assets/7164ef24-b08f-4bad-81d8-fb76af773a09" />



## Tecnologías utilizadas

- **React**: Biblioteca para construir interfaces web dinámicas y reutilizables.
- **Spring Boot**: Desarrollo rápido y robusto de aplicaciones.
- **Spring Security y JWT**: Autenticación segura.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional.          


## Estructura del proyecto Backend

Arquitectura basada en paquetes funcionales, se organizan  las carpetas de acuerdo con las características o módulos de la aplicación, es un diseño entre aspectos funcionales y principios de Clean Architecture y este tipo de arquitectura agrupa cada módulo con sus propios componentes como controladores, servicios, repositorios y modelos.

      src
      └── main
          ├── java/com/example/petbackend
          │   ├── config
          │   |   ├── datainitializer  -> load data.
          │   |   ├── exceptions       -> Exception handling.
          |   |   ├── responses        -> Response format.
          |   |   ├── security         -> Security settings.
          |   |   └── springdoc        -> Spring doc configuration.
          │   ├── features
          │   |   ├── auth             -> Authentication.
          |   |   ├── owner
          |   |   ├── pet
          |   |   ├── role
          |   |   ├── user
          |   |   ├── vaccineevent 
          |   |   └── vaccinetype 
          |   └── shared                     
          │      ├── service
          |      ├── roleregistrationhandler        
          |      └── util             -> Reusable items.
          └── resources
              └── application.yml     -> Configuration app.
        

## Modelo Entidad Relación
![Image](https://github.com/user-attachments/assets/d2835311-6580-4c8c-9546-f5168985fb99)

</br>

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
</br></br>

> [!IMPORTANT]
> * Agrega la configuración de la bd en `application-prod.yml`
         

</br>
<p align="center">
  <img src="https://img.shields.io/badge/java-white?style=for-the-badge&logo=openjdk&logoColor=white&labelColor=black">
  <img src="https://img.shields.io/badge/SPRINGBOOT-white?style=for-the-badge&logo=spring&logoColor=white&labelColor=%236DB33F">
  <img src="https://img.shields.io/badge/react-white?style=for-the-badge&logo=react&logoColor=white&labelColor=673AB8">
  <img src="https://img.shields.io/badge/postgresql-white?style=for-the-badge&logo=postgresql&logoColor=white&labelColor=4169E1">
</p>
