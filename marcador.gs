/**
 * marcador heru — motor de decisión diaria
 * ---------------------------------------------------------------
 * Crea y opera tres hojas en el Content Dash:
 *   pool          candidatos vivos, uno por fila
 *   aprendizajes  una fila por pieza publicada, se cierra a los 7 días
 *   pesos         los pesos del marcador, editables sin tocar el código
 *
 * Uso:
 *   1. setupMarcador()       una sola vez, crea las tres hojas
 *   2. calcularScore()       recalcula todo el pool (correr 6:30 con trigger)
 *   3. armarListaManana()    escribe la lista del día siguiente
 *
 * Regla de base: nada se publica el mismo día que se decide.
 */

// ── Configuración ──────────────────────────────────────────────

var HOJA_POOL = 'pool';
var HOJA_APR  = 'aprendizajes';
var HOJA_PESOS = 'pesos';

var COL = {
  id:1, fecha_entrada:2, fuente:3, tema:4, keyword:5, angulo:6,
  pilar:7, audiencia:8, ventana_tipo:9, fecha_limite:10,
  red:11, formato:12, hecho_citable:13, senal_demanda:14, cierre:15,
  dem:16, ven:17, evi:18, enc:19, wa:20, score:21,
  bloqueo:22, carril:23, estado:24, nota:25
};

var ENCABEZADOS_POOL = [
  'id','fecha_entrada','fuente','tema','keyword_exacta','angulo',
  'pilar','audiencia','ventana_tipo','fecha_limite',
  'red','formato','hecho_citable','senal_demanda','cierre',
  'dem','ven','evi','enc','wa','score',
  'bloqueo','carril','estado','nota'
];

var ENCABEZADOS_APR = [
  'codigo','id_pool','fecha_publicacion','red','pilar','formato',
  'mecanismo_hook','tema','fuente','score_predicho',
  'vistas','retencion','guardados','comentarios','clics_link','entradas_whatsapp',
  'veredicto','aprendizaje'
];

var AUDIENCIAS = [
  'conductores y repartidores',
  'freelancer y profesionista',
  'quien busca un como-se-hace',
  'contador, empresa o alianza',
  'noticia fiscal del dia'
];

var PILARES = ['deducciones','fechas limite','regimen','facturacion','noticias','mito vs realidad'];
var VENTANAS = ['vence esta semana','estacional','tendencia del dia','perenne'];
var REDES = ['TikTok','Instagram','Facebook','YouTube','LinkedIn'];

var FORMATOS = [
  'carrusel','estatico','meme','texto','comentario',
  'video con cara','reel','short','video largo'
];

// Formatos que NO necesitan cámara → carril rápido
var SIN_CAMARA = ['carrusel','estatico','meme','texto','comentario','short'];

// Cuántas piezas por red toma la lista de un día
var CUPO_DIARIO = { TikTok:1, Instagram:1, Facebook:1, YouTube:1, LinkedIn:1 };

// ── Tablas de puntos ───────────────────────────────────────────

var DEMANDA = {
  'hay busquedas y no aparecemos en ningun lado': 30,
  'el blog rankea pero no existe el video': 25,
  'sale en creator search insights con hueco': 25,
  'pregunta repetida 3+ veces esta semana': 20,
  'hay busquedas y ya estamos arriba': 10,
  'ninguna senal, solo intuicion': 0
};

var VENTANA = {
  'vence esta semana': 25,      // se recalcula con fecha_limite
  'tendencia del dia': 20,
  'estacional': 10,
  'perenne': 5
};

var EVIDENCIA = { gano2:20, gano1:12, sinHistorial:8, perdio1:4, perdio2:0 };

var ENCAJE = {
  'conductores y repartidores':  { TikTok:15, Instagram:10, Facebook:15, YouTube:10, LinkedIn:0  },
  'freelancer y profesionista':  { TikTok:12, Instagram:15, Facebook:5,  YouTube:12, LinkedIn:8  },
  'quien busca un como-se-hace': { TikTok:10, Instagram:8,  Facebook:5,  YouTube:15, LinkedIn:3  },
  'contador, empresa o alianza': { TikTok:0,  Instagram:3,  Facebook:3,  YouTube:5,  LinkedIn:15 },
  'noticia fiscal del dia':      { TikTok:12, Instagram:10, Facebook:8,  YouTube:5,  LinkedIn:12 }
};

var CIERRE_WA = {
  'algo concreto en la comunidad': 10,
  'comentar palabra clave': 7,
  'solo guardar o compartir': 3,
  'no aplica, su destino es otro': 0
};

