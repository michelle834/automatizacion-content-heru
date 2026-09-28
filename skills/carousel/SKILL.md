---
name: "carousel"
description: "Genera carruseles de heru para Instagram y LinkedIn (1080x1440, 3:4) desde un tema, URL o brief: arma el slides.json y lo renderiza con el sistema de branding-heru (portada foto + cuerpo cream + cierre), en 7 slides."
---

# carrusel heru

**En todo lo visual manda `branding-heru`**: si algo aquí la contradice, gana esa skill (los § son de ahí). Pipeline: tema → outline → slides.json → render → PNG. Usar con `heru-contenido-filtros` (sus 3 filtros ANTES del outline), `heru-verificador` y `heru-centinela`.

## 1. Estructura

**7 slides**: portada + contexto + 4 cuerpos + cierre. Los cuerpos pueden variar si el tema lo pide; el branding nunca.

**1 · PORTADA (`cover`), modo Foto (§8.1)**
- Foto a sangre **oscurecida** (overlay negro ~45%), **cómica y exagerada**, que para el scroll. Nunca stock aburrido. **Sin dinero.** Control: *¿me haría detenerme y sonreír?*
- Logo heru **blanco** arriba a la derecha. Texto blanco centrado, Helvetica bold, MAYÚSCULAS: `label` (1 línea, ~25 caracteres, tracking) · `headline` (1–3 palabras o el dato gancho) · `subline` (remate). `swipeCue` opcional abajo al centro.
- **Sin palabras gatillo** en portada ni hook: "SAT", "facturación", "ahorra miles", "$" (§0.4).
- Hooks: dato gancho · pregunta · afirmación contraria · antes/después · número + promesa.

**2 · CONTEXTO (`textonly`), modo Cream.** Plantea el problema, no parafrasea la portada. Máx ~25 palabras. `headline` con highlight en la frase clave, `subline` en Helvetica bold italic.

**3–6 · CUERPO (`content`), modo Cream (§8.2)**
- **Una idea por slide, máx ~40 palabras.** Cream liso o con cuadrícula, logo **azul** arriba a la derecha, texto negro.
- Layouts: `frase-centrada` · `cita` · `texto-foto` · `si-no` ("sí."/"no." gigante en cian) · `listicle` (título + barra azul + tarjeta blanca + número gigante deslavado) · `pasos`. Sin repetir en consecutivas.
- Imágenes: fotos recortadas o a sangre, ilustraciones flat, stickers 3D o íconos glass (§8F). Sin dinero.
- `source` **obligatoria** si hay dato fiscal: artículo de ley, gris chico abajo a la izquierda ("LISR Art. 151").
- Emojis: **pendiente con Mich** (§17). Si se usan, apoyo puntual; nunca decoración de fondo ni emojis de dinero.

**7 · CIERRE (`cierre`), modo Cream (§8.3)**
- Cream liso, logo azul arriba a la derecha, íconos IG (like · comentar · compartir · guardar) en círculos gris claro, texto negro Helvetica bold, acción dentro del highlight.
- **Orgánico (default): cero venta.** Cierres: guardar contextual ("[guarda este post] para la próxima vez que…") · compartir · comentar palabra clave. **Prohibido:** "regístrate", "descarga", precios, planes, "gratis" (§0.3).
- **CTA de heru** (pregunta + barra azul "en heru … por ti") **solo en pauta o si Mich lo pide**; ahí el único CTA es **"Regístrate en heru"**, nunca "Descarga".

**Tipos:** educativo/tips (default) · storytelling · antes/después · mito vs realidad.

## 2. Tokens

**Color (paleta oficial §5):** cream `#F5EFE3` (fondo) · cuadrícula `#EEE9DF` (celda 36 px, líneas 2 px, §5.2) · azul `#1790EC` (logo, barras, highlight) · cian `#15D1FE` (highlight, "sí."/"no.") · negro `#000000` · gris `#7C7468`–`#AAAAAA` (legal) · blanco `#FFFFFF` (sobre foto o azul) · degradado `#5DE0E6` → `#004AAD` 90°.
**Prohibidos** (de versiones viejas de esta skill): verde `#00C48C`, navy `#0C3961`, cian `#00C9DB`, cream `#F2EDE4`, `#D6ECFB`, `#071E38`. Nunca texto negro sobre foto ni azul sobre el degradado.

**Tipografía (§6):** **Helvetica** (Bold/Black/Bold Italic) en títulos, headlines, hooks y labels · **Lexend Deca** (Regular/Medium/Bold) en cuerpo, datos y legales. Es **Deca**, no Lexend original, Inter ni Arial; nunca mezclarlas en un título. Case: portada MAYÚSCULAS, cuerpo y cierre **minúscula**. Fallback: `'Helvetica Neue', Arial` y `'Lexend Deca', Arial`. **heru siempre en minúscula**, aun dentro de MAYÚSCULAS; el logo es archivo (`heru-logo-azul.svg` / `-blanco.svg`), nunca texto vivo ni dos veces en una slide. Tamaños: **pendientes con Mich** (§17); referencia en 1080×1440: portada 170/34, cuerpo 72/32/30, legal 22.

**Medida:** **1080 × 1440 (3:4)** en todas · márgenes 8–10% (86–108 px) · logo arriba a la derecha, ≥100 px, 2X de protección · número de slide gris abajo a la derecha · fuente legal abajo a la izquierda · máx ~3 bloques.

