# Guía Maestra de Imágenes del Sitio Web CEPRUNSA

Especificaciones técnicas y catálogo exhaustivo de todas las imágenes del sitio web institucional de CEPRUNSA: rutas físicas y lógicas, proporciones (aspect ratio), dimensiones recomendadas, formatos y lineamientos visuales.

---

## 1. Elementos Globales y de Marca (Header, Footer y UI)

| Sección / Elemento | Elemento / Imagen | Ruta actual | Proporción | Dimensión recomendada | Formato | Notas técnicas y encuadre |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Cabecera & Footer (Dark)** | Logo CEPRUNSA Blanco | `/images/global/logo-ceprunsa-white.png` | ~4.5:1 | 450 × 100 px (SVG o PNG transparente) | PNG / WebP | Renderizado a `h-9` a `h-10` en Header y Footer. Fondo 100% transparente. |
| **Fondos Claros / Impresos** | Logo CEPRUNSA Color | `/images/global/logo-ceprunsa.png` | ~4.5:1 | 450 × 100 px | PNG / WebP | Versión oficial a todo color con escudo granate y dorado. |
| **Navegador (Favicon)** | Ícono de pestaña web | `/ceprunsa_ico.ico` | 1:1 | 64 × 64 px / 32 × 32 px | ICO / PNG | Ícono distintivo en pestañas y marcadores del navegador. |
| **Pie de Página (Footer)** | Libro de Reclamaciones | `/images/global/libro-reclamaciones.png` | ~2.5:1 | 240 × 100 px | PNG / WebP | Enlace legal ubicado en el pie de página. |
| **Marca ConóceT (Global)** | Insignia Google Play Store | `/images/global/google-play-badge.svg` | ~3.4:1 | 200 × 60 px | SVG | Vector original de Google Play. |
| **Marca ConóceT (Global)** | Logo Oficial App ConóceT | `/images/global/conocet-app-logo.png` | 1:1 | 512 × 512 px | PNG | Ícono con esquinas transparentes o bordes redondeados. |
| **Marca ConóceT (Global)** | Código QR Descarga App | `/images/global/conocet-qr.png` | 1:1 | 500 × 500 px | PNG | Alto contraste para escaneo óptico veloz en smartphones. |

---

## 2. Página de Inicio (`/`)

### A. Ventana Emergente Publicitaria (Pop-up Flyer Modal)
*Aparece automáticamente al cargar la página de inicio para anunciar el proceso o convocatoria activa.*

| Elemento / Imagen | Ruta actual | Proporción | Dimensión recomendada | Formato | Notas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Flyer Emergente (Pop-up)** | `/images/procesos/flyer/ceprunsa-segunda-fase-flyer.jpg` | 3:4 o 4:5 (Vertical) | 900 × 1200 px (o 1080 × 1350 px) | WebP / JPG | Afiche vertical con fechas, carreras y llamado a la acción. Mantener peso < 350 KB. |

---

### B. Carrusel Principal (Hero Header)
*Las imágenes ocupan hasta el 92% de la pantalla (`h-[600px]` en móviles hasta `92vh` en monitores desktop).*

| Sección | Elemento / Imagen | Ruta actual | Proporción | Dimensión recomendada | Formato | Notas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Carrusel Hero (Slide 1)** | Estudiantes UNSA en equipo | `/images/home/ceprunsa-estudiantes-demo.jpg` | 16:9 | 1920 × 1080 px | WebP / JPG | Fotografía de alta energía; sujeto centrado o a la derecha (el texto va a la izquierda). |
| **Carrusel Hero (Slide 2)** | Panorámica Campus Arequipa | `/images/home/home_image.jpeg` | 16:9 | 1920 × 1080 px | WebP / JPG | Paisaje amplio, arquitectura universitaria o áreas verdes del campus. |
| **Carrusel Hero (Slide 3)** | Sede / Local Central CEPRUNSA | `/images/home/ceprunsa_local.jpeg` | 16:9 | 1920 × 1080 px | WebP / JPG | Fachada frontal o instalaciones académicas representativas. |
| **Carrusel Hero (Slide 4)** | Afiche Ciclo Quintos / Convocatoria | `/images/procesos/ceprunsa_ciclo_quintos.png` | 16:9 | 1920 × 1080 px | WebP / JPG | Fondo fotográfico/gráfico para el contador de cuenta regresiva. |

---

### C. Sección "¿Cómo ingresar a la UNSA?" (Tarjetas de Perfiles)

