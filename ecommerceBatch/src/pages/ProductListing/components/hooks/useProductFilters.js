import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BRAND_OPTIONS, TYPE_OPTIONS } from '../../../../constants';

// collections -> brand
// category -> type
export default function useProductFilters() {
  const { search } = useLocation();
  const isMounted = useRef(false);

  const query = new URLSearchParams(search);
  const brandId = query.get('brand');
  const typeId = query.get('type');

  const [selectedBrands, setSelectedBrands] = useState(
    brandId ? new Set().add(brandId) : new Set(),
  );
  const [selectedType, setSelectedType] = useState(
    typeId ? new Set().add(typeId) : new Set(),
  );

  const [selectedSort, setSelectedSort] = useState({
    value: 'created',
    direction: 'desc',
  });

  const onSelect = (type, value) => {
    let newSelectedItems;
    if (type === BRAND_OPTIONS.key) {
      newSelectedItems = new Set(selectedBrands);
    }
    if (type === TYPE_OPTIONS.key) {
      newSelectedItems = new Set(selectedType);
    }
    newSelectedItems.has(value)
      ? newSelectedItems.delete(value)
      : newSelectedItems.add(value);

    if (type === BRAND_OPTIONS.key) {
      setSelectedBrands(newSelectedItems);
    }
    if (type === TYPE_OPTIONS.key) {
      setSelectedType(newSelectedItems);
    }
  };

  const resetFilters = () => {
    setSelectedBrands(new Set());
    setSelectedType(new Set());
  };

  const filterCount =
    selectedBrands.size +
    selectedType.size;

  useEffect(() => {
    // only run after mounted when the collectionId or categoryId query param change
    if (isMounted.current) {
      if (brandId) {
        // Reset every filters when we query params is changed
        resetFilters();
        setSelectedBrands(new Set().add(brandId));
      }
      if (typeId) {
        // Reset every filters when we query params is changed
        resetFilters();
        setSelectedType(new Set().add(typeId));
      }
    }
    isMounted.current = true;
  }, [brandId, typeId]);

  return {
    selectedBrands,
    selectedType,
    selectedSort,
    filterCount,
    onSelect,
    resetFilters,
    onSortChange: setSelectedSort,
  };
}

  