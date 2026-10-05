# Centro de operaciones de contenido · heru

Tablero desde donde se ve, se aprueba, se exporta y se analiza el contenido orgánico
de heru. Corre solo: no depende de que esta computadora esté prendida.

**Repo:** `michelle834/automatizacion-content-heru` — se llamaba `centro-heru` y se
renombró. GitHub redirige el nombre viejo, así que un `git remote` con la URL antigua
sigue funcionando y no avisa. El sitio en vivo es
https://michelle834.github.io/automatizacion-content-heru/ ; la ruta `/centro-heru/`
ya no responde.

## Arquitectura

```
Hoja de cálculo ── pool, aprendizajes, pesos
       │
Apps Script ───── recalcula el marcador a las 6:30 y sirve el JSON (api.gs, marcador.gs)
       │
GitHub Actions ── cada hora lee ese JSON y lo guarda en datos.json (.github/workflows/snapshot.yml)
       │
GitHub Pages ──── sirve index.html, que lee datos.json
```

Las aprobaciones van al revés: la página manda un POST a Apps Script, que escribe en la hoja.

## Qué hay en el repo

| Archivo | Qué es |
|---|---|
| `index.html` | El tablero completo: una sola página, sin build, sin dependencias |
| `datos.json` | Foto del pool. **Lo escribe el workflow, no se edita a mano** |
| `investigacion/*.md` | 26 tabs de investigación. El 24 es la parrilla semanal, el 22 el branding |
| `skills/*/SKILL.md` | Las 16 skills de heru, sincronizadas con las de la cuenta. Si Claude Code ya las carga desde la cuenta, esas mandan; esta copia existe para que el repo se entienda solo y para revisar cambios en el diff |
| `pool-semilla.csv` | Semilla del pool, 25 candidatos |
| `marcador.gs` · `api.gs` | Código de Apps Script, no corre aquí |

## Cómo está hecho index.html

Una sola página con todo inline. No hay bundler ni paso de build: se edita y se commitea.

- `SECCIONES` — la lista del menú lateral. Agregar una vista = una entrada aquí,
  una función `vNombre()`, y una línea en el mapa de vistas dentro de `pintar()`.
- `SEMANA` — la parrilla semanal: día, ángulo, pilar y qué sale en cada red.
- `CAL_PARRILLA` y `CAL` — el calendario del mes. `CAL_PARRILLA` proyecta la parrilla
  sobre los días de la semana; `CAL` lleva las piezas asignadas, una línea por día con
  `[red, formato, estado, nota]`. Estados: `publicado`, `listo`, `plan`, `detenido`.
- **Si cambias la parrilla, cámbiala en los dos lados** (`SEMANA` y `CAL_PARRILLA`) o
  las dos vistas se contradicen.

## La parrilla vigente

| Día | Ángulo | Pilar |
|---|---|---|
| Domingo | el resumen de la semana | fechas límite |
| Lunes | replicar lo que funcionó | abierto |
| Martes | el error caro | mito vs realidad |
| Miércoles | día de blog · clúster | facturación |
| Jueves | cómo funciona cada régimen | régimen |
| Viernes | tips curados · se cura experiencia, no consejo | deducciones |
| Sábado | humor fiscal | abierto |

El pilar es lo que el marcador filtra a las 6:30. El ángulo es cómo se cuenta.
**Noticias no tiene día fijo**: es el carril urgente y se salta la fila.

## Reglas que no se negocian

Están completas en las skills de la cuenta (`branding-heru`, `heru-centinela`,
`heru-verificador`). Lo mínimo:

- **heru siempre en minúscula**, incluso al inicio de frase.
- Paleta única: cian `#15D1FE`, azul `#1790EC`, cream `#F5EFE3`, negro, blanco,
  degradado 90° `#5DE0E6` → `#004AAD`. Nada más.
- Tipografía: **Helvetica** en títulos, **Lexend Deca** en cuerpo.
- Carruseles **1080×1440**. Memes y estáticos de feed, 1080×1350.
- Orgánico cierra con guardar, compartir o comentar. **Nunca** "Regístrate" ni
  "Descarga heru" ni precios.
- Ningún dato fiscal se publica sin artículo de ley citado. El blog de heru **no es
  fuente**: ya publicó errores.
- Multa por no presentar declaración: **$1,810 a $22,400** (CFF Art. 82 fr. I).
  Ojo: dos skills tienen esta cifra corrupta, con el `$1` comido. Si aparece
  "las,810" o "el,810", está mal.

## Comandos

```bash
# publicar un cambio
git add -A && git commit -m "mensaje" && git push

# ver el sitio local (index.html necesita servidor por el fetch de datos.json)
python3 -m http.server 8000
```

No hay tests ni linter. La comprobación es abrir la página y que no truene la consola.

## Cosas que han mordido

- **`datos.json` no se edita a mano.** El workflow lo pisa cada hora.
- **El workflow falla en silencio a propósito**: si el pool viene vacío, se detiene y
  conserva el archivo bueno. Si lleva horas sin commitear, revisar la pestaña Actions —
  casi siempre es la implementación de Apps Script en "solo yo" en vez de
  "cualquier usuario".
- **`index.html` se sirve desde Pages**, así que un `file://` local no puede leer
  `datos.json`. Hay que levantar un servidor para probarlo.
- La copia vieja en Downloads tenía locks de git trabados desde el 28 de septiembre.
  Ya se limpiaron, pero si git se queja de `.git/index.lock`, es eso.

## Seguridad

Los pendientes de seguridad viven en `ENLACES-PRIVADOS.md`, que está en `.gitignore`
y nunca se sube: el repo es público. Ninguna llave, token ni enlace privado se copia
a un archivo del repo ni a un chat.

@ENLACES-PRIVADOS.md

## Pendientes abiertos

- Conectar **YouTube en Windsor**: hay dos KRs de octubre sin instrumento de medición.
- Instrumentar el link de **WhatsApp con UTM por red**: es el KPI norte y no se mide.
- Confirmar en el **DOF del 30 de septiembre** el decreto del Buen Fin. El carrusel
  está producido y detenido por la compuerta del verificador hasta entonces.
- Fijar los **colores por red** del calendario en `branding-heru`: hoy salen del
  degradado oficial, pero no están declarados como oficiales.
- **El pilar `noticias` se quedó sin día.** Era el del jueves. El carril urgente se
  salta la fila, así que puede entrar cualquier día, pero ningún día lo filtra en el
  marcador de las 6:30. Candidatos: lunes o sábado, que están abiertos.
- **El viernes se quedó sin Instagram.** La cuota de IG está llena (3 feed + 2 trial);
  darle uno al viernes implica quitárselo a otro día.
- **El pilar `noticias` se quedó sin día.** Era el del jueves. El carril urgente se
  salta la fila, así que puede entrar cualquier día, pero ningún día lo filtra en el
  marcador de las 6:30. Candidatos: lunes o sábado, que están abiertos.
- **El viernes se quedó sin Instagram.** La cuota de IG está llena (3 feed + 2 trial);
  darle uno al viernes implica quitárselo a otro día.
