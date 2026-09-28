# 17 · Comunidad de WhatsApp

Tres hallazgos que cambian el planteamiento.

**La Comunidad tiene techo: 2,000 miembros.** Según WhatsApp: "You can add up to 2,000 members to a community and its announcement group" ([WhatsApp Help Center](https://faq.whatsapp.com/582420703681043)). No sirve como destino de un crecimiento masivo. La arquitectura correcta es Canal arriba, Comunidad abajo, no una sola cosa.

**El Canal no dice de dónde vino nadie.** Solo ves seguidores y reacciones; falta abrir el panel de admin para confirmar exactamente qué muestra. La atribución se construye afuera.

**TikTok no es una red de adquisición a WhatsApp.** Su única superficie de enlace es el link de la bio del perfil.

**Dónde aterriza esto.** Alimenta dos partes del tab 23 · Plan de ejecución diario: el componente **Camino a WhatsApp** del score, y la atribución que permite saber qué pieza trajo a quién. Falta generar los links `wa.me` con código propio por pieza — sin eso no se puede cerrar el ciclo de aprendizaje.

## Canal, comunidad o grupo

|  | Grupo | Comunidad | Canal |
| --- | --- | --- | --- |
| Techo | 1,024 | 2,000 | WhatsApp no publica uno |
| Quién publica | todos | admins | solo admins |
| ¿Se ven entre sí? | sí, con teléfono | en subgrupos sí | no, anónimos |
| ¿Se ve el número de heru? | sí | sí | no |
| Descubrimiento | solo link | solo link | directorio público buscable |
| Analítica | ninguna | ninguna | seguidores y reacciones |

Los límites que publica WhatsApp: grupo máximo 1,024 miembros ([Help Center](https://faq.whatsapp.com/967457667545238)); comunidad y su grupo de avisos, máximo 2,000 ([Help Center](https://faq.whatsapp.com/582420703681043)); en el Canal los seguidores son anónimos entre sí y el admin no ve el teléfono completo de nadie, ni ellos el suyo ([Help Center](https://faq.whatsapp.com/549900560675125)); el directorio público de canales es buscable y filtrable por región y categoría ([Help Center](https://faq.whatsapp.com/630432792316720)). **WhatsApp no publica un techo de seguidores para el Canal**, así que tampoco conviene asumir que es infinito.

**Empezar con Canal.** WhatsApp no publica un techo de seguidores; nadie ve el teléfono de nadie, y una comunidad de dinero con público de ingresos variables es blanco de estafas y suplantación; el ruido es estructuralmente imposible porque nadie más publica; aparece en el directorio público buscable de WhatsApp, o sea que hay descubrimiento que no depende de que traigas a cada persona; y un canal de avisos informa, no vende.

El costo de elegirlo: cero conversación, cero analítica, cero segmentación. Es real y hay que aceptarlo.

La arquitectura completa: redes → **Canal** (sin techo publicado, anónimo, avisos) → **Comunidad** (máx. 2,000, conversación, subgrupos por perfil: conductores, repartidores, freelancers creativos, profesionistas) → registro. El Canal es el KPI de volumen; la Comunidad es de donde sale la conversión.

## Red por red

| Red | Mecanismo real | Qué tan bien funciona | Qué hacer |
| --- | --- | --- | --- |
| Instagram | bio, sticker de enlace en stories, comentario a DM automático por la API oficial de Meta (private replies: 7 días de ventana, un solo mensaje por comentario) | **La mejor, con diferencia.** Única con las tres superficies | 60% del esfuerzo. Sticker 3–4 veces por semana |
| YouTube | descripción y comentario fijado en video largo, hasta 14 links en la página de canal | Bien para largo, **nulo para Shorts** | Link arriba del pliegue en cada largo. No gastar esfuerzo en Shorts |
| TikTok | solo bio | **Mal. Es la peor** | No cambiarse a Business: se pierde la librería de sonidos. Medirlo por seguidores y visitas a perfil, no por miembros |
| Facebook | información de la página, comentarios, stories | Degradada y empeorando | Link en el primer comentario, no en el post |
| LinkedIn | post, primer comentario, perfil | Regular, y con el público equivocado | No es para esto. Su valor es marca y alianzas |

El comentario → DM de Instagram existe como *private reply* en la API de Meta, con ventana de 7 días desde el comentario y **un solo mensaje por comentario** ([Meta for Developers](https://developers.facebook.com/docs/instagram-platform/private-replies/)); la restricción de sonidos para cuentas de negocio en TikTok es la Commercial Music Library ([Términos de TikTok](https://www.tiktok.com/legal/page/global/commercial-music-library-user-terms/en)). Las columnas "Qué tan bien funciona" y "Qué hacer" son criterio interno de heru.

En YouTube, "URLs placed in YouTube Shorts comments and Shorts descriptions are non-clickable", y un canal puede mostrar **hasta 14 links en su página de canal** ([YouTube Help](https://support.google.com/youtube/answer/13748639)). El cambio se anunció en agosto de 2023 ([Tubefilter, 10 ago 2023](https://www.tubefilter.com/2023/08/10/youtube-shorts-comments-spam/)). Los hashtags y las menciones sí siguen siendo clicables en Shorts, y esa es la única vía de navegación que queda ahí.

## El lead magnet

La tensión: el KPI pide miembros, pero en orgánico no se puede pedir un clic. **La salida es que "comenta" sea el mecanismo de adquisición, no un cierre distinto.** El video cierra con "comenta *deducciones* y te digo dónde está"; el comentario dispara el DM. El cierre permitido y la captación son el mismo acto. El link vive permanentemente en bio, stories y descripciones, así que el video nunca pide un clic.

Segunda consecuencia: **el lead magnet no puede ser una descarga.** Tiene que vivir dentro de WhatsApp.

**Recomendado: el aviso antes de la fecha.** "Te avisamos antes de cada fecha del SAT, para que no te caiga la multa." Un aviso 5 días antes y 1 día antes de cada vencimiento.

Por qué este: es lo único que justifica la existencia del canal de forma permanente. Una guía se consume una vez; una fecha vuelve cada mes. Ataca el dolor real — la multa, no la asesoría. Cuesta cero. Y da el calendario de contenido gratis. Suponemos que este tipo de comunidad crece **a saltos, en torno a eventos**, no linealmente. El equivalente para heru es el día 17 y abril.

Alternativas: tabla de deducciones por oficio, descifrador de la carta invitación del SAT, hora semanal de preguntas con contador. Las tres funcionan mejor como campaña puntual que como razón permanente.

## Cómo se mide

El Canal no da atribución. Se construye afuera y es aproximada por diseño; hay que decirlo así en el reporte.

1. **Un link corto por red y por superficie** — `r.heru.app/ig`, `/igs`, `/igdm`, `/tt`, `/yt`, `/ytc`, `/fb`, `/li`. Todos al mismo destino. Herramienta: Short.io gratis, que da 1,000 links y 50,000 clics rastreados al mes ([short.io/pricing](https://short.io/pricing)). Bitly gratis da 5 links al mes ([bitly.com](https://bitly.com/pages/pricing)) y se acaba en la primera semana.
2. **Un salto intermedio en heru.app** con UTM completo, para que GA4 lo registre. Cuesta algo de conversión; es opcional.
3. **La pregunta de origen**, que es la única verdad: encuesta nativa como primer mensaje de la Comunidad, y una vez al mes en el Canal. *¿Por dónde nos encontraste?*
4. **Hoja semanal** con seguidores del lunes y del domingo, clics por link, y respuestas de la encuesta. El delta neto es el KPI; la mezcla de la encuesta corrige la mezcla de clics. **Cuando no coinciden, manda la encuesta.**

Lo que no se puede medir: qué pieza trajo a qué miembro, y las bajas del canal — solo se ve el neto.

## Qué pasa adentro

| Día | Pieza | Función |
| --- | --- | --- |
| Lunes | el aviso: qué se vence | la razón de ser, nunca se salta |
| Miércoles | una cosa que no sabías, aplicada a un oficio | lo que la gente reenvía |
| Viernes | la pregunta de la semana | interacción |
| Días 12 y 16 | recordatorio del 17 | el pico de utilidad |
| Marzo y abril | serie de la anual | el pico de crecimiento del año |

**Si una semana no hay nada útil que decir, no se publica.** Un canal que publica por publicar es el que la gente silencia, y silenciado es indistinguible de muerto.

En la Comunidad, desde el día uno: aprobación de nuevos activada — en febrero de 2020 los links de invitación de grupos aparecieron indexados en Google, con más de 400,000 resultados públicos ([XDA, feb 2020](https://www.xda-developers.com/whatsapp-search-engine-group-invite-links/)) —, reglas fijadas, cero tolerancia a promoción de terceros, y **dos admins mínimo**.

El camino a registro, de menor a mayor compromiso: el canal informa (semanas 1 a 4) → invitación lateral a la Comunidad a quien quiera preguntar → la pregunta contestada por un contador → **cuando alguien pregunta "¿y cómo la presento?", ahí y solo ahí aparece heru**, con el link atribuido. No antes, y no a todos: a quien preguntó.

La métrica de esta parte no es cuántos se registraron, es **cuántas preguntas llegan por semana**. Sin preguntas no hay conversión posible.

## Expectativa realista

Por **decisión interna de heru**, la meta se escribe por trimestre y no por semana, con los picos marcados en el día 17 de cada mes y en marzo–abril. Un plan que asuma 100 miembros parejos cada semana va a fallar en los meses planos y a subestimar la anual. El primer trimestre de operación es el que da el número.
