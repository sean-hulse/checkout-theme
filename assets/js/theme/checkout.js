import { createCheckoutService } from '@bigcommerce/checkout-sdk';
import Vue from 'vue';
import PageManager from './page-manager';

const service = createCheckoutService();

export default class Checkout extends PageManager {
  async onReady() {
    let state = await service.loadCheckout();
    const checkout = state.data.getCheckout();
    const cart = state.data.getCart();
    const config = state.data.getConfig();
    const billingAddress = state.data.getBillingAddress();
    const shippingAddress = state.data.getShippingAddress();
    console.log(checkout);
    console.log(cart);
    console.log(config);
    console.log(billingAddress);
    console.log(shippingAddress);
    this.app = new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue!',
        signedIn: false,
        signInAsGuest: true,
        subtotal: checkout.subtotal,
        total: checkout.grandTotal,
        products: cart.lineItems.physicalItems,
        currencySymbol: cart.currency.symbol,
        currencyCode: cart.currency.code,
      },
      // change delimiter to avoid bugs with handlebars
      delimiters: ['${', '}'],
      methods: {
        toggleSignInMethod: () => {
          this.app.signInAsGuest = !this.app.signInAsGuest;
        },
        signIn: () => {
          console.log(this.app.signedIn);
        },
      },
    });
  }
}
