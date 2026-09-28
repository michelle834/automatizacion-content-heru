# 9 · Herramientas y medición

*Entregables #4 y #6 del brief de Andrés. Investigación del 25 de septiembre de 2026, con fuente y fecha en cada afirmación.*

**Dónde aterriza esto.** Estas herramientas ejecutan los pasos de publicación y medición del tab 23 · Plan de ejecución diario. La decisión de programador queda abierta hasta resolver si el plan gratuito de Buffer tendrá API después del 1 de febrero de 2027.

---

> ⚠️ **Tres cosas de esta pestaña quedaron corregidas en el tab 10**, cuando los agentes de medición consultaron la cuenta real en vez de la documentación: el "null" de TikTok era un artefacto de nuestra propia consulta, el clic de LinkedIn no es un clic a link, y conectar Facebook a Windsor cuesta $0. Ya están corregidas abajo, pero el desarrollo completo vive en el tab 10.

## Lo que hay que leer aunque no se lea nada más

**1. Autoalojarse el scheduler es una trampa.** Si usamos una herramienta SaaS, publicamos a través de la app ya aprobada de esa empresa y no necesitamos ninguna aprobación propia. Si nos autoalojamos, tenemos que registrar nuestra propia app en cada red y pasar nosotros las auditorías. Y en TikTok probablemente **nunca nos la aprueben**.

**2. TikTok falla en silencio.** Una app sin auditar publica "exitosamente" y cada post aterriza como `SELF_ONLY` — privado — **sin devolver error**. La API incluso acepta `PUBLIC_TO_EVERYONE` como opción. Y no se puede republicar retroactivamente lo que se subió antes de la aprobación.

**3. El peor hallazgo:** TikTok exige que la app auditada sea para audiencia amplia, **no para uso interno**. Mixpost lo documenta sin rodeos y por eso solo permite pedir la auditoría a licencias Enterprise de $1,199. Una fintech autoalojándose un scheduler para su propia cuenta es exactamente "uso interno". Eso descarta el self-host.

**4. Windsor no está como creíamos.** Tiene **3 conectores, no 8**: `instagram`, `linkedin_organic` y `tiktok_organic`. Ni Facebook, ni YouTube, ni GA4, ni Search Console, ni Semrush están fluyendo por ahí.

**5. TikTok no nos reporta clics, y ya sabemos por qué.** El `null` era un artefacto de consultar Windsor con `date_preset`; con `date_from`/`date_to` el valor real es **0**. La causa: la cuenta **no es Business** (`is_business_account = false`) y tiene **617 seguidores**, cuando TikTok pide cuenta Business o 1,000 seguidores para poner link en bio. **No hay link en bio, así que no hay nada que clicar** — y hay 265,000 views cada 90 días sin salida. Detalle completo en el tab 10.

**6. La atribución a WhatsApp, hoy, es imposible por diseño.** Los links `chat.whatsapp.com/XXXX` no aceptan parámetros ni reportan nada. Si están publicados directo en las bios, no hay herramienta que lo arregle: hay que cambiar el flujo.

---

## Parte A · Programar y publicar

### El riesgo de aprobación, red por red

| Red | ¿App propia si nos autoalojamos? | Tiempo | ¿Un SaaS lo evita? |
| --- | --- | --- | --- |
| **TikTok** | Sí — auditoría. **Y probablemente nos la nieguen por "uso interno"** | Días a semanas, típico 2 envíos | ✅ Totalmente |
| **Instagram** | Sí — Business Verification (≤14 días hábiles) + App Review (hasta 20 días) | **3–6 semanas realistas** | ✅ |
| **Facebook Page** | Sí — mismo App Review de Meta | Igual | ✅ |
| **LinkedIn empresa** | Sí — Community Management API, revisión manual | 1–4 semanas | ✅ |
| **YouTube** | No hay review. Cuota por defecto (consultada 28 sep 2026): 100 llamadas de videos.insert al día, 100 de search.list al día, y 10,000 unidades para todo lo demás | Inmediato | ✅ |

La documentación oficial del App Review de Meta no publica ningún tiempo de respuesta (consultada el 28 sep 2026). **Queda por confirmar:** el plazo real, midiéndolo si alguna vez se envía una app propia.

### Comparativa

