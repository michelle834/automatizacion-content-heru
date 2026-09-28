# 8 · Pipeline y agentes

*Entregable #5 del brief de Andrés. Escrito el 25 de septiembre de 2026 sobre la investigación de los tabs 1 a 7 y la evaluación de herramientas del tab 9.*

**Dónde aterriza esto.** Los siete roles son quienes corren en cada hora del día en el tab 23 · Plan de ejecución diario: el Vigía a las 5:45, el Explorador a las 6:30, Guionista y Hooks a las 8:00, Verificador y Centinela a las 9:00, y el Analista los lunes. Falta construir tres de los siete.

---

## La decisión que define todo el pipeline

**El pipeline no publica solo. El último tap es de Mich, siempre.**

No es una limitación técnica disfrazada de principio. Es una decisión de diseño y se sostiene por cuatro razones independientes — si una fallara, las otras tres siguen en pie:

1. **heru ya tuvo un shadowban en TikTok.** La cuenta actual es nueva desde el 15 de junio de 2026. Un sistema que publica sin criterio humano puede repetirlo en una semana, y esta vez sin cuenta de repuesto.
2. **El contenido depende de datos fiscales verdaderos.** Una cifra mal citada sobre el SAT es riesgo reputacional y potencialmente regulatorio para una fintech, no un error editorial que se corrige en comentarios.
3. **La vocera es Mich.** El hallazgo central del tab 1 es que las cuentas que se leen como institución pierden el efecto de segunda persona: en `declaración anual sat`, cuentas de contadores obtienen 782–3,371 views mientras personas comunes contando su experiencia obtienen 36K–513K. Un pipeline que publica piezas sin pasar por su voz destruye exactamente la ventaja que estamos persiguiendo.
4. **Técnicamente tampoco se puede.** Sin una app auditada por TikTok, la publicación automática sale en modo privado **sin devolver error** (tab 9). El último tap manual no es opcional ni siquiera a nivel de API.

**Lo que sí se automatiza es el 80% pesado:** investigar, verificar, redactar, variar hooks, medir y aprender. Mich pone el criterio, la cara y el botón. Esa es la meta del brief — 1 persona + AI produciendo el volumen de un equipo de 5 — y se cumple sin ceder el control editorial.

---

## El pipeline en una vista

```
DIARIO
  ① Vigía fiscal ─────────────► base de hechos verificados
                                        │
SEMANAL (lunes)                         │
  ② Explorador de temas ◄───────────────┤
        │                               │
        │ 10–15 candidatos              │
        ▼                               │
  ★ MICH ELIGE 3–5                      │
        │                               │
        ▼                               │
  ③ Guionista ──► ④ Hooks ──────────────┤
        │                               │
        ▼                               │
  ┌──────────────────────────┐          │
  │  COMPUERTAS (bloquean)   │          │
  │   0 · Propósito          │          │
  │   1 · Riesgo de baneo    │◄─ ⑥      │
  │   2 · Verificador        │◄─ ⑤ ─────┘
  │   3 · Marca              │◄─ ⑥
  └──────────────────────────┘
        │ solo pasa lo aprobado
        ▼
  ★ MICH EDITA Y GRABA
        │
        ▼
  Postiz programa ──► ★ MICH PUBLICA
        │
        ▼
  short link ► landing ► wa.me con código ► comunidad
        │
        ▼
SEMANAL (viernes)
  ⑦ Analista ──► reporte ──┐
        ▲                  │
        └──────────────────┘
     alimenta a ② y a ④ la semana siguiente
```

★ = donde entra Mich. Son **cuatro momentos por semana**, no veinte.

---

## Los 7 roles

Siete roles, y **cada uno corre en las cinco redes** — 35 agentes en total. Qué cambia en cada rol al bajarlo a una red está en el mandato que viene después de esta tabla.

