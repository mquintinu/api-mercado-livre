import { useState } from 'react';
import './home.css'
import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material';
import { Product } from './models/product';
import ProductService from './services/product-service';
import React from 'react';

function Home() {

  const titulo = "API Mercado Livre";

  const [products, setProducts] = useState<Product[]>([]);
  const [productTitle, setProductTitle] = useState<string>('');

  const service = new ProductService();

  const search = async () => {
    if (productTitle.trim() === '') return;

    try {
      const productsFromApi = await service.searchProducts(productTitle);

      setProducts(productsFromApi);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }

    setProductTitle('');
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      search();
    }
  }

  return (
    <>
      <Box>
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
              Pesquisar
            </Button>
          </Box>

          <List>
            {products.map((product: Product) => (
              <>
                <ListItem key={product.id}>
                  <ListItemAvatar>
                    <Avatar src={product.thumbnail} sx={{ width: '50px', height: '50px' }} />
                  </ListItemAvatar>
                  <ListItemText primary={product.title}
                    secondary={
                      <Typography component="span">
                        R$ {product.price}
                      </Typography>
                    } />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
        </Box>
      </Box>
    </>
  )
}

export default Home
