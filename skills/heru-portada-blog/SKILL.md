---
name: "heru-portada-blog"
description: "Arma la portada semanal de los posts de blog de heru (1080×1350, formato barra de búsqueda) a partir del esqueleto de Canva, con las reglas de query, título, gancho, remate y encuadre de foto."
---

# Portada de blog · heru

La portada del post que anuncia una nota del blog. **Corre los miércoles**, que es el día de blog heru en la parrilla (sección 24): se toma un post del blog que ya rankea y no tiene video, y esta portada es la cara del clúster en Instagram y Facebook.

**Formato: 1080 × 1350 (4:5).** No es el 3:4 de los carruseles de cuerpo. Si el carrusel acompaña a esta portada, **se renderiza también a 1350 de alto** para que la relación no cambie a media galería.

## El esqueleto

`esqueleto portadas blogs` · design `DAHWtyIQef8` · https://canva.link/9k7qipxzrp0mrg7

**Nunca se edita el esqueleto.** Se copia (`copy-design`) y se edita la copia. Igual que los tres esqueletos de carrusel.

**Referencia de cómo debe quedar:** `portada blog · constancia de situación fiscal · 30 sep 2026` (design `DAHWuAMLfVM`). Es la primera que Mich ajustó a mano, y de ahí salen las medidas de abajo. Si hay duda de cómo se ve algo, se mira esa.

## Por qué este formato

La portada imita un **resultado de búsqueda**: barra blanca arriba con la query, la foto, el título y el gancho. No es decoración — es la promesa de social SEO del tab 13 hecha visible. La portada le dice a quien hace scroll *"esto es lo que ya estabas buscando"*, y la query que aparece escrita es la keyword real por la que el blog rankea o quiere rankear.

## Caja alta y baja, no todo minúscula

Esta es la diferencia más fácil de equivocar, porque va **al revés que los carruseles**.

| Elemento | Cómo va |
|---|---|
| Query de la barra | **todo minúscula** — es lo que alguien teclea en un buscador |
| Título | **Sentence case**: mayúscula inicial y nada más. "Constancia: dos caminos" |
| Gancho | **Sentence case**, cada oración con su mayúscula inicial |
| `heru blogs` · `heru.app` | minúscula siempre, como manda la marca |

En los carruseles de cuerpo los headlines van en minúscula. Aquí no: la portada imita un resultado de búsqueda, y un título de artículo en minúscula se lee como error, no como estilo.

## Los campos

| Campo | Qué va | Regla dura |
|---|---|---|
| **Query** (barra de búsqueda) | La keyword real, en minúscula, como la escribiría la gente | **Máximo ~32 caracteres.** Más largo y se encima con los íconos del buscador. Sale de Search Console o del buscador de la red, nunca inventada |
| **Título** | El título del blog, en sentence case | **Una sola línea.** A 93 px caben ~16 caracteres; **lo normal es bajarlo a 64 px**, que da ~24. Si no cabe a 56 px, el título está mal, no la portada. **`top` = 875**, no 855: el esqueleto lo trae 20 px más arriba y queda pegado a la foto |
| **Gancho** | **Dos bloques separados por una línea en blanco.** El primero es el dato; el segundo abre el bucle | Alineación **start**, nunca justificado: el justificado abre huecos entre palabras. A 28 px entran ~62 caracteres por línea. La caja crece a ~138 px de alto (4 líneas contando el espacio) |
| **Remate** | La última frase del segundo bloque | Va en **bold italic**. Es el equivalente del highlight cian del carrusel: la portada no tiene barra de color, el énfasis lo carga la cursiva negrita. **Una sola frase**, nunca el párrafo entero |
| **Foto** | La imagen del grid, 864 × 592 (**3:2 horizontal**) | Se genera en 3:2, no en vertical. Cómica y referida al tema, nunca stock aburrido de laptop. La del esqueleto es un marcador de lugar y **siempre se cambia** |
| **Botones** | `heru blogs` · `leer más` · `heru.app` | Fijos. No se tocan |

### El gancho, con su forma

```
Uno te la da en el momento y el otro tarda hasta cinco días hábiles.

La diferencia no está en el trámite: está en si te acuerdas de tu contraseña.
                                      ↑ esta frase en bold italic
```

Bloque 1 responde *"¿de qué va?"*. Bloque 2 responde *"¿y por qué me importa?"* y **no cierra**: deja la razón para entrar al blog. Si el bloque 2 ya dice la respuesta completa, no hay motivo para dar clic.

### El encuadre de la foto

La foto **no se mete al tamaño exacto del marco**. Se escala a **~115–120 %** del marco y se recorta **por los lados, no por arriba**: así la cara queda en el tercio superior y el desorden de abajo llena el resto. En la portada de referencia la imagen mide 1006 × 676 dentro de un marco de 864 × 592, centrada horizontalmente (`left` ≈ −6).

Una foto metida al ras del marco se ve plana y deja la cara al centro, que es justo donde compite con el título.

## Las palabras gatillo también aplican aquí

La query y el título son hook: ahí **no** van "SAT", "facturación", "dinero fácil", "gana", "ahorra". El sustantivo limpio sí ("constancia de situación fiscal", "declaración anual", "RESICO"). "sat" vive en el caption, en la descripción y en la fuente legal chica, no en la portada. La foto va sin dinero visible y sin texto legible.

## Cómo se produce

1. **Verificar primero.** Los hechos del blog pasan por `heru-verificador` antes de que se escriba una línea de la portada. El blog de heru ha tenido errores; no es fuente de un dato.
2. **Generar la foto en 3:2** y entregarle 3–4 opciones a Mich. Ella elige y la coloca; el encuadre lo hace en Canva.
3. `copy-design` del esqueleto.
4. `read-design` con `open_transaction: true` para sacar los locator IDs.
5. Aplicar en un solo `edit-design`: `update_title` (nombre con tema y fecha), los tres `replace_text`, el `format_text` del título (64 px, align start), el `position_element` del título a `top: 875`, y el `format_text` del gancho a align start.
6. Revisar el thumbnail que devuelve la llamada **antes** de `commit`. Lo que se mira: que el título no se haya ido a dos líneas, que la query no toque los íconos, que el gancho no se desborde sobre los botones.
7. `commit` y `export-design` en PNG pro.

> **El bold italic del remate no sale por API** con un solo `replace_text`: el campo queda con un formato único. O se parte el texto en dos elementos, o se deja marcado en la entrega para que Mich lo aplique en Canva. Mientras siga siendo un paso a mano, **se dice explícitamente en la entrega**.

> **La exportación de Canva no se puede descargar desde el contenedor** (`export-download.canva.com` está bloqueado por la política de salida, igual que el CDN de Higgsfield). El PNG final lo baja Mich desde Canva. Lo que sí se le puede mandar al chat es el thumbnail de 480 px que devuelven `read-design` y `edit-design`, como vista previa.

## Qué mata una portada

- La query no existe: nadie la busca y no sale de ningún dato propio.
- El título se fue a dos líneas y se encimó con el gancho.
- El título va todo en minúscula.
- El gancho es un solo bloque corrido, sin remate en cursiva.
- El gancho cierra el bucle (dice la respuesta) en vez de abrirlo.
- La foto es vertical, está metida al ras del marco, o sigue siendo la del esqueleto.
- Promete algo que el blog no entrega.

## Qué NO hace

- No escribe el blog ni el carrusel de cuerpo → `heru-guionista` y `carousel`.
- No elige el tema → el miércoles lo trae la parrilla, desde el blog que ya rankea y no tiene video.
- No se salta `heru-centinela`. La portada es la superficie de más riesgo de baneo de toda la pieza.