import { useState } from 'react';
import './home.css'
import { Avatar, Box, Button, CircularProgress, Divider, List, ListItemAvatar, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import { Product } from '../../models/product';
import ProductService from '../../services/product-service';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {

  const titulo = "Busque produtos no Mercado Livre!";

  const [products, setProducts] = useState<Product[]>([]);
  const [productTitle, setProductTitle] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>();

  const service = new ProductService();
  const navigate = useNavigate();

  const formatToReal = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value)
  }

  const search = async () => {
    if (productTitle.trim() === '') return;

    try {
      setIsLoading(true);
      const productsFromApi = await service.searchProducts(productTitle);
      setIsLoading(false);

      setProducts(productsFromApi);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setIsLoading(false);
    }

    setProductTitle('');
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      search();
    }
  }

  const productClick = (id: string) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#e9e9e9", padding: "10px" }}>
        <h1 style={{ textAlign: 'center' }} >{titulo}</h1>

        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Box>
            <TextField id="outlined-basic" label="Pesquisar produtos, marcas e muito mais..."
              variant="outlined" fullWidth
              onChange={(e) => setProductTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              value={productTitle}
            />
          </Box>

          <Box sx={{ marginTop: 2, justifyContent: 'end' }}>
            <Button variant="contained" onClick={search}>
              {isLoading ? 'Buscando...' : 'Buscar'}
            </Button>
            {isLoading && (
              <Box sx={{ display: 'flex', marginTop: 2 }}>
                <CircularProgress color='info' />
              </Box>
            )}
          </Box>

          <List component="nav">
            {products.map((product: Product) => (
              <>
                <ListItemButton key={product.id} onClick={() => productClick(product.id)}>
                  <ListItemAvatar>
                    <Avatar src={product.thumbnail} sx={{ marginRight: 2, width: '50px', height: '50px' }} />
                  </ListItemAvatar>
                  <ListItemText primary={product.title}
                    secondary={
                      <Box>
                        <Typography component="span" sx={{ fontWeight: 'bold' }} >
                          {formatToReal(product.price)}
                          <Typography display={'flex'} component="span" variant="caption">
                            Vendido por: {product.seller.nickname}
                          </Typography>
                        </Typography>
                      </Box>
                    } />
                </ListItemButton >
                <Divider variant="middle" component="li" />
              </>
            ))}
          </List>
        </Box>
      </Box>
    </>
  )
}

export default Home
