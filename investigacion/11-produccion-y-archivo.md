# 11 · Producción y archivo

*Entregable #6 ampliado. De dónde sale la información, cómo se produce cada formato, y cómo se archiva. Tres agentes especialistas, 25 de septiembre de 2026.*

---

## El flujo completo

```
① EXTRACCIÓN
   datos fiscales duros · dudas reales · tendencias
        │
        ▼
② VERIFICACIÓN  — heru-verificador + heru-centinela
        │  solo pasa lo aprobado
        ▼
③ PRODUCCIÓN
   carrusel y estático → Claude + Canva
   reel con Mich       → graba en raw → edición
   YouTube explicativo → whiteboard animado
        │
        ▼
④ ARCHIVO
   Drive, con nombre y carpeta deterministas
   ▲ nada se guarda si no pasó ②
        │
        ▼
⑤ PUBLICACIÓN  — Postiz, con el último tap de Mich
```

**La regla que ordena quién hace qué:** si el paso **escribe** (mueve un archivo, sube algo, llama una API que cambia estado), lo hace el orquestador. Si el paso **piensa** (decide, verifica, redacta), lo hace un agente.

---

# ① Extracción

## Datos fiscales duros

Lo que ya teníamos — DOF vía SIDOF, minisitio del SAT, IMCP, PRODECON — sigue siendo el núcleo y está en la skill `heru-vigia-fiscal`. Lo nuevo:

| Fuente | Qué da | Estado |
| --- | --- | --- |
| **INEGI · Banco de Indicadores** | API REST con JSON, token gratis, endpoint documentado. **INPC y UMA** — la UMA es la base de casi toda multa fiscal | Doc oficial leída, no probada en vivo |
| **Banxico · SIE** | Rutas y header `Bmx-Token`. **FIX y UDIS** | Los IDs de serie quedan por confirmar |
| **datos.gob.mx** | Corre CKAN, pero devolvió 403 | Fuente de segundo nivel |
| **SAT Datos Abiertos** | Solo índice de navegación: hay que recorrer 15 subpáginas a mano | No automatizable tal cual |
| **SHCP** | Sin API confirmada | No invertir ahí |

> **Truco transferible:** casi todo sitio fiscal mexicano corre WordPress. **Probar `/?feed=rss2` antes de escribir un scraper.** OffixFiscal expone RSS 2.0 válido.

> ⚠️ El entorno de investigación tiene bloqueado `curl` a dominios `.gob.mx`, así que los endpoints se documentaron leyendo doc oficial y código de clientes en producción. **Hay que probarlos en vivo antes de construir encima.**

## Dudas reales de contribuyentes — el vacío que estaba abierto

La investigación anterior no logró identificar comunidades mexicanas. Esta sí.

| Dónde | Tamaño | Nota |
| --- | --- | --- |
| **Fiscalia · foros** (`fiscalia.com/foros.html`) | **46,985 temas y 214,940 mensajes** solo en el foro fiscal, con actividad del mismo 25-sep-2026 | Sesgo: público contador, no usuario final |
| **r/MexicoFinanciero** | **431,000 miembros**, +24K al año | Tiene **flair dedicado "Impuestos 🏦"** — no hay que adivinar qué posts son fiscales |
| **r/mexico** · **r/mexicocity** | 3.2M · 682K | Menos denso pero más cerca del usuario final |
| **Grupos de Facebook de conductores** | Nueve identificados con URL, por ciudad | **No automatizables** — robots.txt. Extracción manual o nada |
| **Comentarios de YouTube de contadores MX** | Contador Contado \~500K subs + 4 canales | **La mejor vía automatizable**: YouTube Data API v3, gratis |

**Recomendación de arranque: los comentarios de YouTube.** Es la única fuente de dudas reales que se puede leer por API, sin costo y sin riesgo de TOS.

## Qué hace que algo se comparta

La evidencia buena es vieja y sigue siendo la mejor que hay. Berger & Milkman, **n = 6,956 artículos**:

