---
name: "automatizacion-content"
description: "Orquesta el pipeline de contenido de heru de punta a punta: los tres carriles de producción, en qué orden corren los siete agentes, qué compuertas bloquean y qué toca a Mich. Usar al producir contenido, no al llamar un agente suelto."
---

# Orquestador de contenido · heru

Los siete agentes existen sueltos. Esta skill dice **en qué orden corren, qué se pasan y dónde se frena todo**. Al producir contenido se carga esta, no los agentes uno por uno.

**Para decidir qué se publica** se carga `heru-marcador`: clasifica el pool, lo puntúa y saca la lista del día. Esta skill toma esa lista y la ejecuta.

## La regla de base

**Nada se publica el mismo día que se decide.** Lo que sale mañana ya está decidido, producido, revisado y programado hoy. Cada pieza avanza una etapa por día, así que siempre hay piezas en todas las etapas.

## El día

```
05:45  ① Vigías           ──► hechos citables al pool
06:30  ② Explorador       ──► marcador → lista de mañana
07:30  ★ MICH             aprueba o cambia una fila (8 min)
08:00  ③ Guionista + ④ Hooks    cuerpo, 5 hooks y caption
09:00  ⑤ Verificador ║ ⑥ Centinela   ← EN PARALELO, ambos bloquean
10:00  arte automático    carrusel, estático, meme, miniatura
16:00  programación       con caption aprobado y link propio
17:00  ★ MICH             último tap (10 min)
         ──► publicación automática al día siguiente
LUNES  ⑦ Analista         cierra las piezas de 7 días y recalibra
JUEVES ★ MICH             bloque de grabación de la semana que entra
```

El `heru-vigia-fiscal` corre aparte, todos los días, y deja hechos citables que el verificador usa.

## Los tres carriles

No todas las piezas tardan lo mismo. Lo decide **si necesitan a Mich frente a cámara**.

| Carril | Formatos | Ventaja |
|---|---|---|
| **Rápido** | Carrusel, estático, meme, texto de LinkedIn, comentario de Facebook | 1 día |
| **Con cámara** | TikTok, Reel, largo de YouTube | 8 días, al bloque del jueves |
| **Urgente** | Solo formatos sin cámara | Horas: se salta la fila, nunca las compuertas |

El jueves **se graba lo de la semana que entra**, y solo contra guiones que ya pasaron las compuertas.

## Las compuertas

**Corren en paralelo, no en fila**, sobre la pieza completa: contenido, hook, arte y caption.

| # | Compuerta | Quién | Bloquea si |
|---|---|---|---|
| 0 | Propósito | Orquestador | Falta el pilar, o el formato no es nativo de esa red |
| 1 | Riesgo de baneo | Centinela | Palabra gatillo, dinero visible, tono alarmista, algo que parezca asesoría financiera |
| 2 | Dato | Verificador | Una cifra o afirmación fiscal sin respaldo |
| 3 | Marca | Centinela | Paleta, tipografía, logo, medida, heru en mayúscula, CTA equivocado |

**Tres veredictos:**

- **PASA** → sigue a arte y programación.
- **NO PASA** → vuelve al Guionista con la razón exacta. **No va a arte, no se archiva, no se programa.**
- **ESCALADO** (solo el Verificador) → lo resuelve el área fiscal. **Ningún agente lo destraba.**

No hay "lo publicamos mientras lo confirmamos".

**El reintento tiene límite.** Primer NO PASA: se corrige y vuelven a correr **las cuatro**, no solo la que rechazó — cambiar el hook puede romper la marca. Segundo NO PASA: la pieza sale del día y regresa al pool como `devuelto`. Dos rechazos por la misma compuerta → `muerto`, y el Analista lo registra como aprendizaje.

**Regla de corte:** si a las 10:00 una pieza no pasó, no se corre el día — se cae la pieza y entra la siguiente del ranking, que ya está lista.

Cada rechazo se guarda con su causa. Si al mes el 70% viene de la misma compuerta, lo que hay que arreglar es la etapa que la alimenta, no seguir rechazando pieza por pieza.

## Qué se pasa entre etapas

Cada pieza viaja con esta ficha. Si le falta un campo, la siguiente etapa la rebota.

| Campo | Lo pone |
|---|---|
| código de pieza | explorador |
| tema, keyword exacta, ángulo | explorador |
| pilar y audiencia | explorador |
| red y formato nativo | explorador |
| hecho citable | vigía |
| score predicho | marcador |
| cuerpo y caption | guionista |
| hook elegido + las 4 descartadas | hooks |
| variante de experimento | orquestador |
| veredictos de las cuatro compuertas | verificador y centinela |
| destino declarado | guionista |
| link propio con código | producción |

## El destino de cada pieza

Toda pieza **declara su destino**. Por defecto es la comunidad de WhatsApp. LinkedIn declara otro — alianzas, talento, prensa o el canal del contador — y se mide contra ese.

**Ninguna pieza se bloquea por no llevar a WhatsApp.** Lo que no se permite es una pieza sin destino declarado.

## Conflicto de CTA — resuelto

`heru-sistema-contenido` dice "CTA siempre Regístrate en heru". `branding-heru` §0.3 lo prohíbe en orgánico.

**Manda `branding-heru`.** En orgánico el cierre es guardar, compartir o comentar. "Regístrate en heru" solo en pauta, o cuando Mich lo pida explícitamente. Nunca "Descarga heru".

## Dónde entra Mich

Cuatro puntos, y solo cuatro:

1. **La lista** de la mañana: aprobar o cambiar una fila (8 min).
2. **El último tap** sobre lo que sale mañana (10 min).
3. **Grabar** el bloque del jueves.
4. **Aprobar** lo que las compuertas marcaron como dudoso.

Son 18 minutos al día más el bloque de cámara. Si empieza a entrar en más puntos, el pipeline se está rompiendo en algún lado — vale la pena preguntar dónde.

## Reglas de la semana

- Contenido de **al menos 3 pilares distintos** por semana.
- Un tema se adapta al formato nativo de cada red. **El cuerpo se escribe una vez**; lo que cambia por red es el hook, el formato y el cierre.
- Las variantes de hook de Instagram se prueban primero como **Trial Reels**: solo las ve quien no nos sigue, y el ganador se republica en el feed.
- **El caption viaja con la pieza** y pasa las mismas compuertas. Nunca se escribe al momento de programar.
- Cada pieza nace con su **link propio con código**. Sin eso no hay atribución, y sin atribución no hay aprendizaje.

## Qué no hace esta skill

- No decide qué se publica — eso es `heru-marcador`.
- No escribe contenido — eso es `heru-guionista`.
- No juzga piezas — eso son los filtros y las compuertas.
- No reemplaza a `heru-sistema-contenido`, que es el mapa completo del sistema; esta solo dice cómo se ejecuta.