| Sección | Elemento / Imagen | Ruta actual | Proporción | Dimensión recomendada | Formato | Notas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Tarjeta 1** | ¿Estás en quinto de secundaria? | `/images/procesos/ceprunsa_ciclo_quintos.png` | 4:3 o 1:1 | 900 × 700 px | WebP / JPG | Altura de tarjeta: 288–384 px. Personajes y texto clave bien centrados. |
| **Tarjeta 2** | ¿Terminaste el colegio? | `/images/home/ceprunsa-estudiantes-demo.jpg` | 4:3 o 1:1 | 900 × 700 px | WebP / JPG | Jóvenes postulantes o ambiente universitario dinámico. |

---

### D. Sección Testimonios (Ingresantes Destacados)

| Sección | Elemento / Imagen | Ruta actual | Proporción | Dimensión recomendada | Formato | Notas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Testimonio 1** | Ingresante Ana Quispe (Medicina Humana) | `/images/home/student_ana.jpg` | 1:1 o 4:5 | 600 × 600 px | JPG / WebP | Tarjeta con arco curvado. El rostro debe estar situado en el tercio superior. |
| **Testimonio 2** | Ingresante Carlos Mendoza (Ing. Civil) | `/images/home/student_carlos.jpg` | 1:1 o 4:5 | 600 × 600 px | JPG / WebP | Retrato nítido, iluminación balanceada y fondo limpio o de facultad. |
| **Testimonio 3** | Ingresante María González (Derecho) | `/images/home/student_maria.jpg` | 1:1 o 4:5 | 600 × 600 px | JPG / WebP | Retrato en primer plano centrado. |

---

## 3. Página Nosotros (`/nosotros`) y Subpáginas

### A. Página Principal de Nosotros (`/nosotros`)

| Sección | Elemento / Imagen | Ruta actual | Proporción | Dimensión recomendada | Formato | Notas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Portada Hero** | Fachada Campus CEPRUNSA | `/images/nosotros/ceprunsa-local.jpg` | 21:9 o 16:9 | 1920 × 800 px | WebP / JPG | Banner ancho superior (60vh en desktop). Con capa de oscurecimiento gradual. |
| **Nuestra Historia** | Instalaciones y tradición CEPRUNSA | `/images/nosotros/ceprunsa-local.jpg` | 16:9 | 1200 × 675 px | WebP / JPG | Tarjeta fotográfica junto al texto de reseña histórica (400 px alto). |
| **Tarjeta Conoce Más 1** | Nuestra Misión y Visión | `/images/nosotros/mision-vision.jpg` | 4:3 o 3:4 | 800 × 600 px | WebP / JPG | Tarjeta vertical navegable (`h-72` a `h-96`) con gradiente inferior. |
| **Tarjeta Conoce Más 2** | Certificación ISO 9001:2015 | `/images/nosotros/iso-9001.jpg` | 4:3 o 3:4 | 800 × 600 px | WebP / JPG | Representación de estándares y gestión de calidad. |
| **Tarjeta Conoce Más 3** | Nuestra Metodología | `/images/nosotros/metodologia.jpg` | 4:3 o 3:4 | 800 × 600 px | WebP / JPG | Clases, docencia activa y talleres pedagógicos. |
| **Autoridad 1** | Mg. Arnaldo H. Valdivia Loaiza (Presidente) | `/images/nosotros/DR-ARNALDO.jpg` | 1:1 (cuadrada) | 600 × 600 px | JPG / WebP | Círculo de 240 × 240 px. Encuadre formal centrado de busto/rostro. |
| **Autoridad 2** | Dra. María Elena Rojas Zegarra (Dir. Académica) | `/images/nosotros/DRA-MARIA-ELENA-2.jpg` | 1:1 (cuadrada) | 600 × 600 px | JPG / WebP | Fotografía institucional formal centrada. |
| **Autoridad 3** | Mg. José Miguel Rojas Hualpa (Dir. Administrativo) | `/images/nosotros/DR-JOSE.jpg` | 1:1 (cuadrada) | 600 × 600 px | JPG / WebP | Fotografía institucional formal centrada. |

---

### B. Subpáginas Institucionales

