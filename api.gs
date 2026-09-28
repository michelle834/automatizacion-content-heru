/**
 * api.gs — la API del centro de operaciones
 * ---------------------------------------------------------------
 * Va en el MISMO proyecto de Apps Script que marcador.gs.
 *
 * Publica el pool como JSON y recibe las decisiones de la página.
 * Corre en los servidores de Google: no necesita tu computadora.
 *
 * Implementar:  Implementar → Nueva implementación → Aplicación web
 *               Ejecutar como: yo
 *               Quién tiene acceso: cualquier usuario
 *               → copia la URL /exec
 *
 * OJO: "cualquier usuario" significa que quien tenga la URL puede leer
 * el pool. No hay nada sensible ahí (temas y puntajes), pero para
 * escribir sí se pide el token de abajo.
 */

// Cambia esto por una cadena larga tuya. El mismo valor va en la página.
// No uses una contraseña real de nada: es solo para que un extraño no
// pueda aprobar piezas si adivina la URL.
var TOKEN = 'cambia-esto-por-algo-largo-y-unico';

// ── Lectura ────────────────────────────────────────────────────

function doGet(e) {
  var salida = {
    generado: Utilities.formatDate(new Date(), 'America/Mexico_City', "yyyy-MM-dd'T'HH:mm:ssXXX"),
    fuente_datos: 'apps script',
    pesos: _leerPesos(),
    cupo_diario: CUPO_DIARIO,
    volumen_semanal: { TikTok:5, Instagram:4, Facebook:3, YouTube:4, LinkedIn:2 },
    pool: _poolComoObjetos(),
    aprendizajes: _aprendizajesComoObjetos()
  };
  return ContentService
    .createTextOutput(JSON.stringify(salida))
    .setMimeType(ContentService.MimeType.JSON);
}

function _poolComoObjetos() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName(HOJA_POOL);
  if (!hoja || hoja.getLastRow() < 2) return [];
  var datos = hoja.getRange(2, 1, hoja.getLastRow() - 1, ENCABEZADOS_POOL.length).getValues();
  var out = [];
  for (var i = 0; i < datos.length; i++) {
    var f = datos[i];
    if (!f[COL.id - 1]) continue;
    out.push({
      id: String(f[COL.id - 1]),
      fuente: f[COL.fuente - 1],
      tema: f[COL.tema - 1],
      keyword: f[COL.keyword - 1],
      angulo: f[COL.angulo - 1],
      pilar: f[COL.pilar - 1],
      audiencia: f[COL.audiencia - 1],
      ventana_tipo: f[COL.ventana_tipo - 1],
      fecha_limite: _fechaTexto(f[COL.fecha_limite - 1]),
      red: f[COL.red - 1],
      formato: f[COL.formato - 1],
      hecho_citable: f[COL.hecho_citable - 1],
      senal_demanda: f[COL.senal_demanda - 1],
      cierre: f[COL.cierre - 1],
      dem: Number(f[COL.dem - 1]) || 0,
      ven: Number(f[COL.ven - 1]) || 0,
      evi: Number(f[COL.evi - 1]) || 0,
      enc: Number(f[COL.enc - 1]) || 0,
      wa:  Number(f[COL.wa - 1])  || 0,
      score: Number(f[COL.score - 1]) || 0,
      bloqueo: f[COL.bloqueo - 1] || '',
      carril: f[COL.carril - 1] || '',
      estado: f[COL.estado - 1] || 'nuevo'
    });
  }
  return out;
}

function _aprendizajesComoObjetos() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName(HOJA_APR);
  if (!hoja || hoja.getLastRow() < 2) return [];
  var datos = hoja.getRange(2, 1, hoja.getLastRow() - 1, ENCABEZADOS_APR.length).getValues();
  var out = [];
  for (var i = 0; i < datos.length; i++) {
    if (!datos[i][0]) continue;
    var o = {};
    for (var c = 0; c < ENCABEZADOS_APR.length; c++) {
      var v = datos[i][c];
      o[ENCABEZADOS_APR[c]] = (c === 2) ? _fechaTexto(v) : v;
    }
    out.push(o);
  }
  return out;
}

function _leerPesos() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName(HOJA_PESOS);
  var out = { demanda:30, ventana:25, evidencia:20, encaje:15, whatsapp:10 };
  if (!hoja || hoja.getLastRow() < 2) return out;
  var datos = hoja.getRange(2, 1, hoja.getLastRow() - 1, 2).getValues();
  for (var i = 0; i < datos.length; i++) {
    if (datos[i][0]) out[String(datos[i][0])] = Number(datos[i][1]) || 0;
  }
  return out;
}

function _fechaTexto(v) {
  if (!v) return null;
  if (v instanceof Date) return Utilities.formatDate(v, 'America/Mexico_City', 'yyyy-MM-dd');
  return String(v);
}

// ── Escritura ──────────────────────────────────────────────────

function doPost(e) {
  var ok = { ok:true };
  try {
    var cuerpo = JSON.parse(e.postData.contents);
    if (cuerpo.token !== TOKEN) {
      return ContentService.createTextOutput(JSON.stringify({ ok:false, error:'token' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    if (cuerpo.accion === 'decision') {
      _aplicarDecision(cuerpo.id, cuerpo.decision, cuerpo.razon || '');
    }
  } catch (err) {
    ok = { ok:false, error:String(err) };
  }
  return ContentService.createTextOutput(JSON.stringify(ok))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Aprobar deja la pieza en 'agendado'. Bajar la regresa a 'nuevo'
 * y guarda la razón: esa razón es insumo del Analista del lunes.
 * Si Mich baja tres veces seguidas candidatos del mismo tipo, lo que
 * hay que cambiar es un peso del marcador, no su criterio.
 */
function _aplicarDecision(id, decision, razon) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName(HOJA_POOL);
  if (!hoja || hoja.getLastRow() < 2) return;
  var ids = hoja.getRange(2, COL.id, hoja.getLastRow() - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) !== String(id)) continue;
    var fila = i + 2;
    if (decision === 'aprobada') {
      hoja.getRange(fila, COL.estado).setValue('agendado');
    } else if (decision === 'bajada') {
      hoja.getRange(fila, COL.estado).setValue('nuevo');
      var nota = hoja.getRange(fila, COL.nota).getValue();
      var marca = Utilities.formatDate(new Date(), 'America/Mexico_City', 'yyyy-MM-dd');
      hoja.getRange(fila, COL.nota)
          .setValue((nota ? nota + ' · ' : '') + marca + ' bajada' + (razon ? ': ' + razon : ''));
    }
    return;
  }
}

// ── Disparadores ───────────────────────────────────────────────

/**
 * Corre una sola vez. Deja el marcador recalculando solo cada mañana.
 */
function instalarDisparadores() {
  var existentes = ScriptApp.getProjectTriggers();
  for (var i = 0; i < existentes.length; i++) {
    if (existentes[i].getHandlerFunction() === 'calcularScore') {
      ScriptApp.deleteTrigger(existentes[i]);
    }
  }
  ScriptApp.newTrigger('calcularScore')
    .timeBased().atHour(6).nearMinute(30).everyDays(1)
    .inTimezone('America/Mexico_City')
    .create();
}
