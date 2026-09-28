# 20 · SEO del sitio

heru no tiene un problema de rankings. La posición promedio de 6.3 con CTR de 1.26%, según Search Console, significa que Google ya la considera una respuesta válida y los usuarios no la eligen. El problema es **fragmentación de URLs y empaquetado del snippet**.

**El tamaño del premio:** los seis blogs principales generan 6,486 clics al mes según Search Console, y la estimación es que deberían generar unos 44,000. Capturando solo la mitad de la brecha, son **~19,000 clics más al mes**, que a las tasas de conversión actuales proyectan unos 319 registros y 9 clientes adicionales.

**Dónde aterriza esto.** Las keywords donde ya rankeamos y los huecos del sitio alimentan el componente **Demanda** del score del tab 23 · Plan de ejecución diario. Un tema con volumen alto donde todavía no aparecemos es lo que más puntos saca.

## Lo técnico

Hallazgos de la revisión en vivo del sitio, ordenados por severidad.

**Crítico**

- **Slugs con acentos codificados en porcentaje.** La canónica declarada es literalmente `https://www.heru.app/blog/como-cambiar-r%C3%A9gimen-fiscal-sat/`. Esa URL fea aparece en el resultado de búsqueda. Pasa igual en constancia (`constancia-de-situaci%C3%B3n-fiscal-sat`), declaración mensual (`declaraci%C3%B3n-mensual-sat`), guía RESICO (`guía-resico-2026`) y otras.
- **Canibalización: menos de la que parecía.** Las URLs alternas ya redirigen a su canónica: `presentar-declaracion-mensual-sat` a `declaraci%C3%B3n-mensual-sat`; `tramitar-constancia-de-situacion-fiscal` y `constancia-de-situacion-fiscal` a `constancia-de-situaci%C3%B3n-fiscal-sat`. Lo que sí queda son pares de páginas vivas con intención cercana: `declaraci%C3%B3n-mensual-sat` frente a `declaracion-mensual-plataformas-digitales-paso-a-paso`, y `constancia-de-situaci%C3%B3n-fiscal-sat` frente a `como-actualizar-e-imprimir-la-constancia-fisca`. Para "cambiar régimen fiscal" no hay una segunda URL viva. "declaracion mensual sat" tiene 3,554 impresiones y cero clics, según Search Console.
- **Meta descriptions autogeneradas.** En 3 de 5 páginas revisadas la meta es el primer párrafo recortado con puntos suspensivos — gastos deducibles, constancia de situación fiscal y "cómo saber cuál es mi régimen fiscal". No prometen nada, explican. Las otras dos (e.firma y SAT ID) sí traen meta escrita a mano, así que el problema es parcial, no universal.
- **Años fosilizados en el slug.** Tres casos vivos: `como-calcular-impuesto-plataformas-tecnologicas-2025` sirve "Calcular ISR en Plataformas Digitales 2026"; `aportaciones-afore-deduccion-impuestos-2025` sirve "Aportaciones al AFORE deducibles: guía 2026"; `actividad-empresarial-guia-completa-2025` sirve "Régimen de Actividad Empresarial y Profesional: guía completa 2026". Es deuda que se repite cada enero.

**Reglas que hay que fijar**

- Sin acentos ni eñes en slugs, nunca. Migrar con 301, por lotes, midiendo 4 semanas entre cada uno.
- **Sin año en el slug.** El año va en el título, el H1 y `dateModified`. Un slug `guia-resico` se actualiza cada año sin perder autoridad.
- Una URL por intención. Antes de publicar, el sistema consulta si ya existe.
- Duplicado idéntico se resuelve con **301, no con canonical**. El canonical es una sugerencia; el 301 es una instrucción.

**Datos estructurados:** FAQPage y HowTo **ya no dan resultado enriquecido**, y conviene revisar el estado actual de esos formatos antes de decidir. Lo que sí conviene marcar: **Article** y **BreadcrumbList** — este último reemplaza la URL cruda en el resultado por una ruta legible, lo que mitiga parcialmente el daño de los slugs codificados. Más Organization y Person para las páginas de autor.

**Core Web Vitals:** LCP bajo 2.5 s, INP bajo 200 ms, CLS bajo 0.1, al percentil 75. Como el sitio corre Astro y sirve HTML estático, el riesgo no es LCP sino **INP degradado por Google Tag Manager** y CLS por imágenes sin dimensiones reservadas.

## El problema del CTR

No es posición, es snippet, y se compite contra sat.gob.mx en una SERP donde además los AI Overviews se llevan parte del clic en consultas informacionales, que es justo el corpus de heru.