|  | Postiz | BrightBean | Mixpost | Publer | Metricool | Buffer | Blotato |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Nuestras 5 redes** | ✅ todas | ✅ todas | ⚠️ solo FB gratis | ✅ todas | ⚠️ LinkedIn no está en el gratis | ✅ todas | ✅ todas |
| **Más barato** | $29/mes | Gratis | $299 pago único | Gratis / $5 por cuenta | \~€16–20/mes | $5/canal (gratis hasta 3) | $29/mes |
| **API + MCP** | ✅ MCP oficial, 13 tools | ✅ | Solo de pago | Solo Business, $10/cuenta | Solo Advanced \~€43 | API sí, MCP no | ✅ 36 tools |
| **Analytics** | Básico | Cross-channel | Por plataforma | Business+ | ✅✅ el mejor | Básico | 8 de 9, sin LinkedIn |
| **¿Evita la auditoría?** | Cloud sí, self-host no | Sin dato | **No. TikTok solo Enterprise** | ✅ | ✅ | ✅ | ✅ explícito |
| **GitHub** | 36.1k ★ AGPL | 2.0k ★, 0 releases | 3.6k ★ MIT | — | — | — | — |

Todos los precios de esta tabla se consultaron el 28 de septiembre de 2026 en la página oficial de cada herramienta. Ninguno de los siete tiene plan gratuito que nos sirva completo: Postiz y Blotato no tienen plan gratis (solo prueba de 7 días), el de Buffer llega a 3 canales con 10 posts programados por canal, el de Publer a 3 cuentas, el de Metricool excluye LinkedIn, y el Lite de Mixpost solo cubre Facebook, X y Mastodon.

### Recomendación: Postiz Cloud, $29/mes

Suena contradictorio recomendar la versión de pago de una herramienta open source. El razonamiento es directo:

- **Es el único que junta las tres cosas que necesitamos:** cubre las 5 redes (incluida página de empresa de LinkedIn explícitamente), tiene **MCP oficial con 13 herramientas** incluido en todos los planes, y tiene API REST con webhooks. Para "1 persona + AI", el MCP no es un extra: es el producto.
- **El plan Standard de $29 da 5 canales**, que es exactamente nuestro número.
- **AGPL-3.0 con 36.1k estrellas nos da salida.** Si Postiz Cloud sube de precio o cierra, el código es nuestro y podemos migrar. Ninguna SaaS propietaria da eso.

**Por qué Cloud y no self-host — esta es la decisión clave**, y es nuestro criterio. Autoalojarse ahorra los $29/mes de licencia pero obliga a registrar app propia de Meta, app propia de TikTok — que según la documentación de Mixpost probablemente rechacen por tratarse de uso interno, mientras todos nuestros TikToks salen en privado sin avisar — y pedir la Community Management API de LinkedIn, además de pagar infraestructura de todos modos. Sale más caro, tarda más, y hay probabilidad real de que TikTok nunca funcione. **Queda por confirmar:** los plazos de cada aprobación, el costo mensual de esa infraestructura, y el estado del bug de TikTok reportado en el repo de Postiz self-host.

**Lo que no recomiendo**: BrightBean, pese a ser gratis y tener MCP. En su repo, consultado el 28 sep 2026: 2.0k estrellas, AGPL-3.0, ningún release publicado, y REST API + servidor MCP documentados, con soporte para las cinco redes. Un proyecto sin un solo release es una base frágil para el canal de comunicación de una fintech, y ese es el criterio. Mixpost, porque su versión Lite gratis solo cubre Facebook de nuestras 5 redes — además de X y Mastodon — y TikTok exigiría la licencia Enterprise de $1,199. Later queda fuera. **Queda por confirmar:** los planes y la API de Later.

**Antes de contratar nada:** convertir la cuenta de Instagram a **Professional (Business)** — sin eso ninguna herramienta puede publicar por API. Y la primera semana, publicar un TikTok de prueba y **verificar en el teléfono que salió público**. Es el fallo silencioso más caro de este mercado.

---

## Parte B · Medir

### Estado real de Windsor, verificado en vivo

| Conector | Estado |
| --- | --- |
| Instagram (`instagram`) | ✅ Conectado — `17841432045701187`, somosheru |
| LinkedIn (`linkedin_organic`) | ✅ Conectado — `67344715`, heru (YC S19) |
| TikTok (`tiktok_organic`) | ✅ Conectado |
| Facebook (`facebook_organic`) | ❌ No conectado |
| YouTube | ❌ No conectado |
| GA4 · Search Console · Semrush | ❌ No aparecen en Windsor |

Pueden existir por separado — GA4 y GSC directo en Google, Semrush en su plataforma — pero **no están fluyendo por Windsor**. Esto cambia el cálculo de costo: hoy se usan 3 fuentes, no 8.

### El problema de TikTok que hay que resolver antes que nada

Se consultaron 35 videos reales del 26 de agosto al 24 de septiembre:

