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

### 2. Consumo correcto de datos 

Se corrigió una dependencia circular en el useEffect de la pantalla principal. Originalmente, incluía items.length como dependencia, lo que provocaba re-ejecuciones innecesarias de la petición de carga. 

- **Solución:** Se ajustó para que la carga inicial ocurra únicamente al montar el componente.


Originalmente, en la lista se mostraban 5 elementos a pesar de que en el mock de datos, solo se mostraban 4. 

- **Solución:** Modifiqué el `return` de la función `fetchTickets()` ya que estaba devolviendo 2 arrays, uno con todos los datos y otro más con solo el primer elemento de la lista, esto provocaba que al renderizar los tickets apareciera 1 extra.

### 3. Actualización de estado

Al momento de preionar el botón para `Marcar como resuelto` el ticket, no se actualizaba el estado a pesar de que marca que la operación fue exitosa.

- **Solución:** Se estaba actualizando directamente el status en la función `updateTicketStatus()` y luego regresaba el objeto lo cual provoca que nunca se enteraran de los cambios, por lo que decidí en el return traer todo el objeto y actualizar el valor de status

### 4. Manejo de errores en changeTicketStatus()

En el slice de los tickets, agregué los casos `pending` y `reject` para en caso de que ocurra algo inesperado al momento de actualizar el status del ticket y así poder, además, brindarle feedback al usuario

## Mejoras

### 1. Optimización del listado de tickets

Se optimizó el `FlatList` extrayendo el `renderItem` fuera y envolviéndolo de un `useCallback` para evitar una re-renderización en caso de que la lista de tickets crezca. Además de esto, se modificó el valor de `keyExtractor` ya que se estaba utilizando el index del elemento como `id` cuando lo ideal es utilizar el propio id del elemento.

Un ajuste más en esta pantalla fue la optimización de la lógica para mostrar algo cuando existe un error o cuando no existen datos. Para esto, opté por utilizar la propiedad `ListEmptyComponent` para el caso de que no haya tickets para mostrar o haya un error con el listado, mientras que para el caso de que aún estén cargando los datos, puse esa lógica fuera del return principal para mantener legibilidad y no anidar tantas condiciones y hacer uso excesivo del operador ternario.

### 2. Búsqueda de ticket en pantalla de detalle

Noté que a pesar de usar el hook `useMemo` para realizar una búsqueda de ticket por `id`, puede no ser lo más conveniente para escalar la app, pues lo que se estaba haciendo era traer todos los datos y luego hacer una búsqueda sobre los mismos, por lo que decidí dejar que redux haga la búsqueda con el id proporcionado y solo me regrese el elemento corresponidiente en lugar de regresar todos.

### 3. Mejorar el UX en la pantalla de detalle

Al marcar como completado un ticket, puede que al usuario le falte un poco de feedback ya que al presionar el botón de `Marcar como terminado`, si bien el estado cambia a `resolved` no había algo claro que diera esa pista para que el usuario se entere de lo que pasó, por lo que agegué un estado para que el usuario pueda saber que se está haciendo algo al presionar el botón y un indicador para que cuando vuelva a la pantalla sepa que ese ticket ya está resuelto y además, una vez que se marcó, el presionar la alerta, lo lleve a la pantalla del listado


### 4. Barra de búsqueda en pantalla principal

Como mejora funcional, creé una barra de búsqueda en el listado de tickets para que ahora, además de poder filtrar por status, el usuario pueda buscar algún ticket por nombre o alguna palabra clave.

### 5. 