| Subpágina | Sección | Ruta actual | Proporción | Dimensión recomendada | Formato | Notas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`/nosotros/mision-vision`** | Hero Banner Misión y Visión | `/images/nosotros/mision-vision.jpg` | ~2.5:1 | 1920 × 700 px | WebP / JPG | Cabecera panorámica con gradiente oscuro para contraste de títulos. |
| **`/nosotros/iso-9001`** | Hero Banner Calidad ISO 9001 | `/images/nosotros/iso-9001.jpg` | ~2.5:1 | 1920 × 700 px | WebP / JPG | Ambiente de auditoría, calidad universitaria o procesos académicos. |
| **`/nosotros/metodologia`** | Hero Banner Metodología | `/images/nosotros/metodologia.jpg` | ~2.5:1 | 1920 × 700 px | WebP / JPG | Aulas universitarias modernas, laboratorios o dinámicas grupales. |

---

## 4. Página Procesos de Admisión (`/procesos`)

| Sección | Elemento / Imagen | Ruta actual | Proporción | Dimensión recomendada | Formato | Notas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Catálogo: Tarjeta 1** | Afiche CEPRUNSA I Fase | `/images/procesos/ceprunsa_i_fase.jpg` | 16:9 o 2:1 | 1200 × 600 px | WebP / JPG | Cabecera de tarjeta (`h-64` a `h-72`). Títulos y logos centrados. |
| **Catálogo: Tarjeta 2** | Afiche CEPRUNSA Ciclo Quintos | `/images/procesos/ceprunsa_ciclo_quintos.png` | 16:9 o 2:1 | 1200 × 600 px | WebP / JPG | Cabecera de tarjeta con gráfica publicitaria del ciclo quintos. |
| **Catálogo: Tarjeta 3** | Afiche CEPRUNSA II Fase | `/images/procesos/ceprunsa_ii_fase.jpg` | 16:9 o 2:1 | 1200 × 600 px | WebP / JPG | Cabecera de tarjeta de admisión II Fase. |
| **Catálogo: Tarjeta 4** | Afiche Proceso Extraordinario | `/images/procesos/proceso_extraordinario.jpg` | 16:9 o 2:1 | 1200 × 600 px | WebP / JPG | Cabecera de tarjeta de modalidades extraordinarias. |
| **Detalle de Proceso** | Banner del proceso seleccionado | *Misma imagen del proceso activo* | 2.5:1 | 1600 × 650 px | WebP / JPG | Se renderiza en `h-80` a `h-96` al ingresar a `/procesos/:id`. |
| **Sidebar Lateral** | Miniatura estudiante ("Asegura tu ingreso") | `/images/home/ceprunsa-estudiantes-demo.jpg` | 1:1 (cuadrada) | 300 × 300 px | JPG / WebP | Círculo decorativo de 128 × 128 px en la columna lateral de ayuda. |
| **Material Promocional** | Volante Digital II Fase | `/images/procesos/flyer/ceprunsa-segunda-fase-flyer.jpg` | 3:4 | 900 × 1200 px | WebP / JPG | Volante para difusión y modal informativo. |

---

## 5. Página Carreras Profesionales (`/carreras`)

### A. Elementos Flotantes de la App ConóceT

| Sección | Elemento / Imagen | Ruta actual | Proporción | Dimensión recomendada | Formato | Notas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Tarjeta Vocacional ConóceT** | Ícono de la App Móvil | `/images/global/conocet-app-logo.png` | 1:1 | 512 × 512 px | PNG | Se muestra en un recuadro de 144 × 144 px con bordes redondeados y sombra. |
| **Tarjeta Vocacional ConóceT** | Código QR de Descarga | `/images/global/conocet-qr.png` | 1:1 | 500 × 500 px | PNG / JPG | QR nítido para escaneo directo a Google Play Store. |

---

### B. Catálogo Exhaustivo de Escuelas Profesionales (47 Carreras UNSA)
*Cada tarjeta en `/carreras` tiene un contenedor de imagen de altura fija (`h-48`, ~192 px de alto). Las imágenes se muestran en proporción panorámica de ~3:1 (o 16:9 con `object-cover`).*

#### Área 1: Biomédicas (6 Carreras)

| Escuela Profesional | Facultad | Ruta actual del archivo | Dimensión recomendada | Formato |
| :--- | :--- | :--- | :--- | :--- |
| **Ingeniería Agronómica** | Agronomía | `/images/carreras/agronomia-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Biología** | Ciencias Biológicas | `/images/carreras/Biologia-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ciencias de la Nutrición** | Ciencias Biológicas | `/images/carreras/nutricion-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ingeniería Pesquera** | Ciencias Biológicas | `/images/carreras/pesq-2-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Enfermería** | Enfermería | `/images/carreras/ENFERMERIA-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Medicina** | Medicina | `/images/carreras/medicos1-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |

