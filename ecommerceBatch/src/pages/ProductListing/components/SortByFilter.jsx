import { Dropdown, DropdownItem } from '../../../components/ui/Dropdown';
import { SORT_OPTIONS } from '../../../constants';
import { useProductListingContext } from './ProductListingContext';


const SortByFilter = () => {
  const { onSortChange, selectedSort } = useProductListingContext();
  return (
    <Dropdown>
      {SORT_OPTIONS.map((option) => (
        <DropdownItem
          key={option.value + option.direction}
          isSelected={
            option.value === selectedSort.value &&
            option.direction === selectedSort.direction
          }
          onSelect={() =>
            onSortChange({ value: option.value, direction: option.direction })
          }>
          {option.name}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default SortByFilter;
