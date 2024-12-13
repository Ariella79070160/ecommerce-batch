import clsx from 'clsx';
import { useProductDetailsContext } from './ProductDetailsContext';

const ProductMetadata = () => {
  // const isMobileAndBelow = useMediaQuery('(max-width: 767px)');
  const { product} = useProductDetailsContext();
  const { name, description, price } = product;

  return (
    <div>
      <section
        className={clsx('flex flex-col gap-8')}
        aria-labelledby="information-heading">
        <div className="flex flex-col items-start">
          <h1 className="text-3xl font-semibold md:text-5xl">{name}</h1>
          <div className="mt-5">
            <div className="inline-flex items-end gap-2">
              <span className="text-3xl font-medium text-neutral-600">
                ${price}
              </span>
            </div>
          </div>
        </div>
        <div className="text-2xl font-bold">Decription:</div>
        <p className="text-neutral-600">{description}</p>
      </section>
    </div>
  );
};

export default ProductMetadata;