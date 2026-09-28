# 10 · Medición por red

*Entregable #4. Un agente especialista por red, 25 de septiembre de 2026. Tres de los cinco consultaron la cuenta real de heru vía Windsor, no solo documentación — y eso cambió varias conclusiones.*

**Dónde aterriza esto.** El nombre exacto de cada métrica en cada API es lo que llena las columnas de la tabla `aprendizajes` del tab 23 · Plan de ejecución diario, donde cada pieza se cierra a los siete días. Si una métrica está mal definida aquí, el ciclo de aprendizaje mide otra cosa.

---

## Primero: lo que esto corrige de lo que ya teníamos escrito

Cinco cosas que dimos por buenas y no lo eran. Van primero porque si alguien lee solo una sección, que sea esta.

**1 · El "null" de TikTok es un artefacto de Windsor, no un fallo de TikTok.** `video_website_clicks` y `bio_link_clicks` son campos del conector Windsor: **queda por confirmar si la API pública de TikTok expone esos nombres** (la documentación de TikTok for Developers para cuentas de negocio no es accesible sin credenciales). El comportamiento observado — null con `date_preset`, 0 con `date_from`/`date_to` — es lo que vemos en el Content Dash, igual que `is_business_account = false` y los 617 seguidores. **heru no tiene link en bio**, así que no hay nada que clicar.

**2 · El campo de clics de LinkedIn no se llama `share_clicks_count`, y el ER oficial de LinkedIn sí incluye los clics.** El campo real de la Marketing API es **`clickCount`** de `organizationalEntityShareStatistics`, definido literalmente como *"Number of clicks"*. LinkedIn no publica su desglose: **queda por confirmar si incluye "ver más", clic al perfil o swipes de carrusel**. Y `engagement` está definido por LinkedIn como *"Number of organic clicks, likes, comments, and shares over impressions"* — los clics entran en el engagement oficial. [Organization Share Statistics](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/organizations/share-statistics?view=li-lms-2026-06)

> **Es nuestro criterio, no política de LinkedIn:** aunque LinkedIn los cuente como engagement, no usar `clickCount` como proxy de tráfico al sitio. La diferencia entre formatos (`multiImage` hasta 38% contra 1.06% en `image`) sale del Content Dash y sirve para comparar formatos entre sí.

**3 · Facebook no entra a Windsor — y no hace falta.** Corrección sobre la corrección: Windsor está en plan **Basic, 3 fuentes, y las tres están ocupadas** por Instagram, TikTok y LinkedIn. Subir a Standard cuesta **+$960 al año**. Pero el agente encontró la salida buena, citada de la doc de Meta: *"If your app will only be used by app users who have a role on the app itself, App Review is not required."* **Sí se puede leer Page Insights de nuestra propia página sin pasar App Review**, con la app en modo Development, `read_insights` + `pages_read_engagement`, y un **System User token emitido como permanente**. Costo $0, unas 3.5 horas de trabajo, sin tocar Windsor. Detalle en el tab 11.

**4 · Los Trial Reels no devuelven retención ni skip rate.** Esto rompe algo. `heru-sistema-contenido` define como métrica clave "retención a 3 s + % de watch time" medida en Trial Reels a 24–48 h, y la skill `heru-hooks` repite lo mismo. **Los Trial Reels solo reportan views, likes, comentarios, guardados y alcance estimado.** Y el skip rate que Instagram define es el porcentaje de espectadores que se salta el reel **dentro de los primeros 3 segundos** — no una tasa de abandono general.

> **Sustituto propuesto:** comparar **`shares` / `views` a 72 h** entre variantes del mismo lote, y medir el skip rate después, ya en el Reel normal republicado. Hay que corregir las dos skills.

**5 · YouTube cambió qué cuenta como vista, en todos los formatos.** El cambio del KPI de Shorts se extendió a **largo, podcasts y Live el 24 de agosto de 2026**: ahora cuenta desde el primer frame, incluyendo autoplay y hover. **Las vistas públicas ya no miden calidad en ningún formato.** La métrica buena es **`engagedViews`**. Consecuencia dura: no se pueden comparar series de vistas de antes y después del 24 de agosto.

---

## Y un hallazgo que reordena la estrategia entera

En los 83 videos de TikTok de heru de los últimos 90 días, **las views correlacionan negativamente con todas las métricas de calidad**:

