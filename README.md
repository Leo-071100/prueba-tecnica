# Prueba técnica – React Native Developer

Este repositorio contiene una app base para evaluar habilidades de mantenimiento y desarrollo evolutivo en React Native.

## Stack base

- Expo
- React Native
- TypeScript
- Redux Toolkit
- React Navigation

## Objetivo

Trabajar sobre una app existente para completar funcionalidades, corregir errores y documentar la solución.

## Requerimientos

1. Consumir correctamente los datos y mostrar el listado.
2. Implementar manejo de `loading`, `error`, `empty state` y `pull to refresh`.
3. Mantener el estado global con Redux Toolkit o equivalente.
4. Agregar al menos una mejora funcional, por ejemplo:
   - filtro por prioridad,
   - búsqueda,
   - favoritos,
   - persistencia local,
   - edición simple.
5. Corregir los bugs detectados en la app base.
6. Documentar en este README:
   - cómo ejecutar el proyecto,
   - qué corregiste,
   - qué mejoras agregaste,
   - qué harías diferente para producción.

## Pistas

La app incluye intencionalmente algunos problemas para revisar el criterio técnico del candidato.

## Entregables esperados

- Repositorio con la solución.
- Commits claros.
- README actualizado.

## Criterios de evaluación

- Calidad y claridad del código.
- Manejo de asincronía y estado.
- Resolución de bugs.
- UX básica móvil.
- Organización del repositorio.
- Capacidad para explicar decisiones técnicas.

## Cómo ejecutar el proyecto

Instalaciones necesarias:

- **Node.js**: v20 o v22 (LTS recomendada).
- **npm** o **yarn** o algún otro instalador de paquetes.
- **Aplicación Expo Go**: Ya sea instalada en un dispositivo físico o emulador.

Para ejecutar el proyecto localmente:

1. **Instalar dependencias:**

   ```bash
   npm install
   ```

1. **Iniciar el servidor de desarrollo:**
   ```bash
   npx expo start
   ```

## Retos Técnicos y Soluciones

Durante la configuración inicial del proyecto, se presentaron los siguientes incidentes que fueron resueltos exitosamente:

### 1. Error de Sintaxis en el Bundler (Unexpected keyword 'const')

Al intentar ejecutar el proyecto con **Node v22**, surgió un error de compilación en las dependencias de `react-native` relacionado con los modificadores de tipos en TypeScript.

- **Solución:** Se realizó una limpieza profunda de `node_modules` y se eliminó el `package-lock.json` y sel limpió la caché de npm para volver a instalar las dependencias y por último se ejecutó `npx expo start -c` para borrar el caché de Metro y forzar una re-compilación limpia compatible con el entorno actual.
