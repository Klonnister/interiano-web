export const useOrderByDefaults = () => {
  const products = [
    { name: 'Precio', value: 'price' },
    { name: 'Nombre', value: 'name' },
    { name: 'Marca', value: 'trademark' },
    { name: 'Categoría', value: 'category' },
  ];

  const categoriesAndTrademarks = [
    { name: 'Nombre', value: 'name' },
  ]

  return { products, categoriesAndTrademarks }
}