| Contra views | Correlación |
| --- | --- |
| Share rate | **r = −0.43** |
| Engagement rate | **r = −0.28** |
| Full watch rate | **r = −0.23** |

**Perseguir views no es neutral: empeora activamente el KPI norte.** Los videos que más se ven son los que menos se comparten, menos enganchan y menos se terminan.

Y el dato que lo vuelve urgente: heru genera **265,000 views cada 90 días en TikTok sin un solo camino clicable fuera de la app**. El techo del KPI no es de contenido, es de configuración.

---

## TikTok

### Lo que sí se puede medir

`video_views_count` · `video_reach` (llega 24–48 h tarde) · `video_full_watched_rate` · `video_average_time_watched` · `video_new_followers` · fuentes de impresión (For You, Follow, Hashtag, Sonido, Búsqueda) · tipo de audiencia (nuevo, recurrente, seguidor, no seguidor).

### Lo que no se puede sacar por API

**La curva de retención segundo a segundo y la señal de las primeras horas no son extraíbles** vía Windsor — devuelven null o grano diario. Solo existen mirando TikTok Studio a mano. Si esa curva importa, es trabajo manual semanal, no automatizable.

### Dos hallazgos de la cuenta real

**La duración no está funcionando como esperamos.** El watch time mediano es **plano en \~4 segundos sin importar la duración**. Los videos de 35–80 s tienen **1.4% de full watch** contra **9.3%** en los de 0–10 s.

> ⚠️ **Esto tensiona lo que dice el tab 1** ("lo largo gana en las cinco redes", con el valle en 30–60 s). Las dos cosas pueden ser ciertas a la vez: alargar sube el tiempo total visto y por eso la plataforma lo premia en distribución, pero **en la cuenta de heru hoy no está sosteniendo la atención**. No es que la regla esté mal — es que heru todavía no tiene el gancho que la hace funcionar. Alargar sin arreglar los primeros 4 segundos solo hunde la métrica.

**El formato foto/carrusel rinde 3.1× mejor en guardados que el video.** Son 24 de los 83 posts. Es la palanca más barata que hay sobre la mesa: no requiere grabar.

### La decisión que necesita un humano

Convertir a cuenta Business desbloquea el link en bio — pero limita a **Commercial Sounds**, es decir se acaban los audios en tendencia. Es un intercambio real y lo decide Mich, no un agente.

### Por qué rechazan la solicitud de Business

**Hipótesis principal: estamos solicitando la cosa equivocada.**

**Cambiar a cuenta Business no tiene solicitud ni aprobación posible.** Es Ajustes y privacidad → Gestionar cuenta → Cambiar a cuenta de empresa. Se hace y ya. Es gratis y es reversible.

Lo que **sí** se solicita, pide documentos y **sí se rechaza** es la **"Verificación de la empresa"**, y vive en el **mismo menú** (Ajustes → Cuenta → Verificación de la empresa). La confusión entre las dos es muy probable, y el dato duro la sostiene: `is_business_account = false` — **el switch gratuito nunca se hizo**.

**El motivo de rechazo que más nos puede estar pegando** es uno de los diez que TikTok publica: *"el mismo documento ya está asociado a otra cuenta"*. **TikTok liga por entidad legal, no por dispositivo.** Si el acta constitutiva o la constancia se usó en la cuenta anterior — la que tuvo el shadowban — ese documento está quemado.

> **Ligado por dispositivo o por correo: cero fuentes oficiales.** Las únicas que lo afirman venden navegadores antidetect.

**Y el shadowban sí toca la verificación:** TikTok documenta re-verificación tras **30 días sin violaciones**. Revisar el Account status antes de reintentar es la acción más barata de todas.

**Hallazgo lateral, y puede ser mejor que el link en bio:** la verificación de empresa desbloquea **anclas de conversión orgánicas** — link clicable **dentro del video**, disponible en México. Eso destronaría al link en bio como cuello de botella.

**Sobre servicios financieros:** no está vetado. Exige licencia regional, disclaimers y 18+. Y **asesoría o preparación fiscal no aparece nombrada** en la política — ni prohibida ni restringida.

**Para cerrar el diagnóstico hacen falta cuatro cosas** que solo Mich tiene: la captura literal del rechazo, en qué pantalla se solicitó, qué documento se subió y de dónde salió, y **si ese documento ya se usó en la cuenta anterior**.