| # | Agente | Qué hace | Cuándo corre | ¿Bloquea? | Estado |
| --- | --- | --- | --- | --- | --- |
| ① | **Vigía fiscal** | Vigila DOF, SAT, IMCP y PRODECON; mantiene la base de hechos verificados | Diario, 7:00 | No | Por construir |
| ② | **Explorador de temas** | Devuelve 10–15 temas candidatos con demanda real | Lunes | No | Por construir |
| ③ | **Guionista** | Tema aprobado → cuerpo y guion con la voz de heru | Por pieza | No | Parcial |
| ④ | **Hooks** | 5 variantes de hook por idea, por formato y red | Por pieza | No | Por construir |
| ⑤ | **Verificador** | Ningún dato pasa sin fuente de nivel 1 o 2 | Por pieza | **Sí** | **Prioridad 1** |
| ⑥ | **Centinela de marca y riesgo** | Palabras gatillo, dinero visible, asesoría, specs de marca | Por pieza | **Sí** | Parcial |
| ⑦ | **Analista** | Ganadores, perdedores y qué cambiar la semana que entra | Viernes | No | Por construir |

**"Parcial"** quiere decir que las reglas ya existen escritas — en las skills `branding-heru`, `heru-contenido-filtros`, `heru-paid-media-rules` y en la nueva `automatización content` — pero nadie las ejecuta automáticamente todavía. Hoy dependen de que quien produzca la pieza se acuerde de cargarlas.

---

## Mandato · un equipo completo por red

**Decisión de Mich, 25 de septiembre de 2026. No se discute, se ejecuta.**

No son 7 agentes atendiendo cinco redes. Son **7 roles × 5 redes = 35 agentes**, cada uno especializado en su plataforma.

La razón es la misma que sostiene todo lo demás en este documento: lo que funciona en TikTok no funciona en LinkedIn, y un agente que promedia las cinco produce contenido que no es de ninguna. Los tabs 1, 5 y 7 se investigaron con un agente especialista por red justamente porque las diferencias resultaron ser mayores que las coincidencias.

### Dos precisiones para no pagar cinco veces el mismo trabajo

**1. El rol ① tiene dos capas.** El **Vigía fiscal es uno solo y compartido** — el DOF y el SAT no cambian según la red, y cinco copias harían un trabajo idéntico cinco veces. Lo que sí se multiplica por cinco es el **Vigía de plataforma**: el que vigila los cambios de algoritmo, de políticas de moderación y de formatos de **esa** red.

**2. El rol ⑤ verifica el hecho una sola vez.** Una tasa de recargos es la misma en TikTok que en LinkedIn. Lo que se especializa por red es **dónde y cómo vive la cita** — no cabe igual en un Reel de 30 segundos que en un artículo de LinkedIn.

**Y la regla que lo ordena todo:** el cuerpo se investiga, se verifica y se escribe **una vez**. Lo que se multiplica por red es el **hook, el formato y la medición**. Es la matriz de espejo del tab 3 aplicada al equipo de agentes.

### Cómo se implementa

**7 skills, cada una con 5 perfiles de red adentro.** No 35 archivos sueltos.

Treinta y cinco archivos independientes se desincronizan en semanas: alguien corrige una regla de marca en el de TikTok y se olvida de los otros cuatro. Una skill por rol, con su núcleo compartido y una sección por red, cumple el mandato y además garantiza que la regla común solo exista en un lugar. Es la misma disciplina de "cada dato en un solo sitio" que hace utilizable este documento.

---

### ① Vigía de plataforma

| Red | Qué vigila |
| --- | --- |
| **TikTok** | Community Guidelines y su política de servicios financieros · cambios de duración y formato · Creative Center: hashtags, sonidos y Top Ads de México |
| **Instagram** | Transparency Center de Meta · cambios en Reels y en el ranking · novedades de Trial Reels |
| **Facebook** | Deprecaciones de métricas — las que se fueron el 15-jun-2026 · cambios en la distribución de video recomendado |
| **YouTube** | Políticas de contenido y monetización · cambios de Shorts · **"hecho para niños", que si está mal marcado rompe tarjetas y pantallas finales** |
| **LinkedIn** | Cambios del ranker del feed · políticas de contenido · qué formatos está empujando la plataforma |

### ② Explorador de temas

Cada red es una superficie de demanda distinta. Buscar en TikTok no es buscar en Google.

