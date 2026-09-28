# 12 · Límites de IA por red

*Hasta dónde se puede estirar la liga con contenido hecho con IA sin que nos restrinjan. Un agente por red, 25 de septiembre de 2026.*

---

## La respuesta corta a la pregunta que abrió esto

**Un carrusel hecho en Canva o generado con Claude — texto y layout, sin imágenes generativas — no dispara etiqueta de contenido de IA en ninguna de las cinco redes.** Con una salvedad que sí está documentada: no llevar etiqueta **no** lo pone fuera del radar. El clasificador de *slop* de LinkedIn y la detección a nivel de cuenta de TikTok actúan sobre contenido sin etiqueta.

La razón es técnica, pero **"los detectores leen metadatos, no píxeles" ya no es cierto**. Sí leen C2PA Content Credentials y IPTC `digital source type` — y además **marcas de agua invisibles incrustadas en el archivo**. TikTok describe la suya como *"a robust technological watermark that only we can read"* y reporta más de **3,000 millones de videos etiquetados** como IA sumando Content Credentials, etiqueta del creador y esa marca propia. Lo que sí sigue en pie: un texto escrito con Claude no tiene canal por donde delatarse.

Y el **31 de agosto de 2026** Meta publicó una exención textual — pero **acotada a la etiqueta de perfil generado con IA de Instagram**, no a todo el etiquetado de contenido: *"people who use AI to edit photos, polish captions, create graphics, or make other creative tweaks don't need to use the AI-generated profile label"*. Citarla como exención general de Meta es pasarse de la fuente.

**Sí se puede subir a diario.** Lo que nos puede castigar no es la IA: es la **no originalidad**.

---

## La regla que atraviesa las cinco redes

> **Ninguna plataforma castiga usar IA. Castigan producir en masa, no aportar nada propio, y engañar sobre quién habla.**

Y para heru hay un agravante que aplica en cuatro de las cinco: **somos categoría sensible.** Contenido financiero con IA está vigilado de forma explícita y por nombre en TikTok y YouTube. La misma pieza que se tolera en un canal de cocina está prohibida en uno fiscal.

---

## Qué cuenta como IA, formato por formato

| Lo que hacemos | ¿Cuenta como IA? | Riesgo real |
| --- | --- | --- |
| **Carrusel diseñado en Canva o con Claude** (texto + layout) | ❌ No, en ninguna red | Solo "contenido no original" si copiáramos a otro |
| **Guión escrito con IA, narrado por Mich** | ❌ No. YouTube exime "script" por escrito | Ninguno |
| **Subtítulos, edición y reencuadre con IA** | ❌ No | Ninguno |
| **Retoque de foto en Canva** | ⚠️ Probablemente no — pero **Photoshop sí dispara falsos positivos** documentados desde jun 2024, incluso con el recortador | Etiqueta aparece sola |
| **Imagen generativa realista** en un carrusel | ✅ Sí. DALL·E y Firefly llevan C2PA y se auto-etiquetan; Midjourney no | Etiqueta + escrutinio |
| **Voz sintética** sobre imágenes | ✅ Sí | Alto |
| **Video con avatar de IA** | ✅ Sí, de lleno | **El más alto de todos** |
| **Animación tipo whiteboard** desde un guión | ❌ No se declara en YouTube (no es realista) | Bajo, si aporta algo propio |

---

## TikTok — la red de mayor riesgo para nosotros

### El hallazgo que cambia el caso

