# Todo-Tracker - Extensión para VSCode

![Banner](images/banner.png) <!-- Si tienes un banner -->

Una extensión agresiva para el seguimiento de TODOs y FIXMEs en tu código, con integración Git para evitar pushes con tareas pendientes.

## ✨ Features

### Panel de Control de TODOs

![Panel de control](images/panel.png) <!-- Ejemplo de ruta de imagen -->

- Listado interactivo de todos los pendientes
- Agrupación por archivo, tipo y prioridad
- Navegación directa al código con un clic

### Integración con Git

![Git Hook](images/git-hook.png)

- Bloqueo de push si hay TODOs pendientes (configurable)
- Advertencias al guardar archivos con pendientes
- Opción para posponer TODOs con justificación

### Detección Avanzada

```typescript
// TODO: Refactorizar este componente
// FIXME!(alta): Corregir vulnerabilidad
/* OPTIMIZE(@dev): Mejorar rendimiento */

Soporta múltiples formatos y lenguajes

Priorización con ! (urgente) y ? (baja)

🚀 Instalación
Busca "Todo-Tracker" en el Marketplace de VSCode

Haz clic en Instalar

Recarga VSCode cuando se solicite

O instala manualmente:
```

code --install-extension todo-tracker-0.0.1.vsix

⚙️ Extension Settings
Esta extensión contribuye con las siguientes configuraciones:

Setting Descripción Default
todo-tracker.enable Activar/desactivar extensión true
todo-tracker.strictMode Bloquear push si hay TODOs false
todo-tracker.keywords Palabras clave a detectar ["TODO", "FIXME"]
todo-tracker.excludeFiles Patrones a ignorar ["**/node_modules/**"]
Ejemplo en settings.json:

json
{
"todo-tracker.enable": true,
"todo-tracker.keywords": ["TODO", "FIXME", "OPTIMIZE"]
}
📋 Requirements
VSCode 1.70+

Node.js 16+ (solo para desarrollo)

Git (para integración con hooks)

🐛 Known Issues
Los TODOs en archivos binarios no son detectados (#12)

El hook de Git puede fallar en Windows con paths largos (#18)

Ver todos los issues

📅 Release Notes
0.1.0 (Próximo lanzamiento)
Integración con Jira/GitHub Issues

Soporte para estimación de tiempo (TODO(2h))

Exportación de reportes CSV

0.0.1
Lanzamiento inicial con:

Detección básica de TODOs

Panel de visualización

Integración con Git hooks

🛠 Development
bash

# Clonar repositorio

git clone https://github.com/tu-usuario/todo-tracker.git

# Instalar dependencias

pnpm install

# Ejecutar en modo desarrollo

pnpm run watch
Estructura del proyecto:

text
src/
├── extension.ts # Punto de entrada
├── TodoProvider.ts # Lógica principal
├── GitHookManager.ts # Integración con Git
test/
├── extension.test.ts # Tests unitarios
🤝 Contributing
Haz fork del proyecto

Crea una rama (git checkout -b feature/awesome-feature)

Haz commit de tus cambios (git commit -m 'Add awesome feature')

Haz push a la rama (git push origin feature/awesome-feature)

Abre un Pull Request

📜 License
MIT © 2024 [Tu Nombre] | https://img.shields.io/github/followers/tu-usuario?style=social

🔗 Repositorio: github.com/tu-usuario/todo-tracker
📩 Reportar Bugs: Issues
📢 Changelog: Releases

text

### ¿Por qué esta versión?

1. **Mantiene la estructura estándar de VSCode** pero con mejor organización
2. **Incorpora tus necesidades específicas** del tracker agresivo
3. **Añade secciones técnicas** que esperan los desarrolladores
4. **Mejor visualización** con tablas y ejemplos de código
5. **Preparado para imágenes** (banner, screenshots)

¿Necesitas ajustar alguna sección en particular? ¿O prefieres que desarrollemos más algún aspecto específico del README?
