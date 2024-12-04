import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useProductFilters from './hooks/useProductFilters';
import { BRAND_OPTIONS, TYPE_OPTIONS } from '../../../constants';

const ProductListingContext = createContext();

export const useProductListingContext = () => useContext(ProductListingContext);

const ProductListingContextProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const {
    selectedBrands,
    selectedType,
    selectedSort,
    filterCount,
    onSelect,
    resetFilters,
    onSortChange,
  } = useProductFilters();

  const getProducts = useCallback(
    async ({ brands, types, sort, page = 1 }) => {
      setIsProductsLoading(true);

      let queryString = '';
      if (brands.size > 0 || types.size > 0) {
        queryString = [
          ...Array.from(brands).map(
            (brand) => `${BRAND_OPTIONS.key}=${encodeURIComponent(brand)}`,
          ),
          ...Array.from(types).map(
            (type) => `${TYPE_OPTIONS.key}=${encodeURIComponent(type)}`,
          ),
        ].join('&');
      }

      queryString = `${queryString ? `${queryString}&` : ''}sort=${
        sort.value
      }&direction=${sort.direction}&page=${page}`;

      const data = await fetch(
        `http://localhost:3000/product/products${
          queryString ? `?${queryString}` : ''
        }`,
      );
      const result = await data.json();
      if (!result.error) {
        setProducts(result.products);
        setTotalPages(result.totalPages);
        setCurrentPage(result.currentPage);
      }
      setIsProductsLoading(false);
    },
    [],
  );

  const handlePageChange = useCallback((page) => {
    getProducts({
      types: selectedType,
      brands: selectedBrands,
      sort: selectedSort,
      page,
    });
  }, [getProducts, selectedType, selectedBrands, selectedSort]);

  useEffect(() => {
    getProducts({
      types: selectedType,
      brands: selectedBrands,
      sort: selectedSort,
      page: 1, // Reset to page 1 when filters change
    });
  }, [getProducts, selectedType, selectedBrands, selectedSort]);

  const value = useMemo(() => {
    return {
      products,
      isProductsLoading,
      selectedBrands,
      selectedType,
      selectedSort,
      filterCount,
      currentPage,
      totalPages,
      onSelect,
      resetFilters,
      onSortChange,
      onPageChange: handlePageChange,
    };
  }, [
    products,
    isProductsLoading,
    selectedBrands,
    selectedType,
    selectedSort,
    filterCount,
    currentPage,
    totalPages,
    onSelect,
    resetFilters,
    onSortChange,
    handlePageChange,
  ]);

  return (
    <ProductListingContext.Provider value={value}>
      {children}
    </ProductListingContext.Provider>
  );
};

export default ProductListingContextProvider;