**Highlight (`.hl`):** `background:#15D1FE` (o `#1790EC`) · `color:#000` sobre cian y `#FFF` sobre azul · `padding:6px 18px` · **`border-radius:0`, esquinas rectas (§8E)** · `box-decoration-break:clone`. Máx **1–3 palabras**, nunca frase completa; signos (?, !) **fuera** del span; la frase va **en su propia línea** para que la barra no se monte con otra; **uno por slide**; revisar el PNG. Bueno: `puedes <span class="hl">deducir</span>`, `<span class="hl">RESICO</span>?`

## 3. slides.json

```json
[{ "type":"cover|textonly|content|cierre",
   "layout":"frase-centrada|cita|texto-foto|si-no|listicle|pasos",
   "label":"solo cover, MAYÚSCULAS ~25 car.", "headline":"admite <span class='hl'>",
   "subline":"", "body":"admite <strong>/<em>", "bullets":[], "slideNumber":3,
   "image":{"src":"","treatment":"sangre-oscurecida|recortada|sticker|icono-glass"},
   "card":{"title":"","items":[],"bigNumber":""},
   "source":"artículo de ley; obligatoria si hay dato fiscal", "swipeCue":"desliza para ver →",
   "closing":{"kind":"guardar|compartir|comentar|cta-pauta","text":"","highlight":""} }]
```

## 4. Copy

**Voz (§3):** amigo contador que te habla bonito. Español mexicano con acentos y eñes, siempre. Frases de ~12 palabras. Cero tecnicismos sin traducir ("CFDI a tu RFC" → "la factura a tu nombre"). Datos concretos, y el villano es el calendario, no el SAT.
**Prohibido:** precios, planes, venta o "solución de vida" en orgánico · "descarga heru" · superlativos sin respaldo · otro formato que no sea 1080×1440.
**Audiencia:** independientes en México (freelancers, Uber/DiDi, repartidores, comerciantes). **Handle** @somosheru · **tagline** "impuestos sin estrés" (imagen, no texto).

## 5. Workflow

**0 · Input.** URL: extraer puntos, datos y fuentes. Tema: investigar para la audiencia. Elegir tipo. **Verificar cada dato fiscal contra la ley** (LISR, CFF, RMF) y guardar el artículo; no confiar en el blog de heru (§11.1). Lo que no se confirme se quita o se marca "pendiente de validar con fiscal".
**1 · Outline.** Una línea por slide. Mich necesita velocidad: sin ronda de aprobación salvo que falte algo imprescindible.
**2 · Layouts y foto.** Sin repetir layout en consecutivas; foto elegida con la pregunta de control.
**3 · slides.json.** Revisar acentos, palabras, una idea por slide y `source` donde hay dato.
**4 · Render.** `node render.js slides.json` → `output/slide-01..07.png`. Si no existe `render.js`, constrúyelo antes de seguir; nunca inventar que el render corrió.

```python
W, H = 1080, 1440   # Playwright/Chromium
pg = b.new_page(viewport={'width': W, 'height': H}, device_scale_factor=1)
pg.goto(f'file:///tmp/s{i}.html'); pg.wait_for_timeout(400)
pg.screenshot(path=f'output/slide-{i:02d}.png',
              clip={'x': 0, 'y': 0, 'width': W, 'height': H})
```
Notas que ya costaron tiempo: `device_scale_factor=1`, no 2 (el spec es 1080 de ancho); `clip` explícito, el headless viejo recorta ~85 px de fondo. Sin las fuentes, usar el fallback y **avisar que la tipografía no es la de marca** (no queda final). **Canva:** diseño NUEVO con páginas de los 3 esqueletos (portada `DAHWC6vwUJ8` · cuerpo `DAHWC3QUb40` · cierre `DAHWC30L8Dg`); nunca editar los originales.
**5 · Evaluar.** Abrir CADA PNG y aplicar el gate (obligatorio).

## 6. Gate final (100 puntos, y checklist)

**A · Legibilidad (30):** highlight no tapa texto 8 · dentro del margen 6 · jerarquía 6 · contraste 5 · nada encimado 5.
**B · Copy (25):** hook sin gatillos 8 · una idea, ≤40 palabras 6 · acentos y heru en minúscula, −2 por acento y 3+ = 0 · 5 · ≥2 datos con su artículo 3 · cierre según canal 3.
**C · Estructura (20):** los 4 roles 5 · layouts sin repetir 5 · progresión 5 · contexto ≠ portada 5.
**D · Coherencia (15):** 1080×1440 y mismo look 5 · portada cómica, no stock 4 · imágenes de marca, sin dinero 3 · numeración 3.
**E · Marca (10):** heru en minúscula 3 · logo blanco en portada y azul en el resto, uno por slide 3 · paleta y tipografías oficiales 2 · sin venta ni precios en orgánico 2.

95–100 entregar · 90–94 con notas · 80–89 corregir y re-renderizar · 70–79 reescribir copy o estructura · <70 rehacer outline.
**Reporte:** `A __/30 · B __/25 · C __/20 · D __/15 · E __/10 → TOTAL __/100`, veredicto y hallazgos por slide. **Bloqueo:** bajo 90 no es final: corregir → re-renderizar → reevaluar hasta ≥90. Y pasar el checklist §0 (verídico · fácil · sin venta · sin gatillos).