| Emoción | Efecto sobre compartir |
| --- | --- |
| Enojo | **+0.38** |
| Asombro | **+0.34** |
| **Utilidad práctica** | **+0.34** |
| Positividad | +0.16 |
| **Tristeza** | **−0.17** |

**La fórmula que sale de ahí:** un dato que indigna + una salida práctica + tono positivo. **Nunca el registro lastimero** — es lo único con signo negativo.

Encaja exactamente con la marca: el villano es el calendario, no el SAT; y el cierre siempre da una salida.

> **Y un dato que contradice el consejo más repetido:** un estudio de TikTok 2026 (13,215 videos, 104,097 comentarios) encontró que **la duración no predice engagement**. Muestra británica. Suma a lo que vimos en el tab 10 con los datos propios de heru.

**No existe ningún estudio de viralidad del contenido fiscal, ni mexicano.** Lo que hay es transferible por analogía, no por evidencia directa.

---

# ③ Producción, formato por formato

## Carruseles y posts estáticos → Claude + Canva

**Funciona, y el ciclo completo corre sin tocar la interfaz** tras una autorización inicial: autofill por campo (texto, imagen, video, gráficas) → export programático a PNG o PDF → y el diseño **queda editable** por un humano después. Es justo lo que hacía falta.

> ⚠️ **Contradicción de plan que hay que resolver antes de presupuestar.** La documentación de desarrolladores de Canva dice que basta **Pro**; la página de precios pone Brand Templates solo desde **Business, $250 USD por persona al año**. Hay que validarlo con la cuenta real. Además, la integración privada por API requiere Enterprise — para un equipo de una persona la vía real es el MCP, no la API directa.

**Lo que falta de nuestro lado:** la estructura de carrusel definitiva vive en la skill de branding que aún no me mandas. Sin eso, la plantilla de Canva no se puede fijar. **Es el bloqueo de este formato**, y es de entrada, no técnico.

## Reels con Mich → y aquí está el hueco más grande del pipeline

**Higgsfield Shorts Studio no es un editor de video. Es un restyle visual.**

- El esquema del MCP dice literal `"const": "720p"` — **no hay otra resolución disponible**.
- Un review independiente reporta que **altera la voz** y trocea a media palabra.

**Para una fintech que habla de impuestos, una voz alterada no es un detalle estético: es riesgo de credibilidad.** Si la vocera suena distinta a sí misma, lo único que estamos construyendo — confianza — es lo primero que se rompe.

### Pero el restyle sí se salva — moviéndolo de lugar

**El esquema del MCP lo declara así:** `resolution` está declarado como `"const": "720p"` con la descripción literal *"Only 720p is supported"* — valor único. Y el esquema completo solo acepta preset, video fuente, duración, orientación y estimación de costo: **no existe ningún parámetro de audio, mute, subtítulos ni puntos de corte.** La herramienta *restyle*, no edita.

Sin control de audio en el esquema, el audio de salida no es gobernable.

**La salida es usarlo solo en clips de 4–8 segundos sin voz** — b-roll, intros, transiciones — descartar su audio y montar la narración aparte.

El riesgo desaparece en la raíz, porque no hay voz que alterar. Y de paso:

|  | Costo |
| --- | --- |
| Un reel completo de 90 s por Higgsfield | **270 créditos ≈ $10.53** — el mes entero del plan Starter |
| Un clip de b-roll de 4–8 s | **$0.47–0.94** |

**Queda por confirmar el costo exacto.** El propio MCP lo resuelve gratis: `shorts_studio_create` con `get_cost: true` y `duration_seconds` devuelve el costo exacto sin enviar el trabajo ni gastar créditos. Hay que correrlo antes de citar el ahorro. Lo que no cambia es la conclusión de fondo: **hay que sacar la herramienta de donde habla Mich**, no dejarla.

### La edición de verdad: Submagic

**Flujo recomendado: Submagic Pro ($23/mes) como núcleo → revisión manual de cifras → Higgsfield solo en b-roll.** Total **\~$70/mes**, unos 15–25 minutos por reel. Es **45% menos** de lo que costaría pasar 12 reels completos por Higgsfield.

