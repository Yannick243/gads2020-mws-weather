import { registerRoute } from 'workbox-routing';
import { precacheAndRoute } from 'workbox-precaching';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { skipWaiting, clientsClaim, setCacheNameDetails } from 'workbox-core';

skipWaiting();
clientsClaim();

const CACHE_NAME = 'smash-weather-static';

setCacheNameDetails({
  prefix: CACHE_NAME,
  suffix: 'v1',
  precache: 'install-time',
  runtime: 'run-time',
  googleAnalytics: 'ga',
});

//we want our JavaScript files to come from the network whenever possible,
//but fallback to the cached version if the network fails
registerRoute(
  ({ request }) => request.destination === 'script',
  new NetworkFirst()
);

registerRoute(
  ({ url }) => url.origin === 'https://api.openweathermap.org/data/2.5/',
  new StaleWhileRevalidate()
);

precacheAndRoute(self.__WB_MANIFEST);
