import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import theme from './themes/theme.ts'
import { CssBaseline } from '@mui/material'
import Home from './pages/home/home.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductDetails from './pages/product-detail/product-details.tsx'

createRoot(document.getElementById('root')!).render(

  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-details/:id" element={<ProductDetails  />} />
      </Routes>
    </Router>
  </ThemeProvider>
)