**Dos herramientas quedaron descartadas por razones que vale conocer:**

- **Final Cut** — sus subtítulos automáticos son **solo inglés de EE.UU.**, según Apple.
- **CapCut** — bandera roja legal. Sus términos vigentes (15 abr 2026) exigen licencia **perpetua, sublicenciable y transferible** sobre el contenido, **incluyendo imagen y semejanza "para contenido patrocinado"**. Para la cara pública de una fintech, eso no se firma.

**Premieré sí puede alterar la voz — pero con slider, comparación A/B y opción de apagarlo.** La regla de heru no es "nada toca el audio": es **"la voz no se altera"**. Eso lo cumple una herramienta controlable, no una que regenera a ciegas.

### El hallazgo transversal, y es el que importa

**Casi todas estas herramientas usan Whisper por debajo, con un error de 8–12% en condiciones reales** — unas 16 a 30 palabras mal por reel, **concentradas justo en cifras y nombres propios**. Y ninguna fuente publica precisión medida en español mexicano con léxico fiscal.

**La revisión humana de los números no es opcional: es el paso que sostiene todo el flujo.** Un "2.07%" mal transcrito no es una errata, es un dato falso publicado.

> **Y la mejora de mayor retorno no es software: es un micrófono de solapa de \~$25.** Sube la precisión en todas las herramientas a la vez y reduce el único paso que no se puede automatizar, en todos los reels.

**Pregunta abierta que cambia el presupuesto:** ¿Mich graba vertical u horizontal? Es la diferencia entre un stack de $23 y uno de $46 al mes.

## YouTube explicativo horizontal → strokevideo

**Existe y es baratísimo:** whiteboard animado, español, de 30 s a 15 min, **$99.90 USD al año por 500 minutos** — unos 125 videos de 4 minutos.

**Pero no tiene rastro verificable:** cero reseñas independientes en G2, Capterra o Trustpilot; sin API pública; procesadores de pago en Singapur y Hong Kong.

> **Tiene plan gratuito sin marca de agua. Probarlo esta semana con dos guiones reales no cuesta nada**, y resuelve la duda mejor que cualquier investigación. Eso sí: sin API, este paso no se automatiza — alguien pega el guión a mano.

**La alternativa que ya está pagada:** Higgsfield trae presets de explainer, incluido Whiteboard Doodle, a costo marginal cero. **Queda por confirmar cuántos presets son** — el catálogo se lee con `get_explainer_presets`, que no recibe parámetros y no expone orientación.

**Y el supuesto bloqueo de orientación se cayó:** el esquema de Shorts Studio declara `aspect_ratio` con enum `9:16` y `16:9`, y dice *"pass aspect\_ratio:'16:9' for horizontal"*. **El horizontal sí está soportado.** Para los presets de explainer la orientación depende de `generate_video`, y eso queda por confirmar.

## Avatares de AI → la evidencia va en contra

Cuatro estudios independientes, muestras grandes, todos en la misma dirección:

| Dato | Fuente |
| --- | --- |
| La desconfianza hacia contenido AI **se duplicó en doce meses: 20% → 40%** | Fractl, Q2 2026 |
| **36%** dice que ver personas reales es el mayor impulsor de lealtad | Clutch, jun 2026 |
| **42%** castiga a marcas con AI de baja calidad | DoubleVerify, 22,000 consumidores |
| **91%** exige etiquetado en video | Gartner 2026 |

Y el dato que explica el mecanismo: **57% no detecta contenido AI aunque 66% cree que sí puede.** La gente no lo nota — pero se siente traicionada al enterarse.

> **Honestidad sobre la evidencia:** no existe **ni un solo estudio** que mida engagement o conversión de avatar contra vocero humano en la misma campaña. Lo disponible es intención declarada, no comportamiento medido. Aun así, cuatro fuentes independientes apuntan igual.

**Recomendación: Mich no se sustituye.** En impuestos la cara es la garantía. Aparecer en cámara no es un cuello de botella que optimizar — es el activo más defendible que tiene la marca, y el tab 10 lo confirma con datos: el formato experiencia en primera persona es lo único que rompe el techo.