En **julio de 2026** TikTok anunció que está probando **detección a nivel de cuenta** — no de video — para cuentas dedicadas a publicar spam de IA. Y nombró **tres categorías de riesgo por su nombre**: política y actualidad, **consejo financiero** y contenido médico, descritas como áreas *"where misleading content could affect public trust or well-being"*. En el mismo anuncio entró al comité directivo de C2PA. [Cobertura del anuncio](https://www.searchenginejournal.com/tiktok-targets-ai-generated-spam-accounts-in-high-risk-topics/582256/)

**heru está en una de las tres, con antecedente de shadowban.** TikTok no especificó qué califica como cuenta infractora ni qué pasa después de la detección.

### Qué dice la política

Se ancla en **"realistic AI-generated content"** — imagen, audio o video que parezca real. No en "hecho con ayuda de IA". Por eso el carrusel diseñado no cae; el avatar sí.

### Sobre la etiqueta y el alcance, dos cosas distintas que suelen confundirse

1. **No hay ninguna declaración de TikTok ni medición pública** de que la etiqueta reduzca distribución algorítmica.
2. **Sí hay** un mecanismo de reducción por preferencia del usuario: el slider de contenido IA en Manage Topics, anunciado por TikTok el 19 de noviembre de 2025.

**Para una fintech el costo real no es alcance: es credibilidad.**

### Cadencia

**5 piezas por semana** — 4 video con persona real, 1 carrusel diseñado. **Cero avatares, cero voces clonadas.** Imagen generativa máximo una cada dos semanas, y solo después de cuatro semanas de alcance estable.

---

## Instagram — el algoritmo es neutral, la audiencia no

### Dos supuestos comunes, corregidos

- La política de **"contenido no original"** (30 abr 2026) **no menciona la IA ni una sola vez.** Castiga copiar a otros, y "contenido que diseñaste" cuenta como original.
- Meta declaró en abril de 2025 que **no está atacando el contenido basura de IA directamente**. Mosseri dijo el 31 dic 2025 que la estrategia es identificar medios reales, no despriorizar lo sintético. **No hay señal de despriorización de contenido sintético en Reels.**

### Pero el castigo llega por la puerta de atrás

Meta promete que la etiqueta no afecta distribución, y no hay nada que lo contradiga.

> La cifra de "80% de reducción de alcance" que circula no tiene fuente.

### El riesgo específico de fintech, y es serio

El caso Ronaldo/Plinko del Oversight Board — contenido con IA más promesa de dinero, 600,000 vistas — activó **cuatro políticas a la vez** y terminó en **remoción, no en etiqueta**. El Board pidió a Meta dotar a sus revisores de indicadores para detectar endosos generados.

**"IA + promesa financiera" es un patrón que Meta persigue activamente.** Es justo el cruce donde vive heru si se descuida.

### Cadencia

**5 piezas por semana** — 3 Reels y 2 carruseles, cero imágenes sueltas. **4 de 5 ancladas en un humano o un producto real.** Un slot experimental el viernes, como Trial Reel.

---

## Facebook — donde el castigo está mejor documentado

### Tres olas de sanciones, y lo que cambia el cálculo

| Fecha | Qué castiga | Sanción |
| --- | --- | --- |
| 24 abr 2025 | Spam | Alcance reducido + sin monetización |
| 14 jul 2025 | Contenido no original | Sin monetización **+ distribución reducida en todo lo que comparte la cuenta** |
| 13 mar 2026 | Idem, reforzado | Se suma la designación **"no recomendable"** |

**El giro que reordena nuestras prioridades:** la prensa lidera con "desmonetización" porque le habla a creadores. **heru no monetiza con Meta**, así que eso nos da igual — pero **perder la recomendación es existencial**, porque el video recomendado es justo por donde crece la red.

La definición dura de "original" de Meta: *filmado o producido directamente* por el dueño, o material de terceros **con presencia en pantalla** aportando análisis o mejora sustancial.

Escala del enforcement: ~500,000 cuentas accionadas y 10 millones de perfiles eliminados solo en el primer semestre de 2025.

> **Desmentido:** la regla de "3 strikes en 90 días" que circula **no está en ninguna fuente primaria de Meta.**

### Grupos

**Admin Assist no tiene ningún criterio que detecte IA.** El filtro en grupos es humano. Los riesgos reales ahí son otros: enlaces, cuentas de menos de 3 meses y reshares externos.

### Cadencia

**7 piezas por semana**, con **≥60% de presencia humana real**, máximo **1 de 7** con imagen generativa, **cero avatares y cero voz sintética**, y **cero re-subidas**.

---

## YouTube — la línea dura, y nos nombra

### El hallazgo crítico

Las políticas de monetización de canal de YouTube incluyen una sección sobre **personas generadas por IA en temas sensibles**: un canal que usa personajes de IA para dar información sobre **salud, temas legales, finanzas o política** no puede monetizar. Confirmado en el Centro de ayuda oficial. [YouTube channel monetization policies](https://support.google.com/youtube/answer/1311392?hl=en)

Uno de los tres ejemplos textuales de lo no permitido: *"AI-generated podcast hosts offering financial guidance, investment tips, or wealth management advice"*.

**heru toca dos de las cuatro categorías sensibles.** Un avatar o narrador-personaje de IA presentando contenido fiscal es **la línea dura del documento**.

### La sanción real

La política de **contenido inauténtico** — el nombre que YouTube le dio a la vieja política de contenido repetitivo el 15 de julio de 2025 — prohíbe *"content that is repetitive or mass-produced"* y exige que el creador aporte *"original, authentic insights or perspective"*. **Es una política de monetización.**

### Qué sí y qué no se declara

La declaración se dispara por **realismo**, no por uso de IA.

- **No se declara:** whiteboard automático · guión con IA narrado por Mich · edición, subtítulos y doblaje de su propia voz.
- **Sí se declara:** avatar fotorrealista.
- **Zona gris:** voz sintética genérica sobre animación.

Dato relevante: la etiqueta prominente sobre el reproductor está reservada a temas sensibles — **finanzas incluidas**.

### Cadencia

**2 largos + 4–6 Shorts por semana.** Principio rector: **la IA produce, el humano presenta y aporta.**

---

## LinkedIn — la más permisiva en política, la más cara en reputación

### La política

**No existe ninguna cláusula que obligue a declarar texto escrito con IA.** La única regla de media sintética es específica: no publicar media que ponga palabras o actos en boca de una persona real sin declararlo. Solo nos toca si usáramos avatar o clon de voz de Mich.

### Lo que sí cambió, en julio y agosto de 2026

Botón **"Seems like AI slop"**, lanzado el **30 de julio de 2026**. LinkedIn declaró públicamente que sus miembros ven **~40% menos views en lo que clasifica como slop**, y que la herramienta se usó más de un millón de veces en las primeras semanas. El castigo es pérdida de recomendación, no baneo. **Cuántos reportes hacen falta para desprioritizar no lo dice LinkedIn** — su director de producto habló de *"many signals"* y de salvaguardas contra el uso malicioso, sin dar umbral. [Engadget](https://www.engadget.com/2241857/linkedin-says-its-ai-slop-button-is-working/)

### La línea oficial responde nuestra pregunta casi literalmente

Laura Lorenzetti, VP de Producto: *"está bien usar IA para ayudarte a escribir, pero tus posts deben representar tu voz y tus perspectivas"*. La distinción que usan es **"AI-assisted vs AI-generated"**.

**El flujo agente redacta → Mich edita es exactamente lo que LinkedIn describe como aceptable** — condicionado a que la edición aporte voz, no solo pulido.

### Sobre declarar el uso de IA

**Es nuestro criterio: no poner disclaimers de IA en los posts.** La posición segura es que el contenido no se perciba como generado, y eso se logra escribiendo con voz propia.

> **Advertencia sobre una cifra que circula:** el estudio de Originality (3,368 posts) que dice que el contenido humano gana +44% a +80% es correlacional, depende de un detector con interés comercial, y confunde tema con autoría. **No es citable** como "los posts con IA alcanzan 80% menos".

### La prueba de sustituibilidad

Antes de publicar en LinkedIn: **¿podría otra fintech publicar esto cambiando solo el logo?** Si sí, no está listo.

Y la regla de los tres anclajes: cada post necesita al menos dos de estos tres, escritos por humano — un **dato con fuente y fecha**, una **observación de primera mano**, una **postura discutible**.

### Cadencia

**3 publicaciones por semana + un día dedicado a comentar a mano**, 70% desde el perfil de Mich. Ancla en **carrusel documento** (1.39× alcance, 1.30× engagement, y solo lo usa el 4.88% de los creadores — es el arbitraje disponible). **Encuesta máximo una al mes:** 1.78× alcance pero 0.37× engagement, es una trampa de alcance. Video fuera de la base.

---

## La semana, consolidada

| Red | Piezas | Con persona real | Con IA generativa | Nunca |
| --- | --- | --- | --- | --- |
| **TikTok** | 5 | 4 | 1 carrusel diseñado · generativa 1 cada 2 semanas | Avatar · voz clonada |
| **Instagram** | 5 | 4 de 5 | 1 slot experimental (Trial Reel) | Avatar · IA + promesa de dinero |
| **Facebook** | 7 | ≥60% | máx 1 de 7 | Avatar · voz sintética · re-subidas |
| **YouTube** | 2 largos + 4–6 Shorts | El presentador siempre | Animación sí | **Avatar presentando temas fiscales** |
| **LinkedIn** | 3 + comentar | Voz de Mich en el texto | Diseño sí | Disclaimer de IA · texto sustituible |

> ⚠️ **Esto son techos de tolerancia, no un plan de producción.** Sumados dan 22 piezas por semana, muy por encima de lo que una persona puede grabar. El calendario piloto — 24 piezas en **dos** semanas desde 6 grabaciones — es lo realista. Esta tabla dice **hasta dónde se puede llegar**, no a dónde hay que llegar.

---

## Lo que nunca se hace, en ninguna red

1. **Avatar de IA presentando contenido fiscal.** Prohibido por nombre en YouTube, en el perfil de enforcement de TikTok, y es el cruce que Meta persigue.
2. **Voz clonada de Mich.** Es la única regla de media sintética que LinkedIn sí tiene, y es lo que rompe la confianza que construimos.
3. **IA + promesa financiera** en la misma pieza. Es el patrón del caso Ronaldo/Plinko: terminó en remoción, no en etiqueta.
4. **Re-subir contenido de terceros**, aunque esté editado. Es lo que Meta castiga de verdad.
5. **Poner un disclaimer de IA** pensando que protege. Es nuestro criterio.

---

## Lo que queda por confirmar

| Qué | Por qué importa |
| --- | --- |
| Si **Canva embebe C2PA** en sus exportaciones | Decide si nuestros carruseles pueden disparar etiqueta solos |
| Si México entró en los **38 países de verificación de anunciante financiero** de Meta | Es riesgo de restricción **de cuenta**, no de alcance |
| Si la herramienta de animación que usemos estampa **SynthID o C2PA** | Podría etiquetar el video aunque marquemos "No" en Studio |
| Si servicios de impuestos cuentan como "servicios financieros" en la **Branded Content Policy** de TikTok | Importa en cuanto paguemos creadores: esa política prohíbe branded content financiero |

**Y un pendiente:** Meta tiene plazo hasta diciembre para responder al Oversight Board, que calificó sus reglas de IA como *"fundamentally inadequate"*. **Esta pestaña hay que releerla en diciembre.**
