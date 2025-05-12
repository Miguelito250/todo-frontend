# Análisis del Componente app-form

El componente **app-form** es un formulario dinámico construido con Angular Reactive Forms que permite crear formularios configurables mediante un conjunto de inputs y validadores definidos externamente.

## Funcionamiento General

- Recibe como entradas (`@Input`):
  - `classParent`: Clase CSS para aplicar al formulario.
  - `inputs`: Arreglo de objetos que definen los campos del formulario, con propiedades como nombre, tipo, valor inicial, placeholder, validadores, etc.
  - `configActionsButtons`: Configuración para los botones de acción del formulario (ej. enviar, cancelar).

- Expone eventos (`@Output`):
  - `cancelAction`: Evento que se emite cuando se cancela el formulario.
  - `formValues`: Emite el objeto `FormGroup` completo cuando se envía el formulario.

- Construye dinámicamente un `FormGroup` con controles para cada input, asignando valores iniciales y validadores.

- Escucha cambios en controles específicos para ejecutar funciones asociadas, si están configuradas.

- En la plantilla, genera los campos del formulario según el tipo (input, select, textarea) y muestra mensajes de error dinámicos.

- Los botones de acción se configuran dinámicamente y pueden incluir acciones como enviar o cancelar.

## Configuración de Inputs y Validadores

- Los inputs se definen en archivos constantes como `loginInputs.ts` y `registerInputs.ts` dentro de `src/app/shared/constants/forms/`.
- Cada input incluye propiedades como:
  - `width`, `id`, `label`, `placeholder`, `type`, `value`, `name`, `readonly`, `validator`.
- Los validadores son arreglos de funciones de validación de Angular (`ValidatorFn[]`), definidos en archivos dentro de `src/app/shared/constants/forms/validators/`.
- Ejemplos de validadores incluyen:
  - `EMAIL`: obligatorio, formato email, máximo 30 caracteres.
  - `PASSWORD`: obligatorio, mínimo 6 caracteres.
  - Validadores personalizados como `matchPassword` y `noWhitespaceValidator`.

## Resumen

El componente `app-form` es una solución flexible para construir formularios dinámicos en Angular, permitiendo definir campos y validaciones de forma externa y reutilizable. Facilita la gestión de formularios complejos con validaciones personalizadas y manejo de eventos, todo configurado mediante objetos de entrada.