// ── 1 · Crear la estructura ────────────────────────────────────

function setupMarcador() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var pool = ss.getSheetByName(HOJA_POOL) || ss.insertSheet(HOJA_POOL);
  if (pool.getLastRow() === 0) {
    pool.getRange(1, 1, 1, ENCABEZADOS_POOL.length).setValues([ENCABEZADOS_POOL]);
  }
  pool.setFrozenRows(1);
  pool.getRange(1, 1, 1, ENCABEZADOS_POOL.length)
      .setFontWeight('bold').setBackground('#1790EC').setFontColor('#FFFFFF');

  // Listas desplegables: si no son objetivas, el marcador no sirve
  _dropdown(pool, COL.pilar, PILARES);
  _dropdown(pool, COL.audiencia, AUDIENCIAS);
  _dropdown(pool, COL.ventana_tipo, VENTANAS);
  _dropdown(pool, COL.red, REDES);
  _dropdown(pool, COL.formato, FORMATOS);
  _dropdown(pool, COL.senal_demanda, Object.keys(DEMANDA));
  _dropdown(pool, COL.cierre, Object.keys(CIERRE_WA));
  _dropdown(pool, COL.estado,
    ['nuevo','agendado','en produccion','en compuertas','programado','publicado','cerrado','devuelto','muerto']);

  // Las fechas se guardan como TEXTO en este archivo. Se fuerza formato
  // para que no vuelva a pasar lo del MAX() sobre texto.
  pool.getRange(2, COL.fecha_entrada, pool.getMaxRows() - 1, 1).setNumberFormat('yyyy-mm-dd');
  pool.getRange(2, COL.fecha_limite,  pool.getMaxRows() - 1, 1).setNumberFormat('yyyy-mm-dd');

  var apr = ss.getSheetByName(HOJA_APR) || ss.insertSheet(HOJA_APR);
  if (apr.getLastRow() === 0) {
    apr.getRange(1, 1, 1, ENCABEZADOS_APR.length).setValues([ENCABEZADOS_APR]);
  }
  apr.setFrozenRows(1);
  apr.getRange(1, 1, 1, ENCABEZADOS_APR.length)
     .setFontWeight('bold').setBackground('#1790EC').setFontColor('#FFFFFF');
  _dropdown(apr, 17, ['REPLICAR','ITERAR','MATAR']);

  var pesos = ss.getSheetByName(HOJA_PESOS) || ss.insertSheet(HOJA_PESOS);
  if (pesos.getLastRow() === 0) {
    pesos.getRange(1, 1, 6, 3).setValues([
      ['componente','peso_max','nota'],
      ['demanda', 30, 'sube si hay busquedas y hueco'],
      ['ventana', 25, 'lo que caduca gana; lo perenne espera'],
      ['evidencia', 20, 'sobre pilar x formato x red, no sobre el tema'],
      ['encaje', 15, 'la audiencia decide sola'],
      ['whatsapp', 10, 'preferencia, no requisito']
    ]);
    pesos.getRange(1, 1, 1, 3).setFontWeight('bold');
  }

  SpreadsheetApp.getUi().alert('Listo. Se crearon pool, aprendizajes y pesos.');
}

function _dropdown(hoja, col, valores) {
  var regla = SpreadsheetApp.newDataValidation()
    .requireValueInList(valores, true).setAllowInvalid(false).build();
  hoja.getRange(2, col, hoja.getMaxRows() - 1, 1).setDataValidation(regla);
}

// ── 2 · El marcador ────────────────────────────────────────────

