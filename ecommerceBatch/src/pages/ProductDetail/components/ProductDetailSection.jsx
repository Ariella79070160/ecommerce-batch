import clsx from 'clsx';
import ProductMetadata from './ProductMetadata';
import { useProductDetailsContext } from './ProductDetailsContext';

const ProductDetail = () => {
  const { isProductLoading, product } = useProductDetailsContext();

  return (
    <section
      className={clsx(
        'px-4 py-12 md:py-16 lg:p-24',
        'grid grid-cols-4 gap-x-4 gap-y-12 md:grid-cols-6 md:gap-x-8 lg:grid-cols-12',
      )}>
      {isProductLoading || !product ? (
        <div
          className={clsx(
            'flex h-full w-full items-center justify-center',
            'col-span-4 md:col-span-6 lg:col-span-12',
          )}>
          Loading...
        </div>
      ) : (
        <>
          <div className="col-span-4 md:col-span-6">
            <div className="flex flex-col gap-6">
                <img
                    src={product.image}
                    alt="Selected preview"
                    loading="lazy"
                    className="h-[400px] w-full rounded-lg object-cover md:h-[800px]"
                />
            </div>
          </div>
          <div className="col-span-4 md:col-span-6">
            <ProductMetadata />
          </div>
        </>
      )}
    </section>
  );
};

export default ProductDetail;