Dónde sí cabe el video full-AI: piezas sin cara — explicativos de pantalla, animaciones de datos, cortes de b-roll.

---

# ④ Archivo en Drive

## Primero, un mito que hay que desmontar

El encargo pedía que el nombre del archivo **impulse la viralidad**. Eso es, en su mayor parte, mito:

- **Google** dice que el nombre de archivo da *"very light clues"*.
- **YouTube** lista sus señales oficialmente — título, tags, descripción, contenido — y **el nombre del archivo no está**.
- **Instagram y TikTok**: no hay ninguna evidencia.

**Dónde sí importa muchsimo, y por eso la convención vale igual:** búsqueda dentro de Drive, trazabilidad de qué se publicó y dónde, y automatización — un pipeline necesita rutas deterministas. Las keywords van en el nombre porque son gratis, no porque prometan alcance.

**Las keywords que sí mueven alcance van donde sí se leen:** título, copy, descripción, texto alternativo y texto en pantalla.

## Y un riesgo que sale al revés de lo esperado

**La metadata incrustada (EXIF/IPTC/XMP) no sirve para alcance, y sí es riesgo de fuga de datos.** Un test controlado del 28-ago-2026 encontró que **ninguna plataforma garantiza limpiarla**. Ubicación de grabación, modelo de equipo, nombre de usuario del editor — todo eso puede viajar.

**Regla: el pipeline limpia la metadata antes de subir. Siempre.**

## La convención de nombres

```
YYYYMMDD_pilar_tema-con-keywords_formato_plataforma_vNN.ext
```

Ejemplo real:

```
20261006_atraer_declarar-impuestos-conductores-app_reel_tiktok_v01.mp4
20260930_educar_sexto-numero-rfc-fecha-declaracion_carrusel_instagram_v01.pdf
```

**Las reglas, y por qué cada una:**

| Regla | Razón |
| --- | --- |
| **Sin acentos ni ñ en nombres de archivo** | NFC contra NFD rompe la sincronización Mac↔Windows. Es la trampa específica del español y no perdona. Los acentos van completos en título, copy y alt text |
| Guion bajo entre bloques, guion dentro del bloque de tema | Hace el nombre parseable por máquina y legible por humano |
| **`final` prohibido** | No tiene sucesor lógico. `v02` sí |
| `vNN` solo para cambio de concepto | Lo menor se sobrescribe: Drive ya guarda historial |
| Variantes paralelas van `hook-a`, `hook-b` | No son versiones, son experimentos. Confundirlos arruina el análisis |
| **Máximo \~80–100 caracteres** | Windows manda: **MAX\_PATH de 260**, y Drive para escritorio se come buena parte antes del nombre |
| Nada de caracteres prohibidos ni nombres reservados de Windows | `NUL.txt` **es** `NUL` |

## La estructura de carpetas

Deliberadamente plana — **máximo 4 niveles**, por el límite de ruta:

```
heru-contenido/
├─ 01-produccion/        ← en curso, todavía no pasó las compuertas
│  └─ 2026-10/
├─ 02-publicado/         ← solo entra lo aprobado y publicado
│  └─ 2026-10/
│     ├─ tiktok/
│     ├─ instagram/
│     ├─ facebook/
│     ├─ youtube/
│     └─ linkedin/
├─ 03-fuentes/           ← raw: grabaciones de Mich, fotos, b-roll
│  └─ 2026-10/
└─ 04-plantillas/
```

**Nada entra a `02-publicado` sin haber pasado el Verificador y el Centinela.** La carpeta no es almacenamiento: es el registro de lo que aprobamos.

## Y la regla que hace que esto no se degrade

**El pipeline genera y valida los nombres — no la memoria de nadie.** El validador rechaza acentos, espacios, la palabra `final` y todo lo que pase de 100 caracteres.

Una convención que depende de que una persona se acuerde se degrada en semanas. Siempre.

---

# Orquestación

