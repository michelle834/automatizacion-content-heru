# Prefiltro de marca y riesgo

El sistema de digest diario ya sabe **encontrar** información. Lo que le falta es el filtro entre encontrarla y publicarla. Esta pestaña define ese filtro en dos capas — marca y riesgo — y lo deja escrito como para pegarlo en el prompt.

**Dónde aterriza esto.** Este diseño es el que corre en las compuertas 1 (riesgo de baneo) y 3 (marca) de las 9:00 en el tab 23 · Plan de ejecución diario. Ahí las cuatro compuertas corren en paralelo y cualquiera bloquea.

## Cómo extrae la información hoy

El sistema corre solo a las 9:00 AM y hace esto:

| Paso | Qué hace |
| --- | --- |
| 1 | Lee `digest-history.log` — los últimos 14 días de notas ya cubiertas |
| 2 | Busca noticias del día sobre SAT, impuestos, RESICO, freelancers, plataformas |
| 3 | Selecciona las top 5 y las califica del 1 al 10 por relevancia para heru |
| 4 | Postea el digest al grupo de Google Chat, en el hilo del día |
| 5 | Toma **la nota #1** y genera un carrusel de 7 slides |
| 6 | Renderiza a PNG con Puppeteer, sube a Firebase y a Drive |
| 7 | Genera copy de LinkedIn y lo postea con los links de descarga |
| 8 | Registra la nota en el historial para no repetirla |

Los viernes cambia a resumen semanal, con fuente citada en cada slide.

### Lo que está bien resuelto

**La anti-repetición es elegante.** El historial de 14 días entra al prompt como contexto y se recorta solo. Es el tipo de memoria que la mayoría de estos sistemas no tiene.

**La calificación del 1 al 10 ya es un filtro**, aunque sea uno solo y sea de relevancia.

**Hay reglas de contenido escritas**, y las seis existentes son correctas: CTA "Regístrate en heru" y nunca "Descarga", CTA de LinkedIn que genere comentarios y nunca venta directa, cero precios, acentos obligatorios, sin emojis en LinkedIn, y fuentes citadas los viernes.

### El hueco, y es grande

**El sistema va de "encontré una noticia" a "rendí un carrusel" sin ningún filtro en medio.** La nota #1 se convierte en carrusel automáticamente, por ser la #1 — no porque alguien haya decidido que esa nota le sirve a heru, que se puede decir sin riesgo, y que suena a heru.

Las seis reglas de contenido existen, pero actúan **al final**, sobre el copy ya escrito, y cubren formato — no cubren si el tema es publicable ni si la pieza suena a la marca.

> Un sistema que publica todos los días sin filtro de riesgo no falla el día uno. Falla el día que sale una nota de "cómo pagar menos impuestos" y el carrusel la reproduce con la voz de heru, a nombre de heru, en automático.

## Dónde va el prefiltro

Dos compuertas nuevas, las dos **antes** de generar nada:

```
Búsqueda de noticias
   ↓
Top 5 calificadas 1–10            ← ya existe
   ↓
╔═ COMPUERTA 1 · RIESGO ═══════╗  ← ¿se puede decir?
║  falla → se descarta        ║     binaria y barata
╚══════════════════════════╝
   ↓
╔═ COMPUERTA 2 · VERIFICADOR ═╗  ← ¿es verdad y es consistente?
║  falla → SE DETIENE TODO   ║     agente dedicado
╚══════════════════════════╝
   ↓
╔═ COMPUERTA 3 · MARCA ════════╗  ← ¿suena a heru?
║  falla → se reescribe      ║     corrige, no descarta
╚══════════════════════════╝
   ↓
Carrusel + copy de LinkedIn
```

**El orden no es arbitrario.** Riesgo va primero porque es binario y cuesta una regla: si el ángulo no se puede tocar, no tiene caso gastar una verificación en él. El Verificador va segundo porque es la compuerta cara — se le gasta solo a lo que ya sobrevivió. Marca va al final porque no descarta: corrige.

