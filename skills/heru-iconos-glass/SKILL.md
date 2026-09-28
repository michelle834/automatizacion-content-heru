---
name: "heru-iconos-glass"
description: "Crear íconos de heru en el estilo glass oficial (vidrio translúcido sobre forma de color de marca, símbolo blanco), en versión clara y oscura, con láminas 1080×1350, PNG sin fondo y SVG. Usar cuando pidan íconos, ilustraciones de features o stickers para heru."
---

# Íconos glass de heru

Estilo aprobado por Mich (sept 2026). Las reglas de marca viven en `branding-heru` §8F; esta skill es el **cómo producirlos**. Ir directo a producir (Mich quiere velocidad).

## 1. Anatomía (siempre 3 capas, lienzo 400×400)

1. **Back:** forma sólida en color de marca, desplazada arriba a la derecha. Colores: azul `#1790EC`, cian `#15D1FE` o degradado oficial `#5DE0E6` → `#004AAD` (90°, claro a la izquierda).
2. **Front (vidrio):** forma encima, abajo a la izquierda. Dentro: copia del back con blur fuerte (stdDeviation 26) recortada a la forma, relleno translúcido (claro: blanco 46%; oscuro: `rgba(40,40,44,.55)`), brillo lineal arriba-izq, grano sutil y borde fino (claro: blanco 75%; oscuro: blanco 28%).
3. **Glyph:** símbolo blanco sólido, redondeado, trazo grueso (14–22 px), 1–2 elementos.
- Sombra suave debajo (azul `#0b2a55`, blur 16, opacidad .18 claro / .5 oscuro, desplazada 6,18).

## 2. Reglas

- Solo paleta heru; glyph siempre blanco; texto (si hay, ej. "17", "%") en Helvetica Bold.
- **Nunca dinero**: sin $, billetes, monedas, bolsas (regla anti-shadowban).
- Un concepto por ícono, entendible en 1 segundo.
- Alternar colores de back dentro de un set (azul / cian / degradado) para variedad.
- Fondos de lámina: claro = cream `#F5EFE3` con cuadrícula 36 px (rgba 0,0,0,.045); oscuro = `#0E0E10`.

## 3. Set existente (no repetir, extender)

Impuestos: `factura` (hoja azul + hoja vidrio con 3 líneas y palomita) · `calendario-17` (cuadro cian + calendario vidrio con "17") · `porcentaje-isr` (círculo degradado + cuadro vidrio con "%") · `deducciones` (hoja azul + mango + lupa vidrio con palomita).
Soporte: `soporte-chat` (burbuja azul + burbuja vidrio con •••) · `buzon-sat` (carta cian + sobre vidrio con V y línea) · `declaracion-lista` (círculo cian + escudo vidrio con palomita) · `asesor` (círculo degradado + cuadro vidrio con diadema).
Ideas pendientes: RFC, e.firma, régimen, alerta de fecha, app en celular, versión plana para <48 px.

## 4. Generador (Python → SVG → PNG con Playwright)

