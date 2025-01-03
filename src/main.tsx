import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ThemeContextProvider } from './context/ThemeContext'

import './styles/main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ThemeContextProvider>
		<App />
	</ThemeContextProvider>
)