#### Área 2: Ingenierías (18 Carreras)

| Escuela Profesional | Facultad | Ruta actual del archivo | Dimensión recomendada | Formato |
| :--- | :--- | :--- | :--- | :--- |
| **Arquitectura** | Arquitectura y Urbanismo | `/images/carreras/arquitectura-fotomontaje-e1491420715381-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Física** | Ciencias Naturales | `/images/carreras/fisica-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Matemáticas** | Ciencias Naturales | `/images/carreras/IMG_1242-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Química** | Ciencias Naturales | `/images/carreras/quimica-2-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ingeniería Geofísica** | Geología, Geofísica y Minas | `/images/carreras/geofisico-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ingeniería Geológica** | Geología, Geofísica y Minas | `/images/carreras/geologia-33-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ingeniería de Minas** | Geología, Geofísica y Minas | `/images/carreras/mineria-2-e1491418850816-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ingeniería Civil** | Ingeniería Civil | `/images/carreras/civil-1-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ingeniería Sanitaria** | Ingeniería Civil | `/images/carreras/sanitaria-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ingeniería Metalúrgica** | Ingeniería de Procesos | `/images/carreras/Ingenieria-Metalurgica-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ingeniería Química** | Ingeniería de Procesos | `/images/carreras/IMG_0761-e1491228964170-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ing. de Industrias Alimentarias** | Ingeniería de Procesos | `/images/carreras/alimentarias-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ingeniería de Materiales** | Ingeniería de Procesos | `/images/carreras/Laboratorio-5-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ingeniería Ambiental** | Ingeniería de Procesos | `/images/carreras/MG_1947-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ingeniería Electrónica** | Producción y Servicios | `/images/carreras/electrica-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ingeniería Industrial** | Producción y Servicios | `/images/carreras/10-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ingeniería de Sistemas** | Producción y Servicios | `/images/carreras/internet.espacio-700x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ingeniería Eléctrica** | Producción y Servicios | `/images/carreras/electrica-4-1-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ingeniería Mecánica** | Producción y Servicios | `/images/carreras/depositphotos_9214449-stock-photo-mechanical-engineering-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ciencia de la Computación** | Producción y Servicios | `/images/carreras/sistemas-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ing. de Telecomunicaciones** | Producción y Servicios | `/images/carreras/informatica-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |

#### Área 3: Ciencias Sociales (23 Carreras)

| Escuela Profesional | Facultad | Ruta actual del archivo | Dimensión recomendada | Formato |
| :--- | :--- | :--- | :--- | :--- |
| **Administración** | Administración | `/images/carreras/Administracion-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Marketing** | Administración | `/images/carreras/IMG_6291-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Banca y Seguros** | Administración | `/images/carreras/banca-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Gestión** | Administración | `/images/carreras/FOTO-DE-PORTADA-e1490879972454-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Educación** | Ciencias de la Educación | `/images/carreras/educacion-e1490978225145-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Contabilidad** | Ciencias Contables y Financieras | `/images/carreras/Portada-contabilidad-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Finanzas** | Ciencias Contables y Financieras | `/images/carreras/historicos-sociales-12alumnos-12-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Historia** | Ciencias Histórico Sociales | `/images/carreras/historia.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Sociología** | Ciencias Histórico Sociales | `/images/carreras/historicos-socialesalumnos_1-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Trabajo Social** | Ciencias Histórico Sociales | `/images/carreras/SAM_3217-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Antropología** | Ciencias Histórico Sociales | `/images/carreras/P1010657-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Turismo y Hotelería** | Ciencias Histórico Sociales | `/images/carreras/festi-gastro-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Derecho** | Derecho | `/images/carreras/FOTO-DE-PORTADA-1-e1490884493668-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Economía** | Economía | `/images/carreras/areas-comunes-22alumnos-22-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Artes** | Filosofía y Humanidades | `/images/carreras/IMG_1092-e1490982474683-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Filosofía** | Filosofía y Humanidades | `/images/carreras/filosofia-800x260.png` | 900 × 300 px (o 800 × 260) | WebP / PNG |
| **Literatura y Lingüística** | Filosofía y Humanidades | `/images/carreras/literatura-555-e1490978393193-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Psicología** | Psicología, Relac. Ind. y Com. | `/images/carreras/2-e1490974395794-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Relaciones Industriales** | Psicología, Relac. Ind. y Com. | `/images/carreras/WhatsApp-Image-2023-10-08-at-14.17.01-800x260.jpeg` | 900 × 300 px (o 800 × 260) | WebP / JPG |
| **Ciencias de la Comunicación** | Psicología, Relac. Ind. y Com. | `/images/carreras/areas-comunes-21alumnos-21-e1490974641731-800x260.jpg` | 900 × 300 px (o 800 × 260) | WebP / JPG |

