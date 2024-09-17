import { createRoot } from 'react-dom/client'
import Home from './home.tsx'
import './home.css'
import { ThemeProvider } from '@mui/material/styles'
import theme from './themes/theme.ts'
import { CssBaseline } from '@mui/material'

createRoot(document.getElementById('root')!).render(

  <ThemeProvider theme={theme}>
       <CssBaseline />
    <Home />
  </ThemeProvider>
)
