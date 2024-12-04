import clsx from 'clsx';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '../ui/Link';


const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { image, name, price} = product;

  const redirectUrl = `/products/${product._id}`;

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        navigate(redirectUrl);
      }
    },
    [navigate, redirectUrl],
  );

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={clsx(
        'relative w-full',
        'group',
        'flex flex-col gap-4',
        'rounded-lg',
        'outline-none',
        'focus:ring-4 focus:ring-indigo-600/[.12]',
      )}>
      <img
        src={image}
        alt={`${name}'s product preview`}
        loading="lazy"
        className={clsx(
          'h-[225px] w-full rounded-lg object-cover md:h-[300px]',
        )}
      />
      <div className={clsx('flex flex-col', 'min-h-[152px]')}>
        <Link
          to={redirectUrl}
          tabIndex={-1}
          variant="unstyled"
          className={clsx(
            'text-lg font-medium text-neutral-900',
            'group-hover:text-indigo-700',
          )}>
          <span aria-hidden={true} className="absolute inset-0" />
          {name}
        </Link>
        <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-neutral-600">
                ${price}
            </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
