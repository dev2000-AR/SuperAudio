# Registro de Errores de Build - SuperAudio

Este documento detalla los obstáculos técnicos resueltos durante la estabilización del deploy en Vercel y las soluciones permanentes aplicadas.

---

## 🟢 Solución Maestra: Conflicto de Versiones de React
El problema principal que causaba errores de tipos en cascada en todo el proyecto era un conflicto entre versiones de `@types/react` en el monorepo.

- **Solución**: Se añadió un campo `resolutions` en el `package.json` de la raíz para forzar versiones unificadas.
- **Configuración**:
  ```json
  "resolutions": {
    "@types/react": "18.0.21",
    "@types/react-dom": "18.0.6"
  }
  ```
- **Resultado**: Se recuperó la seguridad de tipos completa y se eliminaron los parches temporales `as any`.

---

## 🛠️ Correcciones Permanentes en el Código

### 1. CSS No Estándar (`writingMode`)
- **Archivos**: `apps/web/components/AudioPlayer/EQ13Bandas.tsx`, `apps/web/components/EQ13Bandas.tsx`
- **Error**: Valor `'bt-lr'` no reconocido por TypeScript/React.
- **Solución**: Cambiado a `'vertical-lr'`.

### 2. Atributos de Descarga en `<Link>`
- **Archivo**: `apps/web/components/AudioPlayer/FullScreenPlayer.tsx`
- **Error**: Next.js `<Link>` no acepta `download` ni `target`.
- **Solución**: Reemplazado por una etiqueta `<a>` tradicional con `rel="noreferrer"`.

### 3. Conflictos con `styled-jsx`
- **Archivos**: `apps/web/components/GenreBanner.tsx`, `apps/web/components/error.tsx`
- **Error**: El atributo `jsx` en etiquetas `<style>` causaba errores de compilación estrictos.
- **Solución**: Se migró el CSS a `apps/web/styles/globals.css` y se eliminaron las etiquetas `<style>` locales.

### 4. Importaciones de Módulos (Axios)
- **Archivo**: `apps/web/stores/auth/authSlice.ts`
- **Error**: Importe relativo a `node_modules` fallaba en Vercel.
- **Solución**: Cambiado a importe estándar: `import { AxiosError } from "axios"`.

---

## ⚠️ Instrucciones Post-Deploy (Próximos Pasos)

### Restauración de `assetPrefix`
Para optimizar la carga de archivos estáticos una vez que el dominio `superaudio.online` esté apuntando correctamente a Vercel, se debe descomentar la siguiente línea en `apps/web/next.config.js`:

```javascript
// apps/web/next.config.js: L21
// assetPrefix: "https://superaudio.online"
```

> [!IMPORTANT]
> **No descomentar** hasta que el dominio principal esté configurado en el panel de Vercel y propagado, de lo contrario la aplicación perderá los estilos en producción.

---
*Última actualización: 07/01/2026*
