---
title: "Accesibilidad avanzada: ARIA y foco"
summary: Patrones accesibles (diálogo, menú, pestañas), gestión del foco en SPA,
  regiones live y probar con lectores de pantalla.
order: 9
section: rendimiento-y-seguridad
status: done
requires: []
---

## Accesibilidad avanzada: ARIA y foco

En una **SPA** construyes componentes que HTML no trae (combobox, pestañas, menús) y cambias la página sin recargarla. Ahí la accesibilidad depende de ti.

### ARIA: rol, nombre, estado
Cada control expone al lector de pantalla un **rol** (button, tab, dialog), un **nombre accesible** (texto, `aria-label`, `aria-labelledby`) y **estados** (`aria-expanded`, `aria-selected`, `aria-checked`). ARIA **no añade comportamiento**: el teclado lo programas tú. Sigue los patrones de la **APG** (ARIA Authoring Practices Guide) del W3C.

### Patrones clave
- **Diálogo modal**: usa `<dialog>` (o el patrón completo): el foco entra al abrir, queda **atrapado** dentro, Escape cierra y el foco **vuelve** al botón que lo abrió.
- **Pestañas**: `role="tablist"`, `tab`, `tabpanel`; flechas para moverse entre pestañas y Tab para entrar al panel (*roving tabindex*).
- **Menú desplegable / disclosure**: un `button` con `aria-expanded` que muestra y oculta; para la mayoría de "menús" de navegación basta este patrón, no `role="menu"`.
- **Combobox / autocompletar**: de los más difíciles; usa una librería accesible probada.

### Gestión del foco en SPA
Al cambiar de ruta sin recargar, el lector de pantalla no se entera. Mueve el foco al **título** de la nueva vista (o anúncialo) y actualiza `document.title`. Tras borrar un elemento, lleva el foco a un sitio lógico, no lo pierdas en el `body`.

### Regiones live
Para avisos que aparecen sin que el usuario los busque ("Guardado", "3 resultados"), usa `aria-live="polite"` (o `role="status"`): el lector los anuncia sin mover el foco. `assertive` solo para lo urgente.

### Probar de verdad
Recorre con teclado, escucha con **NVDA** (Windows) y **VoiceOver** (Mac/iOS), revisa con zoom y con `prefers-reduced-motion`. Añade tests con Testing Library por **rol**: si el test no encuentra el elemento por su rol, el lector tampoco.
