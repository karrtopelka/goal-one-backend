const toCurrency = price => {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
  }).format(price)
};

document.querySelectorAll('.price').forEach((node) => {
  node.textContent = toCurrency(node.textContent);
})

const $cart = document.querySelector('#cart');
if ($cart) {
  $cart.addEventListener('click', (event) => {
    if (event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id;

      fetch('/cart/remove/' + id, {
        method: 'delete',
      })
        .then((res) => res.json())
        .then((cart) => {
          if (cart.sluts.length) {
            const htmlTable = cart.sluts
              .map((s) => {
                return `
              <tr>
                <td>${s.name}</td>
                <td class="table price">${toCurrency(s.price)}</td>
                <td>${s.count}</td>
                <td>
                  <button class='btn btn-small pink js-remove' data-id="${s.id}">Delete</button>
                </td>
              </tr>
            `;
              })
              .join('');
            $cart.querySelector('tbody').innerHTML = htmlTable;
            $cart.querySelector('.flow-text').querySelector('.price').textContent = toCurrency(cart.price);
          } else {
            $cart.innerHTML = '<p>Cart is empty</p>';
          }
        });
    }
  });
}
