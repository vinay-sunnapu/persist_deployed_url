
export function register() {
  // Only register for production builds.
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  if (!("serviceWorker" in navigator)) {
    console.log("Service workers are not supported.");
    return;
  }

  window.addEventListener("load", () => {
    const swUrl =
      process.env.PUBLIC_URL + "/service-worker.js";

    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log(
          "Service Worker registered:",
          registration.scope
        );

        // Check for a new version when
        // the app starts.
        registration.update().catch((error) => {
          console.log("Update check failed:", error);
        });
      })
      .catch((error) => {
        console.error(
          "Service Worker registration failed:",
          error
        );
      });
  });
}
