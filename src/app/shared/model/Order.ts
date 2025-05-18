export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }
  
  export interface Order {
    date: string;
    items: OrderItem[];
  }
  