### Benchmark

heru está en **4.02% de ER** contra 3.42% del sector finanzas (150K cuentas) y 3.85% global (2M videos). Por encima de ambos. **No existe ningún benchmark público de retención ni de alcance a no seguidores para fintech en México.**

---

## Instagram

### La métrica que manda

**Sends por alcance**, con cita oficial de Mosseri (22 ene 2025): pesa más que nada en contenido que llega a gente no conectada. El multiplicador "3–5× más que los likes" que repiten los blogs **no tiene fuente**; Meta nunca publicó coeficiente.

### La cadena de atribución está rota en el formato principal

No existe campo de clics al link por pieza. Los campos reales de la referencia oficial son **`profile_visits`**, **`follows`** y **`profile_activity`** — sin prefijo `media_` — y ahí **`profile_visits` SÍ está soportado para reels**. Los que no lo están son **`follows`** y **`profile_activity`**. Para Reels existen además `ig_reels_avg_watch_time` y `ig_reels_video_view_total_time`. La cadena pieza → perfil no está rota: lo que falta es el tramo perfil → link. [IG Media Insights](https://developers.facebook.com/docs/instagram-platform/reference/instagram-media/insights/)

**El único mecanismo con atribución real por pieza es comment-to-DM.** El sticker de link en Stories sí muestra clics dentro de la app, pero no tiene campo de API: visible, no exportable.

### El skip rate que creíamos malo no es malo

Las bandas que circulan (menos de 15% excepcional, más de 40% problema) **no tienen muestra**. Lo único documentado es la definición: skip rate es el porcentaje de espectadores que se salta el reel **dentro de los primeros 3 segundos**. **Sin un benchmark con muestra, un skip rate de heru no se puede calificar de bueno ni de malo.**

### Dato de presupuesto

Los links en posts y Reels orgánicos **ahora son de pago**, dentro de las suscripciones de negocio de Meta. Los precios publicados para EE. UU. son **Plus $44.99/mes → 2 Reels con link al mes**, Premium $119.99 → 4, Max $349.99 → 6. El tope es sobre **Reels, no sobre URLs**, y varía por región. Meta no documenta reporte de clics — la medición va por UTM propio. Hay que confirmar el precio de México en la cuenta real antes de presupuestar.

---

## Facebook

### Qué sobrevivió a la deprecación

Confirmado por seis fuentes incluida la oficial de Meta: **85 métricas eliminadas**. Sobrevive un núcleo pequeño pero suficiente: interacciones · reacciones desglosadas · comentarios · compartidos · `post_clicks_by_type` · seguidores netos · video views 3s+ · retención · y el reemplazo `page_total_media_view_unique` / `post_total_media_view_unique`.

### La contradicción del tab 1, resuelta de verdad

Son métricas distintas, y el detalle importa:

- El **+51%** es Metricool (39.7M posts, pub. 12 dic 2025) midiendo **alcance absoluto** interanual, empujado por +71% de volumen de video publicado.
- El **1.25%** es Socialinsider (872,075 posts, ago 2026) midiendo una **tasa**: alcance ÷ seguidores.

**Y lo contraintuitivo:** el video recomendado llega a no seguidores, que suman al numerador del alcance pero no al denominador de la tasa. **Cuanto mejor te va con no seguidores, peor se ve tu reach rate.** Es la métrica que castiga exactamente lo que queremos lograr.

### Dos trampas al comparar

- **Mayo 2026: Meta renombró "Engagement" a "Interactions" y excluyó los clics.** Comparar contra 2025 produce caídas falsas.
- **Impulsar un post con pauta inutiliza su lectura orgánica de forma irreversible**, porque el desglose orgánico vs pagado ya no existe.

### Veredicto

**Sí a la red, y sí a los datos — pero por API nativa, no por Windsor.** Y hay una razón para quererlos que no teníamos vista: tras la depuración de junio, **`post_clicks` y `post_clicks_by_type` sobrevivieron**. Eso deja a Facebook como **la única de nuestras redes que expone clics a nivel de pieza** — justo lo que Instagram no da y lo que el KPI norte necesita.

> ⚠️ **Un matiz sobre las 85 métricas:** no fueron un golpe único el 15 de junio. Las fuentes cuentan entre 13 y 35 campos para esa fecha; las 85 encajan como acumulado de tres oleadas (oct-2024, nov-2025, jun-2026). Lo que sí queda claro es la pérdida del desglose orgánico vs pagado, sin reemplazo.

---

## YouTube

### Tres bloqueadores apilados, no uno

Habíamos identificado "hecho para niños". Son tres y hay que revisarlos juntos:

| # | Bloqueador | Qué apaga |
| --- | --- | --- |
| 1 | **Hecho para niños** | Tarjetas y pantallas finales, comentarios, campana, playlists y **guardar en ver más tarde** — este último mata la tesis de vida útil infinita, porque la gente guarda contenido fiscal para la temporada |
| 2 | **YPP** | El elemento "Link" de tarjetas y pantallas finales **solo existe para socios del programa**. Un canal chico no puede enlazar a WhatsApp por esa vía aunque todo lo demás esté bien |
| 3 | **Shorts** | Desde el 31-ago-2023 los links en descripción y comentarios de Shorts **no son clicables**. Sigue vigente |

**Esto reencuadra la estrategia de Shorts:** no convierten y no pueden. Pero **`insightTrafficSourceType = SHORTS` no mide tráfico de Shorts al video largo.** Su definición oficial es *"The viewer was referred by swiping vertically from the previous video in the Shorts viewing experience"* — es navegación dentro del propio feed de Shorts. La API no expone un valor para "de Short a largo", así que ese puente hay que medirlo de otra forma. [Dimensions](https://developers.google.com/youtube/analytics/dimensions)

### El diagnóstico que distingue las causas

Si `END_SCREEN` y `CAMPAIGN_CARD` vienen en cero permanente:

- **Comentarios activos** → el problema es **YPP**.
- **Comentarios muertos** → es **hecho para niños**.

Se corrige en Studio → Configuración → Canal → Configuración avanzada, **aplica retroactivamente**, y hay que corregir **los dos niveles**: el ajuste por video anula el del canal.

### El mejor benchmark es propio y gratis

Ninguna fuente de terceros publica muestra estadística. En cambio **`relativeRetentionPerformance`** de la Analytics API compara cada video contra videos de YouTube de duración similar — oficial, gratuito, por video. **Debería ser la métrica de calidad número uno de heru**, por encima de cualquier cifra de blog.

Dato de nicho: *"tax strategy for self-employed"* se ubica en **CTR de 3–4%**, estructuralmente bajo. En heru conviene optimizar **retención, no CTR**.

### Cuota: no es problema salvo que lo hagamos problema

La Analytics API tiene cuota **independiente** de las 10,000 unidades diarias del Data API v3. Leyendo con la playlist de uploads (`UC` → `UU`, `playlistItems.list` a 1 unidad) y `videos.list` loteado de 50 en 50, la lectura diaria completa cuesta **\~4 a 20 unidades de 10,000**. Los dos errores caros: usar `search.list` (100 unidades) y llamar `videos.list` una vez por video en vez de por lote.

### KPI recomendado para esta red

**Miembros de WhatsApp por cada 1,000 `engagedViews`** — no por views. Con vistas públicas el denominador incluye autoplay y hover, que nunca convierten, así que la conversión parecería empeorar sola con el tiempo sin que nada real cambiara.

---

## LinkedIn

### El diagnóstico, con datos reales

Veinte posts, últimos 30 días: **3,428 impresiones · 568 clics · 91 likes · 0 comentarios en 20 de 20 posts.**

El **86% del "engagement" es clic** — según el Content Dash. Pero el ER que reporta Windsor **no es un artefacto**: LinkedIn define su propio `engagement` como clics + likes + comentarios + compartidos sobre impresiones, así que ese número es el oficial de la plataforma. El **4.20% recalculado sin clics es una definición nuestra** — útil para comparar contra otras redes, pero no es "el ER bien calculado" de LinkedIn.

Alcance por encima del benchmark — 2,468 impresiones por post contra una mediana de 659. **Conversación en cero.** Si el valor declarado de LinkedIn es conversación B2B, hoy ese valor es literalmente cero.

### Dos premisas nuestras, corregidas

- **Las encuestas** rinden en impresiones (3,418 contra 831 de promedio) pero tienen el **penúltimo ER de todos los formatos** (4.20%). En el tramo de 8.6K seguidores de heru ni siquiera ganan en alcance.
- **El perfil personal supera a la página en +50–65%**, no en 5× ni 561%. Esas cifras son claims de vendedores sin estudio detrás.

### La palanca que sí tiene evidencia

Para romper el cero de comentarios, y es cambio de copy, no de inversión:

- **Pregunta directa: +77%**
- **CTA de respuesta: +80%**

(Metricool, 673,658 posts.)

### Lo que ya no existe

**LinkedIn mató su propio employee advocacy en noviembre de 2024** — se fueron la pestaña My Company, las Employee Advocacy Analytics y el rol Curator. En 2026 no hay herramienta nativa gratuita. La alternativa real es `memberCreatorPostAnalytics`, que exige OAuth individual de cada empleado, o UTMs por persona.

### Límites de la API

**Queda por confirmar la cuota del Development Tier** — cuota por app, cuota por miembro, hora de reset y plazo. Hay que leerlos en el portal de LinkedIn antes de diseñar cualquier polling.

---

## El hallazgo que atraviesa las cinco redes

**No existe un solo benchmark público de México o LATAM con muestra declarada, en ninguna de las cinco plataformas.** Los cinco agentes lo buscaron por separado y ninguno lo encontró: Socialinsider, Metricool, AuthoredUp, Buffer, Sprout y Hootsuite publican solo datos globales.

**Consecuencia práctica:** la única comparación honesta es **contra nuestras propias últimas 10 piezas**. Un benchmark global de un blog no dice si a heru le fue bien esta semana.

---

## Cómo se regresa la información y cómo mejora

El loop en concreto: qué señal medida esta semana cambia qué decisión de la siguiente. Nada de "analizar los resultados".

| Si esta señal… | …entonces esta decisión |
| --- | --- |
| Watch time plano en \~4 s en TikTok | El problema son los primeros 4 segundos, no la duración. **Arreglar el gancho antes de alargar nada** |
| Views arriba con share rate abajo | La pieza entretuvo y no movió. **Bajar ese ángulo, no repetirlo porque "funcionó"** |
| Save rate alto en foto/carrusel de TikTok | **Subir la proporción de ese formato.** Es la palanca sin costo de grabación |
| Sends por alcance alto en un Reel | Ese ángulo llega a no seguidores. **Republicarlo y derivar dos variantes** |
| `relativeRetentionPerformance` bajo en YouTube | El problema está dentro del video, no en la miniatura. **Revisar los primeros 30 s y los capítulos** |
| CTR bajo pero retención alta en YouTube | Al revés: el contenido sirve y el empaque no. **Rehacer título y miniatura, no el video** |
| `SHORTS` bajo como fuente de impresiones dentro del feed de Shorts | Los Shorts no están haciendo su trabajo. **Cambiar sus aperturas, no su tema** |
| Cero comentarios en LinkedIn | **Terminar cada post con pregunta directa** (+77%) y CTA de respuesta (+80%) |
| Clics de LinkedIn altos solo en `multiImage` | Son swipes. **No leerlo como tráfico ni reportarlo como tal** |
| Tasa clic → conversación oscilando | Se rompió la implementación, no el contenido. **Arreglar eso antes de concluir nada más** |

**La regla que ordena el loop:** una señal se convierte en decisión solo si se escribe en el libro de jugadas, con la red donde ocurrió. Un aprendizaje que no se escribe no existe, y uno que se generaliza de una red a las otras sin probarlo es peor que no tenerlo.

---

## Lo que hay que hacer con esto, en orden

1. **Decidir si TikTok pasa a cuenta Business.** Es lo único que desbloquea el link en bio, y hoy 265,000 views cada 90 días no tienen salida. Cuesta los audios en tendencia.
2. **Auditar YouTube en los dos niveles**: hecho para niños y estado de YPP. Son cinco minutos y determinan si la conversión en esa red es posible.
3. **Corregir `heru-sistema-contenido` y `heru-hooks`**: los Trial Reels no miden retención.
4. **Conectar Facebook a Windsor**, ahora que sabemos que es gratis.
5. **Dejar de reportar `share_clicks_count` de LinkedIn como tráfico.**
6. **Cambiar el cierre de los posts de LinkedIn** a pregunta directa. Es lo más barato de esta lista y tiene la evidencia más clara.
