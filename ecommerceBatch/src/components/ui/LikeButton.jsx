import clsx from 'clsx';
import { RiHeartLine } from 'react-icons/ri';
import { Link as RouterLink } from 'react-router-dom';
import { useLikeContext } from '../../context/LikeContext';

const LikeButton = ({ disabled }) => {
  const { likedItems } = useLikeContext();
  const count = likedItems?.favorites?.length || 0;

  return (
    <RouterLink
      to="/cart"
      aria-label="Like button"
      className={clsx(
        'relative rounded transition-colors duration-200',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]',
        {
          'text-red-600 hover:text-red-700': !disabled,
          'pointer-events-none text-neutral-400': disabled,
        },
      )}
    >
      <RiHeartLine className="size-6" aria-hidden="true" />

      {count > 0 && (
        <div
          className={clsx(
            'absolute z-10 -right-1.5 -top-1.5 h-[18px] w-[18px] rounded-full text-center text-xs font-semibold',
            'flex items-center justify-center',
            {
              'bg-blue-600 text-white': !disabled,
              'bg-neutral-100 text-neutral-400': disabled,
            },
          )}
        >
          {count}
        </div>
      )}
    </RouterLink>
  );
};

export default LikeButton;
