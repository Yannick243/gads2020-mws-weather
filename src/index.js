require("dotenv").config();
import "./assets/css/app.css";
import ".//../node_modules/toastr/build/toastr.css";

//In replacement of @babel/polyfill (as this package has been deprecated since Babel 7.4.0 )
// (these imports are needed to use transpiled generator functions ex: async-await):
import "core-js/stable";
import "regenerator-runtime/runtime";

import * as Toastr from "toastr";

import WeatherApp from "./modules/app";

window.toastr = Toastr;

const app = new WeatherApp();
app.run();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      //console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
