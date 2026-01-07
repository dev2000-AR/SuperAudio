# Log de Errores de Construcción (Vercel Build Errors)

Este documento registra los obstáculos técnicos encontrados durante el despliegue en Vercel, sus causas y las soluciones aplicadas.

---

## 1. Valor de CSS Inválido (`writingMode`)

- **Archivo(s)**: 
    - `apps/web/components/AudioPlayer/EQ13Bandas.tsx`
    - `apps/web/components/EQ13Bandas.tsx`
- **Error**: `Type error: Type '"bt-lr"' is not assignable to type 'WritingMode | undefined'.`
- **Código Erróneo**:
    ```tsx
    <input
      type="range"
      // ...
      style={{ writingMode: 'bt-lr' }}
    />
    ```
- **Causa**: `'bt-lr'` no es un valor estándar de la propiedad CSS `writing-mode`. TypeScript lo rechaza al no estar en las definiciones de tipos de React.
- **Solución**: Se cambió por el valor estándar `'vertical-lr'`.

---

## 2. Propiedades Inválidas en componente `<Link>`

- **Archivo**: `apps/web/components/AudioPlayer/FullScreenPlayer.tsx`
- **Error**: `Type error: Type 'Element' is not assignable to type 'ReactNode'.` (Conflicto de tipos por props no soportadas).
- **Código Erróneo**:
    ```tsx
    <Link
      href={activeSong.src + `?filename=${activeSong.src}.mp3`}
      download={`${activeSong.id}.mp3`}
      target="_blank"
    >
      <i className="icon-download ..."></i>
    </Link>
    ```
- **Causa**: El componente `<Link>` de Next.js (v12+) no soporta los atributos `download` ni `target`. Estos deben usarse en una etiqueta `<a>` tradicional.
- **Solución**: Se reemplazó el `<Link>` por una etiqueta `<a>` estándar con `rel="noreferrer"`.

---

## 3. Conflicto de Tipos con `styled-jsx`

- **Archivo**: `apps/web/components/GenreBanner.tsx`
- **Error**: `Property 'jsx' does not exist on type 'DetailedHTMLProps<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>'.`
- **Código Erróneo**:
    ```tsx
    <style jsx global>{`
      @keyframes floating { ... }
    `}</style>
    ```
- **Causa**: TypeScript no reconoce el atributo `jsx` inyectado por la librería `styled-jsx` en la etiqueta de estilo nativa de React, bloqueando la compilación en modo estricto.
- **Solución**: Se movieron las animaciones de CSS al archivo global `apps/web/styles/globals.css` y se eliminó la etiqueta `<style>` del componente.

---

## 4. Incompatibilidad de Tipos en Componentes JSX (Pendiente)

- **Archivo**: `apps/web/components/HorizontalAlbumList.tsx`
- **Error**: `Type error: 'HorizontalAlbumCard' cannot be used as a JSX component. Type 'Key | null' is not assignable to type 'string | null'.`
- **Código Erróneo**:
    ```tsx
    {album.map((album: Album) => (
      <HorizontalAlbumCard
        key={album.idcre}
        album={album}
        onClick={() => router.push(`/album/${album.idcre}`)}
      />
    ))}
    ```
- **Causa**: TypeScript detecta que el componente `HorizontalAlbumCard` está devolviendo un tipo `Element` que entra en conflicto con las expectativas de React 18, y lanza un error de tipos porque la `key` (que es un `number`) no coincide exactamente con el tipo `string` esperado en este contexto estricto.
- **Solución**: Convertir la `key` a `string` explícitamente usando `.toString()` y definir el tipo de retorno del componente como `JSX.Element`.
- **Estado**: Corregido (Commit `465d79a`).

---

## 5. Persistencia de Error de Tipos en JSX (Conflictos de Versión)

- **Archivo**: `apps/web/components/HorizontalAlbumList.tsx`
- **Error**: `'HorizontalAlbumCard' cannot be used as a JSX component. Its return type 'ReactElement<any, any> | null' is not a valid JSX element.`
- **Causa**: Un conflicto interno entre versiones de `@types/react` en el entorno de Vercel hace que TypeScript no reconozca los componentes funcionales estándar como válidos si el tipo de retorno no coincide exactamente con la versión global de React. Es un error común en monorepos con dependencias duplicadas.
- **Solución**: Refactorizar el componente a una forma más simple y, si persiste, forzar el tipo en el punto de uso para saltar la validación estricta que bloquea el build.
- **Estado**: En proceso.
