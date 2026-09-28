# 13 · SEO social por red

La idea: lo que la gente ya busca en Google decide qué publicamos, y cada búsqueda se cubre con una pieza por red. Si alguien busca "cómo actualizar mi rfc", que salgan el blog de heru, el video de YouTube, el post de LinkedIn, el reel de Instagram y el video de TikTok. Fuente de datos: el dashboard de SEO con Google Search Console.

**Dónde aterriza esto.** Las keywords donde ya aparecemos y los huecos que quedan alimentan el componente **Demanda** de la función de score del tab 23 · Plan de ejecución diario, el que más pesa. Falta volcar Search Console a filas del pool para que compitan solas cada día.

## Qué busca la gente

Según Search Console, septiembre 2026: 1,907,827 impresiones y 24,039 clics en Google, CTR 1.26%, posición promedio 6.3. El patrón es claro: heru ya aparece, pero casi nadie da clic. Ahí está el espacio que las redes pueden ocupar.

Las diez búsquedas con más oportunidad, ordenadas por impresiones desperdiciadas:

| Búsqueda | Impresiones | Clics | Posición |
| --- | --- | --- | --- |
| cómo saber cuál es mi régimen fiscal | 86,618 | 257 | 5.1 |
| cómo cambiar régimen fiscal | 79,144 | 278 | 4.9 |
| estatus sat suspendido | 78,085 | 674 | 4.6 |
| constancia de situación fiscal (6 variantes) | 42,603 | 79 | 8.8–10.7 |
| opinión de cumplimiento (3 variantes) | 40,810 | 12 | 7.6–9.3 |
| cómo actualizar mi rfc (4 variantes) | 26,478 | 557 | 3.9–6.4 |
| rfc actualizado | 25,483 | 363 | 4.9–5.5 |
| declaración mensual | 3,554 | 0 | 9.2 |
| certificado sat | 3,443 | 2 | 10.3 |
| calculadora resico | 3,407 | 9 | 5.6 |

El hueco más grande es opinión de cumplimiento: 40 mil impresiones y doce clics. Nadie de heru resuelve esa intención en ningún formato.

Las búsquedas caen en siete intenciones, y la intención decide el formato: trámite, definición, estado o resultado, plazo, problema, comparación y cálculo. La de **estado** es la más rentable y la peor cubierta: la gente busca el objeto terminado ("rfc actualizado"), no el verbo, y ningún video lo muestra.

No son oportunidad las búsquedas de marca (heru, heru app) ni las que ya están resueltas con CTR sobre 10%: meterles contenido social no mueve nada.

Advertencia del propio dashboard: los datos de Search Console están congelados desde el 25 de septiembre por una falla del pipeline. Septiembre son 25 días, no el mes completo.

## Cómo se indexa cada red

No todas las redes rankean igual en Google, y la diferencia es enorme. El orden de apuesta para heru:

