# Fieldnotes

A small React demo workspace designed to keep working after its app shell has
been cached by the browser. It includes a dashboard, locally saved notes, an
offline test lab, an about page, and a demo message form.

## Run locally

```bash
npm install
npm start
```

The development server is useful for building and checking the UI, but offline
tests should use the production build because the service worker is registered
only in production.

## Build and deploy

```bash
npm run build
```

Deploy the contents of `build` to a host that serves the site over HTTPS (or
use `localhost` for local testing). The service worker precaches the app shell
and serves the cached app for client-side routes.

## Test without internet

1. Open the deployed app in the browser you want to test, while online.
2. Wait for the app to finish loading and for the service worker to install.
   If needed, reload once so the newly installed worker controls the page.
3. Open **Offline lab** and try the counter and checklist.
4. Turn off Wi-Fi or enable airplane mode, then reload the deployed URL.
5. Visit **My notes**, create and pin a note, search for it, and navigate to
   the other pages. Reload and check that it remains saved.

The first visit needs a connection to download the app. Offline availability
is scoped to the same browser, device, and deployed origin; clearing site data
removes the app cache and locally saved data. Notes, checklist progress, and
demo messages are stored in browser local storage and are not synced or sent
to a server. The connection badge reflects the browser's online/offline signal,
which does not guarantee that the internet itself is reachable.