Y una tercera regla que hoy no existe: **si la nota #1 no pasa, se baja a la #2, no se publica igual.** Hoy el sistema no tiene ese fallback — la #1 es la #1 y se produce.

## Compuerta 2 · El Verificador

Un agente dedicado, con un solo trabajo y autoridad de bloqueo.

> ### La regla dura
>
> **Ninguna pieza se postea, y ningún arte se diseña, con información que no haya sido verificada.** El estado por defecto de cualquier dato es **NO VERIFICADO**. No es una recomendación ni un "cuídalo": es una compuerta que detiene el pipeline. Si el Verificador no aprueba, no hay carrusel, no hay copy, no hay render, no hay post.
>
> No existe el caso "lo publicamos con cuidado". O está verificado o no sale.

### Por qué hace falta, con un ejemplo de hoy

Este documento tenía **recargos al 1.47%** y la skill de marca dice **2.07%**. Tenía multa de **$2,050** y la skill dice **$1,810**. Los dos vinieron de fuentes de heru. Nadie mintió — una de las dos envejeció y nadie se dio cuenta.

Si ese sistema hubiera estado corriendo en automático, **habría publicado la cifra vieja todos los días hasta que alguien la viera en un carrusel ya impreso.** Y en Instagram una cifra fiscal incorrecta marcada por un verificador independiente no castiga la pieza: **escala a toda la cuenta**.

### Los dos trabajos del Verificador

No es solo fact-check. Son dos cosas distintas y las dos bloquean:

**1. Veracidad.** ¿Cada afirmación factual tiene una fuente citable, vigente y de primera mano?

**2. Consistencia.** ¿Esto contradice algo que heru ya publicó, o algo de este documento? Este segundo trabajo es el que casi nadie implementa y es el que nos habría salvado hoy. **No basta con que un dato sea cierto: tiene que ser el mismo dato que dijimos la semana pasada.**

### Qué revisa, en orden

| # | Qué verifica | Cómo se resuelve |
| --- | --- | --- |
| 1 | **Toda cifra fiscal** contra su artículo de ley o fuente oficial del SAT | si no hay artículo citable, se bloquea |
| 2 | **Vigencia del dato** — ¿aplica al año fiscal en curso? | los montos del CFF se actualizan; un número del año pasado es un dato falso |
| 3 | **Consistencia con lo ya publicado** — contra el historial y contra la lista de datos verificados de la marca | si difiere, se bloquea y se escala; no se elige uno al azar |
| 4 | **La fuente de la noticia** — ¿es medio real, es primaria, está fechada? | una nota que solo existe en un agregador no se publica |
| 5 | **Que la pieza no diga más que la fuente** | el error más común: la fuente dice "podría" y el carrusel dice "va a" |
| 6 | **Que las cifras lleven su condición** | "$206,418.60" sola es falsa; "lo menor entre 15% de tus ingresos y $206,418.60" es correcta |

### Los tres estados de salida

El Verificador no responde sí o no. Responde una de tres cosas, y cada una tiene una consecuencia distinta:

| Estado | Qué significa | Qué pasa |
| --- | --- | --- |
| **VERIFICADO** | cada dato tiene fuente vigente y no contradice nada | pasa a la compuerta de marca |
| **BLOQUEADO** | hay un dato sin respaldo, vencido, o que contradice algo publicado | **se detiene todo.** Se baja a la nota #2 |
| **ESCALADO** | hay conflicto entre dos fuentes de heru, o el dato necesita criterio fiscal | **se detiene y se avisa a una persona.** No se resuelve solo |

El tercer estado es el que importa. **Un verificador que siempre decide por su cuenta acaba eligiendo mal en los casos difíciles**, que son justamente los que importan. Cuando dos fuentes de heru se contradicen, eso no lo arregla un agente: lo arregla el área fiscal.

