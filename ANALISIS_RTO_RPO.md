# ANÁLISIS RTO/RPO - TECHSTORE

## RTO (Recovery Time Objective)

**Definición:** Tiempo máximo que puede estar la BD fuera de servicio.

**Para nuestro proyecto:**
- Backup con mongodump: ~10 segundos (13 documentos)
- Restauración con mongorestore: ~5 segundos
- **RTO Total: 15 segundos**

**En producción con millones de documentos:**
- Backup: 30-60 minutos
- Restauración: 30-60 minutos
- **RTO: 1-2 horas**

---

## RPO (Recovery Point Objective)

**Definición:** Cantidad máxima de datos que puede perderse.

**Para nuestro proyecto:**
- Backup diario: se puede perder máximo 1 día de datos
- **RPO: 24 horas**

**Mejora propuesta:**
- Backup cada 6 horas → RPO = 6 horas
- Backup en tiempo real → RPO ≈ 0 (ideal)

---

## Estrategia Actual

✅ Backups locales con mongodump
✅ Almacenamiento en carpeta resguardos_tpi con fecha
✅ Automatizable con cron job (Windows Task Scheduler)
❌ No hay replicación geográfica
❌ No hay alertas si el backup falla

---

## Mejoras Futuras

1. Automatizar con Task Scheduler (cada 6 horas)
2. Guardar en cloud (AWS S3, Google Cloud Storage)
3. Replicación en múltiples centros de datos
4. Alertas por email si backup falla
5. Restauración automática en caso de desastre