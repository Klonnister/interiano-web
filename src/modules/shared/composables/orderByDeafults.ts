export const useOrderByDefaults = () => {
  const products = [
    { name: 'Fecha de creación', value: 'created_at' },
    { name: 'Fecha de edición', value: 'updated_at' },
    { name: 'Precio', value: 'price' },
    { name: 'Nombre', value: 'name' },
    { name: 'Categoría', value: 'category' },
    { name: 'Marca', value: 'trademark' },
  ];

  const categoriesAndTrademarks = [
    { name: 'Nombre', value: 'name' },
    { name: 'Fecha de creación', value: 'created_at' },
    { name: 'Fecha de edición', value: 'updated_at' },
  ]

  return { products, categoriesAndTrademarks }
}