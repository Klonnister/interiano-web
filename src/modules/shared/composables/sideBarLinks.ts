export const useSideBarLinks = () => {
  return [
    {
      name: 'Productos',
      path: { name: 'products' },
      icon: 'solar:box-bold',
    },
    {
      name: 'Catálogo',
      path: { name: 'dev'},
      icon: 'fluent:draw-image-24-filled',
    },
    {
      name: 'Categorías',
      path: { name: 'categories'},
      icon: 'iconamoon:category-fill',
    },
    {
      name: 'Marcas',
      path: { name: 'trademarks' },
      icon: 'material-symbols:label',
    },
    {
      name: 'Otros',
      path: { name: 'dev'},
      icon: 'ri:more-fill',
    },
  ];
}