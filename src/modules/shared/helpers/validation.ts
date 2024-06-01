export interface register {
  username: 12,
  password: {
    length: 6,
    numbers: 1,
    symbols: 1,
  }
}

export interface category {
  name: 35,
}

export interface product {
  category: number,
  trademark: number,
  title: 70,
  image: string,
  size?: 20,
  stock: 99999,
  description?: 500,
  extra_props: object,
  price: 0.01 | 999999.99  | '2 decimals',
  sale: boolean,
  sale_price: 999999.99  | '2 decimals',
  design: number,
}

export interface profile {
  username: 12,
  image?: string,
  oldpassword: string,
  newpassword: {
    length: 6,
    numbers: 1,
    symbols: 1,
  }
  confirmnewpassword: 'same as new passowrd'
}

export interface trademark {
  name: 35,
  image?: string,
}