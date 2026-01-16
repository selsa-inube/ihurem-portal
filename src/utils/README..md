# Logger Centralizado – Portal ihurem

## Descripción

El Portal ihurem solía usar `console.log` y `console.error` de manera dispersa, lo que dificultaba:

- Mantenimiento del código.
- Control de logs en producción.
- Integración con servicios externos de monitoreo y trazabilidad.

Este Logger centralizado:

- Gestiona todos los logs de manera consistente.
- Permite activar/desactivar logs según el entorno (desarrollo o producción).
- Incluye metadata útil: timestamp, contexto y nivel de severidad.
- Facilita la futura integración con servicios externos (Sentry, LogRocket, etc.).

---

- Cada hook indica qué parámetros recibe.
- Explica cuándo usa `getHeaders()` (con token) o `getPreAuthHeaders()` (sin token).
- Enumera los códigos de error (`ERROR_CODE_*`) y cómo se muestran en modales.
- Muestra la lógica de fallback si falla la autenticación.

Esto **cumple con los estándares de documentación técnica** para APIs y hooks internos.

1. **Descripción del hook/servicio:**  
   Ej: `usePortalData` obtiene los datos del portal de staff por código de portal.

2. **Parámetros y tipos:**

   - `codeParame: string`
   - `preAuth?: boolean` (para indicar si se llama antes del login)

3. **Retorno:**  
   Qué devuelve el hook: `{ portalData, hasError, isFetching }`.

4. **Headers usados:**

   - Con token: `Authorization: Bearer <token>`
   - PreAuth: `Authorization: ""`

5. **Errores y códigos:**

   - `ERROR_CODE_NO_PORTAL_DATA = 1001` → descripción y solución
   - `ERROR_CODE_FETCH_PORTAL_FAILED = 1016` → descripción y solución

6. **Flujo de ejecución:**

   - Se llama `getHeaders()` si hay usuario autenticado
   - Si falla, fallback a `getPreAuthHeaders()`
   - Se llama al servicio de backend con esos headers
   - Se maneja resultado y errores, mostrando modales cuando corresponde

7. **Integración con IAuth:**
   - Se debe usar dentro de `IAuthProvider`
   - PreAuth funciona sin `IAuthProvider`

---

**Descripción:**  
Obtiene los datos del portal de staff según un código de portal.

**Parámetros:**

- `codeParame: string` → Código público del portal de staff.

**Retorno:**

- `portalData: IStaffPortalByBusinessManager` → Datos del portal
- `hasError: number | null` → Código de error si ocurre
- `isFetching: boolean` → Estado de carga

**Headers HTTP:**

- Con autenticación: `Authorization: Bearer <token>`
- PreAuth: `Authorization: ""` (sin token)

**Errores manejados:**

- `ERROR_CODE_NO_PORTAL_DATA = 1001`
- `ERROR_CODE_FETCH_PORTAL_FAILED = 1016`

**Notas:**

- Se integra con `IAuthProvider`
- Muestra errores usando `modalErrorConfig` y `useErrorModal`