| Red | Dónde vive la demanda |
| --- | --- |
| **TikTok** | Sugerencias del buscador de TikTok · Creative Center · comentarios de piezas propias y de competencia · sonidos en tendencia |
| **Instagram** | Buscador de IG · Reels en tendencia · preguntas recibidas en stories · comentarios · DMs recurrentes |
| **Facebook** | Grupos mexicanos de freelancers, conductores y repartidores · comentarios, que en FB son más largos y más explícitos |
| **YouTube** | Autocompletado del buscador de YouTube · **Google Search Console**, porque el largo rankea en Google · videos de competencia y sus comentarios |
| **LinkedIn** | Comentarios en posts de contadores y fintechs · hashtags del nicho · qué preguntan los profesionistas independientes |

Todos comparten dos fuentes que no son de red: **las preguntas de la comunidad de WhatsApp** y **el calendario fiscal** que alimenta el Vigía fiscal.

### ③ Guionista

| Red | Formato nativo y tratamiento |
| --- | --- |
| **TikTok** | Hablado, primera persona, poco editado. Lo largo gana: apuntar arriba de 60s y evitar el valle de 30–60 |
| **Instagram** | Reel para alcance · carrusel **1080 × 1440** para guardado · el caption hace trabajo propio, no repite el video |
| **Facebook** | Espeja el material de IG, pero el texto explica más: la audiencia es mayor y lee antes de ver |
| **YouTube** | Largo de 5–15 min con estructura declarada, más 3–5 Shorts cortados de ahí. **Vida útil infinita: se escribe para que sirva en un año** |
| **LinkedIn** | Texto largo con el argumento completo · carrusel documento · tono profesional sin volverse corporativo |

### ④ Hooks

El rol donde el desdoble por red es más obvio: **en cada plataforma el hook es una cosa físicamente distinta.**

| Red | Qué es el hook ahí |
| --- | --- |
| **TikTok** | Lo hablado en los primeros 2 segundos + el texto en pantalla. Dos capas simultáneas |
| **Instagram** | La portada del Reel + la primera línea del caption. El hook visual manda |
| **Facebook** | Las dos primeras líneas antes del "ver más". Es un hook **escrito** |
| **YouTube** | **El título y la miniatura juntos.** El hook es ese par, no el primer segundo del video |
| **LinkedIn** | Las tres primeras líneas antes del "ver más", sin emojis ni signos de más |

La restricción de palabras gatillo financieras aplica en las cinco, sin excepción.

### ⑤ Verificador — dónde vive la cita

El hecho se verifica una vez. Lo que cambia es dónde cabe la fuente.

| Red | Dónde va la cita de ley |
| --- | --- |
| **TikTok** | Texto en pantalla chico mientras se dice el dato + el artículo en el caption |
| **Instagram** | Fuente legal chica abajo a la izquierda del slide + en el caption |
| **Facebook** | En el cuerpo del post, con el enlace, que aquí sí se puede |
| **YouTube** | En la descripción con enlace y timestamp del minuto donde se dice |
| **LinkedIn** | Enlazada en el texto. Es la red que más lo exige y la que mejor lo recibe |

### ⑥ Centinela — el rol donde más importa separar por red

La mitad de marca es idéntica en las cinco. **La mitad de riesgo no se parece en nada entre plataformas**, y es la que ya nos costó una cuenta.

| Red | Sensibilidad propia |
| --- | --- |
| **TikTok** | **La más sensible con diferencia.** Ya hubo shadowban. Política de servicios financieros, palabras gatillo en hook y portada, cero dinero visible |
| **Instagram** | Políticas de Meta sobre productos y servicios financieros · cuidado con lo que parezca promesa de rendimiento |
| **Facebook** | Mismas políticas de Meta · mayor exposición a reportes de usuarios por el perfil de audiencia |
| **YouTube** | Políticas de contenido financiero · **"hecho para niños" mal marcado rompe tarjetas y pantallas finales**, que es justo el camino a WhatsApp |
| **LinkedIn** | Menos restrictiva en moderación, más exigente en tono: lo que se lee como clickbait cae solo |

### ⑦ Analista

Cada red entrega métricas distintas. Un analista genérico se queda con el mínimo común, que son las views — justo lo que no queremos medir.

