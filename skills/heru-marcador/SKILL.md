---
name: "heru-marcador"
description: "Decide qué publica heru cada día en cada red: clasifica los candidatos del pool, los puntúa con el marcador de cinco componentes, aplica los filtros duros y arma la lista del día siguiente por carril."
---

# marcador heru

Convierte el pool de candidatos en la lista de mañana **sin que nadie opine**. Corre todos los días a las 6:30 y recalcula **todas** las filas vivas, no solo las nuevas: un tema de hace tres semanas puede subir hoy porque se acerca el día 17.

Se usa con `automatizacion-content`, que dice el orden del pipeline completo. Esta skill responde una sola pregunta: **qué se publica mañana en cada red**.

## 0. La regla que gobierna todo

**Nada se publica el mismo día que se decide.** Lo que sale mañana ya está decidido, producido, revisado y programado hoy. Lo único que cambia entre piezas es cuánta ventaja necesitan (§5).

## 1. El pool

Todas las fuentes escriben en **una sola tabla**. Nunca se decide leyendo diez tableros.

Columnas, y ninguna se queda vacía: `id` · `fecha_entrada` · `fuente` · `tema` · `keyword exacta` · `ángulo` · `pilar` · `audiencia` · `red sugerida` · `formato sugerido` · `ventana` · `hecho citable` · `score` · `estado`.

Dos pesan más de lo que parece:

- **`keyword exacta`** — como la escribe la gente, no traducida a lenguaje de contador. "explicación del desglose semanal de ganancias DiDi conductor", no "ingresos por plataformas". Esa frase se usa tal cual en el texto en pantalla y en la descripción.
- **`hecho citable`** — el artículo de ley o la fuente. **Vacía = no sale hoy.** Se queda en el pool esperando al Vigía.

**Fuentes:** DOF/SAT/IMCP/PRODECON · Search Console · Creator Search Insights · Google Trends MX · noticias fiscales · competencia por red · comentarios y DMs propios · comunidad de WhatsApp · aprendizajes propios · **blog de heru**.

El blog es la fuente más barata: un artículo que ya rankea es demanda comprobada con la investigación hecha, y ya trae la pista del artículo de ley. Pero **no es fuente de verdad fiscal** — ya publicó errores. Se toma el tema y la pista, nunca el dato.

**Estados:** `nuevo` → `agendado` → `en producción` → `en compuertas` → `programado` → `publicado` → `cerrado`. Salidas laterales: `devuelto` (una compuerta lo rechazó, con nota) y `muerto` (venció la ventana, o el Analista mató esa combinación).

## 2. Clasificar antes de puntuar

Cada candidato entra con **tres etiquetas objetivas**. De ellas sale casi todo el score, y por eso no hay margen de interpretación.

| Etiqueta | Valores |
|---|---|
| **Audiencia** | conductores y repartidores · freelancer y profesionista · quien busca un cómo-se-hace · contador, empresa o alianza · noticia fiscal del día |
| **Pilar** | deducciones · fechas límite · régimen · facturación · noticias · mito vs realidad |
| **Ventana** | vence esta semana · estacional · tendencia del día · perenne |

## 3. El marcador (100 puntos)

En cada tabla se elige **la fila más alta que aplique**. No se suman filas.

**Demanda (0–30)**

| Situación | Pts |
|---|---|
| Hay búsquedas y no aparecemos en ningún lado, ni blog ni video | 30 |
| El blog rankea pero no existe el video | 25 |
| Sale en Creator Search Insights con filtro de hueco de contenido | 25 |
| Pregunta repetida 3+ veces en comentarios o comunidad esta semana | 20 |
| Hay búsquedas y ya estamos arriba en todos los formatos | 10 |
| Ninguna señal, solo intuición | 0 |

**Ventana (0–25)**

| Situación | Pts |
|---|---|
| Fecha límite fiscal en 7 días o menos | 25 |
| Cambio de ley en el DOF en las últimas 48 h | 25 |
| Tendencia con pico hoy | 20 |
| Fecha límite en 8 a 21 días | 15 |
| Estacional a uno o dos meses | 10 |
| Perenne | 5 |

**Evidencia propia (0–20)** — sobre la combinación **pilar × formato × red**, no sobre el tema.

| Historial de esa combinación | Pts |
|---|---|
| Ganó dos veces o más | 20 |
| Ganó una vez | 12 |
| **Sin historial** | **8** |
| Perdió una vez | 4 |
| Perdió dos veces o más | 0 |

