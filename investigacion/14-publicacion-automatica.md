# 14 · Publicación automática

Se puede publicar solo en las cinco redes con costo cero de software, pero no por una sola vía. El cuello de botella nunca fue la herramienta: es que cada plataforma pone una compuerta de aprobación antes de dejar publicar por API.

**Dónde aterriza esto.** Los gates de cada API son la sección 7 del tab 23 · Plan de ejecución diario, que define qué red se puede automatizar hoy y cuál se publica a mano. Falta la auditoría de YouTube y el Development tier de LinkedIn.

## Qué aprueba cada red

| Red | ¿Se puede publicar público sin revisión de la plataforma? | Qué exige |
| --- | --- | --- |
| Facebook e Instagram | **Sí**, con una condición | App propia en **modo Live** (el toggle, no App Review) + Business verificado + token de System User permanente |
| LinkedIn | Sí, con formulario | Community Management API, Development tier: correo de negocio verificado, organización verificada, sitio y dominio verificados, y app verificada por la página de LinkedIn de la misma organización. LinkedIn no publica plazo de revisión. [App review](https://learn.microsoft.com/en-us/linkedin/marketing/community-management-app-review?view=li-lms-2026-06) |
| YouTube | No | Todo video subido con videos.insert desde un proyecto no verificado creado después del 28 jul 2020 queda en privado. Para quitarlo hay que pasar una auditoría de cumplimiento; Google no publica plazo. [videos.insert](https://developers.google.com/youtube/v3/docs/videos/insert) |
| TikTok | **No** | Sin auditoría, el contenido queda en SELF_ONLY y máximo 5 usuarios pueden publicar en 24 horas. Y su guía de revisión dice literal: "API Clients must not be limited to test applications and should be intended for a wide audience, not limited to internal groups/private use", con "a utility tool to help upload contents to the account(s) you or your team manages" listado como no aceptable. Una app que solo publica en @heru_app es justo lo que rechaza. [Get started](https://developers.tiktok.com/doc/content-posting-api-get-started/) |

**El hallazgo que cambia el presupuesto es Meta.** Meta documenta que "all Business, Consumer, and Gaming apps are automatically approved for Standard Access for all permissions and features", y que Standard Access solo se puede pedir a usuarios con rol en la app; el App Review es para Advanced Access, o sea para pedir permisos a usuarios sin rol. [Access levels](https://developers.facebook.com/docs/graph-api/overview/access-levels/) Lo que sí falta: **la app tiene que estar en modo Live**, porque Meta documenta que "any data generated while an app is in Development mode, such as test posts, can only be seen by role users", y que esos datos se vuelven visibles para todos al pasar a Live. [App modes](https://developers.facebook.com/docs/development/build-and-test/app-modes/) Pasar a Live no es App Review.

Esto no está escrito en una sola frase de Meta, es la composición de dos páginas oficiales. Por eso lo primero que hay que hacer no es escribir código: es pasar la app a Live, publicar un post de prueba por API y abrirlo en una ventana de incógnito sin sesión. Media hora, y confirma o tumba la mitad del plan.

**Trampa de YouTube que casi nadie ve:** si la pantalla de consentimiento OAuth queda en Testing, Google documenta que "authorizations by a test user will expire seven days from the time of consent" y que el refresh token expira con ella, así que el script deja de publicar sin avisar. Como heru tiene Google Workspace, se puede configurar el tipo **Internal**, que limita la autorización a miembros de la organización. [Google Cloud](https://support.google.com/cloud/answer/15549945?hl=en)

**Salida parcial de TikTok:** el scope `video.upload` deja el video en la bandeja de la app y TikTok documenta que "you should inform users that they must click on inbox notifications to continue the editing flow in TikTok and complete the post". Mich publica desde ahí. Semiautomático, no automático. [Content Posting API](https://developers.tiktok.com/doc/content-posting-api-reference-upload-video/)

## La arquitectura a costo cero

Híbrida, con reparto explícito. No hay una sola vía que cubra las cinco.

| Red | Vía | Por qué |
| --- | --- | --- |
| Facebook | Apps Script contra la Graph API, token permanente | Cero aprobaciones, cero expiración, cero terceros. Infraestructura propia |
| Instagram | Apps Script, mismo token | Igual |
| TikTok | Buffer plan gratis | Única forma a costo cero de publicar público. Buffer ya está auditado; heru no entrega tokens, conecta la cuenta por OAuth |
| YouTube | Buffer ahora, Apps Script cuando pase el audit | Buffer publica Shorts automático hoy; el audit propio es gratis y se pide en paralelo |
| LinkedIn | Buffer ahora, Apps Script cuando aprueben | Mismo patrón mientras llega el formulario |

Esto usa exactamente los 3 canales del plan gratis de Buffer y deja Meta en casa.

**Orquestación:** el Google Sheet sigue siendo la base. Un solo disparador horario lee las filas en estado programado con hora cumplida y despacha: si la red es facebook o instagram llama a la Graph API directo; si es tiktok, youtube o linkedin llama a la API de Buffer con su hora de publicación. Un agente deja la fila, el script publica solo, nadie abre una interfaz.

**Límite de Buffer que hay que respetar:** el plan gratis conecta hasta 3 canales y permite 10 posts en cola por canal, recargables, así que el script debe empujar con 3 a 5 días de anticipación, no con un mes. [Buffer](https://buffer.com/pricing)

**Riesgo sin resolver, y es el que puede tumbar la arquitectura:** Buffer retira su API REST legada el 1 de febrero de 2027 y su reemplazo, la GraphQL Public API, está en acceso anticipado con registro. Queda por confirmar si el plan gratis tendrá acceso a esa API. Si no lo tiene, TikTok, YouTube y LinkedIn se quedan sin vía automática. [Buffer](https://buffer.com/resources/legacy-rest-api-retired/)

**Lo frágil, dicho de frente:** TikTok y YouTube dependen de Buffer. Si Buffer cambia su plan gratis o quita la API del tier libre, esas dos redes se caen el mismo día. Meta no, porque es propia.

**El primer peso que valdría la pena, si alguna vez hay presupuesto:** Buffer Essentials cuesta 5 dólares al mes por canal, o 60 dólares al año facturados anualmente. Solo TikTok, la red donde más se publica, son 60 dólares al año. No tiene sentido pagar las cinco: Meta ya sale gratis en casa.

**Lo que no vale la pena:** self-hostear Postiz o Mixpost. Al correr con tu propia app de desarrollador te comes exactamente los mismos audits de YouTube, TikTok y LinkedIn, más el costo permanente de mantener Postgres, Redis y un servidor.

## Dónde viven los archivos

Este es el punto que rompe todo si se ignora, y no es opinión.

**Google Drive no sirve.** Meta exige que la URL apunte directo al archivo crudo: sin redirecciones, sin tokens de autenticación, sin envoltura HTML. Drive siempre redirige y mete tokens. **Apps Script tampoco puede servir los archivos**, porque su servicio de contenido solo soporta texto y además redirige a una URL de un solo uso. Y Buffer tiene el mismo requisito que Meta: necesita una liga pública que siga viva hasta que el post se publique.

O sea que **un solo host de archivos resuelve las dos vías**. Opciones a costo cero, en orden:

1. **Cloudflare R2.** 10 GB-mes de almacenamiento estándar gratis y cero costo de egreso, según [Cloudflare](https://www.cloudflare.com/products/r2/). Se expone con dominio público y da URL directa sin redirecciones. *Queda por confirmar si exige tarjeta para activarse; se comprueba el primer día.*
2. **Repositorio público de GitHub.** Sin tarjeta, URL directa, se sube desde Apps Script. Límites: 1 GB de repo, 100 GB de ancho de banda al mes, 100 MB por archivo. **Zona gris: la política de uso aceptable de GitHub no prohíbe explícitamente el hosting de archivos, pero se reserva el derecho de suspender la cuenta o limitar el file hosting si el consumo de ancho de banda es "significantly excessive". Para un puñado de piezas alcanza, pero no se escala ahí.**
3. **Cloudinary.** Pensado exactamente para esto y maneja video. *Queda por confirmar los límites exactos del plan gratis 2026.*

El flujo: el archivo se sube al host cuando la pieza sale de Canva, la URL se guarda en una columna del Sheet, el script publicador solo pasa esa URL, y un segundo disparador borra el archivo 48 horas después de publicar para no llenar el espacio.

**Detalle que tumba posts si se pasa por alto:** Meta documenta que "JPEG is the only image format supported" para publicar en Instagram, y que el medio debe estar alojado en un servidor públicamente accesible al momento del intento. Hay que cambiar los exports de Canva de PNG a JPG. [Content publishing](https://developers.facebook.com/docs/instagram-platform/content-publishing)

## Pasos de montaje

**Bloque 0 · La verificación que decide todo (30 minutos, va primero)**

1. Abrir la app de Meta que usa el script actual y ver el toggle superior: ¿dice Development o Live?
2. Si dice Development, completar lo que el panel pida y pasar el toggle a **Live**. No mandar nada a App Review.
3. Verificar que el System User tenga asignados la página de Facebook y la cuenta de Instagram con permiso de crear contenido.
4. Regenerar el token del System User marcando **que nunca expire**, con los permisos de publicar en página y en Instagram.
5. **Publicar un post de prueba por API y abrirlo en incógnito, sin sesión.** Si se ve, seguir. Si no se ve, detenerse: Meta cae al plan Buffer y hay que rehacer el reparto.

**Bloque 1 · Host de archivos** (medio día). Crear el bucket, generar credenciales, escribir la función que sube y devuelve la URL, y comprobar con `curl -I` que responde 200 directo sin ningún 301 ni 302 en medio.

**Bloque 2 · Meta directo** (1 día). Token en Propiedades del script, nunca en el código ni en el Sheet. Columnas nuevas en el Sheet: red, tipo, copy, url del archivo, hora de publicación, estado, id del post y error. Facebook publica en un paso; Instagram en dos, creando el contenedor, esperando a que termine de procesar y luego publicando.

**Bloque 3 · Buffer** (medio día). Cuenta gratis, conectar **exactamente 3 canales: TikTok, YouTube y LinkedIn**. No conectar Facebook ni Instagram: quemaría cupo de por vida sin necesidad. Generar la API key y guardarla en Propiedades del script.

**Bloque 4 · El despachador** (2 horas). Una función que lee el Sheet, filtra lo programado con hora cumplida y enruta por la columna de red. Cada llamada envuelta en try/catch: el error se escribe en su columna y dispara un correo. **Un fallo silencioso es peor que no automatizar.**

**Bloque 5 · Los trámites gratis, en paralelo desde el día 1.** Los dos son gratis y los dos tardan semanas, así que se meten ya:

- **YouTube:** poner la pantalla de consentimiento en Internal o publicarla, y mandar el formulario de audit.
- **LinkedIn:** crear la app asociada a la página, pedir que un administrador de la página la verifique, y mandar el formulario del tier de desarrollo con correo de heru, razón social, domicilio y aviso de privacidad.
- **TikTok no se tramita.** Su política prohíbe apps de uso interno. Se queda en Buffer de forma permanente.

Conforme cada uno se apruebe, esa red migra de Buffer a Apps Script directo y libera un canal.

**Aviso con reloj:** LinkedIn documenta que hay que completar la integración y las pruebas dentro de doce meses de recibido el acceso del Development tier. Hay que subir a Standard Tier antes. Vale la pena un recordatorio a los 11 meses, junto con la renovación de tokens. [Increasing access](https://learn.microsoft.com/en-us/linkedin/marketing/increasing-access?view=li-lms-2026-06)