| Blog | Pos | CTR hoy | Meta | Clics hoy | Meta | Δ |
| --- | --- | --- | --- | --- | --- | --- |
| actualizar mi RFC | 5.4 | 0.9% | 3.5% | 2,249 | 8,674 | +6,425 |
| constancia fiscal | 7.3 | 0.4% | 2.0% | 881 | 3,985 | +3,104 |
| cuál es mi régimen | 5.1 | 0.3% | 3.5% | 257 | 3,032 | +2,775 |
| cambiar régimen | 4.9 | 0.4% | 4.0% | 278 | 3,166 | +2,888 |
| estatus suspendido | 4.6 | 0.9% | 4.0% | 674 | 3,123 | +2,449 |
| catálogo actividades | 4.8 | 2.6% | 4.0% | 2,147 | 3,303 | +1,156 |

La lógica de los títulos nuevos: cada uno lleva **un número o un plazo** y el diferencial que resuelve la ansiedad real. "Imprimir tu constancia en 2026: 3 formas, una **sin contraseña del SAT**" — porque quien busca eso normalmente perdió el acceso al portal. "Estatus SAT suspendido: **suspendido no es cancelado**" — resolver el miedo en el snippet aumenta el clic, no lo baja. Y en régimen fiscal, si Google ya responde la pregunta simple en un AI Overview, el clic solo se gana ofreciendo el siguiente paso: "¿y me conviene?".

**Dos reglas duras para el sistema:** quitar "| heru" de los títulos de blog — consume 7 caracteres y nadie busca la marca en una consulta de trámite — y **prohibir la meta autogenerada**. La recomendación de título: de 50 a 60 caracteres, con la keyword al inicio.

La ventaja que heru está desperdiciando: tiene **datos propietarios** — la Guía RESICO 2026 cita un análisis de heru de 28,640 declaraciones mensuales RESICO de 3,147 contribuyentes. Eso debería estar en el título y la meta de cada pieza donde exista. Es lo único que ni el SAT ni la competencia pueden copiar.

## E-E-A-T en un sitio YMYL

Google es explícito: la confianza es lo más importante, y un sitio de impuestos es YMYL puro. La buena noticia es que heru ya tiene el 60% hecho: byline, **revisora contable nombrada con cargo**, fecha de publicación y de actualización, sección de fuentes oficiales y datos propios citados. En la página de declaración mensual revisa Karla Saldaña Jimenez, Especialista contable en heru; se publicó el 13 de marzo de 2026 y se actualizó el 23 de septiembre de 2026, y trae una sección "Fuentes y referencias" con 19 enlaces a CFF, LISR, LIVA y sat.gob.mx.

Lo que falta:

- **Páginas de autor** con foto, cédula profesional, años de experiencia y LinkedIn, marcadas con `Person` y enlazadas desde `author.url`.
- **Distinguir autor de revisor** en el schema: `author` es quien escribió, `reviewedBy` es quien validó.
- **Página de metodología editorial** que declare cómo se investiga, qué fuentes primarias se usan, quién revisa, y **que se usa IA asistida con revisión humana obligatoria**. Google pregunta literalmente si el uso de automatización es evidente para el visitante.
- **Política de correcciones** más un bloque visible en cada artículo corregido. Esto es lo que separa un sitio confiable de uno que borra sus errores.
- Citar **artículo y fracción específicos**, y enlazar al DOF cuando sea una reforma.

**El punto no negociable:** un sitio YMYL con errores fiscales verificables publicados no le gana a sat.gob.mx por más schema que ponga.

## Blog madre y blogs hijos

El pilar cubre la intención amplia completa sin agotar ninguna subintención: 2,500 a 4,000 palabras, una sección de 150 a 250 palabras por hija que termina en enlace, y una tabla de decisión que solo puede existir ahí. La hija agota una sola intención en 1,200 a 2,000 palabras y **enlaza al pilar con anchor de la keyword del pilar, obligatorio**.

**De 5 a 9 hijas por pilar.** Menos de 5, el pilar no se justifica. Más de 9, la hija más débil canibaliza y hay que promoverla a sub-pilar.

Cuatro reglas contra la canibalización: una intención una URL; el pilar nunca compite por la keyword de una hija, y si empieza a hacerlo se recorta esa sección; monitoreo mensual — si dos URLs aparecen para la misma consulta en 28 días, hay canibalización; y fusionar siempre con 301, nunca con canonical ni borrando.

**El clúster de RFC, hoy:** las páginas existen pero están planas. No hay pilar, todas compiten al mismo nivel y ninguna concentra autoridad. Suman más de 570,000 impresiones mensuales, según Search Console, dispersas en ocho URLs sin jerarquía.

Lo que hay que crear: un pilar `/blog/rfc-sat/` — "RFC ante el SAT: alta, consulta, actualización y suspensión" — con una tabla de los seis trámites y un árbol de decisión, colgando de él las hijas que ya existen: alta, consulta, actualizar, cambiar régimen, actividad económica y estatus suspendido. Y un sub-pilar aparte para constancia de situación fiscal, consolidando las tres URLs actuales en un slug ASCII limpio.

