import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGridSection from '../../../components/ui/ProductGridSection';

const ProductBrandSection = () => {
  const { productId } = useParams();
  const [brandProducts, setBrandsProducts] = useState([]);
  const [isBrandProductsLoading, setIsBrandProductsLoading] =
    useState(true);
  const getBrandsProducts = useCallback(async () => {
    setIsBrandProductsLoading(true);

    const data = await fetch(
      'http://localhost:3000/product/products',
    );
    const result = await data.json();
    console.log("result: ", result);
    if (!result.error) {
      setBrandsProducts(
        result.products.filter((item) => item._id !== productId).slice(0, 4),
      );
    }
    setIsBrandProductsLoading(false);
  }, [productId]);

  useEffect(() => {
    getBrandsProducts();
  }, [getBrandsProducts]);

  return (
    <section
      className={clsx('px-4 py-12 md:py-16 lg:p-24', 'flex flex-col gap-8')}>
      <span className="text-2xl font-semibold md:text-3xl">
        In this brand
      </span>
      {isBrandProductsLoading ? (
        <div>Loading...</div>
      ) : (
        <ProductGridSection products={brandProducts} />
      )}
    </section>
  );
};

export default ProductBrandSection;