function calcularScore() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var pool = ss.getSheetByName(HOJA_POOL);
  var filas = pool.getLastRow() - 1;
  if (filas < 1) return;

  var datos = pool.getRange(2, 1, filas, ENCABEZADOS_POOL.length).getValues();
  var historial = _leerHistorial(ss);
  var hoy = _hoy();

  // Para los filtros duros: pilares de esta semana y keywords de los ultimos 21 dias
  var pilaresSemana = _contarPilaresSemana(ss, hoy);
  var keywordsRecientes = _keywordsRecientes(ss, hoy, 21);

  for (var i = 0; i < datos.length; i++) {
    var f = datos[i];
    var estado = String(f[COL.estado - 1] || '').trim();

    // Solo compiten las filas vivas
    if (['publicado','cerrado','muerto','programado'].indexOf(estado) !== -1) continue;

    var audiencia = String(f[COL.audiencia - 1] || '').trim();
    var red       = String(f[COL.red - 1] || '').trim();
    var pilar     = String(f[COL.pilar - 1] || '').trim();
    var formato   = String(f[COL.formato - 1] || '').trim();
    var keyword   = String(f[COL.keyword - 1] || '').trim().toLowerCase();

    // --- los cinco componentes ---
    var dem = DEMANDA[String(f[COL.senal_demanda - 1] || '').trim()] || 0;
    var ven = _puntosVentana(f[COL.ventana_tipo - 1], f[COL.fecha_limite - 1], hoy);
    var evi = _puntosEvidencia(historial, pilar, formato, red);
    var enc = (ENCAJE[audiencia] && ENCAJE[audiencia][red] !== undefined) ? ENCAJE[audiencia][red] : 0;
    var wa  = CIERRE_WA[String(f[COL.cierre - 1] || '').trim()];
    if (wa === undefined) wa = 0;

    // --- filtros duros: multiplican por cero, no restan ---
    var bloqueo = '';
    if (!String(f[COL.hecho_citable - 1] || '').trim()) {
      bloqueo = 'sin hecho citable';
    } else if ((pilaresSemana[pilar] || 0) >= 3) {
      bloqueo = 'pilar ya usado 3 veces esta semana';
    } else if (keyword && keywordsRecientes[red + '|' + keyword]) {
      bloqueo = 'misma keyword en esa red hace menos de 21 dias';
    } else if (_ventanaVencida(f[COL.fecha_limite - 1], hoy)) {
      bloqueo = 'ventana vencida';
    }

    var score = bloqueo ? 0 : (dem + ven + evi + enc + wa);
    var carril = SIN_CAMARA.indexOf(formato) !== -1 ? 'rapido' : 'con camara';

    f[COL.dem - 1] = dem;
    f[COL.ven - 1] = ven;
    f[COL.evi - 1] = evi;
    f[COL.enc - 1] = enc;
    f[COL.wa - 1]  = wa;
    f[COL.score - 1] = score;
    f[COL.bloqueo - 1] = bloqueo;
    f[COL.carril - 1] = carril;
    if (bloqueo === 'ventana vencida') f[COL.estado - 1] = 'muerto';
  }

  pool.getRange(2, 1, filas, ENCABEZADOS_POOL.length).setValues(datos);
  _pintarBloqueos(pool, filas);
}

function _puntosVentana(tipo, fechaLimite, hoy) {
  tipo = String(tipo || '').trim();
  // Si hay fecha limite, manda la fecha, no la etiqueta
  if (fechaLimite) {
    var dias = _diasEntre(hoy, _aFecha(fechaLimite));
    if (dias < 0) return 0;
    if (dias <= 7) return 25;
    if (dias <= 21) return 15;
  }
  return VENTANA[tipo] !== undefined ? VENTANA[tipo] : 5;
}

function _puntosEvidencia(historial, pilar, formato, red) {
  var llave = [pilar, formato, red].join('|').toLowerCase();
  var h = historial[llave];
  if (!h) return EVIDENCIA.sinHistorial;
  if (h.gano >= 2) return EVIDENCIA.gano2;
  if (h.gano === 1) return EVIDENCIA.gano1;
  if (h.perdio >= 2) return EVIDENCIA.perdio2;
  if (h.perdio === 1) return EVIDENCIA.perdio1;
  return EVIDENCIA.sinHistorial;
}

function _leerHistorial(ss) {
  var apr = ss.getSheetByName(HOJA_APR);
  var out = {};
  if (!apr || apr.getLastRow() < 2) return out;
  var datos = apr.getRange(2, 1, apr.getLastRow() - 1, ENCABEZADOS_APR.length).getValues();
  for (var i = 0; i < datos.length; i++) {
    var red = datos[i][3], pilar = datos[i][4], formato = datos[i][5];
    var veredicto = String(datos[i][16] || '').trim().toUpperCase();
    if (!veredicto) continue;
    var llave = [pilar, formato, red].join('|').toLowerCase();
    if (!out[llave]) out[llave] = { gano:0, perdio:0 };
    if (veredicto === 'REPLICAR') out[llave].gano++;
    if (veredicto === 'MATAR') out[llave].perdio++;
  }
  return out;
}

function _contarPilaresSemana(ss, hoy) {
  var apr = ss.getSheetByName(HOJA_APR);
  var out = {};
  if (!apr || apr.getLastRow() < 2) return out;
  var datos = apr.getRange(2, 1, apr.getLastRow() - 1, ENCABEZADOS_APR.length).getValues();
  for (var i = 0; i < datos.length; i++) {
    var fecha = _aFecha(datos[i][2]);
    if (!fecha) continue;
    if (_diasEntre(fecha, hoy) <= 7) {
      var pilar = String(datos[i][4] || '').trim();
      out[pilar] = (out[pilar] || 0) + 1;
    }
  }
  return out;
}