```python
BLUE='#1790EC'; CYAN='#15D1FE'
F="font-family:'Helvetica Neue',Helvetica,'Nimbus Sans',Arial,sans-serif;font-weight:700"
def rr(x,y,w,h,r): return f'M{x+r},{y} H{x+w-r} Q{x+w},{y} {x+w},{y+r} V{y+h-r} Q{x+w},{y+h} {x+w-r},{y+h} H{x+r} Q{x},{y+h} {x},{y+h-r} V{y+r} Q{x},{y} {x+r},{y} Z'
def circ(cx,cy,r): return f'M{cx-r},{cy} a{r},{r} 0 1,0 {2*r},0 a{r},{r} 0 1,0 {-2*r},0 Z'
def bubble(x,y,w,h,r,tail='left'):
    if tail=='left':
        tx=x+50; t=f'H{tx+34} L{tx-6},{y+h+38} L{tx+2},{y+h}'
    else:
        tx=x+w-50; t=f'H{tx-2} L{tx+6},{y+h+38} L{tx-34},{y+h}'
    return f'M{x+r},{y} H{x+w-r} Q{x+w},{y} {x+w},{y+r} V{y+h-r} Q{x+w},{y+h} {x+w-r},{y+h} {t} H{x+r} Q{x},{y+h} {x},{y+h-r} V{y+r} Q{x},{y} {x+r},{y} Z'
def shield(cx,y,w,h):
    x=cx-w/2
    return f'M{cx},{y} C{cx+w*.28},{y+h*.08} {x+w},{y+h*.1} {x+w},{y+h*.14} V{y+h*.5} C{x+w},{y+h*.78} {cx+w*.2},{y+h*.93} {cx},{y+h} C{cx-w*.2},{y+h*.93} {x},{y+h*.78} {x},{y+h*.5} V{y+h*.14} C{x},{y+h*.1} {cx-w*.28},{y+h*.08} {cx},{y} Z'

# back: lista de (path, color) ; color puede ser BLUE, CYAN, 'url(#gr)' o 'handle' (trazo grueso azul, ej. mango de lupa)
ICONS=[
 dict(id='factura',name='factura',back=[(rr(150,70,170,215,26),BLUE)],front=rr(95,115,175,225,28),
  glyph=''.join(f'<rect x="130" y="{y}" width="{w}" height="16" rx="8" fill="#fff"/>' for y,w in [(170,105),(205,80),(240,95)])
   +'<circle cx="235" cy="300" r="26" fill="#fff"/><path d="M222 300 l9 9 l17 -19" stroke="#1790EC" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'),
 dict(id='soporte-chat',name='soporte',back=[(bubble(160,90,190,145,40,'right'),BLUE)],front=bubble(55,150,200,145,40,'left'),
  glyph=''.join(f'<circle cx="{x}" cy="222" r="17" fill="#fff"/>' for x in (110,155,200))),
 dict(id='declaracion-lista',name='declaración lista',back=[(circ(250,150,90),CYAN)],front=shield(180,95,210,245),
  glyph='<path d="M132 220 l32 32 l62 -68" stroke="#fff" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'),
 dict(id='porcentaje-isr',name='ISR / IVA',back=[(circ(245,150,95),'url(#gr)')],front=rr(80,140,200,200,48),
  glyph='<text x="180" y="282" text-anchor="middle" font-size="130" fill="#fff" style="'+F+'">%</text>'),
]

def icon_svg(ic, mode='light', size=1024):
    i=ic['id']; backs=''
    for p,c in ic['back']:
        backs += (f'<path d="{p}" stroke="{BLUE}" stroke-width="34" stroke-linecap="round"/>' if c=='handle' else f'<path d="{p}" fill="{c}"/>')
    fr=ic['front']; L=(mode=='light')
    glass='rgba(255,255,255,0.46)' if L else 'rgba(40,40,44,0.55)'
    stroke='rgba(255,255,255,0.75)' if L else 'rgba(255,255,255,0.28)'
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="{size}" height="{size}"><defs>
<linearGradient id="gr" x1="0" x2="1"><stop offset="0" stop-color="#5DE0E6"/><stop offset="1" stop-color="#004AAD"/></linearGradient>
<linearGradient id="hl-{i}" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="{.45 if L else .14}"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></linearGradient>
<clipPath id="c-{i}"><path d="{fr}"/></clipPath>
<filter id="b-{i}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="26"/></filter>
<filter id="s-{i}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="16"/></filter>
<filter id="n-{i}"><feTurbulence type="fractalNoise" baseFrequency="1.2" seed="3"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .06 0"/></filter></defs>
<g opacity="{.18 if L else .5}" filter="url(#s-{i})" transform="translate(6,18)"><path d="{fr}" fill="#0b2a55"/>{backs.replace('url(#gr)','#0b2a55')}</g>
{backs}
<g clip-path="url(#c-{i})"><g filter="url(#b-{i})">{backs}</g><path d="{fr}" fill="{glass}"/><path d="{fr}" fill="url(#hl-{i})"/><rect width="400" height="400" filter="url(#n-{i})"/></g>
<path d="{fr}" fill="none" stroke="{stroke}" stroke-width="2"/>{ic['glyph']}</svg>'''
```

**Render a PNG sin fondo** (Playwright + Chromium ya instalados):

```python
from playwright.sync_api import sync_playwright
with sync_playwright() as pw:
    b=pw.chromium.launch(args=['--no-sandbox']); q=b.new_page(viewport={'width':1024,'height':1024})
    for ic in ICONS:
        for m in ('light','dark'):
            svg=f'out/heru-icono-{ic["id"]}-{m}.svg'; open(svg,'w').write(icon_svg(ic,m))
            q.goto('file://'+os.path.abspath(svg)); q.wait_for_timeout(150)
            q.screenshot(path=svg.replace('.svg','.png'), omit_background=True)
```

**Lámina 1080×1350** (HTML → screenshot): título arriba-izq en Helvetica 30 px ("Íconos: impuestos"), paginación arriba-der ("1 / 2"), grid 2×2 desde y=195 con íconos de 400 px y etiqueta en minúscula 24 px debajo (margin-top -18px, opacidad .75), abajo: logo (azul en claro, blanco en oscuro, 120 px) · "x" · "íconos heru". En oscuro el texto va en cian `#15D1FE`.

## 5. Consejos de construcción

- El back debe asomar por arriba/derecha del front al menos ~30% para que se vea el color sin vidrio.
- El glyph se centra en el front, no en el lienzo.
- Revisar siempre el render: que el glyph no se corte, que el vidrio deje ver el color difuminado y que en claro no se vea gris sucio.
- Entrega: láminas (claro + oscuro) + zip con PNG 1024 sin fondo y SVG. Avisar que en Figma/Illustrator el blur del SVG puede verse distinto; para Canva y redes usar PNG.
- Canva no permite descargar sus imágenes desde aquí: los íconos se generan con este código, no desde Canva.