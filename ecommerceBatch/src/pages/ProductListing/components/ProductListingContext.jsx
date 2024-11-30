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
// collections -> brand
// category -> type
  const ProductListingContext = createContext();
  
  export const useProductListingContext = () => useContext(ProductListingContext);
  
  const ProductListingContextProvider = ({ children }) => {
    const [products, setProducts] = useState(null);
    const [isProductsLoading, setIsProductsLoading] = useState(true);
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
      async ({ brands, types, sort }) => {
        setIsProductsLoading(true);
  
        let queryString = '';
        if (
            brands.size > 0 ||
            types.size > 0
        ) {
          queryString = [
            ...Array.from(brands).map(
              (brand) =>
                `${BRAND_OPTIONS.key}=${encodeURIComponent(brand)}`,
            ),
            ...Array.from(types).map(
              (type) =>
                `${TYPE_OPTIONS.key}=${encodeURIComponent(type)}`,
            ),
          ].join('&');
        }
  
        queryString = `${queryString ? `${queryString}&` : ''}sort=${
          sort.value
        }&direction=${sort.direction}`;
  
        const data = await fetch(
          `http://localhost:3000/product/products${
            queryString ? `?${queryString}` : ''
          }`,
        );
        const result = await data.json();
        console.log("result: ", result)
        if (!result.error) {
          setProducts(result.products);
        }
        setIsProductsLoading(false);
      },
      [],
    );
  
    useEffect(() => {
      getProducts({
        types: selectedType,
        brands: selectedBrands,
        sort: selectedSort,
      });
    }, [
      getProducts,
      selectedType,
      selectedBrands,
      selectedSort,
    ]);
  
    const value = useMemo(() => {
      return {
        products,
        isProductsLoading,
        selectedBrands,
        selectedType,
        selectedSort,
        filterCount,
        onSelect,
        resetFilters,
        onSortChange,
      };
    }, [
      products,
      isProductsLoading,
      selectedBrands,
      selectedType,
      selectedSort,
      filterCount,
      onSelect,
      resetFilters,
      onSortChange,
    ]);
  
    return (
      <ProductListingContext.Provider value={value}>
        {children}
      </ProductListingContext.Provider>
    );
  };
  
  export default ProductListingContextProvider;