# 18 · Tendencias al día

**El hallazgo que cambia el planteamiento:** ninguna de las fuentes de esta pestaña es gratuita, automatizable y con corte a México a la vez para tendencias nativas de TikTok, Instagram o Facebook. Lo único realmente automatizable es Google (Trends y News por RSS) y, con reservas, YouTube. Todo lo demás es captura manual en la app.

Entonces el sistema correcto no es "automatizar las tendencias". Es **automatizar la capa de Google y comprimir la captura manual a 15 minutos diarios con un formato fijo**.

**Segundo hallazgo, igual de importante:** heru publica desde cuentas de empresa, y en TikTok las cuentas de negocio están restringidas a la Commercial Music Library ([términos de TikTok](https://www.tiktok.com/legal/page/global/commercial-music-library-user-terms/en)). El audio en tendencia que ves en el feed casi nunca es usable. Eso invalida buena parte de la estrategia de "sumarse al audio del momento" antes de empezar.

**Dónde aterriza esto.** El radar de las 5:45 es la primera hora del día en el tab 23 · Plan de ejecución diario: todo lo que encuentra entra como filas nuevas del pool, y a las 6:30 compite por score con lo que ya estaba.

## De dónde sale el dato

| Fuente | ¿Automatizable? | Cómo | México | Costo |
| --- | --- | --- | --- | --- |
| Google Trends, RSS de Trending Now | **Sí** | `trends.google.com/trending/rss?geo=MX` | Parámetro `geo`; falta confirmar a mano el corte a México | $0 |
| Google News RSS | **Sí** | consulta por término con `hl=es-MX&gl=MX` | sí | $0 |
| YouTube Data API, `chart=mostPopular` | **Sí** | `regionCode=MX`, 1 unidad por llamada | sí | $0 |
| RSS de canales de YouTube | **Sí** | `feeds/videos.xml?channel_id=` , sin llave ni cuota | defines tú la lista | $0 |
| TikTok Creative Center | **No** | navegador, sin exportación ni API | por confirmar | $0 |
| TikTok Creator Search Insights | **No** | dentro de la app | sí | $0 |
| TikTok Research API | **No elegible** | — | **México no está**, y solo sin fines de lucro | — |
| Instagram, audios en tendencia | **No** | la flecha en el selector de música, dentro de la app | — | $0 |
| Facebook | **No, y no sirve** | solo métricas propias | — | — |
| LinkedIn | **No existe** | ningún endpoint de tendencias | — | — |
| Reddit Data API | **Sí**, con OAuth | 100 consultas por minuto | por subreddit | $0 |

El RSS de Trends responde y trae los campos `ht:` con `approx_traffic`, o sea que el detalle del namespace de más abajo es correcto. México no es elegible en la TikTok Research API: solo instituciones académicas y sin fines de lucro de EE. UU., Reino Unido, EEE, Canadá, Suiza y Brasil, y las empresas comerciales quedan excluidas explícitamente ([TikTok for Developers](https://developers.tiktok.com/products/research-api/)). El límite de 100 consultas por minuto de Reddit es por client id de OAuth ([Reddit Data API Wiki](https://support.reddithelp.com/hc/en-us/articles/16160319875092-Reddit-Data-API-Wiki)). Creator Search Insights vive dentro de la app ([TikTok Creator Academy](https://www.tiktok.com/creator-academy/en/article/Creator-Search-Insights)) y Creative Center tiene su sección de Trends abierta ([Creative Center](https://ads.tiktok.com/business/creativecenter/inspiration/popular/hashtag/pc/en)).

Falta probar a mano tres endpoints antes de escribir una línea de código: el RSS de canales de YouTube, el RSS de Google News y `chart=mostPopular`, que necesita llave de API.

La pestaña de Tendencias de YouTube se **anunció como retirada el 10 de julio de 2025** y desapareció en las semanas siguientes; la sustituye YouTube Charts, con listas separadas de música, pódcast y tráilers ([TechCrunch, 10 jul 2025](https://techcrunch.com/2025/07/10/youtube-is-getting-rid-of-its-trending-page-and-trending-now-list)). Que `chart=mostPopular` se alimente hoy de esos charts es una **inferencia nuestra**. Vale construirla porque cuesta cinco líneas y cero cuota, pero hay que medir dos semanas si aporta algo y apagarla sin culpa si no.

## El proceso diario

**Corre solo, sin humano:** a las 5:40 el RSS de Trends; 5:45 doce consultas de Google News en español de México; 5:50 YouTube por categoría; 5:55 el RSS de 25 a 35 canales mexicanos de fiscal, finanzas y gig economy; 6:10 el cruce y la puntuación; 6:15 un correo con las diez mejores filas antes de que alguien abra la laptop.

**Lo revisa un humano, 22 minutos:** 6 minutos de captura en TikTok Creative Center (región México, ordenar por crecimiento, top 10 hashtags y top 10 sonidos); 5 minutos en el selector de música de Instagram y en cinco cuentas del nicho; 3 leyendo el radar; 5 aplicando el criterio a las tres mejores; 3 escribiendo el ángulo si hay alguna que pase.

Si hay que recortar, lo único que no se puede saltar es la captura de TikTok: es la única señal de formato que no se obtiene de ninguna otra forma.

**Regla de corte:** si a las 9:00 no hay ninguna candidata que pase el criterio, el día no se fuerza. Se produce del banco evergreen. Un sistema que obliga a encontrar una tendencia diaria produce contenido forzado, que es justo lo que queremos evitar.

## El criterio

Se responde en orden. Un solo NO en las compuertas 1 y 2 mata la idea. No hay puntajes ni promedios: son compuertas.

**1 · Legalidad y riesgo**

1. ¿El audio está en la Commercial Music Library, o es audio original de heru, o es voz sin música?
2. En Instagram, ¿el audio aparece disponible en la cuenta de empresa, sin aviso de restricción?
3. ¿Se puede ejecutar sin raspar ni redistribuir contenido de otra cuenta?
4. ¿El origen está libre de muerte, desastre, violencia o sufrimiento de personas reales?
5. ¿Pasaría al centinela sin palabras gatillo, dinero visible ni asesoría?
6. ¿El dato fiscal ya tiene respaldo citable?

**2 · Encaje real, no forzado**

7. ¿El **mensaje** de la tendencia — no el audio, no el baile — ya es una verdad del contribuyente independiente mexicano, antes de que heru lo toque?
8. ¿Se puede ejecutar conservando mensaje y narrativa visual originales, cambiando solo hashtags y sonido? Es lo que TikTok publica como el modo correcto de participar.
9. ¿**Puedes explicar el vínculo en una sola frase, sin la palabra "y"?** Si necesitas "y" o "además", el vínculo es artificial.
10. ¿Alguien que no conoce heru entendería el chiste sin que se lo expliquen?

**3 · Ventana**

11. ¿Sigue activa hoy, no solo cuando la detectaste?
12. ¿Se puede publicar hoy o mañana? Si el ciclo entrega en tres días y es un formato puntual, se deja pasar. Si es una señal de comportamiento emergente, se puede tomar con calma.
13. ¿Ya hay una fintech mexicana ejecutando este formato con este tema? Si sí, llegas segundo.

**4 · Para ordenar, no para bloquear**

14. ¿Aparece también en el radar fiscal del día? Un sí aquí vale más que todo lo demás: es coincidencia real entre lo que la gente busca y lo que le está pasando con el SAT.
15. ¿Es reutilizable en dos redes sin rehacer la pieza?
16. ¿Funciona sin sonido?

La bitácora de rechazos, con la razón, es lo que evita volver a evaluar la misma tendencia tres veces.

## Qué se construye

Seis pestañas en el Sheet: `raw_trends`, `raw_news`, `raw_youtube`, `raw_canales`, `manual_tiktok`, `radar_hoy`, más `config_keywords` y `config_canales`.

El detalle que rompe la mayoría de las implementaciones del RSS de Trends: los campos `ht:` viven en un namespace propio, así que `getChild('approx_traffic')` devuelve nulo si no se lo pasas. Hay que leer el namespace del elemento raíz en vez de escribirlo a mano, para que si Google lo cambia el script falle ruidosamente y no en silencio.

La función de cruce es donde se gana o se pierde: une las cuatro fuentes, normaliza, suma 3 si el término aparece en dos fuentes distintas hoy, **suma 5 si empata con el calendario fiscal o con lo que ya reportó el vigía**, suma 2 si está en las keywords configuradas, resta 10 si toca la lista negra, ordena y corta a 15. Ese +5 es el sistema; todo lo demás es plomería.

El consumo estimado es de unas 50 llamadas y menos de 2 minutos diarios, una fracción pequeña de la cuota gratuita de la YouTube Data API. El porcentaje exacto se calcula cuando el script corra.

**Lo que no hay que intentar construir:** un conector a TikTok Creative Center. Existen endpoints internos y hay servicios que los revenden, pero usarlos es raspado de una superficie no documentada, contra los términos de TikTok, desde la infraestructura de una fintech que depende de sus cuentas para distribuir. El riesgo no es una multa, es perder la cuenta.

## Lo que no se puede, dicho sin rodeos

- **Sonidos en tendencia de TikTok en México por API.** No existe, ni gratis ni pagando.
- **Cualquier cosa de Instagram.** No hay endpoint de audios ni de temas en ningún nivel del Graph API.
- **Facebook y LinkedIn, completos.** No hay superficie de tendencias.
- **"Qué audio está subiendo antes de que sature."** Lo más cercano legítimo es vigilar a mano un panel de 20 a 30 creadores mexicanos: cuando tres usan el mismo audio en 48 horas, todavía hay tiempo. Es manual, y para heru importa menos de lo que parece porque la restricción de música comercial ya lo sacó de la mayoría de esos audios.

**Si se decidiera pagar, ningún pago resuelve el hueco real**, que es Instagram y TikTok con corte a México. Metricool arranca en €16 al mes en su plan Starter ([metricool.com](https://metricool.com/pricing/)), y su página de precios no ofrece ninguna señal de tendencias de TikTok ni de Instagram con corte a México en ningún plan. Presupuesto cero aquí es una decisión razonada, no una limitación.

Dos verificaciones de tres minutos antes de construir: abrir el RSS con `geo=MX` en el navegador y confirmar que devuelve términos en español, y confirmar que México está en el selector de región de Creative Center. De lo segundo depende si la captura manual de TikTok vale 6 minutos diarios o no vale nada.

Los horarios del proceso diario, los 22 minutos de revisión humana, la regla de corte de las 9:00, las 16 preguntas del criterio, la fórmula de puntuación (+3, +5, +2, −10) y la decisión de no construir un conector a Creative Center son **decisiones internas de heru**.
