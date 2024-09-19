import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../../services/product-service";
import { Product } from "../../models/product";
import { Badge, Box, Button, Divider, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProductDetails = ({ }) => {

  const titulo = "Detalhes do Produto";
  const { id } = useParams<{ id: string }>();

  const service = new ProductService();

  const [product, setProduct] = useState<Product>();

  const navigate = useNavigate();

  const findProduct = async () => {
    const productFromApi = await service.findById(id!);
    setProduct(productFromApi);
  }

  useEffect(() => {
    findProduct();
  }, [id]);

  const navigateTo = (url: string) => {
    window.open(url, '_blank');
  }

  const backToHome = () => {
    navigate("/");
  }

  const formatToReal = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value)
  }

  return (
    <>
      <Box sx={{ backgroundColor: "#e9e9e9" }}>

        <Button variant="text" startIcon={<ArrowBackIcon />} onClick={backToHome}>
          Voltar
        </Button>

        <Divider variant="fullWidth" sx={{ marginY: 2 }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={"bold"} sx={{ textAlign: 'center',}}>
            {titulo}
          </Typography>
        </Box>
        <Divider variant="fullWidth" sx={{ marginY: 2 }} />

        {product ? (
          <Box>
            <Typography variant="h5">{product.title}</Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography >Condição:
                <Badge sx={{ marginLeft: 4 }}
                  color={product.condition === "used" ? "error" : "success"}
                  badgeContent={product.condition === "used" ? "Usado" : "Novo"}>
                </Badge>
              </Typography>
            </Box>

            <Box>
              <Typography>
                Quantidade em estoque: {product.initial_quantity.toString()} unidades
              </Typography>

              <Typography variant="h5" component="span" >
                {formatToReal(product.price)}
              </Typography>

              <Box>
                {/* Garantia */}
                {product.warranty && (
                  <Typography variant="caption">
                    {product.warranty}
                  </Typography>
                )}
              </Box>

            </Box>

            <Button sx={{ marginY: 2 }} variant="contained" onClick={() => navigateTo(product.permalink)}>
              Comprar!
            </Button>

            <Box>
              <Box sx={{ display: "flex", gap: 2, paddingX: 2, flexWrap: "wrap", width: "100%", maxHeight: "350px", justifyContent: "center", }}
              >
                {product.pictures?.map((picture, index) => (
                  <img key={index} src={picture.url} alt={product.title} />
                ))}
              </Box>
            </Box>
          </Box>
        ) : (
          <Typography>Produto não encontrado</Typography>
        )}
      </Box >
    </>
  );
};

export default ProductDetails;