- `video_website_clicks` → **null en 35 de 35 (100%)**
- `video_profile_views` → **0 en 35 de 35 (100%)**
- `video_views_count`, `video_new_followers`, `video_full_watched_rate` → sí llegan con datos

Los campos existen en el esquema pero no traen dato. Causas posibles, en orden: la cuenta no es **TikTok Business Account**, no hay link en bio, o falta el scope de permisos. **Hay que verificarlo en TikTok Studio antes de construir nada encima.** Si TikTok no entrega el clic, el short link propio deja de ser opcional y pasa a ser la única fuente de clics de esa red.

### Qué da cada red

| Red | Lo mejor que da | El límite |
| --- | --- | --- |
| **TikTok** | **Retención segundo a segundo**, fuentes de impresión (For You / Follow / Hashtag / Sonido / Búsqueda), tipo de audiencia (nuevo / recurrente / seguidor) | Clics vienen vacíos |
| **Instagram** | Reach, guardados, compartidos, visitas al perfil, y para Reels: watch time, tiempo promedio y **skip rate** a 3 segundos | **No expone clics al link por pieza.** Los campos de perfil están deprecados |
| **LinkedIn** | **Clic por post — pero incluye swipes y 'ver más', ver tab 10** (`share_clicks_count`), CTR, impresiones únicas, engagement rate | Views de video solo \~6 meses; sin métrica de completion |
| **Facebook** | En contracción | Meta eliminó el desglose orgánico vs. pagado el 15 de junio de 2026 |
| **YouTube** | Watch time, retención y **fuentes de tráfico**, por API nativa gratis | Requiere código propio |

**Dos decisiones que salen de esta tabla:**

- **YouTube por API nativa, no por Windsor.** Es gratis, más rica y sin App Review — y nos mantiene en 7 fuentes de datos. Windsor cobra por tier, no por conector: el plan Standard incluye 7 fuentes a $99/mes anual ($118 mensual) y el Plus 10 fuentes a $249/mes anual ($299 mensual), así que pasar de 7 a 8 fuentes salta un tier entero. Ahorro: $150/mes. Precios consultados el 28 sep 2026 en windsor.ai/pricing.
- **Facebook sí entra a Windsor.** Corregido en el tab 10: conectarlo cuesta $0, porque hoy se usan 3 de las 7 fuentes del plan. Sí conectarlo, con expectativa calibrada.

**Ojo con un detalle que va a descuadrar reportes:** en Instagram, `media_like_count` excluye engagement de posts impulsados y cross-posted; `media_total_like_count` sí lo incluye y **es el que cuadra con lo que se ve en la app**. Usar siempre los `total_`.

### Atribución a WhatsApp — la parte difícil

**Lo que no se puede medir, y nadie lo va a vender así:**

- **Los links de invitación `chat.whatsapp.com/XXXX` no tienen analytics. Cero.** No aceptan parámetros, no reportan clics, no reportan origen. Si hoy están publicados directo en las bios, la atribución es **estructuralmente imposible** y no hay herramienta que lo arregle.
- **El `ctwa_clid` de Meta solo existe para anuncios de pago.** El objeto `referral` del webhook se dispara únicamente cuando el usuario llega por un anuncio Click-to-WhatsApp. Todo el contenido orgánico cae fuera.
- **Nunca vamos a saber** quién llegó por captura de pantalla, por boca a boca, o escribiendo el número a mano. Siempre habrá un porcentaje de "directo/desconocido", y hay que reportarlo como tal en vez de repartirlo artificialmente.

**Lo que sí funciona — la arquitectura que hay que construir:**

```
Post en la red
   │  link único por pieza, con UTMs
   ▼
Short link (Dub.co)          ← 1er punto: CLIC atribuido a la pieza
   │
   ▼
Landing propia (GA4)         ← 2do punto: sesión, tiempo, scroll
   │  botón wa.me/<número>?text=<CÓDIGO>
   ▼
WhatsApp Cloud API webhook   ← 3er punto: CONVERSACIÓN con código
   │  el bot responde y manda el invite link
   ▼
Comunidad de WhatsApp        ← KPI norte: MIEMBRO ATRIBUIDO
```

**La pieza clave es el `?text=`.** `wa.me/<número>?text=<mensaje>` prellena el mensaje. Si ese mensaje lleva un código por pieza — `Hola, vengo de TK-0924-RESICO` — el webhook lo recibe y lo parseamos. Eso da atribución pieza → conversación **sin depender de ninguna red social**.

**Caveat honesto:** el texto prellenado es visible y editable. Un porcentaje lo va a borrar. Esperar **10–30% de pérdida** en ese paso; el rango exacto hay que medirlo con datos propios en las primeras 4 semanas.

