export const useOrderTypeDefaults = () => {
  const price = [
    {
      name: 'Menor a mayor',
      value: 'asc',
    },
    {
      name: 'Mayor a menor',
      value: 'desc',
    },
  ];

  const alphabetic = [
    {
      name: 'A-Z',
      value: 'asc',
    },
    {
      name: 'Z-A',
      value: 'desc',
    },
  ];

  const date = [
    {
      name: 'Recientes primero',
      value: 'desc',
    },
    {
      name: 'Más antiguos primero',
      value: 'asc',
    }
  ];

  return { price, alphabetic, date }
}