Que "sin historial" valga 8 y no 0 es a propósito: si lo desconocido arrancara en cero, el sistema solo repetiría lo que ya hizo y dejaría de descubrir. Ocho puntos es lo que cuesta explorar.

**Encaje de red (0–15)** — la etiqueta de audiencia decide sola.

| Audiencia del tema | TikTok | Instagram | Facebook | YouTube | LinkedIn |
|---|---|---|---|---|---|
| Conductores y repartidores | 15 | 10 | 15 | 10 | 0 |
| Freelancer y profesionista | 12 | 15 | 5 | 12 | 8 |
| Quien busca un cómo-se-hace | 10 | 8 | 5 | 15 | 3 |
| Contador, empresa o alianza | 0 | 3 | 3 | 5 | 15 |
| Noticia fiscal del día | 12 | 10 | 8 | 5 | 12 |

Esta matriz es lo que impide copiar y pegar el mismo tema a las cinco redes: es regla, no criterio.

**Camino a WhatsApp (0–10)**

| Qué cierre admite la pieza | Pts |
|---|---|
| Se puede ofrecer algo concreto en la comunidad: plantilla, recordatorio, resolver la duda | 10 |
| Comentar una palabra clave que dispara el DM | 7 |
| Solo guardar o compartir | 3 |
| No aplica, su destino es otro | 0 |

Es **preferencia, no requisito**. Una pieza que no lleva a WhatsApp compite igual, con diez puntos menos. **Ninguna se bloquea por esto.**

## 4. Filtros duros

No restan puntos: **multiplican por cero**. No compite hoy, sin importar su score.

1. **Sin hecho citable.**
2. **Pilar ya usado tres veces esta semana** — mínimo tres pilares distintos por semana.
3. **La misma keyword ya publicada en esa red en los últimos 21 días.**
4. **Ventana vencida** → pasa a `muerto`.

Las **palabras gatillo no son filtro de tema, son filtro de hook**. Un tema del SAT no se mata: se le reescribe el gancho. Matar temas por palabra gatillo nos dejaría sin negocio.

## 5. Los tres carriles

Lo que decide cuánta ventaja necesita una pieza es **si necesita a Mich frente a cámara**.

| Carril | Formatos | Ventaja |
|---|---|---|
| **Rápido** | Carrusel, estático, meme, texto de LinkedIn, comentario de Facebook | **1 día** |
| **Con cámara** | TikTok, Reel, largo de YouTube | **8 días**, al bloque de grabación del jueves |
| **Urgente** | Solo formatos sin cámara | **Horas**: se salta la fila, nunca las compuertas |

El jueves **no se graba lo de esta semana: se graba lo de la que entra**, y solo contra guiones que ya pasaron las compuertas.

## 6. El corte y el override

Se ordena por score, se aplican los filtros duros y se toman los primeros de cada red según su volumen: TikTok 5 por semana · Instagram 4 (una es Trial Reel) · Facebook 3 · YouTube 1 largo más 3 Shorts · LinkedIn 2.

Mich ve la lista junto con el radar. Aprueba, cambia una fila por la siguiente del ranking, o mete una a mano. **Cada cambio manual se registra con su razón.**

Un override no es el sistema fallando: el motor propone con lo que sabe medir y la persona corrige con lo que no. **Si Mich sube tres veces seguidas candidatos del mismo tipo, no se le corrige a ella: se le agrega un componente al marcador**, y a partir de esa semana el motor ya lo ve solo.

## 7. La calibración del lunes

Cada pieza guarda su **`score predicho`** al publicarse y se cierra a los siete días. El Analista compara predicho contra real:

- Si las de score alto rinden y las de score bajo no, el marcador está calibrado. No se toca.
- Si no hay relación, **los pesos están mal** y se mueven.

La función **no es fija**: es la hipótesis de la semana sobre qué funciona, y se corrige con evidencia.

**Qué cuenta como que funcionó**, en orden: entradas a la comunidad atribuidas a esa pieza · guardados y comentarios · retención · vistas, que son el denominador y no el logro. Una pieza con 50,000 vistas y cero entradas **no funcionó**, y hay que poder escribirlo sin suavizarlo.

## Qué no hace esta skill

No encuentra los candidatos (`heru-explorador`), no escribe contenido (`heru-guionista`), no juzga piezas (`heru-verificador`, `heru-centinela`) ni cierra la semana (`heru-analista`). Solo decide el orden.