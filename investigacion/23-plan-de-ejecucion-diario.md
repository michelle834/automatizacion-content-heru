# 23 · Plan de ejecución diario

Cómo el sistema decide, todos los días, qué se publica en cada red, lo produce, lo revisa, lo sube y aprende del resultado.

Todo esto está dibujado en [**Flujo de contenido heru**](https://claude.ai/artifact/D6huQ12NpXVoLujQ6MkhT6): el tronco común hora por hora arriba, y abajo un carril por red con sus fuentes, su formato, quién la bloquea y si hoy se puede publicar sola.

Los veintidós tabs anteriores no son investigación suelta: cada uno alimenta una parte concreta de este motor. Esta tabla es el cableado — qué produce cada tab, dónde entra, y qué falta para que el cable quede conectado de verdad.

| Tab | Qué produce | Dónde entra en el motor | Qué falta para conectarlo |
| --- | --- | --- | --- |
| 1 · Algoritmos | Qué premia y qué castiga cada red | Componente **Encaje de red** del score | Traducir cada hallazgo a puntos por red y formato |
| 2 · Qué impulsar | Qué formato empujar en cada red | Columna `formato sugerido` del pool | — |
| 3 · Manual de ejecución | Duraciones, specs, horarios | Producción (10:00) y programación (16:00) | — |
| 5 · Estructura y hooks | Anatomía del hook por red | Paso de Hooks (8:00) | — |
| 6 · Sistema de ideas | Banco de 40 ideas | Filas iniciales del pool | Cargarlas con su keyword exacta y su ventana |
| 7 · Prefiltro | El diseño de las compuertas | Compuertas 1 y 3 (9:00) | — |
| 8 · Pipeline y agentes | Los 7 roles × 5 redes | Quién corre en cada hora del día | Construir los agentes; hoy solo existen 4 de 7 |
| 9 · Herramientas | Con qué se ejecuta cada paso | Publicación y medición | Decidir programador tras la pregunta de Buffer |
| 10 · Medición por red | El nombre exacto de cada métrica en cada API | Columnas de `aprendizajes` | — |
| 13 · SEO social | Qué busca la gente en Google y qué red debe contestarlo | Componente **Demanda** | Volcar Search Console a filas del pool |
| 14 · Publicación automática | Los gates reales de cada API | Sección 7 de este tab | Auditoría de YouTube y tier de LinkedIn |
| 15 · Qué impulsa TikTok | Creator Search Insights y el filtro de hueco | Componente **Demanda** en TikTok | Captura semanal, es manual |
| 16 · Value ladder | Para qué sirve cada pieza en la escalera | El destino que declara cada pieza | — |
| 17 · Comunidad de WhatsApp | Cómo entra la gente y por dónde | Componente **Camino a WhatsApp** y la atribución | Generar los `wa.me` con código por pieza |
| 18 · Tendencias al día | El radar de las 5:45 | Entrada diaria al pool | — |
| 19 · Newsletters | Un destino que no es red social | Destino alterno de una pieza | — |
| 20 · SEO del sitio | Keywords donde ya rankeamos y dónde hay hueco | Componente **Demanda** | — |
| 21 · Inspo competencia | Qué se viraliza y qué replicar | Biblioteca de plantillas ganadoras | Descomponer cada referente en mecanismo + estructura |
| 22 · Branding | Todas las reglas visuales y de voz | Compuerta 3 y producción de arte | — |

**Lo que la tabla deja ver.** De diecinueve cables, **trece ya están conectados** y seis no. Y los seis que faltan no son investigación pendiente: son trabajo de plomería — volcar datos a una tabla, generar links, construir tres agentes, presentar dos trámites. Ninguno necesita más investigación para arrancar.

Esa es la diferencia entre el documento de antes y el de ahora: antes teníamos veintidós tabs de hallazgos; ahora tenemos seis tareas de conexión.

**Nada se publica el mismo día que se decide.** Todo lo que sale un miércoles ya estaba decidido, producido, revisado y programado antes del miércoles. Lo que cambia entre una pieza y otra es **cuánta ventaja necesita**: un carrusel necesita un día, un video con cara necesita ocho. Por eso el sistema corre en tres velocidades a la vez, y por eso todos los días hay piezas en etapas distintas.

**Una decisión, una regla.** Nada de "el equipo decide". Cada día una función de score ordena el pool y saca la lista del día siguiente. Mich no elige de cero: aprueba o cambia una fila. Si tiene que pensar más de seis minutos, el motor está mal calibrado, no ella.

## 1 · El pool: nueve fuentes, una sola tabla

El problema no es falta de información, es exceso. Nueve fuentes tirando datos a la vez no son nueve decisiones: son una, si todas escriben en el mismo lugar con el mismo formato.

**Todas las fuentes escriben en una pestaña `pool` del Content Dash.** Una fila = un candidato. Nunca se decide leyendo nueve tableros; se decide leyendo una tabla ordenada.

| Fuente | Qué aporta | Cada cuándo | Quién la trae |
| --- | --- | --- | --- |
| DOF / SAT / IMCP / PRODECON | Cambios de ley y fechas límite | Diario 5:45 | Vigía fiscal |
| Search Console | Keywords donde ya aparecemos y dónde estamos en página 2 | Semanal | Explorador |
| Creator Search Insights (TikTok) | Qué se busca en TikTok y qué nadie contesta | Semanal, manual | Explorador · TikTok |
| Google Trends MX | Picos de búsqueda con ventana corta | Diario 5:45 | Radar |
| Noticias fiscales | Qué se va a comentar hoy | Diario 5:45 | Radar |
| Competencia por red | Qué le funcionó a otro y por qué | Semanal | Explorador de cada red |
| Comentarios y DMs propios | La pregunta real, con las palabras del usuario | Diario | Explorador |
| Comunidad de WhatsApp | Lo que preguntan los que ya confían | Semanal | Explorador |
| Aprendizajes propios | Qué combinación ya ganó o ya murió | Semanal, lunes | Analista |
| Blog de heru | Lo que ya escribimos: temas que ya rankean, y el hecho citable ya redactado | Semanal | Explorador |

**Las columnas de `pool`**, y ninguna se puede quedar vacía:

`id` · `fecha_entrada` · `fuente` · `tema` · `keyword exacta como la escribe la gente` · `ángulo` · `pilar` · `red sugerida` · `formato sugerido` · `ventana (días que le quedan)` · `hecho citable` · `score` · `estado`.

Dos columnas cargan más peso de lo que parece:

- **`keyword exacta`.** No traducida a lenguaje de contador. "explicación del desglose semanal de ganancias DiDi conductor", no "ingresos por plataformas digitales". Esa frase se usa tal cual en el texto en pantalla y en la descripción; es lo que hace que el video aparezca cuando alguien la busca.
- **`hecho citable`.** El artículo de ley o la fuente que sostiene el dato. Si está vacía, el candidato **no puede salir hoy**: se queda en el pool hasta que el Vigía lo llene. Esto evita el escenario que ya nos pasó — publicar algo que suena bien y no se sostiene.

**Estados posibles:** `nuevo` → `agendado` → `en producción` → `en compuertas` → `programado` → `publicado` → `cerrado`. Y dos salidas laterales: `devuelto` (una compuerta lo rechazó y vuelve al pool con nota) y `muerto` (se le acabó la ventana o el Analista mató esa combinación).

### El blog es la fuente más barata que tenemos

heru.app/blog ya tiene más de cien artículos publicados, ordenados en seis categorías que son casi exactamente nuestros pilares: **Deducciones · Impuestos · RESICO · SAT · Sueldos y Salarios · Análisis**. Es la única fuente del pool que ya está escrita, ya está revisada y ya es nuestra.

Juega **dos papeles distintos** y conviene no confundirlos:

**1 · Como fuente de temas.** Un artículo que ya rankea es demanda comprobada con producción hecha. No hay que investigar el tema: hay que convertirlo de formato. Un post de "Impuestos para repartidores en México 2026" es, sin trabajo de investigación adicional, un video de TikTok, un carrusel, un Short y un post de LinkedIn. El cruce que más vale la pena revisar cada semana es **artículos que rankean en Search Console y todavía no tienen video**: ahí la demanda ya está probada y solo falta el formato.

**2 · Como fuente del hecho citable.** Cada artículo ya trae el artículo de ley que la pieza necesita para pasar la compuerta 2. Eso ahorra el paso más lento de la producción.

**Y una advertencia que nos costó encontrar.** El blog **no es fuente de verdad fiscal**. Ya publicó al menos dos errores: que en RESICO sí se aplican deducciones personales, ya corregido, y que los recargos no son deducibles, que **sigue publicado hoy** aunque la LISR Art. 28 fr. I dice expresamente lo contrario. El Verificador toma del blog **el tema y la pista del artículo**, nunca el dato: el dato lo confirma contra la ley.

Y el flujo corre en los dos sentidos. Si una pieza de redes funciona sobre un tema que no tiene artículo, ese hueco vuelve al pool como candidato de blog — que es como el SEO del sitio y las redes se empujan entre sí en vez de vivir separados.

## 2 · La función de score: cómo se decide

Esta es la pieza que no existía. Todo lo demás del sistema ya estaba escrito en algún tab; lo que faltaba era **la regla que convierte el pool en la lista de mañana sin que nadie opine**.

Corre cada día a las 6:30. Recalcula el score de **todas** las filas vivas del pool, no solo las nuevas — un tema de hace tres semanas puede subir hoy porque se acerca el día 17.

### Los cinco componentes

| Componente | Puntos | Qué mide | De dónde sale |
| --- | --- | --- | --- |
| **Demanda** | 0–30 | ¿Alguien lo está buscando de verdad? | Search Console, Creator Search Insights, Trends, comentarios |
| **Ventana** | 0–25 | ¿Se vence? | Calendario fiscal y decaimiento de tendencia |
| **Evidencia propia** | 0–20 | ¿Algo así ya nos funcionó? | Tabla de aprendizajes del Analista |
| **Encaje de red** | 0–15 | ¿Es el trabajo de esa red? | Tabla de la sección 3 |
| **Camino a WhatsApp** | 0–10 | ¿Puede cerrar con una razón para entrar? | El Guionista lo declara |

**Demanda (0–30).** El máximo no lo da el volumen solo, lo da **volumen alto con hueco**: alguien lo busca y nadie lo contesta bien. Una keyword con 3,554 impresiones y cero clics vale más que una con más volumen donde ya estamos en el uno. El hueco es la oportunidad; el volumen sin hueco es competir de más.

**Ventana (0–25).** Lo que caduca gana, porque lo perenne puede esperar. Tres días antes del 17 el tema del 17 se lleva los 25 puntos completos. Un explainer de RESICO se lleva 5: seguirá sirviendo en marzo.

**Evidencia propia (0–20).** Aquí se cierra el ciclo. No premia el tema, premia **la combinación pilar × formato × red** que ya ganó. Si "deducciones × listicle × carrusel IG" ganó dos veces seguidas, cualquier candidato que caiga en esa combinación arranca con 20. Si murió dos veces, arranca con 0 y además se marca.

**Encaje de red (0–15).** El mismo tema saca puntajes distintos por red. "Desglose semanal de DiDi" saca 15 en TikTok y 0 en LinkedIn. Esto es lo que evita el error de copiar y pegar un tema a las cinco redes.

**Camino a WhatsApp (0–10).** Suma cuando la pieza puede cerrar con una razón real para entrar a la comunidad. Es preferencia, no requisito: una pieza que no lleva a WhatsApp compite igual, solo compite con diez puntos menos. Ninguna pieza se bloquea por esto.

### Los filtros duros

No restan puntos: **multiplican por cero**. Un candidato que falle uno de estos no compite hoy, sin importar su score.

1. **Sin hecho citable** → no sale. Vuelve al pool esperando al Vigía.
2. **Pilar ya usado tres veces esta semana** → no sale. Es la regla de diversidad: mínimo tres pilares distintos por semana.
3. **La misma keyword ya publicada en esa red en los últimos 21 días** → no sale. Evita canibalizarnos solos.
4. **Ventana vencida** → pasa a `muerto`.

Las palabras gatillo **no** son filtro de tema, son filtro de hook. Un tema del SAT no se mata: se le reescribe el gancho. Matar temas por palabra gatillo nos dejaría sin negocio.

### El corte

El motor ordena por score descendente, aplica los filtros duros, y toma los primeros N de cada red según el volumen de la sección 3. Eso es la **lista de mañana**.

Mich la ve a las 7:30 con el radar. Puede hacer tres cosas: aprobar, cambiar una fila por la siguiente del ranking, o meter una a mano. **Cada cambio manual se registra con su razón**, y esa razón es insumo del Analista: si Mich baja siempre lo mismo, el score está mal pesado y hay que corregir los pesos, no seguir corrigiéndola a mano cada día.

### Primero se clasifica, después se puntúa

Nada de esto funciona si los puntos se ponen a ojo. Cada candidato entra al pool con **tres etiquetas**, y esas tres etiquetas son las que determinan casi todo el score sin que nadie opine.

| Etiqueta | Valores posibles |
| --- | --- |
| **Audiencia** | conductores y repartidores · freelancer y profesionista · quien busca un cómo-se-hace · contador, empresa o alianza · noticia fiscal del día |
| **Pilar** | deducciones · fechas límite · régimen · facturación · noticias · mito vs realidad |
| **Tipo de ventana** | vence esta semana · estacional · tendencia del día · perenne |

Quien pone las etiquetas es el Explorador de cada red, y son objetivas: "desglose semanal de DiDi" es audiencia *conductores*, pilar *régimen*, ventana *perenne*. No hay margen de interpretación.

### Cómo se convierte cada señal en puntos

**Demanda (0–30).** Se elige la fila más alta que aplique, no se suman.

| Situación | Puntos |
| --- | --- |
| Hay búsquedas y no aparecemos en ningún lado, ni blog ni video | 30 |
| El blog rankea pero no existe el video | 25 |
| Sale en Creator Search Insights con el filtro de hueco de contenido | 25 |
| Pregunta repetida 3 veces o más en comentarios o en la comunidad esta semana | 20 |
| Hay búsquedas y ya estamos arriba en todos los formatos | 10 |
| Ninguna señal de búsqueda, solo intuición | 0 |

**Ventana (0–25).**

| Situación | Puntos |
| --- | --- |
| Fecha límite fiscal en 7 días o menos | 25 |
| Cambio de ley publicado en el DOF en las últimas 48 horas | 25 |
| Tendencia con pico hoy | 20 |
| Fecha límite entre 8 y 21 días | 15 |
| Estacional a uno o dos meses (anual, aguinaldo) | 10 |
| Perenne | 5 |

**Evidencia propia (0–20).** Sobre la combinación pilar × formato × red, no sobre el tema.

| Historial de esa combinación | Puntos |
| --- | --- |
| Ganó dos veces o más | 20 |
| Ganó una vez | 12 |
| **Sin historial** | **8** |
| Perdió una vez | 4 |
| Perdió dos veces o más | 0 |

Que "sin historial" valga 8 y no 0 es a propósito: si lo desconocido arrancara en cero, el sistema solo repetiría lo que ya hizo y dejaría de descubrir. Ocho puntos es lo que le cuesta a heru explorar.

**Encaje de red (0–15).** Aquí la etiqueta de audiencia decide sola.

| Audiencia del tema | TikTok | Instagram | Facebook | YouTube | LinkedIn |
| --- | --- | --- | --- | --- | --- |
| Conductores y repartidores | 15 | 10 | 15 | 10 | 0 |
| Freelancer y profesionista | 12 | 15 | 5 | 12 | 8 |
| Quien busca un cómo-se-hace | 10 | 8 | 5 | **15** | 3 |
| Contador, empresa o alianza | 0 | 3 | 3 | 5 | **15** |
| Noticia fiscal del día | 12 | 10 | 8 | 5 | 12 |

Esta matriz es la que impide copiar y pegar el mismo tema a las cinco redes: un tema de conductores saca 15 en TikTok y 0 en LinkedIn **por regla, no por criterio**.

**Camino a WhatsApp (0–10).**

| Qué cierre admite la pieza | Puntos |
| --- | --- |
| Se puede ofrecer algo concreto en la comunidad: plantilla, recordatorio, resolver la duda | 10 |
| Comentar una palabra clave que dispara el DM | 7 |
| Solo guardar o compartir | 3 |
| No aplica, su destino es otro | 0 |

### Un martes de verdad

Así se ve el pool el **martes 13 de octubre**, cuatro días antes de la declaración mensual. Seis candidatos vivos, cada uno de una fuente distinta.

| Candidato | Fuente | Dem | Ven | Evi | Enc | WA | **Total** | Red |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Qué pasa si no declaro antes del 17 | Calendario fiscal | 25 | 25 | 12 | 15 | 10 | **87** | TikTok |
| Uso de CFDI 2026: catálogo de claves | Blog | 25 | 5 | 20 | 15 | 10 | **75** | Instagram |
| Desglose semanal de ganancias DiDi | Creator Search Insights | 25 | 5 | 8 | 15 | 10 | **63** | TikTok |
| ¿heru es confiable? | Páginas discover de TikTok | 30 | 5 | 8 | 12 | 7 | **62** | TikTok |
| Cómo saber cuál es mi régimen fiscal | Blog + Search Console | 25 | 5 | 8 | 15 | 7 | **60** | YouTube |
| Paquete Económico 2027 en RESICO | Noticias + blog | 20 | 20 | 8 | 12 | 0 | **60** | LinkedIn |

**La lista del miércoles sale sola:** TikTok publica el de 87, Instagram el de 75, YouTube el de 60, LinkedIn el de 60. Los otros dos de TikTok esperan su turno de la semana.

Vale la pena ver **por qué ganó el primero**. No es el de más demanda — ese es "¿heru es confiable?" con 30. Ganó porque es el único que junta demanda alta **con una ventana que se cierra en cuatro días**, y porque ese pilar y ese formato ya nos funcionaron una vez. En dos semanas, pasado el 17, ese mismo candidato cae a 62 y deja de salir solo.

### Y aquí es donde Mich interviene

"¿heru es confiable?" quedó cuarto con 62. Pero es gente **buscando nuestro nombre**, y hoy la respuesta se la está dando un tercero. Estratégicamente es lo más urgente de la tabla, y el motor no lo ve.

Mich lo sube al miércoles y escribe la razón: *alguien más está contestando preguntas sobre nosotros*.

Eso **no es el sistema fallando: es el sistema funcionando**. El motor propone con lo que sabe medir, la persona corrige con lo que no, y el override queda registrado. Si Mich sube tres veces seguidas candidatos del mismo tipo, el Analista del lunes no la corrige a ella: **le agrega un componente al score** — defensa de marca, digamos 15 puntos cuando alguien busca "heru" — y a partir de esa semana el motor ya lo ve solo.

Así es como el marcador aprende: no adivinando mejor, sino incorporando lo que la persona sabía y la fórmula no.

## 3 · El trabajo de cada red

Cada red tiene **un solo trabajo**. Esa es toda la disciplina del sistema: en el momento en que una red tiene dos trabajos, se le empieza a medir con la métrica equivocada y se concluye que no sirve.

| Red | Su trabajo | Piezas/semana | Con qué se juzga | A dónde manda |
| --- | --- | --- | --- | --- |
| **TikTok** | Descubrimiento en frío: que nos encuentre quien no nos conoce | 5 | Retención y comentarios | Bio + video "Respuesta a @" |
| **Instagram** | Convertir al que ya nos vio en alguien que nos sigue y guarda | 4 (una es Trial Reel) | Guardados y DMs | Respuesta automática a comentario por DM, y link en bio |
| **Facebook** | Escuchar a conductores y repartidores donde ya están | 3 comentarios en grupos | Preguntas nuevas traídas al pool | Conversación directa, nunca link pegado |
| **YouTube** | Autoridad y SEO permanente | 1 largo + 3 Shorts | Impresiones de búsqueda | Link en descripción del largo |
| **LinkedIn** | Alianzas, talento, prensa y el canal del contador | 2 | Guardados y DMs al perfil | Alianzas y prensa, no la comunidad |

### Los tres volumenes que hay que sostener

Son **15 piezas por semana** entre las cinco redes, de las cuales solo el largo de YouTube y los reels con cara necesitan a Mich frente a cámara. El resto — carruseles, estáticos, memes, Shorts cortados del largo, comentarios en grupos — sale del pipeline sin ella.

Ese reparto es lo que hace el sistema sostenible: **Mich graba dos días a la semana en bloque, no todos los días**. Si empieza a grabar diario, algo se rompió en la mezcla de formatos y hay que revisarla, no pedirle más horas.

### Por qué estos volumenes y no otros

No son un benchmark de mercado: son la capacidad real del pipeline con una persona y los agentes corriendo. Es una **decisión nuestra, revisable con datos a las cuatro semanas**. La primera pregunta del Analista al mes no es "¿subimos el volumen?" sino **"¿la pieza número 5 de TikTok rindió algo, o solo cansó al algoritmo?"**.

## 3B · Las tres velocidades

Esta es la parte que hay que tener clara antes de leer el horario: **no todas las piezas tardan lo mismo**, y lo que decide cuánto tardan es una sola cosa — si necesitan a Mich frente a cámara.

| Carril | Qué formatos | Ventaja | Quién lo produce |
| --- | --- | --- | --- |
| **Rápido** | Carrusel, estático, meme, texto de LinkedIn, comentario en Facebook | **1 día** | El pipeline, sin Mich |
| **Con cámara** | TikTok, Reel y video largo de YouTube | **8 días** | Bloque de grabación del jueves |
| **Urgente** | Solo formatos sin cámara | **Horas** | Se salta la fila, no las compuertas |

### Carril rápido — se decide hoy, sale mañana

Un carrusel de Instagram que se publica el **miércoles 14**:

| Cuándo | Qué pasa |
| --- | --- |
| Martes 13, 06:30 | El marcador lo elige |
| Martes 13, 07:30 | Mich lo aprueba en la lista |
| Martes 13, 08:00 | Cuerpo, hooks y caption |
| Martes 13, 09:00 | Las cuatro compuertas |
| Martes 13, 10:00 | Arte renderizado |
| Martes 13, 16:00 | Programado con su link |
| Martes 13, 17:00 | Último tap de Mich |
| **Miércoles 14** | **Se publica solo** |

### Carril con cámara — se decide una semana antes

Un TikTok que se publica el **miércoles 14**:

| Cuándo | Qué pasa |
| --- | --- |
| Martes 6 | El marcador lo elige, ocho días antes |
| Miércoles 7 | Compuertas sobre el guión |
| **Jueves 8** | **Bloque de grabación**, de corrido |
| Viernes 9 | Edición y subtítulos |
| Lunes 12 | Programado |
| **Miércoles 14** | **Se publica** |

La consecuencia práctica: el jueves no se graba lo de esta semana, **se graba lo de la semana que entra**. Y solo se graba contra guiones que ya pasaron las compuertas, nunca contra ideas sueltas.

### Carril urgente — el mismo día

El SAT publica algo en el DOF a las 6 de la mañana. El Vigía lo levanta en el barrido, entra al pool con **25 puntos de ventana** y se va al primer lugar de la lista de hoy, no de mañana.

Se produce en la mañana, pasa las cuatro compuertas igual que todo lo demás, y sale por la tarde.

Dos límites, y los dos importan:

- **Solo en formatos sin cámara.** Un carrusel o un texto salen el mismo día; un video no, porque grabar no se improvisa.
- **Las compuertas no se saltan nunca.** La urgencia mueve a una pieza en la fila, no la exime de revisión. Una noticia fiscal mal contada es justo el tipo de error que más caro sale.

## 4 · El día, hora por hora

No es un día que empieza y termina una pieza. Es una banda: cada día entran candidatos, salen piezas programadas, y se cierran las de hace una semana.

| Hora | Qué pasa | Quién | ¿Mich? |
| --- | --- | --- | --- |
| 05:45 | Vigía fiscal y vigías de plataforma barren fuentes. Todo lo nuevo entra al pool con su hecho citable | ① | — |
| 06:30 | Se recalcula el score de todo el pool. Sale la **lista de mañana** | ② | — |
| 07:30 | **Radar + lista.** Seis minutos de radar, dos de lista: aprobar, cambiar una fila o meter una | — | **8 min** |
| 08:00 | Cuerpo y 5 hooks por pieza aprobada. Caption incluido, no después | ③ ④ | — |
| 09:00 | **Las cuatro compuertas, en paralelo.** Lo aprobado sigue; lo rechazado vuelve con nota | ⑤ ⑥ | — |
| 10:00 | Arte automático: carrusel renderizado, estático, meme, miniatura, Short cortado | — | — |
| 11:00 | Lo que necesita cara entra a la cola de grabación del bloque | — | — |
| 16:00 | Programación de lo de mañana, con su caption ya aprobado y su link con código | — | — |
| 17:00 | **Diez minutos de último tap** sobre lo que se publica mañana | — | **10 min** |
| Su hora | Publicación automática por red | — | — |
| 21:00 | Se recogen métricas de las piezas de D+1 y D+3 | ⑦ | — |

**Total de Mich en un día normal: 18 minutos.** Más los dos bloques de grabación de la semana.

### Los dos días que no son normales

**Lunes — recalibración.** El Analista cierra las piezas que cumplieron siete días, declara ganadores y perdedores, actualiza la tabla de aprendizajes y, si hace falta, **mueve los pesos del score**. La lista del martes ya sale con los pesos nuevos. Mich: 30 minutos.

**Jueves — bloque de cámara.** Se graba de corrido todo lo que necesita cara de la semana entrante. Se graba contra guiones ya aprobados por las compuertas, nunca contra ideas sueltas.

### Una regla de corte, para que el sistema no se trabe

Si a las 10:00 una pieza no pasó las compuertas, **no se corre el día: se cae la pieza**. Entra la siguiente del ranking, que ya está lista porque el pool siempre tiene más candidatos que huecos. La pieza rechazada se arregla sin prisa y compite mañana.

Es la diferencia entre un sistema que publica todos los días y uno que publica cuando alcanza.

## 5 · Producción automática del arte

Un tema aprobado no se convierte en "una pieza": se convierte en un formato concreto, y cada formato tiene su camino de producción. La regla que gobierna todo esto está en el mandato de los siete roles: **el cuerpo se escribe una sola vez; lo que cambia por red es el hook, el formato y el cierre.**

| Formato | Cómo se produce | ¿Necesita a Mich? |
| --- | --- | --- |
| **Carrusel** (IG, LinkedIn) | Skill `carousel`: tema → `slides.json` → render a 7 PNG de 1080×1440 | No |
| **Estático / meme** | Mismo sistema visual, una sola lámina, modo Cream o Foto | No |
| **Short / Reel cortado** | Se corta del largo de YouTube: 3–5 por video, subtítulos quemados | No |
| **Reel o TikTok con cara** | Guión aprobado → cola de grabación → bloque del jueves | **Sí** |
| **Video largo de YouTube** | Guión aprobado → grabación → miniatura automática con el sistema de portadas | **Sí** |
| **Post de texto de LinkedIn** | Guionista con la anatomía de LinkedIn, 1,200–1,500 caracteres | No |
| **Comentario en grupo de Facebook** | Guionista redacta la respuesta; se publica desde perfil personal | **Sí, publica** |

**Lo visual no se improvisa nunca.** Todo sale del mismo sistema: cream `#F5EFE3` con su cuadrícula, azul `#1790EC`, cian `#15D1FE`, Helvetica en títulos y Lexend Deca en cuerpo, 1080×1440, logo arriba a la derecha, sin dinero visible. El tab de branding es la fuente; el Centinela revisa que se haya cumplido.

**El caption viaja con la pieza, no después.** Se escribe en el paso de guion y pasa por las mismas compuertas que el contenido. Un caption escrito al momento de programar es un caption sin revisar, y es por donde se cuelan las palabras gatillo y los datos sin respaldo.

**Cada pieza nace con su link.** Un `wa.me` con código propio de esa pieza, generado en producción, no al final. Sin eso no se puede atribuir después quién llegó a la comunidad por qué video, y sin esa atribución el ciclo de aprendizaje mide vanidad.

## 6 · Las cuatro compuertas

Corren **en paralelo, no en fila**, sobre la pieza completa: contenido, hook, arte y caption. Las cuatro pueden bloquear. Ninguna suaviza.

| # | Compuerta | Quién | Qué revisa | Bloquea si |
| --- | --- | --- | --- | --- |
| **0** | Propósito | Orquestador | ¿Declara pilar? ¿Es el formato nativo de esa red? ¿Se entiende qué quiere lograr? | Falta el pilar, o el formato no es nativo de esa red |
| **1** | Riesgo de baneo | Centinela | Palabras gatillo en hook y portada, dinero visible, tono alarmista, algo que parezca asesoría financiera | Encuentra uno |
| **2** | Dato | Verificador | Cada cifra y cada afirmación fiscal contra la ley, con artículo y fracción. También afirmaciones de producto | Un dato sin respaldo |
| **3** | Marca | Centinela | Paleta, tipografía, logo, medida, heru en minúscula, CTA correcto según canal | Cualquier desviación |

### Los tres veredictos

- **PASA** → sigue a arte y a programación.
- **NO PASA** → vuelve al Guionista con la razón exacta y qué cambiar. No va a arte, no se archiva, no se programa.
- **ESCALADO** (solo el Verificador) → el dato es dudoso y lo resuelve una persona del área fiscal. **Ningún agente lo destraba.** La pieza se congela y entra la siguiente del ranking.

No existe "lo publicamos mientras lo confirmamos".

### El reintento, con límite

Aquí está el detalle que evita el bucle infinito que preocupaba:

1. **Primer NO PASA** → el Guionista corrige exactamente lo señalado y reenvía a las cuatro. Vuelven a correr todas, no solo la que rechazó: un cambio de hook puede romper la marca.
2. **Segundo NO PASA** → la pieza **sale del día** y regresa al pool marcada `devuelto`, con la nota del rechazo. No se intenta una tercera vez en caliente.
3. Una pieza `devuelto` **dos veces por la misma compuerta** pasa a `muerto`. Eso no es mala suerte: es señal de que el tema o el ángulo no son publicables con nuestras reglas, y el Analista lo registra como aprendizaje.

### Lo que las compuertas le enseñan al sistema

Cada rechazo se guarda con su causa. Al mes eso es un mapa de dónde falla la producción: si el 70% de los rechazos son de la compuerta 1, el generador de hooks está mal calibrado y hay que arreglarlo ahí, no seguir rechazando pieza por pieza.

**La compuerta es barata; el shadowban no.** Ya nos costó una cuenta de TikTok.

## 7 · Publicación automática

Cada red tiene una puerta distinta, y no todas están abiertas. Esto es lo que hoy sí se puede automatizar y lo que no.

| Red | Vía | Estado hoy | Qué falta |
| --- | --- | --- | --- |
| **Facebook** | Graph API desde Apps Script | Posible y gratis | Pasar la app a modo Live y crear el token de System User |
| **Instagram** | Graph API desde Apps Script | Posible y gratis. Solo acepta JPEG | Lo mismo, y las imágenes en una URL pública — Drive no sirve |
| **YouTube** | `videos.insert` | **Bloqueado**: sin auditoría el video sube en privado | Presentar la auditoría, que es gratis |
| **LinkedIn** | Community Management API | Bloqueado hasta aprobación del Development tier | Solicitud; se evalúa caso por caso, sin plazo publicado |
| **TikTok** | Content Posting API | **Cerrado para nosotros**: sin auditoría todo queda `SELF_ONLY`, y TikTok prohíbe apps de uso interno | No hay vía propia. Queda programador de terceros o publicación manual |

**Lo que se sube, se sube completo:** archivo + caption aprobado + link con código + hashtags. Nunca se edita el caption en el momento de publicar; ese caption ya pasó por las compuertas y cambiarlo después lo saca del sistema.

### El riesgo que puede tumbar esta capa

La arquitectura descansaba en un programador externo para TikTok, YouTube y LinkedIn. **Buffer retira su API REST el 1 de febrero de 2027** y no está confirmado que su plan gratuito tenga acceso a la nueva. Si no lo tiene, esas tres redes se quedan sin vía automática.

Es la pregunta más urgente de todo el plan, porque de ella depende si "automatización máxima" significa cinco redes o dos. Se responde escribiéndole a Buffer o probando una cuenta gratis contra la API nueva; no hace falta esperar a 2027 para saberlo.

### Mientras tanto

Facebook e Instagram se automatizan **ya**: son las dos que dependen solo de nosotros. YouTube y LinkedIn se desbloquean llenando formularios gratuitos. TikTok se publica a mano hasta tener otra vía — y como es la red con más volumen, esos cinco toques a la semana son el costo real de arranque, y conviene decirlo así en vez de prometer que todo corre solo desde el día uno.

## 8 · El ciclo de aprendizaje

Esta es la parte que convierte quince piezas semanales en un sistema que mejora, en vez de en una fábrica que produce.

### Cada pieza deja un registro

Al publicarse, la pieza abre una fila en `aprendizajes` que se cierra a los siete días:

`código` · `red` · `pilar` · `formato` · `mecanismo del hook` · `tema` · `fuente que lo propuso` · **`score predicho`** · `resultado real` · `clics al link` · `entradas a WhatsApp` · `veredicto`.

La columna que casi nunca se pone y que aquí lo cambia todo es **`score predicho`**. Sin ella solo se sabe qué funcionó; con ella se sabe **si el motor sabe elegir**.

### Los tres veredictos del lunes

- **REPLICAR** — la combinación pilar × formato × red se descompone en plantilla (mecanismo del hook + estructura + formato) y esa plantilla suma puntos de evidencia propia en el score. No se repite el tema: se repite **la mecánica**.
- **ITERAR** — funcionó a medias. Se cambia **una sola variable** y se vuelve a correr. Una, no tres; si se cambian tres no se aprende nada.
- **MATAR** — esa combinación pierde puntos de forma permanente. Dos muertes seguidas y se le pone cero: el motor deja de proponerla solo.

### La calibración, que es lo que nadie hace

Cada lunes el Analista compara **score predicho contra resultado real** en las piezas cerradas.

- Si las de score alto rinden y las de score bajo no, el motor está calibrado. No se toca.
- Si no hay relación, **los pesos están mal** y se mueven. Ejemplo: si lo que gana una y otra vez son temas de ventana corta y no los de demanda alta, la ventana sube de 25 a 30 puntos y la demanda baja a 25.
- Los cambios manuales de Mich en la lista diaria entran aquí. Si baja sistemáticamente el mismo tipo de candidato, eso es una señal que el motor no está leyendo, y se convierte en peso.

La función de score **no es fija**. Es la hipótesis de la semana sobre qué funciona, y se corrige con evidencia. Ese es el bucle real.

### Qué cuenta como que funcionó

En orden, y en serio:

1. **Entradas a la comunidad de WhatsApp** atribuidas a esa pieza. Es el norte.
2. **Guardados y comentarios** — intención, no pasividad.
3. **Retención** — dice si el hook cumplió lo que prometió.
4. **Vistas** — el denominador. Sirven para calcular las tres de arriba, no para celebrar.

Una pieza con 50,000 vistas y cero entradas a WhatsApp **no funcionó**. El Analista tiene que poder escribir eso sin suavizarlo, y el sistema tiene que poder matar formatos que traen vistas y no traen a nadie.

### El aprendizaje vuelve al principio

El reporte del lunes no es un PDF que nadie abre: escribe en tres lugares del sistema.

1. La tabla de **evidencia propia** que alimenta el score → cambia qué se propone mañana.
2. La biblioteca de **plantillas ganadoras** → cambia cómo se escribe.
3. Los **pesos del score** → cambia cómo se decide.

Si un lunes el reporte no cambia ninguno de los tres, no hubo aprendizaje esa semana — y eso también es un dato que vale la pena registrar.

## 9 · Qué falta construir, en orden

El sistema completo no arranca de golpe. Este es el orden que hace que cada semana ya sirva de algo, aunque falte lo siguiente.

### Semana 1 — que nada malo salga

Las dos compuertas primero. Antes de automatizar la producción hay que poder frenarla: automatizar sin compuertas es publicar errores más rápido.

- Verificador y Centinela corriendo sobre las piezas que ya se producen a mano.
- La base de hechos citables del Vigía, que es de lo que se alimenta el Verificador.

### Semana 2 — que se pueda medir

Sin atribución no hay aprendizaje, y sin aprendizaje el motor nunca se calibra.

- Links `wa.me` con código por pieza.
- La pestaña `aprendizajes` con su columna de score predicho.
- Facebook e Instagram publicando solos: app en modo Live, token de System User, imágenes en URL pública.

### Semana 3 — el motor de decisión

Ya con compuertas y medición, se puede confiar en que decida una fórmula.

- La pestaña `pool` con las nueve fuentes escribiendo en ella.
- La función de score corriendo a las 6:30 y publicando la lista de mañana.
- Los pesos iniciales son una apuesta; la semana 5 los corrige la evidencia.

### Semana 4 — el ciclo cerrado

- El Analista leyendo el Content Dash solo y escribiendo el reporte del lunes.
- La primera calibración real de los pesos.

### En paralelo, porque tardan

Son trámites, no desarrollo, y se demoran por su cuenta:

- **Auditoría de YouTube.** Gratis. Sin ella los videos suben en privado.
- **Development tier de LinkedIn.** Se evalúa caso por caso.
- **La pregunta de Buffer.** Si su plan gratuito tendrá API después del 1 de febrero de 2027. De esto depende si TikTok, YouTube y LinkedIn se pueden automatizar o se quedan a mano.

### Las tres cosas que pueden hacer fallar esto

1. **Que la primera versión intente ser la completa.** Cinco redes × siete roles × nueve fuentes es imposible de arrancar de una. Se prueba con **una red y un formato** — TikTok con talking head — y se abre cuando el ciclo dé una vuelta entera.
2. **Que las compuertas se vuelvan trámite.** Una compuerta que aprueba todo no es una compuerta. Si en un mes no rechazó nada, está mal configurada.
3. **Que se produzca de más.** El cuello de botella no es cuántas piezas caben, es cuántas se pueden medir y aprender. Cuatro piezas cerradas con aprendizaje valen más que quince publicadas y ninguna leída.

### La única métrica del sistema

No es vistas, ni seguidores, ni piezas publicadas.

**Miembros nuevos en la comunidad de WhatsApp por semana, atribuidos a contenido.**

Todo lo demás de este tab existe para mover ese número. Lo que no lo mueva en cuatro semanas, se cambia.