**Dos refuerzos que cuestan cero:** generar un **invite link distinto por red**, para tener un segundo conteo independiente que valide o desmienta al primero; y que el bot **pregunte** "¿dónde nos viste?" con respuestas rápidas, para capturar el tráfico de screenshot que ningún sistema técnico ve.

**Convención de códigos** — una sola, escrita, que nadie pueda ambiguar: `<RED>-<MMDD>-<TEMA>` → `TK-0924-RESICO`, `IG-0924-DEDUCCIONES`, `YT-0925-ANUAL`

### Dónde vive el dato

| Opción | Costo | Veredicto |
| --- | --- | --- |
| **Google Sheets** | Gratis | 🟢 **Empezar aquí.** Cero fricción para un agente, y Windsor ya tiene destino nativo |
| **BigQuery** | Gratis dentro del free tier | 🟢 **Destino final.** Para nuestro volumen es gratis indefinidamente |
| **Supabase** | Free / $25 Pro | 🔴 **El free pausa el proyecto a los 7 días de inactividad.** Fatal para un pipeline semanal |

**Señal para migrar de Sheets a BigQuery:** cuando la hoja pase de \~50,000 filas o un query tarde más de 10 segundos. Antes de eso, BigQuery es sobre-ingeniería que retrasa el aprendizaje.

⚠️ Los destinos de Windsor tienen `create_in_chat: false` — **los syncs hay que configurarlos a mano en el dashboard**, un agente no los puede crear.

---

## Parte C · Descubrir temas y vigilar

### Lo que está fuera de nuestro alcance, y conviene saberlo ya

- **TikTok Research API:** México no es región elegible y está limitada a universidades y ONGs. Usuarios comerciales explícitamente excluidos. heru no califica.
- **Meta Content Library:** entidades con fines de lucro no elegibles.
- **Reddit API:** gratis solo para uso no comercial. El acceso comercial es de pago; la cifra de $12,000/mes que circula la reportan guías de terceros, no una página de precios pública de Reddit (consultado 28 sep 2026), así que no debe usarse como dato firme. Se usa **F5Bot**, que es gratis.
- **Scraping propio de TikTok/Instagram:** vida útil de 4–6 semanas, riesgo de TOS, riesgo de suspensión de nuestras cuentas, y riesgo bajo la nueva **LFPDPPP** (DOF 20-mar-2025) con multas de 100 a 320,000 UMA si se tocan datos de personas identificables. **No vale la pena.**

### Stack recomendado

**Fase 0 — gratis, esta semana:** Google Alerts + Talkwalker Alerts + F5Bot (los tres con salida RSS; Talkwalker Alerts sigue activo y gratis, con RSS por alerta, consultado 28 sep 2026) · IMCP Noticias Fiscales · boletín de PRODECON · TikTok Creative Center (revisión manual semanal) · YouTube Data API. Su cuota por defecto son 100 llamadas de `search.list` al día en su propio cubo, 100 de `videos.insert`, y 10,000 unidades para el resto de los endpoints (docs de Google, consultado 28 sep 2026): preferir `videos.list` para lo que se resuelva por ID y reservar las 100 búsquedas diarias.

**Fase 1 — \~$21/mes, donde está el diferencial:**

- **changedetection.io** ($8.99/mes el hospedado, o gratis autoalojado; consultado 28 sep 2026) vigilando el minisitio de normatividad del SAT, con alerta especial sobre las **versiones anticipadas** de la RMF. Detectar una el día que el SAT la sube, y no cuando la prensa la cubre tres días después, es ventaja en cada cambio fiscal del año. **Es la mejor compra de toda la lista.**
- **AlsoAsked** Basic ($12/mes) — preguntas reales de contribuyentes, con **API y MCP incluidos desde ese plan**, así que se integra al pipeline sin subir de tier.

**Fase 2 — \~$25/mes total:** WebServices JSON del SIDOF para ingesta programática del DOF · DataForSEO Trends (\~$2/mes) para validar demanda real en México antes de producir · **Maxun** autoalojado, con MCP nativo, para extraer estructura de las páginas del SAT que changedetection solo detecta. **Maxun sirve para el SAT, no para espiar redes.**

**Lo que no comprar** (precios consultados el 28 sep 2026): Brand24, que hoy arranca en $249/mes mensual ($199 anual) y llega a $699, con Enterprise desde $1,499 — por datos que las alertas gratis ya dan · Mention, cuyo acceso a API es un add-on de pago sin precio público en su página · Semrush, de $139/mes (plan SEO) a $549/mes (Advanced), solo para ideación · Exploding Topics, Glimpse y TrendTok. **Queda por confirmar:** la cobertura del nicho fiscal mexicano de esos tres últimos.