| Red | Lo que sí puede analizar |
| --- | --- |
| **TikTok** | **Retención segundo a segundo** · fuentes de impresión (For You, Follow, Hashtag, Sonido, Búsqueda) · nuevo vs. recurrente. **Clics: null hoy, hay que diagnosticarlo** |
| **Instagram** | **Skip rate a 3 segundos** · guardados y compartidos · visitas al perfil. **Sin clics por pieza: la atribución depende del short link** |
| **Facebook** | Lo que queda tras la deprecación de junio. Reportar poco y honesto, no rellenar |
| **YouTube** | Watch time · retención · **fuentes de tráfico** · CTR de la miniatura. La red más rica, y gratis por API nativa |
| **LinkedIn** | **La única con clic real por post** (`share_clicks_count`) · CTR · impresiones únicas |

---

### Lo que sigue siendo uno solo

Aunque haya cinco equipos, estas cosas existen **en un solo lugar** y las cinco redes las leen:

- La base de hechos fiscales verificados.
- La jerarquía de fuentes: ley → `branding-heru` §11 → IMCP/PRODECON. Nunca el blog.
- Las reglas de marca: paleta, tipografía, logo, voz, CTA orgánico.
- El KPI norte: miembros nuevos en la comunidad de WhatsApp.
- El libro de jugadas, con una columna de red para saber dónde ganó cada aprendizaje.

Si una de estas cinco cosas empieza a existir en dos versiones, el sistema se rompió.

---

## ① Vigía fiscal

El agente que hace posible a todos los demás. Sin una base de hechos verificados, el Verificador no tiene contra qué verificar y el Explorador propone temas de oído.

|  |  |
| --- | --- |
| **Trabajo** | Revisar cada mañana las fuentes fiscales oficiales, detectar cambios, y escribir cada hallazgo como un hecho citable con su enlace a ley |
| **Entrada** | Nada. Corre solo |
| **Salida** | Filas nuevas en la tabla `hechos`: `fecha · hecho en una línea · cifra · fuente nivel 1 o 2 · URL · vigencia` |
| **Cuándo** | Diario, 7:00 hora de México |
| **Avisa a Mich cuando** | Sale una versión anticipada de la RMF, cambia una fecha límite, o cambia una cifra que ya usamos en una pieza publicada |

**Fuentes, en orden de autoridad:**