### Qué debe entregar, siempre

Por cada pieza, un bloque adjunto que viaje con ella hasta el render:

```
ESTADO: VERIFICADO | BLOQUEADO | ESCALADO
FECHA DE VERIFICACIÓN: 2026-09-23
DATOS REVISADOS:
  - "declaración mensual el día 17" → CFF Art. 31 → vigente → OK
  - "recargos 2.07% mensual" → [fuente] → CONFLICTO con dato previo (1.47%) → ESCALADO
CONTRADICCIONES CON LO PUBLICADO: ninguna | [lista]
FUENTE DE LA NOTA: [medio, fecha, URL] — primaria | secundaria
QUÉ NO SE PUDO VERIFICAR: [lista explícita]
```

La última línea es obligatoria aunque esté vacía. **Un verificador que nunca reporta huecos no está verificando.**

### Dos reglas de operación

**El Verificador no escribe.** Si también redacta, deja de ser control y se vuelve juez y parte. Solo aprueba, bloquea o escala.

**Lo verificado se guarda.** Cada dato aprobado, con su fuente y su fecha, se acumula en la lista de datos verificados de la marca. Así la segunda vez que salga "el día 17" no hay que volver a verificarlo — y si alguien intenta publicar 2.07% cuando la lista dice otra cosa, salta solo.

## Compuerta 1 · Riesgo

Cinco agentes investigaron moderación y sanciones por red. El resumen útil: **casi nada de lo que la industria teme resulta ser el riesgo real, y el riesgo real casi nadie lo ve venir.**

### Lo que resultó falso

| Miedo común | Lo que dicen las políticas |
| --- | --- |
| "TikTok prohíbe el consejo fiscal" | **Folclore.** Un grep del texto completo de las Community Guidelines: *tax*, *debt*, *loan*, *credit* = **0 ocurrencias**. TikTok no tiene política de asesoría fiscal para orgánico |
| "Una cifra fiscal mal te tumba el video en YouTube" | **No.** La política de información errónea de YouTube es enumerada y cerrada: electoral, médica, manipulada, mal atribuida. No hay fact-check fiscal |
| "Usar IA en el guión te desmonetiza en YouTube" | **No aplica a heru.** YouTube exime explícitamente *"usar herramientas de IA generativa para crear o mejorar el esquema, el guión, la miniatura, el título"*. Con presentador humano real, fuera de alcance |
| "Comenta GUÍA es engagement bait y LinkedIn lo castiga" | **No existe política de engagement bait en LinkedIn.** La única es de Meta, y se cita por confusión |
| "Que empleados comenten el contenido de la empresa es un pod" | **No.** La definición exige *intercambio recíproco*, el User Agreement prohíbe *bots* y LinkedIn **vende** employee advocacy |
| "La CONDUSEF o la CNBV regulan lo que heru puede decir" | **No aplican.** heru no es ITF ni institución financiera — no maneja dinero. Los tres agentes que lo revisaron coinciden |
| "Etiquetar contenido como IA baja el alcance en Instagram" | Meta declaró lo contrario en mayo 2026: identificarse como creador de IA *"no afectará las recomendaciones"* |

### Lo que sí es riesgo real, por red

**TikTok — la divulgación comercial, no el tema fiscal.** Está confirmada verbatim la cláusula que más expone a heru: *"a veces, las cuentas que no rompen las reglas igual publican mucho contenido no elegible para el FYF. En esos casos podemos hacer que la cuenta y su contenido queden no elegibles para el FYF **y más difíciles de encontrar**"*. Tres matices que cambian todo: el disparador es **volumen**, aplica a cuentas **que no violan nada**, y castiga también **la búsqueda**. Y la cadena documentada: promover producto propio exige activar el toggle de contenido comercial; sin él la pieza queda FYF-inelegible; a 22 posts al mes eso acumula "mucho contenido"; y además *"la falta repetida de divulgación puede llevar a que la cuenta quede temporalmente restringida para publicar, o a un ban"*.

