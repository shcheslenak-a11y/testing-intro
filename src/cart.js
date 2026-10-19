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

  if (cart_item.quantity > cart_item.stock) throw new RangeError('Not enough items in stock');
  
  return cart;
}

function changeQuantity(cart, item_id, quantity) {
  if (quantity == 0) throw new RangeError('quantity must be grater than 0');
  let found = cart.filter(({id}) => id == item_id);
  if (found.length) {
    if (quantity > found[0].stock) throw new RangeError('Not enough items in stock');
    found[0].quantity = quantity;
  }  
  return cart;
}

function removeFromCart(cart, id) {
  return cart.filter((i) => i.id != id);
}

function calculateCartSubtotal(cart) {
  let sum = 0;
  cart.forEach(el => sum += el.price * el.quantity);
  return sum;
}

function calculateOrderTotal(cart, promo) {
  const sub = calculateCartSubtotal(cart);
  const discount = (promo == 'SAVE10' && sub > 20000 ? 0.1 : 0) * sub;
  const delivery = sub < 50000 ? 30000 : 0;

  return {
    subtotal: sub, discount: discount, delivery: delivery, total: sub + delivery - discount
  }
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