## La decisión: n8n autoalojado

Y la razón no es el precio: **existe un nodo oficial de Canva, publicado por Canva** — autofill de brand templates y export. Es exactamente el paso "se produce el arte", y ningún competidor lo tiene.

| Alternativa | Por qué no |
| --- | --- |
| **Make.com** | Cobra por operación (módulo × dato) y el polling del export de Canva lo vuelve caro |
| **Zapier** | Cuesta lo mismo que Postiz entero |
| **Activepieces** | Segundo lugar honesto — MIT, $5 por flujo — pero sin nodo de Canva |
| **Windmill** | Los pasos de aprobación quedan fuera del tier gratis |

## Lo que un agente por MCP no puede dar

Estado durable entre corridas · reintento por paso · reanudar desde el punto de fallo · idempotencia · esperas largas · compuertas humanas · bitácora. Por eso la división: **escribe n8n, piensa el agente.**

## Dos cosas que hay que construir a mano

- **n8n no trae deduplicación nativa.** Hay que hacer una llave estable derivada del contenido, un registro de lo ya procesado, y para Drive una ruta determinista con búsqueda antes de subir.
- **La publicación nunca se reintenta automáticamente.** No se puede distinguir "la plataforma nunca lo vio" de "lo tomó y nos caímos antes de registrarlo". Un reintento ciego duplica posts.

---

# Las cuatro herramientas del brief, resueltas

|  | Veredicto |
| --- | --- |
| **Postiz** | ✅ **Sí, Cloud Standard $29/mes.** El dato decisivo está en su propia doc: en Cloud "cada plataforma está lista para conectar", en self-host "la mayoría requieren que registres una app de desarrollador". **Lo que se compra son sus apps ya auditadas**, no el calendario. Según la doc de la API: carrusel de IG sí, Reels vía `post_type:"post"` + audio, TikTok video y carrusel de fotos, YouTube Shorts y largo, y expone `is_trial_reel` y `graduation_strategy`. **Dos agujeros:** la API pública no tiene reschedule, y YouTube en modo testing mata el refresh token a los 7 días. **LinkedIn: carrusel de imágenes sí, documento/PDF no** |
| **BrightBean** | ❌ **No.** El agente lo resolvió leyendo el código, no la doc: no existe ninguna ruta de credenciales, `apps/credentials/views.py` no existe, el admin está cerrado por código. **Conclusión: la versión hosteada corre sobre las apps de BrightBean.** Y eso no es buena noticia — es un proyecto sin ingresos cuya app de TikTok es un punto único de falla compartido entre todos sus usuarios |
| **OpenSEO** | ⚠️ **MIT, sí, pero fase 3.** Lo que se paga es DataForSEO: depósito mínimo **$50**, SERP estándar $0.0006 por consulta → unos $5–15/mes para heru |
| **Maxun** | ❌ **Probablemente no.** El único caso legítimo era vigilar SAT y DOF, y eso se resuelve más barato con una petición HTTP y un hash |

---

# Costo y orden

| Semana | Qué | Costo |
| --- | --- | --- |
| **1** | Solo Postiz + conectar las 5 redes + publicar a mano | $29/mes |
| **2–3** | El flujo con agentes y los MCP ya conectados (Canva, Drive, Postiz), para **descubrir cuánto bloquea el Centinela** antes de automatizarlo | — |
| **4–6** | n8n autoalojado, **un solo workflow** | +VPS |
| Después | OpenSEO y DataForSEO si hace falta | $5–15/mes |

**Total del stack: \~$40–56 USD al mes.**

> **Por qué n8n no va en la semana 1:** sería automatizar un proceso que todavía no sabemos si funciona. Primero hay que ver cuántas piezas mata el Centinela y dónde se atora el Verificador. Automatizar un flujo roto solo lo rompe más rápido.

---

---

# Lo que falta en `branding-heru` para poder automatizar

*Auditoría completa de la skill, 25 de septiembre de 2026. Es un solo archivo de 797 líneas; los 9 archivos que §7.8 declara oficiales — logos SVG, lockups, zips de íconos y de cuadrícula, branding book — **no existen en el repositorio**.*

