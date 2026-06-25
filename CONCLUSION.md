# CONCLUSIÓN - DESAFÍOS CLIENTE-SERVIDOR

## Desafíos Encontrados

### 1. Conectividad Remota a MongoDB Atlas
**Problema:** Conectarse desde la línea de comandos a un servidor en la nube.
**Solución:** Configurar Network Access en MongoDB Atlas (0.0.0.0/0).
**Aprendizaje:** La seguridad y conectividad son trade-offs importantes.

### 2. Autenticación y Credenciales
**Problema:** Pasar credenciales de forma segura en el script.
**Solución:** Usar variables de entorno (no hardcodear en el código).
**Aprendizaje:** Nunca guardar contraseñas en repositorios públicos.

### 3. Rutas Relativas vs Absolutas
**Problema:** Que el script funcione desde cualquier computadora.
**Solución:** Usar rutas relativas (resguardos_tpi/) en lugar de absolutas.
**Aprendizaje:** La portabilidad es crítica para scripts reutilizables.

### 4. Disponibilidad de Herramientas
**Problema:** mongodump no estaba instalado en el PATH de Windows.
**Solución:** Descargar, extraer e instalar en PATH permanentemente.
**Aprendizaje:** Las dependencias del sistema operativo importan.

---

## Reflexión General

La comunicación Cliente-Servidor en este proyecto involucró:

**Cliente:** nuestra aplicación + script de backup
**Servidor:** MongoDB Atlas en la nube

Aprendimos que:
- La latencia importa (conexión remota tarda microsegundos)
- La autenticación es fundamental para proteger datos
- Los backups no son "set and forget" - requieren monitoreo
- La recuperación ante desastres necesita planificación y pruebas

---

## Para Producción

En un entorno real, necesitaríamos:
- ✅ Automatización de backups (Task Scheduler en Windows)
- ✅ Múltiples copias geográficas
- ✅ Monitoreo constante y alertas
- ✅ Pruebas de restauración regulares
- ✅ Documentación de procedimientos
- ✅ Plan de recuperación ante desastres (Disaster Recovery Plan)

---

## Conclusión Final

Este Bloque 2 nos permitió entender la importancia de los backups en un sistema real, 
los desafíos de trabajar con bases de datos en la nube, y cómo automatizar tareas 
críticas para la continuidad del negocio.