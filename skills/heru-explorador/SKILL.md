---
name: "heru-explorador"
description: "Encuentra cada semana 10–15 temas candidatos con demanda real para heru, con cuota por pilar para alimentar la parrilla semanal y una superficie de búsqueda propia para TikTok, Instagram, Facebook, YouTube y LinkedIn."
---

# Explorador de temas · heru

Corre los lunes. Entrega **10–15 candidatos** para que Mich elija 3–5.

## La regla que lo mantiene honesto

**Los temas no se inventan, se descubren.** Cada candidato llega con **evidencia de que alguien lo está buscando**: una query, un comentario, una pregunta real, un cambio fiscal con fecha. Un tema sin fuente de demanda no entra a la lista, por bueno que suene.

Si la lista se llena de "se me ocurrió que estaría padre hablar de…", el Explorador no está trabajando.

## Para quién es la lista: la parrilla semanal

La lista no es un banco genérico de ideas. Es lo que alimenta la parrilla de la sección 24, donde **cada día del calendario declara un pilar** y el marcador filtra el pool por ese pilar a las 6:30. Si un pilar llega vacío, ese día se llena a mano o se queda sin pieza.

| Día | Pilar que consume | De dónde sale su tema |
|---|---|---|
| Lunes | fechas límite | Calendario fiscal + `heru-vigia-fiscal` |
| Martes | mito vs realidad | Comentarios propios, comunidad de WhatsApp, grupos de Facebook |
| Miércoles | régimen o facturación | Google Search Console + el blog que ya rankea |
| Jueves | noticias | Radar de tendencias + el Vigía |
| Viernes | fechas límite (repaso) | Lo ya publicado esa semana; no consume pool nuevo |
| Sábado | el que traiga el sketch | Inspo competencia + comunidad |
| Domingo | el que traiga la pregunta | Comentarios de la semana |

## Cuota por pilar — obligatoria

El pool arrastra un desbalance conocido: sobre las 25 ideas de la semilla había **régimen 8, fechas límite 7, deducciones 4, facturación 3, mito vs realidad 2 y noticias 1**. Los dos pilares más flacos son justo los que consumen el martes y el jueves. Régimen sobra y nadie lo pide.

Por eso cada lista semanal cumple estos mínimos:

| Pilar | Mínimo por semana | Por qué |
|---|---|---|
| **mito vs realidad** | **3** | Alimenta el martes, y es el pilar donde mejor funciona el formato experiencia |
| **noticias / coyuntura** | **2** | Alimenta el jueves. Si no hay noticia viva, valen cambios con fecha ya publicada que todavía no se han contado |
| fechas límite | 2 | Lunes y viernes |
| deducciones | 1 | No tiene día fijo y por eso se olvida; entra por miércoles, sábado o domingo |
| régimen o facturación | máximo 4 en total | Ya sobra en el pool. Más de cuatro es llenar la lista con lo fácil |

**Si una semana no se alcanza el mínimo de mito vs realidad o de noticias, se dice explícitamente en la entrega.** No se rellena con régimen para completar el número: una lista de 11 candidatos con la cuota cumplida vale más que una de 15 desbalanceada.

### Dónde se pescan los dos pilares flacos

- **mito vs realidad** sale de lo que la gente *cree* y está mal, no de lo que pregunta. Se encuentra en: comentarios de piezas propias que empiezan con "pero yo pensé que…", preguntas repetidas en la comunidad de WhatsApp, grupos de Facebook donde alguien corrige a otro, y Creator Search Insights de TikTok (huecos con búsquedas y sin contenido bueno). Formulación útil: *"todo el mundo cree X, y la ley dice Y"*.
- **noticias** sale del `heru-vigia-fiscal` (DOF/SIDOF, SAT, IMCP, PRODECON) y del radar de tendencias. Un cambio publicado hace tres semanas que nadie explicó bien **sigue contando como noticia**: la ventana es de atención, no de fecha de publicación.

## Fuentes compartidas — valen para las cinco redes

