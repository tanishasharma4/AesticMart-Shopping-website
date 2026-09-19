const grid = document.querySelector('#productGrid');
const drawer = document.querySelector('#drawer');
const overlay = document.querySelector('#overlay');
const content = document.querySelector('#drawerContent');
const cart = [];

fetch('/api/products').then(r => r.json()).then(products => {
  grid.innerHTML = products.map(p => `<article class="product"><div class="product-image"><img src="${p.image}" alt="${p.name}"></div><button aria-label="Add ${p.name}" data-id="${p.id}">+</button><p>${p.name}<strong>$${p.price}</strong></p><small>${p.category} / ${p.color}</small></article>`).join('');
  grid.addEventListener('click', e => { const id = Number(e.target.dataset.id); if (id) add(products.find(p => p.id === id)); });
});
function add(product) { cart.push(product); document.querySelector('#cartCount').textContent = cart.length; openCart(); }
function openCart() { content.innerHTML = `<h3>Your bag</h3>${cart.length ? cart.map(p => `<div class="cart-item"><div>${p.name}<small>${p.color}</small></div><b>$${p.price}</b></div>`).join('') + `<div class="total"><b>Total</b><b>$${cart.reduce((n,p)=>n+p.price,0)}</b></div><button class="button dark" style="margin-top:25px;border:0;cursor:pointer">Checkout securely →</button>` : '<p class="empty">Your bag is waiting for something beautiful.</p>'}`; drawer.classList.add('open'); overlay.classList.add('show'); }
document.querySelector('#cartButton').onclick = openCart;
document.querySelector('#accountButton').onclick = () => { window.location.href = '/login.html'; };
document.querySelector('#closeDrawer').onclick = close; overlay.onclick = close; function close(){drawer.classList.remove('open');overlay.classList.remove('show');}
document.querySelector('#newsletter').onsubmit = e => { e.preventDefault(); e.target.innerHTML = '<span style="padding:10px 0;color:#c7d659">You’re on the AesticMart list. Welcome.</span>'; };
