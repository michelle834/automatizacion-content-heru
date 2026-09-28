# Centro de operaciones · heru

El tablero desde donde se ve, se aprueba, se exporta y se analiza todo el contenido.

Corre solo. No depende de Claude ni de que tu computadora esté prendida.

---

## Cómo está armado

```
Hoja de cálculo          la base de datos: pool, aprendizajes, pesos
       │
Apps Script              recalcula el marcador a las 6:30 y sirve el JSON
       │                 (corre en servidores de Google)
       │
GitHub Actions           cada hora lee ese JSON y lo guarda en datos.json
       │                 (corre en servidores de GitHub)
       │
GitHub Pages             sirve index.html, que lee datos.json
       │
Tu navegador             ves, apruebas, exportas — desde el teléfono también
```

Las aprobaciones van en sentido contrario: la página le manda un POST a Apps Script,
que escribe en la hoja.

**Ninguna de las cuatro piezas necesita una computadora prendida.** Google y GitHub
mantienen los relojes andando.

---

## Armarlo la primera vez

### 1 · La hoja

En el proyecto de Apps Script del Content Dash, pega los dos archivos:

- `marcador.gs` — el motor de decisión
- `api.gs` — la API que sirve el JSON

Abre `api.gs` y cambia `TOKEN` por una cadena larga tuya. No uses una contraseña real
de nada: solo sirve para que un extraño con la URL no pueda aprobar piezas.

Luego, desde el menú de la hoja:

1. **marcador heru → Crear hojas** (una sola vez)
2. Pega `pool-semilla.csv` en la hoja `pool`, debajo del encabezado
3. **marcador heru → Recalcular el pool**

Y en el editor de Apps Script, corre `instalarDisparadores()` una vez. Eso deja el
marcador recalculando solo todas las mañanas a las 6:30.

### 2 · Publicar la API

En Apps Script: **Implementar → Nueva implementación → Aplicación web**

- Ejecutar como: **yo**
- Quién tiene acceso: **cualquier usuario**

Copia la URL que termina en `/exec`.

> Lo que queda expuesto son temas y puntajes, nada sensible. Escribir sí pide el token.

### 3 · El repositorio

Sube estos archivos a un repo nuevo:

```
index.html          el tablero
datos.json          la semilla, para que funcione desde el minuto uno
.github/workflows/snapshot.yml
```

En **Settings → Secrets and variables → Actions**, crea el secret:

| Nombre | Valor |
|---|---|
| `APPS_SCRIPT_URL` | la URL `/exec` del paso 2 |

En **Settings → Pages**, elige la rama `main` y la carpeta raíz.

### 4 · Encender

En la pestaña **Actions**, corre *Snapshot del pool* a mano una vez para comprobar
que lee bien. Si el pool viene vacío, el workflow se detiene solo y no pisa el
archivo bueno — casi siempre es que la implementación quedó en "solo yo".

Ya con eso, abre tu página de Pages. Debe decir **en vivo** arriba a la derecha.

---

## El día a día

- **06:30** · el marcador recalcula el pool en Google
- **07:30** · abres el tablero, ves la lista y apruebas o bajas — ocho minutos
- **cada hora** · GitHub guarda una foto del pool en `datos.json`
- **lunes** · el Analista cierra las piezas de siete días y mueve los pesos

---

## Las pestañas

**Hoy** — lo que sale mañana, una tarjeta por red, con el desglose de los cinco
componentes en barra. Aprobar o bajar. Abajo, lo que quedó bloqueado y por qué,
con el puntaje que habría sacado de no estar bloqueado.

**Pool** — todos los candidatos vivos, ordenados. Filtro por red y búsqueda.
Exporta a CSV al portapapeles.

**Grabación** — el carril de ocho días, agrupado por red. Es lo que se graba el
jueves para la semana que entra.

**Aprendizajes** — predicho contra real. Vacío hasta que cierre la primera pieza,
siete días después de publicar.

**Conexión** — la URL de la API y el token. Se guardan solo en ese navegador.

---

## Qué falta, y de qué depende

| Pendiente | Qué desbloquea | De quién depende |
|---|---|---|
| App de Meta en modo Live + token de System User | Que Instagram y Facebook publiquen solos | Mich |
| Auditoría de YouTube | Que `videos.insert` deje de subir en privado | Formulario gratuito |
| Development tier de LinkedIn | Publicar por API | Se evalúa caso por caso |
| Renderizar carruseles en Actions | Producción visual sin abrir Canva | Siguiente workflow |
| TikTok | — | Sin vía: su API prohíbe apps de uso interno |

---

## Cuando algo falla

**La página dice "datos de semilla".** No hay URL de API guardada en ese navegador,
o el fetch falló. Revisa la pestaña Conexión. La página sigue sirviendo: muestra el
último `datos.json` que GitHub guardó.

**El workflow marca error.** Casi siempre es la implementación de Apps Script en
"solo yo" en vez de "cualquier usuario". El workflow está hecho para fallar sin
pisar el archivo bueno.

**Apruebo y no pasa nada en la hoja.** El token de la página y el de `api.gs` no
coinciden. El navegador no puede ver la respuesta del POST — es a propósito, para
evitar el preflight de CORS — así que la comprobación es abrir la hoja.

**Los puntajes no se movieron.** `calcularScore()` corre a las 6:30. Para forzarlo,
**marcador heru → Recalcular el pool**.
