import { v4 as uuidv4 } from 'uuid';

export const PRODUCTS = [
  { id: uuidv4(), name: 'Fékbetét', price: 15980, category: 'Fékek', selectedQuantity: 1, image: 'fek.jpg' },
  { id: uuidv4(), name: 'Kuplung', price: 121000, category: 'Sebességváltó/Kuplung', selectedQuantity: 1, image: '191699_source.jpg' },
  { id: uuidv4(), name: 'Fékolaj', price: 8000, category: 'Fékek', selectedQuantity: 1, image: 'fekolaj.jpg' },
  { id: uuidv4(), name: 'Kuplungtárcsa', price: 38000, category: 'Sebességváltó/Kuplung', selectedQuantity: 1, image: 'kuplungtarcsa.jpg' },
  { id: uuidv4(), name: 'Gumi', price: 18000, category: 'Kerék', selectedQuantity: 1, image: 'gumi.jpg' },
  { id: uuidv4(), name: 'Felni', price: 121000, category: 'Kerék', selectedQuantity: 1, image: 'felni.jpg' },


 
];