function _keywordsRecientes(ss, hoy, dias) {
  var apr = ss.getSheetByName(HOJA_APR);
  var out = {};
  if (!apr || apr.getLastRow() < 2) return out;
  var pool = ss.getSheetByName(HOJA_POOL);
  var mapaKeyword = {};
  if (pool.getLastRow() > 1) {
    var p = pool.getRange(2, 1, pool.getLastRow() - 1, ENCABEZADOS_POOL.length).getValues();
    for (var j = 0; j < p.length; j++) {
      mapaKeyword[String(p[j][COL.id - 1])] = String(p[j][COL.keyword - 1] || '').toLowerCase();
    }
  }
  var datos = apr.getRange(2, 1, apr.getLastRow() - 1, ENCABEZADOS_APR.length).getValues();
  for (var i = 0; i < datos.length; i++) {
    var fecha = _aFecha(datos[i][2]);
    if (!fecha || _diasEntre(fecha, hoy) > dias) continue;
    var kw = mapaKeyword[String(datos[i][1])];
    if (kw) out[datos[i][3] + '|' + kw] = true;
  }
  return out;
}

// ── 3 · La lista de mañana ─────────────────────────────────────

function armarListaManana() {
  calcularScore();

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var pool = ss.getSheetByName(HOJA_POOL);
  var filas = pool.getLastRow() - 1;
  if (filas < 1) return;

  var datos = pool.getRange(2, 1, filas, ENCABEZADOS_POOL.length).getValues();
  var candidatos = [];

  for (var i = 0; i < datos.length; i++) {
    var f = datos[i];
    var estado = String(f[COL.estado - 1] || '').trim();
    if (['nuevo'].indexOf(estado) === -1) continue;
    if (f[COL.bloqueo - 1]) continue;
    if (f[COL.carril - 1] !== 'rapido') continue;   // el carril con camara va al bloque del jueves
    candidatos.push({ fila:i, red:String(f[COL.red - 1]).trim(), score:Number(f[COL.score - 1]) });
  }

  candidatos.sort(function(a, b){ return b.score - a.score; });

  var tomados = {};
  var lista = [];
  for (var k = 0; k < candidatos.length; k++) {
    var c = candidatos[k];
    var cupo = CUPO_DIARIO[c.red] || 0;
    if ((tomados[c.red] || 0) >= cupo) continue;
    tomados[c.red] = (tomados[c.red] || 0) + 1;
    datos[c.fila][COL.estado - 1] = 'agendado';
    lista.push([
      datos[c.fila][COL.id - 1], c.red, datos[c.fila][COL.tema - 1],
      datos[c.fila][COL.formato - 1], c.score
    ]);
  }

  pool.getRange(2, 1, filas, ENCABEZADOS_POOL.length).setValues(datos);

  var msg = lista.length
    ? lista.map(function(r){ return r[1] + ' · ' + r[2] + ' (' + r[4] + ')'; }).join('\n')
    : 'No hay candidatos libres. Revisa la columna bloqueo.';
  SpreadsheetApp.getUi().alert('Lista de mañana\n\n' + msg);
  return lista;
}

// ── Utilidades ─────────────────────────────────────────────────

function _hoy() {
  var d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function _aFecha(v) {
  if (!v) return null;
  if (v instanceof Date) return new Date(v.getFullYear(), v.getMonth(), v.getDate());
  var s = String(v).trim();
  var m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

function _diasEntre(a, b) {
  if (!a || !b) return 9999;
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function _ventanaVencida(fechaLimite, hoy) {
  var f = _aFecha(fechaLimite);
  return f ? _diasEntre(hoy, f) < 0 : false;
}

function _pintarBloqueos(pool, filas) {
  var rango = pool.getRange(2, COL.bloqueo, filas, 1);
  var valores = rango.getValues();
  var fondos = [];
  for (var i = 0; i < valores.length; i++) {
    fondos.push([valores[i][0] ? '#FFF6F5' : null]);
  }
  rango.setBackgrounds(fondos);
}

// ── Menú ───────────────────────────────────────────────────────

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('marcador heru')
    .addItem('Crear hojas (una sola vez)', 'setupMarcador')
    .addItem('Recalcular el pool', 'calcularScore')
    .addItem('Armar la lista de mañana', 'armarListaManana')
    .addToUi();
}
