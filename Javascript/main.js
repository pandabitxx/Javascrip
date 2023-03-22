// Lista de productos disponibles
const products = [
    { id: 1, name: 'Mars', price: 10.00 },
    { id: 2, name: 'Neptune', price: 20.00 },
    { id: 3, name: 'Earth', price: 30.00 }
];

// Lista de elementos del carrito de compras
let cartItems = [];

// Función para agregar un producto al carrito de compras
function addToCart(productId) {
    // Buscar el producto en la lista de productos disponibles
    const product = products.find(p => p.id == productId);
    if (!product) {
    console.error(`Producto con ID ${productId} no encontrado`);
    return;
    }
    
    // Buscar el elemento en el carrito de compras
    let cartItem = cartItems.find(item => item.product.id == productId);
    if (!cartItem) {
      // Si el elemento no existe en el carrito, crear uno nuevo
    cartItem = {
        product: product,
        quantity: 0,
        subtotal: 0.00
    };
    cartItems.push(cartItem);
    }
    
    // Incrementar la cantidad y el subtotal del elemento en el carrito
    cartItem.quantity++;
    cartItem.subtotal = cartItem.quantity * cartItem.product.price;
    
    // Actualizar la tabla de elementos del carrito y el total
    updateCart();
    }

// Función para eliminar un producto del carrito de compras
    function removeFromCart(productId) {
    // Buscar el elemento en el carrito de compras
    const cartItemIndex = cartItems.findIndex(item => item.product.id == productId);
    if (cartItemIndex < 0) {
        return;
    }

    // Eliminar el elemento del carrito
    cartItems.splice(cartItemIndex, 1);
    
      // Actualizar la tabla de elementos del carrito y el total
    updateCart();
    }
    
    // Función para vaciar el carrito de compras
    function emptyCart() {
    cartItems = [];
    updateCart();
    }
    
    


// Función para actualizar la tabla de elementos del carrito y el total
function updateCart() {
  const cartTable = document.getElementById('cart-items');
  cartTable.innerHTML = '';
  let total = 0.00;
    
  // Recorrer la lista de elementos del carrito y agregarlos a la tabla
  for (const cartItem of cartItems) {
    const product = cartItem.product;
    const quantity = cartItem.quantity;
    const subtotal = cartItem.subtotal;
    const row = document.createElement('tr');
    
    // Columna de nombre del producto
    const nameCell = document.createElement('td');
    nameCell.textContent = product.name;
    row.appendChild(nameCell);
    
    // Columna de precio del producto
    const priceCell = document.createElement('td');
    priceCell.textContent = `$${product.price.toFixed(2)}`;
    row.appendChild(priceCell);
    
    // Columna de cantidad del producto
    const quantityCell = document.createElement('td');
    quantityCell.textContent = quantity;
    row.appendChild(quantityCell);
    
    // Columna de subtotal del producto
    const subtotalCell = document.createElement('td');
    subtotalCell.textContent = `$${subtotal.toFixed(2)}`;
    row.appendChild(subtotalCell);
    
    // Columna de botón de eliminar el producto
    const removeButtonCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Eliminar';
    removeButton.addEventListener('click', () => removeFromCart(product.id));
    removeButtonCell.appendChild(removeButton);
    row.appendChild(removeButtonCell);
    
    cartTable.appendChild(row);
    
    total += subtotal;
    }

  // Actualizar el total del carrito
  const totalElement = document.getElementById('cart-total');
  totalElement.textContent = `$${total.toFixed(2)}`;
}

    // Evento para agregar productos al carrito cuando se hace clic en el botón correspondiente
    const addToCartButtons = document.getElementsByClassName('add-to-cart');
    for (const button of addToCartButtons) {
    button.addEventListener('click', () => addToCart(button.dataset.id));
    }
    
    // Evento para vaciar el carrito cuando se hace clic en el botón correspondiente
    const emptyCartButton = document.getElementById('empty-cart');
    emptyCartButton.addEventListener('click', emptyCart);
    
    // Evento para realizar el pago cuando se hace clic en el botón correspondiente
    const checkoutButton = document.getElementById('checkout');
    checkoutButton.addEventListener('click', () => alert('Pago realizado con éxito'));