---

## 6. Zona del Postulante / Guías de Usuario (`/zona-postulante/*`)

*Cada una de estas subpáginas cuenta con un encabezado panorámico superior de alto impacto visual (hasta `50vh` en desktop).*

| Guía / Página | Elemento / Imagen | Ruta actual | Proporción | Dimensión recomendada | Formato | Notas técnicas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Acceso a Clases** (`/zona-postulante/clases`) | Header Banner Acceso a Clases | `/images/guias/acceso-clases-header.png` | ~2.5:1 | 1920 × 750 px | WebP / PNG | Estudiante frente a laptop/plataforma virtual; zona derecha libre para texto. |
| **Pago de Cuotas** (`/zona-postulante/pago`) | Header Banner Guía de Pagos BCP | `/images/guias/pago-cuotas-header.png` | ~2.5:1 | 1920 × 750 px | WebP / PNG | Banca digital BCP, cajero o comprobante de pago web. |
| **Documentos Oficiales** (`/zona-postulante/documentos`) | Header Banner Documentos y Vacantes | `/images/guias/documentos-oficiales-header.png` | ~2.5:1 | 1920 × 750 px | WebP / PNG | Carpetas, reglamentos, vacantes y material oficial institucional. |
| **Consultorio Psicológico** (`/zona-postulante/psicologia`) | Header Banner Soporte Emocional | `/images/guias/consultorio-psicologico-header.png` | ~2.5:1 | 1920 × 750 px | WebP / PNG | Sesión de orientación psicológica, empatía y acompañamiento profesional. |

---

## 7. Página de Contacto (`/contacto`)

| Sección | Elemento / Imagen | Ruta actual | Proporción | Dimensión recomendada | Formato | Notas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Ubicación / Google Maps** | Fotografía Sede CEPRUNSA | `/images/home/ceprunsa_local.jpeg` | 16:9 o 2:1 | 900 × 450 px | WebP / JPG | Tarjeta interactiva (`h-64` a `h-72`) con degradado oscuro inferior que enlaza con Google Maps. |

---

## 8. Panel de Administración y Supabase Storage (`/admin`)

El sitio web cuenta con un sistema de override dinámico en Supabase:
- **Bucket en Supabase Storage:** `ceprunsa-assets`
- **Mapeo:** Cada imagen que se sube al panel de control reemplaza en tiempo real la ruta estática correspondiente mediante el hook `getImageUrl(path)`.
- Si se reemplaza una imagen de carrera o banner, no requiere recompilar el código; la URL pública de Supabase tomará precedencia inmediata con caché busting.

---

## 9. Resumen Rápido de Plantillas Estándar de Producción

Para agilizar el flujo de diseño y preparación de recursos gráficos por lotes, utilizar las siguientes **5 plantillas base**:

| Tipo de Recurso | Dimensiones sugeridas | Ratio | Peso Máx. Sugerido | Uso principal |
| :--- | :--- | :--- | :--- | :--- |
| **1. Banners Hero y Cabeceras Panorámicas** | **1920 × 1080 px** o **1920 × 750 px** | 16:9 o 2.5:1 | < 250 KB (WebP) | Carrusel Inicio, Nosotros, Guías del Postulante, Detalle de Proceso. |
| **2. Tarjetas de Procesos y Convocatorias** | **1200 × 600 px** | 2:1 | < 180 KB (WebP) | Portadas de tarjetas en `/procesos` y cards en Inicio. |
| **3. Portadas de Escuelas Profesionales** | **900 × 300 px** (o **800 × 260 px**) | 3:1 | < 90 KB (WebP) | Catálogo de las 47 carreras en `/carreras`. |
| **4. Retratos Cuadrados (Autoridades / Testimonios)** | **600 × 600 px** | 1:1 | < 80 KB (WebP/JPG) | Directivos institucionales, testimonios de ingresantes, íconos de apps. |
| **5. Afiches / Flyers Verticales (Pop-up)** | **900 × 1200 px** (o **1080 × 1350 px**) | 3:4 o 4:5 | < 300 KB (WebP/JPG) | Modal emergente publicitario al ingresar a la web. |