**Consolidar esa autoridad es la palanca estructural más grande que tiene heru, por encima de escribir cualquier artículo nuevo.**

## La automatización

Google no prohíbe contenido generado con IA. Prohíbe generar muchas páginas sin agregar valor. La línea es el valor, no la herramienta. De ahí tres reglas no negociables: el sistema no publica sin revisión humana; **prefiere actualizar sobre crear**, en proporción 70/30 los primeros seis meses; y el uso de IA se declara públicamente.

**Ingesta diaria** de cinco fuentes: consultas de Search Console con más de 1,000 impresiones y CTR bajo 2% — la mina principal —; consultas en posición 11 a 20; el vigía fiscal, que dispara actualización con prioridad máxima ante cualquier cambio normativo; brechas contra competidores; y las preguntas reales de soporte, que son la fuente de mayor intención comercial y la que nadie más tiene.

**Selección semanal, los lunes.** Prioridad = impresiones × brecha de CTR × valor comercial × factibilidad, dividido entre esfuerzo. Un multiplicador anula todo lo demás: **si hay canibalización detectada, el candidato entra a la cola de consolidación, no a la de contenido.** Consolidar siempre precede a escribir. Salida: 10 candidatos, 7 actualizaciones y 3 creaciones.

**Producción** en cuatro agentes: investigador que reúne fuentes primarias y marca lo que no encuentra; arquitecto que decide pilar o hija y valida que no exista duplicado; redactor; y un **optimizador de snippet separado**, porque es la etapa que más mueve el negocio hoy.

**Cinco compuertas**, todas bloqueantes: verificación fiscal con firma de contador humano — no basta un agente —; anticanibalización automática; técnica (slug, título, meta escrita a mano, schema, enlace al pilar); marca y riesgo; y aprobación editorial humana.

**Medición mensual** comparando 28 días antes contra 28 después. Metas de sistema: CTR del sitio de 1.26% a **2.5% en seis meses**, y URLs duplicadas a **cero**.

## Los errores publicados

**El de RESICO ya está corregido.** La Guía RESICO 2026 dice hoy "En RESICO no puedes deducir gastos para efectos de ISR" y acota que las deducciones personales del Art. 151 LISR solo aplican si hay otros ingresos acumulables. Salvedad que sigue en pie: presenta la eliminación de la declaración anual de RESICO como cambio de la Reforma Fiscal 2026 sin citar artículo. Conviene anclar esa frase a la ley.

**El de recargos sigue publicado.** Está en `/blog/tabla-gastos-deducibles-no-deducibles-sat/`. La página, titulada "Gastos Deducibles y No Deducibles ante el SAT: Tabla Completa 2026" y actualizada el 22 de septiembre de 2026, sigue listando "Multas y recargos" como NO deducible con el fundamento "Art. 28, fracc. VI, LISR". Es incorrecto dos veces: los **recargos efectivamente pagados sí son deducibles** por la excepción expresa del Art. 28, fracción I de la LISR, que deja fuera de la no deducibilidad a los accesorios de las contribuciones "a excepción de los recargos que el contribuyente hubiere pagado efectivamente, inclusive mediante compensación"; y la fracción VI es la de "las sanciones, las indemnizaciones por daños y perjuicios o las penas convencionales", que cubre la multa pero no el recargo. Citar la fracción equivocada es peor que no citar, porque simula rigor.

Matiz que hay que incluir o el dato se vuelve engañoso: la deducción de recargos aplica a quien determina el ISR con deducciones autorizadas. **Un contribuyente de RESICO no deduce recargos, porque no deduce nada.** La tabla debe segmentar por régimen.

**El protocolo:** corregir con bloque visible que diga qué decía y qué dice ahora; auditar la propagación en los primeros tres días — la afirmación suele estar replicada en FAQs, base de ayuda, chatbot y material de soporte, y si alimenta a un asistente hay que corregir la fuente del asistente; barrido completo de afirmaciones fiscales sobre las 104 piezas que lista el índice del blog, priorizando por impresiones; y publicar la página de correcciones.

**Lo que no se hace:** borrar el artículo, corregir en silencio, o ponerle `noindex`. Para un sitio YMYL, corregir en público con fundamento es señal de confianza. Una página de correcciones activa es un activo, no un pasivo.

## Las tres cosas de esta semana

Ninguna necesita el sistema de agentes. El sistema sirve para sostenerlo después.

1. **Reescribir a mano título y meta de las seis páginas de la tabla.** Cero dependencias, cero riesgo, y ahí están los 19,000 clics.
2. **Corregir la fila de recargos** con bloque de corrección visible y la cita legal correcta, firmada por el contador antes de publicar.
3. **Migrar a un slug ASCII, con 301, la página de cambiar régimen fiscal.** La canónica es `como-cambiar-r%C3%A9gimen-fiscal-sat` y el trabajo real es sacarle el acento codificado. Son 79,144 impresiones con 0.4% de CTR, según Search Console.
