import {cart, removeFromCart} from '../data/cart.js';

import {products} from '../data/products.js';

import {formatCurrency} from './utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

import { deliveryoptions }  from '../data/deliveryOptions.js';

hello();
const today = dayjs();
 const deliverydate = today.add(7,'day');
console.log(deliverydate.format('dddd, MMMM D'));

let cartsummaryHTML = '';

cart.forEach((cartitem) =>{
    const productId = cartitem.productId;

    let matchingproduct ;

    products.forEach((product) =>{
        if(product.id === productId){
            matchingproduct = product;
        }
        
    });
    const deliveryOptionsId = cartitem.deliveryOptionsId;
    let deliveryOptions;
    
    deliveryOptions.forEach((option) =>{
      if(option.id === deliveryOptionsId){
        deliveryOptions = option;
      }

    });
     const today = dayjs();
    const deliverydate = today.add(
      deliveryOptions.deliveryDays,'day'
  );
  const dateString = deliverydate.format(
    'dddd, MMMM D'
  );
   
    
    cartsummaryHTML +=`
            <div class="cart-item-container 
      js-cart-item-container-${matchingproduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingproduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  
                ${matchingproduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingproduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingproduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(matchingproduct,cartitem)}
              </div>
            </div>
          </div>

    `
});

function deliveryOptionHTML (matchingproduct, cartitem){
  let html = '';
    deliveryoptions.forEach((deliveryOptions)=>{


    const today = dayjs();
    const deliverydate = today.add(
      deliveryOptions.deliveryDays,'day'
  );
  const dateString = deliverydate.format(
    'dddd, MMMM D'
  );

  const priceString = deliveryOptions.priceCents === 0
  ? 'FREE'
  : `$${formatCurrency(deliveryOptions.priceCents)} -`;
  const isChecked = deliveryoptions.id === cartitem.deliveryOptionsId;

   html += `
        <div class="delivery-option">
                      <input type="radio"
                      ${isChecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingproduct.id}">
                      <div>
                        <div class="delivery-option-date">
                         ${dateString}
                        </div>
                        <div class="delivery-option-price">
                          ${priceString} Shipping
                        </div>
                      </div>
                </div>
                `

  });
  return html;

};


document.querySelector('.js-order-summary').innerHTML = cartsummaryHTML;

document.querySelectorAll('.js-delete-link').forEach ((link)=>{
 link.addEventListener('click', () =>{
 const productId = link.dataset.productId;
 
 removeFromCart(productId);
 console.log(cart);

 const container = document.querySelector(`.js-cart-item-container-${productId}`)

  if(container){
  container.remove();
  }
 });
});


