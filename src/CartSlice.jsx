import { createSlice } from '@reduxjs/toolkit';

//import { useDispatch, useSelector } from 'react-redux';
//const [addedToCart, setAddedToCart] = useState({});

//const bajaItem = useSelector(state=> state.cart.totalQuantity);

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0,
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload; // Destructure product details from the action payload
        // Check if the item already exists in the cart by comparing names
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
          // If item already exists in the cart, increase its quantity
          existingItem.quantity++;
        } else {
          // If item does not exist, add it to the cart with quantity 1
          state.items.push({ name, image, cost, quantity: 1 });
        };
        state.totalQuantity++;
    },
    removeItem: (state, action) => {
        console.log("state: ", state);
        console.log("action: ", action);
        
        const itemToRemove = state.items.find(item => item.name === action.payload);
        if(itemToRemove) {
            state.totalQuantity -= itemToRemove.quantity;
            state.items = state.items.filter(item => item.name !== action.payload);
            console.log("item: ", itemToRemove);
            //setAddedToCart((prevState) => ({ // Update the local state to reflect that the product has been added
            //    ...prevState, // Spread the previous state to retain existing entries
            //    [product.name]: false, // Set the current product's name as a key with value 'true' to mark it as added
            //  }));
    
        };
  
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload; // Destructure the product name and new quantity from the action payload
        // Find the item in the cart that matches the given name
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
            state.totalQuantity += quantity - itemToUpdate.quantity;
            itemToUpdate.quantity = quantity;
        };    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
