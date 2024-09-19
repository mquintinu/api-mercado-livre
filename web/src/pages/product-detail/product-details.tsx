import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../../services/product-service";
import { Product } from "../../models/product";
import { Box, Button, Typography } from "@mui/material";
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
      <Box sx={{ backgroundColor: "#e9e9e9", padding: "10px" }}>
        <Button variant="text" startIcon={<ArrowBackIcon />} onClick={backToHome}>
          Voltar
        </Button>

        <h1 style={{ textAlign: 'center' }} >{titulo}</h1>


        {product ? (
          <Box component={"div"}>
            <h2>{product.title}</h2>
            <Box>
              <Typography component="span" sx={{ fontWeight: 'bold' }} >
                {formatToReal(product.price)}
              </Typography>
              <p>Condição: {product.condition === "used" ? "Usado" : "Novo"}</p>

              {product.warranty && (<p>{product.warranty}</p>)}

              <p>Quantidade em estoque: {product.initial_quantity.toString()}</p>
              <img src={product.pictures[0].url} alt={product.title} />
            </Box>

            <Button variant="contained" onClick={() => navigateTo(product.permalink)}>
              Comprar!
            </Button>
          </Box>
        ) : (
          <div>Produto não encontrado</div>
        )}
      </Box>
    </>
  );
};

export default ProductDetails;
