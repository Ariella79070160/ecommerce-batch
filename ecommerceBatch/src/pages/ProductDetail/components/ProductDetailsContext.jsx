import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
  
const ProductDetailsContext = createContext();

export const useProductDetailsContext = () => useContext(ProductDetailsContext);

const ProductDetailsContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [isProductLoading, setIsProductLoading] = useState(false);

    const getProduct = useCallback(async () => {
        setIsProductLoading(true);
        const data = await fetch(
            `http://localhost:3000/product/products/details/${productId}`,
        );
        const result = await data.json();

        if (!result.error) {
            setProduct(result);
        } else {
            return navigate('/not-found');
        }
        setIsProductLoading(false);
    }, [productId, navigate]);

    useEffect(() => {
        getProduct();
    }, [getProduct]);

    useEffect(() => {
        if (!product) {
            return;
        }
    }, [product]);


    const value = useMemo(() => {
        return {
            product,
            isProductLoading,
        };
    }, [
        product,
        isProductLoading,
    ]);

    return (
        <ProductDetailsContext.Provider value={value}>
            {children}
        </ProductDetailsContext.Provider>
    );
};

export default ProductDetailsContextProvider;