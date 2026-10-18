function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, item, quantity) {
  if (quantity == 0) throw new RangeError('quantity must be grater than 0');
  let found = cart.filter(({id}) => id == item.id);
  if (!found.length) {
    cart_item = {...item, quantity: 0};
    cart = cart.concat([cart_item]);
  } else cart_item = found[0];
  cart_item.quantity += quantity;

  if (cart_item.quantity > cart_item.stock) throw new RangeError('Not enough items in stock')
  
  return cart;
}

function changeQuantity() { return notImplemented(); }
function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