**Instagram — "exaggerated claims", que no requiere mentir.** La lista oficial de contenido no recomendable incluye *"Health/finance misinformation **or exaggerated claims**"*. Basta exagerar. Es discrecional, invisible, y escala: *"si publicas repetidamente contenido que va contra nuestras Normas de Recomendaciones… **toda tu cuenta** puede volverse no elegible, y nada de tu contenido será recomendado"*. Y el escalón que casi nadie conoce: por reincidencia con verificadores, Meta *"remueve su capacidad de monetizar y anunciar"* — **contenido orgánico puede costar la cuenta publicitaria**.

**YouTube — datos personales en pantalla.** El riesgo #1 del tutorial del SAT no es la política de IA ni el copyright: es **PII visible** (RFC, CURP, domicilio, montos) y su retiro por privacidad. Se mitiga al 100% con una cuenta demo. Riesgo #2: usar identidad visual del SAT en avatar, banner o nombre — eso es suplantación y la sanción es remoción del canal.

**LinkedIn — la página huérfana.** El riesgo que nadie ve venir: si el fundador que es único super admin queda restringido, **la página se queda sin control y heru pierde el perfil y los 8,600 seguidores a la vez**. La mitigación cuesta cinco minutos: tres super admins, y uno de ellos fuera del programa de perfiles personales.

**Facebook — el dominio compartido, no la página.** La pregunta de si una democión orgánica encarece la pauta tiene respuesta honesta: **no hay evidencia documentada de que las Content Distribution Guidelines afecten la entrega de anuncios**, y no debe afirmarse. Lo que sí está documentado es otro vector: `heru.app` se evalúa en los dos lados, y Meta declara que la baja calidad se propaga a *"tu Página, dominio, cuenta publicitaria u otras entidades asociadas"*. Una landing que pide datos antes de mostrar contenido es simultáneamente categoría CDG y atributo de baja calidad publicitaria.

### Y dos riesgos que no son de plataforma, son de ley mexicana

Estos aparecieron en tres informes distintos y son más serios que cualquier shadowban:

**CFF art. 89 fracción I.** Hace infracción *"asesorar o aconsejar para omitir contribuciones"*, **con responsabilidad sobre el tercero que asesora**. Un hook tipo "cómo pagar menos ISR" publicado desde un perfil personal, sin revisión de contador, es el punto exacto de exposición.

**LFPC art. 32 (PROFECO).** Obliga a que la publicidad sea *"veraz y comprobable"*, y sanciona lo *"parcial o tendencioso"* **aunque sea cierto**. Mata las promesas de resultado: nunca "recuperas X pesos", sí "puede resultar en saldo a favor".

> **La convergencia útil:** lo que PROFECO prohíbe es casi literalmente lo que Meta demota. **Un solo estándar de copy resuelve los dos.** No hacen falta dos revisiones.

## Compuerta 3 · Marca

La fuente de verdad es la skill `branding-heru`. Lo que sigue es lo que tiene que verificarse en automático antes de renderizar nada.

### Voz

**"Tu amigo contador que te habla bonito."** Un amigo que sabe de impuestos y te lo explica fácil.

| Regla | Cómo se verifica |
| --- | --- |
| **heru siempre en minúscula** | incluso al inicio de frase y en títulos en mayúsculas. En voz alta se pronuncia "Géru" |
| **Frases de máximo \~12 palabras** | se cuenta |
| **El usuario es el protagonista** | heru es el guía — Yoda, no Luke |
| **El villano es el calendario, nunca el SAT** | heru explica al SAT, no lo usa de cuco |
| **Un solo CTA por pieza** | y siempre "Regístrate en heru", nunca "Descarga heru" |
| **Acentos y eñes siempre** | á é í ó ú ñ |