1. **DOF vía SIDOF** — WebServices con salida JSON, gratis, en `sidof.segob.gob.mx/datos_abiertos`. Cuatro servicios: diarios, documentos, indicadores (tipo de cambio, TIIE) y notas. Es la verdad legal.
2. **SAT `sat.gob.mx`** — minisitio de normatividad RMF/RGCE. Sin RSS ni API, pero con patrón de URL estable y predecible. **Aquí está la ventaja competitiva:** el SAT publica *versiones anticipadas* de las modificaciones a la RMF **antes** de que salgan en el DOF. Vigilar esa carpeta con `changedetection.io` da días o semanas de ventaja sobre cualquier competidor de contenido, por $8.99 al mes el hospedado, o gratis autoalojado (consultado 28 sep 2026).
3. **IMCP Noticias Fiscales** — cerca de una publicación por día hábil (iba en la #146 a junio de 2026), gratis, y cubre las versiones anticipadas numeradas una por una. Es la mejor fuente secundaria y es citable sin pena: el IMCP es el organismo de contadores públicos de México.
4. **PRODECON** — boletines del defensor del contribuyente. Revelan **los problemas reales que la gente tiene con el SAT**. Es materia prima de contenido de altísimo valor y prácticamente sin explotar por la competencia.

**Cómo falla:** si una fuente deja de responder y el agente no avisa, la base envejece en silencio y el Verificador empieza a aprobar datos vencidos. Por eso el Vigía debe reportar "revisadas 4/4 fuentes" todos los días, aunque no haya novedades.

---

## ② Explorador de temas

|  |  |
| --- | --- |
| **Trabajo** | Encontrar de qué quiere saber la gente esta semana, no inventar temas |
| **Entrada** | La base de hechos del Vigía + el reporte del Analista de la semana pasada |
| **Salida** | 10–15 candidatos: `tema · keyword principal · ángulo · pilar · formato sugerido por red · por qué ahora · fuente de la demanda` |
| **Cuándo** | Lunes por la mañana |

**De dónde saca la demanda:**

| Fuente | Qué aporta | Costo |
| --- | --- | --- |
| Google Search Console | Queries reales donde heru ya aparece, y las emergentes | Gratis |
| Preguntas de la comunidad de WhatsApp | Demanda directa, sin intermediarios. La fuente más valiosa y la más ignorada | Gratis |
| AlsoAsked | Preguntas reales de People Also Ask, con API y MCP desde $12/mes | $12/mes |
| TikTok Creative Center | Hashtags, sonidos y Top Ads de México | Gratis |
| Google Alerts + Talkwalker + F5Bot | Menciones de SAT, RESICO, CFDI y de heru | Gratis |
| Comentarios de piezas publicadas | La pregunta que la gente dejó sin responder | Gratis |
| Calendario fiscal | Lo que viene: fechas límite, cambios que ya anunció el Vigía | Gratis |

**La regla que lo mantiene honesto:** cada candidato llega con evidencia de que alguien lo está buscando. Un tema sin fuente de demanda no entra a la lista, por bueno que suene.

**Regla de diversidad (del brief):** la lista debe permitir armar una semana con al menos 3 pilares distintos. Si los 15 candidatos son del mismo pilar, el Explorador falló.

---

## ③ Guionista

|  |  |
| --- | --- |
| **Trabajo** | Un tema aprobado por Mich → el cuerpo desarrollado y el guion por red |
| **Entrada** | Tema + pilar + red + los hechos verificados que lo sustentan |
| **Salida** | 1 cuerpo + guion adaptado por red + qué se espeja y qué se regraba |
| **Cuándo** | Cuando Mich elige los temas |

Obedece el protocolo que ya está escrito en `heru-contenido-filtros`: **1 idea → 1 cuerpo → 5 hooks.** No escribe cinco piezas distintas; escribe una y la viste distinto.

Usa la matriz de espejo del tab 3 para decidir qué se reaprovecha entre redes. El principio: **se espeja el cuerpo, nunca el hook ni el primer segundo.** TikTok, Reels y Shorts comparten el material grabado; LinkedIn y el carrusel de IG comparten el argumento pero no el tono; YouTube largo es otra pieza, no un corte más largo.

Escribe con Mich como vocera, en primera persona, en español mexicano, frases de máximo \~12 palabras, sin tecnicismos sin traducir. El villano es el calendario, no el SAT.

---

## ④ Hooks

|  |  |
| --- | --- |
| **Trabajo** | 5 variantes de hook por idea, cada una apostando a un mecanismo distinto |
| **Entrada** | El cuerpo del Guionista + el libro de jugadas acumulado del Analista |
| **Salida** | 5 hooks con su mecanismo declarado, su formato y su predicción |
| **Cuándo** | Después del Guionista, antes de las compuertas |

Cada variante declara a qué le está apostando: urgencia, relatabilidad, listicle, pregunta directa, contradicción. No cinco maneras de decir lo mismo — cinco apuestas distintas, para que el resultado enseñe algo.

**Es el agente que más se beneficia del loop.** Arranca con lo que dice el tab 5 (anatomía del hook por red) y cada semana el Analista le entrega qué mecanismo ganó y por cuánto. A los dos meses ya no propone desde teoría, propone desde los datos de heru.

**Restricción dura, no negociable:** sin palabras gatillo financieras en hooks ni portadas. Nada de SAT, facturación, dinero fácil, gana, ahorra miles. No es una preferencia de estilo — es la regla que existe porque ya nos costó un shadowban.

---

## ⑤ Verificador — el agente que bloquea

**Ninguna pieza se publica ni se manda a arte sin pasar por aquí.** Es la decisión explícita de Mich y es la que separa este sistema de una fábrica de contenido plausible.

|  |  |
| --- | --- |
| **Trabajo** | Tomar cada afirmación factual de la pieza y buscarle respaldo real |
| **Entrada** | La pieza completa: guion, copy, texto en pantalla, cifras del arte |
| **Salida** | `VERIFICADO` con la cita · `CORREGIDO` con el dato bueno · `NO SE PUEDE AFIRMAR` con la razón |
| **Cuándo** | Cada pieza, sin excepción |

**Jerarquía de fuentes — se busca en este orden y se para en la primera que responda:**

1. **La ley**: LISR, CFF, RMF, y lo publicado en el DOF. Se cita el artículo.
2. **`branding-heru` §11**, que ya tiene cifras validadas por el equipo fiscal.
3. Interpretación autorizada: IMCP, PRODECON.
4. **El blog de heru NO es fuente.** `branding-heru` §11.1 documenta errores encontrados en él. No se copia sin verificar contra los niveles 1 y 2.

**Si no encuentra respaldo en nivel 1 o 2, la afirmación sale de la pieza.** No se suaviza, no se pone "aproximadamente", no se publica con asterisco. Sale.

**Lo que también revisa, y que se olvida seguido:**

- **Que no nos contradigamos con lo ya publicado.** Si una pieza de agosto dijo una cifra y esta dice otra, hay que resolverlo antes, no después.
- **Vigencia.** Un dato correcto en 2025 puede ser falso en 2026. Toda cifra lleva año.
- **Generalización indebida.** "38% de los gastos deducibles" de un estudio no es "38% de TUS gastos". Es el error más fácil de cometer y el más difícil de defender.
- **Funciones de producto.** Cero afirmaciones sobre lo que hace la app que no estén confirmadas.

**Caso ya resuelto que muestra por qué existe:** el doc traía recargos de 1.47% y multa de $2,050–$25,360 sacados del blog. Las cifras verificadas son **2.07%** y **$1,810–$22,400** (CFF Art. 82 fr. I). Dos de dos mal, y llevaban meses circulando.

---

## ⑥ Centinela de marca y riesgo

El otro agente que bloquea. Corre en paralelo al Verificador, no después.

|  |  |
| --- | --- |
| **Trabajo** | Que la pieza no nos banee y que se vea como heru |
| **Entrada** | La pieza completa, incluido el arte y el texto en pantalla |
| **Salida** | `PASA` · `PASA CON CAMBIOS` con la lista · `NO PASA` con la razón |

**Compuerta 1 — riesgo de baneo.** Palabras gatillo en hook o portada · dinero visible (billetes, monedas, lluvia de dinero, símbolos $ grandes) · tono alarmista o de miedo · promesas de rendimiento · cualquier cosa que se lea como **asesoría financiera personalizada** en vez de experiencia contada. Esta última distinción es la más delicada de las cinco y está desarrollada en el tab 7.

**Compuerta 3 — marca.** Paleta oficial únicamente · **Helvetica en títulos, hooks y labels; Lexend Deca en cuerpo, cifras y legales** (`branding-heru` §6 — son dos familias, no una) · logo solo en azul `#1790EC` o blanco, con contraste · carrusel **1080 × 1440 (3:4)** · heru siempre en minúscula · máximo \~3 bloques por pieza.

**Compuerta 0 — propósito**, que en realidad corre primero: si la pieza no contribuye al camino hacia la comunidad de WhatsApp, no se publica. Es el norte del brief y es el filtro que más piezas debería matar.

**Y la que ya nos costó un error:** el CTA. En orgánico solo **guardar, compartir, comentar**. *"Regístrate en heru" en una pieza orgánica es un error* — ese CTA es de pauta. Sin precios, sin descuentos, sin "gratis".

---

## ⑦ Analista

|  |  |
| --- | --- |
| **Trabajo** | Convertir la semana en aprendizaje, no en un reporte de views |
| **Entrada** | Métricas de Windsor + clics de Dub + conversaciones del webhook de WhatsApp |
| **Salida** | Reporte semanal + filas nuevas en el libro de jugadas |
| **Cuándo** | Viernes |

**Lo que reporta, en este orden — y el orden importa:**

1. **Miembros nuevos en la comunidad de WhatsApp atribuidos a contenido.** El KPI norte. Va primero siempre.
2. Piezas que llevaron gente, con nombre y apellido.
3. Qué hook ganó el experimento de la semana y por cuánto.
4. Qué murió, y la hipótesis de por qué.
5. Qué cambiar la semana que entra.

**Las views van al final, o no van.** Son el denominador, no el resultado.

**El indicador de salud del sistema** no es ninguna de esas métricas: es la tasa **clic → conversación con código**. Si se mantiene estable, el sistema está midiendo. Si oscila salvajemente, se rompió la implementación, no el contenido — y hay que arreglar eso antes de sacar conclusiones de nada más.

**Cierra el loop escribiendo**, no opinando: cada aprendizaje se vuelve una fila en el libro de jugadas que ④ Hooks y ② Explorador leen la semana siguiente. Un aprendizaje que no se escribe no existe.

---

## Los cuatro momentos de Mich

| Cuándo | Qué decide | Cuánto le toma |
| --- | --- | --- |
| Lunes | Elegir 3–5 temas de los 10–15 candidatos | 20 min |
| Martes–miércoles | Editar los guiones, ajustar la voz, grabar | El grueso del trabajo |
| Antes de publicar | Revisar lo que las compuertas aprobaron y dar el último tap | 10 min por pieza |
| Viernes | Leer el reporte y decidir el experimento de la semana que entra | 30 min |

Todo lo demás corre sin ella. Si algún momento le está tomando mucho más que esto, es señal de que un agente no está haciendo su trabajo — no de que Mich deba apurarse.

---

## Qué existe y qué falta

| Pieza | Estado | Qué falta |
| --- | --- | --- |
| Las reglas del sistema | ✅ Escritas | La skill `automatización content` reúne las compuertas, y `branding-heru`, `heru-contenido-filtros` y `heru-paid-media-rules` ya son fuente de verdad |
| La investigación de las 5 redes | ✅ Tabs 1 a 7 | Actualizar cada trimestre |
| Windsor.ai leyendo métricas | ⚠️ 3 de 5 redes | Falta Facebook y YouTube. Y TikTok no reporta clics: hay que diagnosticarlo (tab 9) |
| Carruseles automáticos | ⚠️ Corriendo mal | La skill `carousel` sigue en 1080×1350 y con el cream viejo #F2EDE4, contra los 1080×1440 y #F5EFE3 que manda la marca. Produce piezas fuera de spec todos los días |
| Scheduler | ❌ | Postiz Cloud, $29/mes (tab 9) |
| Capa de atribución | ❌ | Short link + landing + `wa.me` con código + webhook. Es lo que hace medible el KPI norte |
| Los 7 agentes | ❌ | Construirlos |
| Calendario piloto de 2 semanas | ❌ | Entregable #9 |
| Template de experimento y de reporte | ❌ | Entregables #10 y #11 |

---

## En qué orden construirlos

El orden no es arbitrario: cada agente depende de que el anterior exista.

**Semana 1 — que el sistema no mienta.** ⑤ Verificador y ① Vigía fiscal. Van juntos porque el Verificador sin la base de hechos del Vigía no tiene contra qué verificar. Es lo único que Mich marcó como innegociable, y es lo que protege a heru del riesgo más caro.

**Semana 1 — que el sistema no nos banee.** ⑥ Centinela. Las reglas ya están escritas; falta el agente que las aplique sin que nadie se acuerde de pedírselo.

**Semana 2 — que el sistema mida.** La capa de atribución (short link → landing → `wa.me` con código → webhook). Antes de esto, el ⑦ Analista no tiene nada que analizar y el KPI norte es una declaración de intenciones.

**Semana 2 — que el sistema produzca.** ② Explorador, ③ Guionista y ④ Hooks. Se pueden construir antes, pero sin las compuertas encendidas producir más rápido solo significa equivocarse más rápido.

**Semana 3 — que el sistema aprenda.** ⑦ Analista, una vez que hay dos semanas de datos reales que leer.

---

## Los tres riesgos del pipeline

**1. Que la disciplina del link se rompa.** Toda la medición depende de que cada pieza salga con su link único y su código, generados antes de publicar. No hay herramienta que rescate esto: si el paso se salta, el KPI norte deja de existir para esa pieza. Por eso el link se genera dentro del pipeline, automáticamente, y no como un paso manual que alguien puede olvidar.

**2. Que los agentes se vuelvan un sello de goma.** Un Verificador que aprueba todo es peor que no tener Verificador, porque da una falsa sensación de rigor. La señal de alarma: si en un mes no rechazó ni corrigió nada, está roto. Lo mismo para el Centinela.

**3. Que produzcamos más de lo que Mich puede grabar.** El cuello de botella real del sistema no es generar ideas, es que hay una sola vocera. Si el Explorador entrega 15 temas y solo se pueden grabar 4, el sistema debe optimizar **cuáles 4**, no producir 15 guiones que nadie va a usar. La matriz de espejo del tab 3 existe justamente para esto: una grabación que rinde en tres redes vale más que tres ideas distintas.
