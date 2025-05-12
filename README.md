# 📝 Todo Frontend

Este proyecto es una aplicación web construida con **Angular 19** y **TailwindCSS**, que permite gestionar tareas (To-Do) con funcionalidades de autenticación y filtrado por estado. Es el cliente del sistema de gestión de tareas.

---

## 🚀 Tecnologías utilizadas

- Angular 19
- TypeScript
- TailwindCSS
- RxJS
- Angular Forms
- Angular Standalone Components

---

## 📁 Arquitectura utilizada

El proyecto implementa una **arquitectura modular basada en componentes y servicios**, siguiendo buenas prácticas recomendadas por Angular. La estructura favorece la escalabilidad, mantenimiento y reutilización del código.

### 1. Presentación (UI)

- Carpeta `components`: contiene elementos reutilizables (formularios, botones, listas).
- Carpeta `pages`: contiene vistas completas de la app (como "Inicio", "Tareas", etc.).

### 2. Servicios

- Carpeta `core/services`: contiene la lógica de negocio y la comunicación con la API.
- Uso de inyección de dependencias para desacoplar lógica y facilitar pruebas.

### 3. Modelos y utilidades

- Carpeta `core/models` y otros archivos en `core`: definen las entidades (`Task`) y utilidades como filtros o enums.
- Permiten un tipado fuerte y mayor claridad en los datos.

### 4. Configuración global (Core)

- Carpeta `core`: centraliza elementos compartidos (servicios, modelos, lógica común).
- Mejora la organización y reduce la duplicación de código.

---

## 📦 Instalación y ejecución del proyecto

Sigue los pasos a continuación para ejecutar la aplicación localmente:

```bash
# 1. Clonar el repositorio
git clone https://github.com/Miguelito250/todo-frontend.git
cd todo-frontend

# 2. Instalar dependencias
npm install

# 3. Ejecutar la aplicación en modo desarrollo
ng serve
```

[! NOTE]
> Importantea tener en cuenta
> 
> En la carpeta de environments asegurese de que la ruta de la API esta apuntando al puerto 7287.