**1 · YouTube.** La apuesta principal. Google documenta que puede indexar el mismo video en la página del sitio y en la página equivalente de la plataforma de terceros: "Google may index the video both on your web page and on the third-party platform's equivalent page". O sea que el video puede ocupar dos posiciones si el blog de heru lo embebe. Google también documenta que la página de reproducción tiene que rankear bien en Search antes de que su video se considere para indexación, y nombra como requisitos la miniatura válida con URL única y estable, información única en `thumbnailUrl`, `name` y `description`, y los momentos clave, que puede detectar solo o tomar de datos estructurados. [Google Search Central](https://developers.google.com/search/docs/appearance/video)

*Recomendación de heru:* keyword al inicio del título, keyword en los primeros 150 caracteres de la descripción, capítulos con marcas de tiempo y subtítulos cargados a mano.

**2 · Instagram.** Desde el 10 de julio de 2025 Instagram permite que los buscadores indexen el contenido público de cuentas profesionales de mayores de 18 años, y el ajuste viene activo por defecto: "Allow public photos and videos to appear in search engine results", en Configuración → Privacidad. Reportado por [PPC Land](https://ppc.land/instagram-content-becomes-searchable-on-google-starting-july-10/).

**Queda por confirmar** si México está incluido en el indexado de perfiles públicos de Instagram. La prensa especializada lo describe como despliegue global para cuentas profesionales, pero no hay una lista pública de países. Se comprueba abriendo los ajustes de @somosheru y buscando el control de indexación en buscadores. Si no está disponible en México, esta apuesta se cae y hay que repartir el peso a YouTube y LinkedIn.

**3 · LinkedIn.** Hay un cambio contraintuitivo, medido por un tercero, no por LinkedIn: un estudio de Foundation Marketing con datos de Ahrefs (2 abr 2026) reporta que el tráfico orgánico de Google a `/pulse/` cayó 89%, de 33 millones de visitas mensuales en marzo 2024 a 3.6 millones en marzo 2026, mientras las visitas a `/posts/` subieron 250% desde octubre 2025, de ~3 a ~11 millones. [Foundation Marketing](https://foundationinc.co/lab/linkedin-pulse-post-traffic/) **Recomendación: la nota de LinkedIn va como post nativo largo, no como artículo.**

**4 · TikTok.** Lo documentado es el buscador interno de TikTok: ahí TikTok nombra como señales del video el caption, el sonido y los hashtags. [TikTok Newsroom](https://newsroom.tiktok.com/how-tiktok-recommends-videos-for-you?lang=en)

*Recomendación de heru:* keyword en los primeros caracteres del caption, dicha en voz alta, y como texto en pantalla en los primeros 3 segundos.

**5 · Facebook.** *Recomendación de heru:* su valor en el clúster es cobertura de marca y distribución al nicho, no ranking en Google; publicación pública, keyword en la primera línea y texto alternativo en las imágenes.

Una creencia común que **no** está respaldada: que Google use transcripciones o texto en pantalla para indexar video. La [documentación ](https://developers.google.com/search/docs/appearance/video)[de Google sobre video](https://developers.google.com/search/docs/appearance/video) no lo menciona. Atribuírselo a Google es repetir un mito de blogs de SEO.

## El sistema de clústeres

Una búsqueda de Google se convierte en cinco piezas. Lo que **nunca** cambia entre redes: la keyword exacta tal como se busca, el ángulo, y el dato fiscal con su artículo de ley. Lo que **sí** cambia: el formato nativo, dónde vive la keyword y el cierre.

1. **Selección.** Cada lunes se jala la tabla de oportunidades del dashboard y se elige la de mayor impresiones por CTR desperdiciado. Se descarta lo que ya tiene CTR sobre 10% o posición bajo 3, y todo lo de marca.
2. **Normalización de la keyword.** La variante con más impresiones es la canónica; se listan 4 a 6 variantes (con acento, sin acento, con año, con "en línea"). La canónica va literal en los campos que el rastreador lee; las variantes se reparten entre redes para no canibalizarse.
3. **Clasificación de intención.** Decide el formato por red:

| Intención | YouTube | Instagram | TikTok | LinkedIn | Facebook |
| --- | --- | --- | --- | --- | --- |
| Trámite | tutorial 4–8 min con capítulos | reel paso a paso | video 30–45 s | post nativo con checklist | post con liga al blog |
| Definición | video 3–5 min | carrusel 6–8 slides | video 20–30 s | post nativo con la cita de ley | carrusel |
| Estado o resultado | "así se ve cuando ya quedó" | reel antes y después | video de resultado | post nativo | foto del documento con alt |
| Plazo | video corto con fecha en título | reel con fecha en pantalla | video con fecha hablada | post nativo con la fecha | recordatorio |
| Problema | video de diagnóstico | reel síntoma y causa | video de pánico resuelto | post nativo de caso | post |
| Comparación | video comparativo | carrusel comparativo | video "cuál eres tú" | post nativo con tabla | carrusel |

4. **Compuerta de marca.** Antes de escribir se corre el chequeo de palabras gatillo. La regla operativa: casi toda keyword tiene un sustantivo limpio ("rfc", "constancia de situación fiscal", "régimen fiscal") y solo el apellido "sat" está prohibido. **El sustantivo limpio va al hook, al texto en pantalla y a la portada; "sat" vive en la descripción, el caption y los hashtags, donde el rastreador lo lee igual.** Si una keyword no tiene sustantivo limpio, se escala a Mich antes de producir.
5. **Compuerta fiscal.** Todo dato con su artículo. La cita vive en la descripción en YouTube, al final del caption en Instagram y TikTok, en el cuerpo en LinkedIn y Facebook. Nunca en la portada ni en el hook.
6. **Cuerpo único, cinco adaptaciones.** Mismo dato, mismo orden, misma cita. Cinco hooks distintos, porque el hook es lo único que no se recicla.
7. **Publicación con ventana de 48 horas**, en este orden: YouTube, LinkedIn, Instagram, TikTok, Facebook. YouTube primero porque tarda más en indexar y es el que más pesa. El blog de heru que ya rankea para esa búsqueda debe **incrustar el video de YouTube**: así el mismo video ocupa dos posiciones.
8. **Cierre permitido:** guardar, compartir o comentar. Nada de registrarse ni descargar.
9. **Medición a 7, 21 y 45 días.**
10. **Reciclaje.** Si a los 45 días ninguna red entró a top 20, se cambia el ángulo, no el tema. Si dos redes entraron, se produce el siguiente clúster de la misma familia.

## Ejemplo: cómo actualizar mi rfc

Keyword canónica `cómo actualizar mi rfc`, intención de trámite. Según Search Console, posición 4.5 con 7,578 impresiones y CTR 2.06%. El blog de heru ya rankea con 136,432 impresiones a 1.68%, o sea que hay autoridad sobre la cual montarse.

**Respaldo legal:** la obligación de presentar avisos de actualización al RFC está en el CFF artículo 27 apartado B; los avisos y sus plazos en los artículos 29 y 30 del Reglamento del CFF, con 10 días hábiles para el cambio de domicilio fiscal. **Pendiente de validar con el equipo fiscal** contra la RMF 2026 vigente antes de publicar cualquiera de las cinco piezas.

**Tensión de marca reconocida:** varias variantes del clúster llevan "sat", palabra prohibida en hooks y portadas. Aquí el costo es bajo porque "rfc" solo ya es la cabeza de la búsqueda. **No sería así en el clúster de opinión de cumplimiento, donde "sat" está pegado a la cabeza en las tres variantes: ese caso hay que decidirlo con Mich antes de producir.**

| Red | Formato | Dónde va la keyword | Cierre |
| --- | --- | --- | --- |
| YouTube | tutorial con capítulos | título "Cómo actualizar mi RFC en línea 2026, paso a paso" y primeros 120 caracteres de la descripción | guardar |
| LinkedIn | post nativo | primeras líneas del post | guardar |
| Instagram | reel, no carrusel | primera línea del caption | guardar |
| TikTok | video vertical 35 s | primeros caracteres del caption, dicha en voz alta y en pantalla al segundo 0 | guardar |
| Facebook | publicación pública | primera línea y texto alternativo de la imagen | compartir |

**Texto en pantalla en las tres piezas de video:** "CÓMO ACTUALIZAR MI RFC". Sin "SAT" visible.

**Detalles que cambian el resultado:** en YouTube los capítulos con marcas de tiempo habilitan los momentos clave y los subtítulos van cargados a mano, no automáticos. En Instagram va texto alternativo manual y audio hablado que diga la keyword completa. En TikTok el archivo se nombra `como-actualizar-mi-rfc-2026.mp4` antes de subirlo y van dos hashtags, no más de cinco. En LinkedIn no va liga externa en el cuerpo: las ligas salientes bajan el alcance y aquí lo que queremos es que el post mismo rankee.

## Cómo se mide

El problema de fondo: **Search Console no ve las redes de heru.** Solo reporta propiedades verificadas. Si un reel de @somosheru rankea, no aparece en el dashboard. Hay que medirlo por fuera.

**Cada lunes, 5 minutos por clúster:**

- Búsqueda manual en incógnito con ubicación México, de la keyword canónica y cada variante. Anotar en qué posición sale cada red y en qué función: resultado azul, carrusel de video, videos cortos, otras preguntas, paquete de imágenes. **Hacerlo en móvil además de escritorio, porque los resultados difieren entre dispositivos.**
- Operadores `site:` para separar un problema de indexación de uno de ranking: `site:youtube.com/@heru_app`, `site:instagram.com/somosheru`, y así con las cinco. Si la URL no sale, el problema es que no está indexada y la acción es otra.
- En Semrush, agregar las URLs de las cinco redes como dominios rastreados sobre el mismo set de keywords. Es la única forma de tener histórico automático sin revisar a mano.

**Por plataforma, cada semana:** YouTube Studio da el dato limpio en Fuentes de tráfico, Búsqueda de Google; es el único directo y confiable. Instagram da alcance por búsqueda pero no separa Google del buscador interno, así que sirve como proxy, no como prueba. TikTok mide su buscador interno, que es el KPI correcto para esa red. LinkedIn: si las impresiones del post siguen subiendo después de la semana 2, es señal de búsqueda y no de feed. Facebook no da dato útil; se mide solo con `site:` y búsqueda manual.

**Hitos por clúster:** día 7, ¿están indexadas las cinco piezas? Día 21, ¿alguna red entró a top 20? Día 45, ¿alguna entró a top 10? Si ninguna, se cambia el ángulo, no el tema.

**Criterio de éxito del sistema, no de la pieza:** que para la keyword canónica heru ocupe al menos dos resultados de la primera página, heru.app más una red, y que el CTR combinado de esa búsqueda suba por encima del CTR actual del blog.