### La regla editorial que sale de aquí

Como el contenido depende de datos fiscales verdaderos, la jerarquía de citación es obligatoria:

1. **DOF** (vía SIDOF JSON) — verdad legal.
2. **SAT `sat.gob.mx`** — verdad administrativa: RMF, anexos, versiones anticipadas.
3. **IMCP / PRODECON** — interpretación autorizada.
4. **Medios fiscales** (El Contribuyente y similares) — **solo para detectar temas. Nunca para citar una cifra o una fecha.**

**Ninguna pieza con una cifra fiscal se publica sin un enlace de nivel 1 o 2.** Esta es la regla que el ⑤ Verificador ejecuta.

---

## El stack completo y lo que cuesta

### Mínimo viable — esta semana, \~$24/mes

| Capa | Herramienta | Costo |
| --- | --- | --- |
| Atribución | Short.io gratis (5 dominios propios, 50,000 clics/mes) | $0 |
| Conversión | WhatsApp Cloud API + webhook | $0 |
| Métricas | Windsor (ya está) | actual |
| Almacén | Google Sheets | $0 |
| Vigilancia | Alerts + F5Bot + IMCP + PRODECON | $0 |

### Ideal — 3 a 6 meses, \~$150/mes

| Capa | Herramienta | Costo |
| --- | --- | --- |
| Publicación | Postiz Cloud Standard | $29 |
| Métricas IG + TikTok + LinkedIn | Windsor Standard, 7 fuentes, refresh horario | $99 anual / $118 al mes |
| Métricas YouTube | API nativa | $0 |
| Atribución | Short.io Pro con dominio propio | $18 |
| Vigilancia fiscal | changedetection.io | $9 |
| Temas | AlsoAsked Basic | $12 |
| Almacén | BigQuery dentro del free tier | $0 |

### El orden de los primeros cinco días

1. **Verificar si la cuenta de TikTok es Business** y si tiene link en bio. Sin esto, TikTok no mide.
2. **Auditar dónde está publicado hoy el link de la comunidad.** Si es `chat.whatsapp.com` directo en las bios, ahí está el agujero — anotar todos los lugares.
3. **Convertir Instagram a Professional** si no lo está.
4. Crear cuenta de short link y conectar un subdominio (`go.heru.app`).
5. Levantar la landing con GA4 y el botón `wa.me` con código.
6. Configurar el webhook de WhatsApp Cloud API.
7. Configurar el destino de Windsor a Sheets — **desde el dashboard**, no se puede desde un agente.
8. Cambiar todas las bios y CTAs al short link.
9. **Publicar 3 piezas con el flujo completo y comprobar a mano que el código llega al webhook.** Si no llega, arreglarlo antes de escalar.

**Lo que NO hay que hacer esta semana:** no empezar el App Review de Meta (3 semanas, y Windsor ya cubre ese dato), no montar BigQuery, no migrar de Semrush, no construir dashboard propio.

---

## Lo que queda por confirmar

Ordenados por impacto si resultan falsos. Nada de esto debe darse por bueno sin comprobarlo.

| # | Qué | Cómo se comprueba |
| --- | --- | --- |
| 1 | Por qué `video_website_clicks` viene null en TikTok | TikTok Studio: ¿cuenta Business? ¿link en bio? |
| 2 | ¿Responden los WebServices JSON del SIDOF? | Probar `/datos_abiertos` y `/apiStatus` |
| 3 | ¿Existe el RSS del IMCP en `/category/noticias-fiscales/feed/`? | Es el mayor ahorro de esfuerzo de todo el plan |
| 4 | ¿Funciona el RSS del DOF en `diariooficial.gob.mx/filtroRss.php`? | Sería la ruta más simple de todas |
| 6 | Soporte de carrusel de IG, Reels y Shorts en Postiz | Solo Metricool lo documenta explícitamente |
| 7 | Si la verificación de identidad de Meta para servicios financieros aplica a publicación orgánica | **Relevante para una fintech.** Validarlo antes de cualquier ruta nativa |
| 8 | Cuántos créditos consume un post en Blotato | Solo si consideramos esa alternativa |
| 9 | % real de pérdida del código en el texto prellenado | Medirlo con datos propios en las primeras 4 semanas |
| 10 | Si WhatsApp Cloud API expone eventos de alta a Communities | Docs de Meta |
| 11 | Foros y comunidades mexicanas de impuestos y freelancers | **La investigación no logró identificarlos.** Requiere validación manual, y es probablemente la fuente cualitativa de mayor valor y menor costo |