## Los huecos que impiden fijar una plantilla de Canva

Una plantilla no se puede armar con reglas relativas. Estos son los parámetros que hoy no están:

| Falta | Qué hay hoy |
| --- | --- |
| **Tamaños de fuente absolutos** | Cero en toda la skill. Solo la proporción "display ≈ 3–4× título" |
| **Interlineado** | Ningún valor |
| **Tracking** | Solo "amplio" |
| **Márgenes** | Rango 8–10% (86–108 px en 1080), sin margen superior ni inferior, sin safe area |
| **Posición del logo** | Sin coordenadas ni ancho de plantilla |
| **Campos de texto por slide** | Definidos solo para la portada |
| **Número de slides del carrusel** | **No fijado** |
| **Highlight** | Sin padding ni color de texto |
| **Post estático** | No existe como formato en la skill |
| **La portada** | Depende de un juicio subjetivo ("foto cómica que pare el scroll") que no es automatizable |

> Y uno práctico: **Helvetica no está disponible en Canva por defecto**, y la skill no dice cómo resolverlo.

## Las contradicciones entre skills

El conflicto de `carousel` que ya conocíamos **es más amplio de lo que creíamos: son 10 puntos**, no tres.

1080×1350 vs 1080×1440 · cream `#F2EDE4` — **prohibido por nombre en §5** — vs `#F5EFE3` · "Lexend en todo" vs Helvetica + Lexend Deca · navy, cian y verde prohibidos usados como tokens · highlight con radio de 8 px vs esquinas rectas · portada sin foto vs "SIEMPRE foto cómica oscurecida" · CTA de registro obligatorio vs restringido a pauta · emojis 💰🐷 recomendados vs prohibidos · outline con aprobación vs "ir directo a producir" · numeración X/4 vs número en cada slide.

Y hay más: **5 conflictos con `heru-paid-media-rules`** (la tipografía está **invertida**, 3 colores prohibidos, subtítulos en Lexend y en el tercio inferior, carrusel 1:1), **1 con `heru-iconos-glass`**, y **13 contradicciones internas dentro de la propia branding** — navy prohibido y en uso a la vez, serif e Inter prohibidos pero prescritos en §8C, dos lienzos distintos de carrusel, `#438DE4` en el ícono de app, `#1191F2` en las firmas de todo el equipo.

## El conflicto que no se resuelve solo

**`heru-sistema-contenido` ordena "CTA siempre 'Regístrate en heru'" en orgánico, mientras `branding-heru` §0.3 lo prohíbe.** Las dos tienen la misma fecha, y la cláusula de precedencia de branding solo cubre "algo visual" — así que **no lo resuelve**.

Es el mismo error que yo cometí en la primera versión de `automatización content`. **Alguien tiene que decidirlo de una vez**, y luego corregir la skill perdedora.

## Y 26 pendientes

La skill marca 18 pendientes en §17 y 8 dispersos, **incluida la advertencia de que la regla tipográfica central es formalmente "una propuesta"**.

> **Cómo trabajar con esto:** como la skill se sigue actualizando, un agente la audita completa **antes de cada tanda de producción**, no una sola vez. Lo que esté en conflicto se escala a Mich; lo que esté pendiente se marca en la pieza, no se inventa.

# Lo que bloquea este pipeline hoy

1. **La skill de branding con la estructura de carrusel.** Sin eso no se fija la plantilla de Canva, y el formato de mayor volumen no arranca.
2. **El plan de Canva.** Pro o Business — hay que mirarlo en la cuenta real antes de presupuestar.
3. **La edición de reels no tiene herramienta.** Higgsfield no la cubre, y alterar la voz de la vocera no es una opción.
4. **Probar strokevideo** con dos guiones reales. La duda de orientación de Shorts Studio ya está resuelta — acepta 16:9 — pero falta confirmar la de los presets de explainer.
5. **Probar en vivo los endpoints de SIDOF, INEGI y Banxico.** Están documentados, no probados.
