
/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core";

import {
  precacheAndRoute,
  createHandlerBoundToURL
} from "workbox-precaching";

import {
  registerRoute,
  NavigationRoute
} from "workbox-routing";

// Activate updated service worker without
// requiring a second browser session.
clientsClaim();

// CRA automatically injects the list of build files.
// These include index.html, JavaScript, CSS,
// and bundled static assets.
precacheAndRoute(self.__WB_MANIFEST);

// Always use cached index.html for SPA navigation.
// React Router will render the correct page
// based on the browser URL.

const navigationHandler = createHandlerBoundToURL(
  process.env.PUBLIC_URL + "/index.html"
);

const navigationRoute = new NavigationRoute(
  navigationHandler,
  {
    // Do not treat requests for actual files as
    // React Router navigation requests.
    denylist: [
      /\/[^/?]+\.[^/]+$/
    ]
  }
);

registerRoute(navigationRoute);

// Allow application updates to activate
// when explicitly requested.
self.addEventListener("message", (event) => {
  if (
    event.data &&
    event.data.type === "SKIP_WAITING"
  ) {
    self.skipWaiting();
  }
});
