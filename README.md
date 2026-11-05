# Picoteo's · Web

Web de Picoteo's, comida casera para llevar en San José de la Rinconada (Sevilla).

Es una web estática (HTML, CSS y JavaScript sin dependencias): se puede publicar en GitHub Pages, Netlify, Hostinger o cualquier hosting.

## Páginas

| Archivo | Contenido |
| --- | --- |
| `index.html` | Portada: carta con pestañas, horario, mapa, preguntas frecuentes, formulario, Instagram y reseñas |
| `alergenos.html` | Ingredientes y los 14 alérgenos de cada receta, con filtro y buscador |
| `politica-privacidad.html` | Política de privacidad |
| `informacion-legal.html` | Aviso legal (LSSI) |

## Estructura

```
css/styles.css     Estilos de todas las páginas
js/main.js         Animaciones e interacción (menú, FAQ, horario, formulario, tickets)
js/carta.js        Platos y precios de la carta (editar aquí para cambiar la carta)
js/alergenos.js    Ingredientes y alérgenos de cada receta
assets/            Imágenes, iconos y logos exportados del Figma
```

## Antes de publicar

1. **Formulario de contacto.** Envía los mensajes a `comidaspicoteos@gmail.com` mediante [FormSubmit](https://formsubmit.co). El primer envío manda un correo de activación a esa cuenta: hay que abrirlo y pulsar el enlace una vez.
2. **Datos legales.** Rellenar el NIF/CIF y el proveedor de alojamiento, marcados como `[pendiente]` en `politica-privacidad.html` e `informacion-legal.html`.
3. **Carta.** Revisar los precios en `js/carta.js`.

## Servicios externos

- Google Maps (mapa incrustado y botón "Cómo llegar")
- Jotform (feed de Instagram de @picoteo_s)
- FormSubmit (formulario de contacto)
- Google Fonts (Fraunces, Source Serif 4, DM Sans, DM Mono, Space Grotesk)

## Publicar con GitHub Pages

Repositorio → **Settings** → **Pages** → *Source*: "Deploy from a branch" → rama `main`, carpeta `/ (root)` → **Save**. La web quedará en `https://<usuario>.github.io/picoteos/`.