| Fuente | Qué aporta |
|---|---|
| **Preguntas de la comunidad de WhatsApp** | Demanda directa. **La fuente más valiosa y la más ignorada**: es gente que ya nos buscó |
| **Google Search Console** | Queries donde heru ya aparece, y las emergentes. Dato propio, no estimado |
| **`heru-vigia-fiscal`** | Lo que cambió en el DOF y el SAT, y el calendario fiscal de lo que viene |
| **AlsoAsked** ($12/mes, con API y MCP) | Preguntas reales de People Also Ask |
| **Google Alerts · Talkwalker · F5Bot** | Menciones de SAT, RESICO, CFDI, declaración anual y de heru |
| **Comentarios de piezas propias** | La pregunta que dejamos sin responder la semana pasada |

## Superficie de demanda por red

Buscar en TikTok no es buscar en Google. Cada red se explora distinto.

### TikTok
Sugerencias del buscador de TikTok (escribir "declaración", "RESICO", "impuestos" y anotar qué autocompleta) · Creative Center: hashtags, sonidos y Top Ads de México · comentarios de videos de contadores, que es donde la gente pregunta lo que no se atreve a preguntar.

### Instagram
Buscador de IG · Reels en tendencia del nicho · **preguntas recibidas en stories** · DMs recurrentes · comentarios en carruseles de competencia.

### Facebook
**Grupos mexicanos de freelancers, conductores de app y repartidores.** Es la red donde la gente escribe su problema completo, con contexto. Los comentarios son más largos y más explícitos que en cualquier otra.

### YouTube
Autocompletado del buscador de YouTube · **Google Search Console**, porque el largo rankea en Google y ahí está la intención real · videos de competencia con sus comentarios. Usar `videos.list` de la API, **nunca `search.list`**, que cuesta 100 unidades y quema la cuota diaria.

### LinkedIn
Comentarios en posts de contadores y fintechs · hashtags del nicho · qué preguntan los profesionistas independientes, que es distinto de lo que pregunta un repartidor.

## Formato de cada candidato

```
tema        | <una línea>
keyword     | <la principal>
ángulo      | <desde dónde se cuenta, en formato experiencia>
pilar       | <cuál de los seis pilares>
día sugerido| <qué día de la parrilla le toca, o "libre">
demanda     | <la evidencia: query, comentario, cambio fiscal, con enlace>
por qué ahora| <qué lo hace urgente esta semana, o "perenne">
formato por red:
  TikTok    | <sí/no · formato>
  Instagram | <sí/no · Reel o carrusel>
  Facebook  | <sí/no>
  YouTube   | <sí/no · largo o Short>
  LinkedIn  | <sí/no>
hechos      | <los del Vigía que lo sustentan, si aplica>
```

**No todo tema va a las cinco redes.** Decir en cuáles no va, y por qué, vale tanto como decir en cuáles sí.

## Reglas de la lista

- **Cuota por pilar cumplida** (arriba). Es la primera que se revisa.
- **Diversidad de pilares:** la lista debe permitir armar una semana con al menos **3 pilares distintos**. Si los 15 candidatos son del mismo pilar, el Explorador falló.
- **Ninguna keyword repetida** en la misma red en los últimos 21 días. Se revisa contra el pool antes de entregar.
- **Mezcla de urgencia:** algunos con fecha (un cambio, una fecha límite) y algunos perennes, que sirven todo el año. Solo urgentes = calendario frágil.
- **Al menos 2 candidatos de YouTube largo**, porque son los de vida útil infinita y siempre se posponen.
- **Al menos 1 candidato que venga del blog que ya rankea y no tiene video**, para el miércoles.
- **Prioridad al formato experiencia.** Un tema que solo se puede contar como asesoría tiene techo de miles de vistas; uno que se puede contar en primera persona tiene techo de cientos de miles.

## Qué mata un candidato

- No tiene evidencia de demanda.
- No se puede sostener con un hecho de nivel 1 o 2 → lo va a matar `heru-verificador` después, mejor ahora.
- No hay forma de contarlo sin palabras gatillo en el hook → lo va a matar `heru-centinela`.
- Repite una keyword ya publicada en esa red en los últimos 21 días.
- **No lleva a la comunidad de WhatsApp.** Es la compuerta 0 y debería matar más candidatos que ninguna.

## Qué NO hace

- No escribe la pieza → `heru-guionista`.
- No propone hooks → `heru-hooks`.
- No decide el calendario. **Entrega candidatos; Mich elige.**