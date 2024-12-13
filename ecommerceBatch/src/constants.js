export const API_ROOT = 'http://localhost:3000';
// collections -> brand
// category -> type
export const BRAND_OPTIONS = {
    title: 'Brands',
    key: 'brand',
    items: [
      {
        name: 'BrandA',
        value: 'BrandA',
        href: '/products?brand=BrandA',
      },
      {
        name: 'BrandB',
        value: 'BrandB',
        href: '/products?brand=BrandB',
      },
      {
        name: 'BrandC',
        value: 'BrandC',
        href: '/products?brand=BrandC',
      },
    ],
};

export const TYPE_OPTIONS = {
    title: 'Type',
    key: 'type',
    items: [
      {
        name: 'Type1',
        value: 'type1',
        href: '/products?type=type1',
      },
      {
        name: 'Type2',
        value: 'type2',
        href: '/products?type=type2',
      },
      {
        name: 'Type3',
        value: 'type3',
        href: '/products?type=type3',
      },
    ],
};


export const SORT_OPTIONS = [
    {
      name: 'Price: Low to high',
      value: 'price',
      direction: 'asc',
    },
    {
      name: 'Price: High to low',
      value: 'price',
      direction: 'desc',
    },
  ];