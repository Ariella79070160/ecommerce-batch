import { RiTShirt2Line } from 'react-icons/ri';
import clsx from 'clsx';
import { useProductListingContext } from './ProductListingContext';
import ProductCard from '../../../components/ProductCard/ProductCard';
import IconWrapper from '../../../components/ui/IconWrapper';
import Button from '../../../components/ui/Button';
import Pagination from '../../../components/ui/Pagination';

const ProductListingSection = () => {
  const { 
    products, 
    isProductsLoading, 
    filterCount, 
    resetFilters,
    currentPage,
    totalPages,
    onPageChange,
  } = useProductListingContext();

  if (isProductsLoading) {
    return (
      <div
        className={clsx(
          'col-span-4 md:col-span-6 lg:col-span-9',
          'flex justify-center',
        )}>
        Loading...
      </div>
    );
  }

  if (filterCount > 0 && products.length === 0) {
    return (
      <div
        className={clsx(
          'h-full w-full',
          'col-span-4 md:col-span-6 lg:col-span-9',
          'flex flex-col items-center justify-center gap-5',
        )}>
        <IconWrapper icon={RiTShirt2Line} />
        <div
          className={clsx(
            'flex flex-col items-center gap-2',
            'text-center text-neutral-900',
          )}>
          <span className="text-xl font-medium">Nothing found just yet</span>
          <span>
            Adjust your filters a bit, and let's see what we can find!
          </span>
        </div>
        <Button label="Reset filters" size="lg" onClick={resetFilters} />
      </div>
    );
  }

  return (
    <div className="col-span-4 md:col-span-6 lg:col-span-9">
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6">
        {products.map((product) => (
          <div key={product._id} className={clsx('col-span-4 md:col-span-3')}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default ProductListingSection;