import ProductBrandSection from "./components/ProductBrandSection";
import ProductDetailsContextProvider from "./components/ProductDetailsContext";
import ProductDetail from "./components/ProductDetailSection";

const ProductDetailPage = () => {
    return (
        <>
            <ProductDetailsContextProvider>
                <ProductDetail />
            </ProductDetailsContextProvider>
            <ProductBrandSection />
        </>
    )
}

export default ProductDetailPage;