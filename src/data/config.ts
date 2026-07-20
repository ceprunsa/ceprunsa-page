/**
 * Configuración global del sitio web de CEPRUNSA
 * Permite controlar estados, números de contacto y visualizaciones desde un solo lugar.
 */
export const siteConfig = {
  // CONFIGURACIÓN DE PROCESOS DE ADMISIÓN
  // Define cuál de los procesos académicos se resalta como "Próximo a Iniciar" / "Recomendado".
  // Valores disponibles:
  // 1 - "CEPRUNSA I Fase"
  // 2 - "CEPRUNSA Ciclo Quintos"
  // 3 - "CEPRUNSA II Fase"
  // 4 - "Proceso Extraordinario"
  nextProcessToStart: 2,

  // CONFIGURACIÓN DEL CONSULTORIO PSICOLÓGICO
  // Define si el botón para reservar cita por WhatsApp está habilitado (true) o inhabilitado (false)
  whatsappBookingEnabled: true,

  // NÚMEROS DE CONTACTO (Sin espacios ni caracteres especiales para los enlaces wa.me/tel)
  // Formato visual y link se generan automáticamente
  whatsappNumber: "908892331",        // WhatsApp de atención al cliente principal
  whatsappPsychologyNumber: "908892326",  // WhatsApp del Consultorio Psicológico
  phoneNumber: "054-391911",           // Teléfono de la oficina
  phoneAnnex: "1422",                  // Anexo telefónico

  // CORREOS ELECTRÓNICOS
  emailInstitutional: "ceprunsa@unsa.edu.pe",
  emailClientQuery: "atencion.cliente@cepr.unsa.pe",
  emailApplicantQuery: "atencion.postulante@cepr.unsa.pe",
};
