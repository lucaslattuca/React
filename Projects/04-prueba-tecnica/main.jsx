import { createRoot } from 'react-dom/client'
import { App } from './src/App'

const root = createRoot(document.getElementById('app'))
root.render(<App></App>)
// si el archivo es js no puede leer dentro del render el html.