**Prohibido, lista cerrada:** "impuestos fáciles" · "gratis para siempre" · "sin preocupaciones" · FOMO o urgencia falsa · superlativos sin respaldo (el mejor, #1, garantizado, nunca, siempre) · jerga fiscal sin traducir · tono alarmista con el SAT · precios en orgánico.

Y nótese que **"garantizado" y los superlativos ya estaban prohibidos por marca antes de que supiéramos que PROFECO los sanciona.** La marca y la ley piden lo mismo.

### La vocera

**La vocera de heru es Mich.** Decisión tomada el 23 de septiembre de 2026, y cierra la pregunta que había quedado abierta en tres pestañas distintas de este documento.

Y conviene decir que **no reemplaza a Stivi, lo complementa.** Son dos papeles distintos y el contenido los necesita a los dos:

|  | Quién | Qué sostiene |
| --- | --- | --- |
| **Vocera de marca** | **Mich** | la voz de heru frente a la audiencia: experiencia, opinión, criterio, la cara que aparece |
| **Voz fiscal de confianza** | **Stivi** | la autoridad técnica: lo que exige rigor, el podcast, lo que necesita firmarse |

### Por qué esta decisión desbloquea media investigación

No es cosmética. Es el mecanismo detrás del hallazgo más fuerte que encontramos:

**Explica el 782 contra el 513,000.** El estudio de 49,782 videos encontró que hablar en segunda persona sube likes y vistas de forma significativa, **y que el efecto desaparece en cuentas tipo publisher o institución**. heru estaba en el cuadrante donde el efecto no opera. Una cara con nombre lo saca de ahí. No es que las contadoras pierdan por ser contadoras — es que una cuenta sin persona detrás no puede activar el mecanismo, diga lo que diga.

**Cierra el riesgo de IA en YouTube de un golpe.** La categoría de "personas de IA en temas sensibles" apunta a contenido que se presenta como experto humano. Con una persona real frente a cámara, heru queda fuera de alcance — y además cumple la regla de miniatura para contenido de creencia u opinión: cara humana real con emoción legible, nunca stock, nunca IA.

**Vuelve viable el plan de LinkedIn.** El 75% de las citas de LinkedIn en respuestas de IA vienen de perfiles personales, no de páginas. El programa de perfiles ahora tiene ancla.

**Y satisface la política de originalidad de Meta sin esfuerzo.** "Filmado o producido directamente por el creador" es original por definición. Una persona real grabando es la salida más barata de esa política.

> **El costo honesto, porque lo tiene:** concentrar la marca en una persona concentra el riesgo en una persona. Si la cuenta de Mich se restringe, si se va, o si simplemente no puede grabar durante tres semanas, el contenido se para. Por eso la regla de los **tres super admins en LinkedIn** deja de ser higiene y pasa a ser urgente — y por eso Stivi sigue siendo la segunda voz, no un respaldo teórico.

### Visual

| Elemento | Lo correcto |
| --- | --- |
| **Tipografía** | **Helvetica y solo Helvetica.** Fallback web `'Helvetica Neue', Helvetica, Arial, sans-serif` |
| **Cian** | `#15D1FE` — highlight de palabras clave |
| **Azul heru** | `#1790EC` — logo, highlight de acción heru |
| **Cream** | `#F5EFE3` — fondo de cuerpo y cierre |
| **Negro / Blanco** | `#000000` texto · `#FFFFFF` logo y texto sobre foto |
| **Carruseles** | **1080 × 1440 (3:4)** en todas las slides |
| **Logo** | arriba a la derecha en carrusel · últimos 3 segundos, esquina inferior derecha, en video |

**NO son de marca**, aunque aparezcan en archivos viejos: verde `#00C48C` · navy `#0C3961` · `#D6ECFB` · cian `#00C9DB` · cream `#F2EDE4` · `#071E38` · **y la tipografía Lexend**.

## El sistema está produciendo fuera de marca ahora mismo

Esto salió de cruzar el archivo de setup del digest contra la skill de marca, y es el hallazgo más accionable de la pestaña:

| El digest usa | La marca dice | Estado |
| --- | --- | --- |
| fondo crema `#F2EDE4` | `#F5EFE3` | ❌ cream viejo |
| tipografía **Lexend** | **Helvetica**, solo Helvetica | ❌ |
| azul `#1790EC` | `#1790EC` | ✅ |
| 7 slides a 1080×1350 | 1080×1440 (3:4), portada / cuerpo / cierre | ❌ proporción y sistema |
| CTA "Regístrate en heru" | igual | ✅ |
| sin precios, acentos obligatorios | igual | ✅ |

**Dos de los tres atributos visuales del carrusel diario están mal, todos los días, desde que el sistema corre.** No es culpa de nadie: el `SKILL.md` del carrusel se escribió antes de que existiera la skill de marca, y la propia skill de marca ya lo tiene anotado como pendiente — *"actualizar skills carousel y heru-paid-media-rules para quitar Lexend, verde y cream viejo"*.

**Y este documento también lo tiene mal.** La pestaña 3 especifica el carrusel de LinkedIn en "1200×1500, Lexend para títulos, paleta `#1790EC` / `#0C3961` / `#00C48C`" — dos colores que no son de marca y una tipografía que no es de marca. Lo corrijo en la pestaña 3 para que no se propague.

## El prefiltro, escrito para pegarlo en el prompt

Esto va **después** de que el sistema elige las top 5 y **antes** de que genere el carrusel.

> **COMPUERTA 1 — RIESGO. Antes de producir nada, evalúa la nota #1 contra estas seis preguntas. Si falla cualquiera, descártala y pasa a la nota #2. Nunca publiques "con cuidado": descártala.**
>
> 1. ¿El ángulo sugiere omitir, reducir o retrasar una contribución? Si sí, se descarta — CFF art. 89-I hace infracción asesorar para omitir contribuciones, con responsabilidad sobre heru.
> 2. ¿La pieza promete un resultado económico? ("recuperas", "te devuelven", "ahorras X"). Si sí, se reescribe a posibilidad: "puede resultar en saldo a favor".
> 3. ¿Hay alguna cifra sin su condición y sin su año? Toda cifra lleva las dos cosas.
> 4. ¿Se cita un monto de multa? No se citan montos de multa: se dice "hay multa" y se remite al SAT.
> 5. ¿El dato fiscal está en la lista verificada de la skill de marca, o tiene artículo citable? Si no, se descarta.
> 6. ¿La pieza exagera? Si un lector razonable diría "eso está inflado", cae en *exaggerated claims* de Instagram y en publicidad "parcial o tendenciosa" de PROFECO a la vez.

> **COMPUERTA 2 — VERIFICADOR. Si la nota pasó riesgo, se manda al Verificador. Nada avanza sin su aprobación explícita. El estado por defecto es NO VERIFICADO.**
>
> 1. Extrae **todas** las afirmaciones factuales de la nota y de la pieza propuesta. Una por una, no en bloque.
> 2. Por cada una: ¿hay artículo de ley, publicación del SAT o fuente primaria fechada? Si no la hay, esa afirmación se marca sin respaldo.
> 3. ¿El dato aplica al año fiscal en curso? Un monto del año pasado es un dato falso, no un dato viejo.
> 4. Compara contra la lista de datos verificados de heru y contra el historial publicado. **Si hay conflicto, no elijas: escala.**
> 5. ¿La pieza afirma más que la fuente? Si la fuente dice "podría", la pieza no puede decir "va a".
> 6. ¿Cada cifra lleva su condición y su año?
>
> **Devuelve uno de tres estados y nada más:**
>
> - `VERIFICADO` → sigue a marca
> - `BLOQUEADO` → se detiene, se baja a la nota #2
> - `ESCALADO` → se detiene y se avisa a una persona
>
> Adjunta siempre el bloque de verificación, **incluyendo la lista de lo que no pudiste verificar**, aunque vaya vacía. No escribas copy. No sugieras redacción. Solo aprueba, bloquea o escala.

> **COMPUERTA 2 — MARCA. Si la nota pasó riesgo, se produce así. Esto no descarta: corrige.**
>
> - heru en minúscula, siempre, en todo el texto.
> - Frases de máximo 12 palabras. Cero jerga fiscal sin traducir.
> - El usuario es el protagonista. heru es el guía.
> - El villano es el calendario, no el SAT. Cero alarmismo.
> - Un solo CTA: "Regístrate en heru". Nunca "Descarga".
> - Acentos y eñes completos.
> - Cero precios y cero planes.
> - Ninguna de estas: impuestos fáciles · gratis para siempre · sin preocupaciones · el mejor · #1 · garantizado · nunca · siempre.
> - Visual: Helvetica únicamente. Cream `#F5EFE3`, azul `#1790EC`, cian `#15D1FE`, negro, blanco. **Nada de Lexend, `#F2EDE4`, `#00C48C` ni `#0C3961`.**
> - Carrusel 1080×1440 (3:4), logo arriba a la derecha.
> - Highlight de 1 a 3 palabras máximo, con los signos fuera del highlight.
> - Una idea por slide, máximo \~40 palabras.
> - Fuente legal en chico cuando haya dato fiscal.

### Dos cosas más que el sistema debería hacer y no hace

**Registrar por qué descartó una nota.** El `digest-history.log` guarda lo que publicó. Debería guardar también lo que rechazó y en qué compuerta — así en un mes se sabe si el filtro está calibrado o está tirando todo.

**Correr el toggle de contenido comercial en TikTok.** Si la pieza promueve a heru, hay que activarlo. Sin él la pieza queda fuera del For You, y a 22 piezas al mes eso es exactamente el patrón que TikTok describe para dejar **la cuenta entera** fuera de recomendación.

## Conflictos que hay que resolver antes de automatizar

Tres datos fiscales aparecen con dos valores distintos entre la skill de marca y lo que ya teníamos. **Este es exactamente el caso que el Verificador debe devolver como `ESCALADO`: dos fuentes de heru diciendo cosas distintas no lo resuelve un agente, lo resuelve el área fiscal.** Y hasta que se resuelva, ninguna pieza que use estos números se publica.

| Dato | La skill de marca dice | Lo que teníamos | Qué hacer |
| --- | --- | --- | --- |
| **Recargos** | **2.07% mensual** | 1.47% mensual (del blog de heru) | confirmar y actualizar el que esté viejo |
| **Multa por no presentar** | **$1,810 a $22,400** por obligación (CFF Art. 82 fr. I) | $2,050 a $25,360 | confirmar — y de todos modos **no se citan montos en contenido** |
| **ISR RESICO** | **1% a 2.5%** | consistente | sin conflicto |

> Los dos primeros son justo el tipo de cifra que envejece cada año. Es la razón exacta por la que la regla "no cites montos de multas, di que hay multa y remite al SAT" existe: **un número viejo en pantalla es lo que un verificador marca**, y en Instagram eso escala de la pieza a toda la cuenta.

### Y una decisión pendiente sobre los hooks

Las reglas de oro de la cuenta nueva de TikTok (desde el 15 de junio de 2026) dicen: **"sin palabras gatillo financieras en hooks — menos SAT y facturación, más POV, lifestyle, analogías"**.

El banco de 30 hooks de la pestaña 3 va casi todo en dirección contraria: abre con SAT, con cifras y con consecuencia fiscal. **Las dos posturas son defendibles y no pueden convivir sin decidir.** Lo que la evidencia de este documento sostiene es que la cifra exacta y la consecuencia concreta son lo que para el scroll; lo que la regla de marca protege es una cuenta nueva que no quiere entrenarse como cuenta financiera desde el día uno. **Hay que elegir, y la decisión es de Mich.**
