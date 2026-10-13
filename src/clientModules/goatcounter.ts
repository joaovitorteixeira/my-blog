import type { ClientModule } from "@docusaurus/types";

declare global {
  interface Window {
    goatcounter?: { count: (vars?: { path?: string }) => void };
  }
}

// count.js tracks the initial page load on its own; this tracks client-side
// navigations, which a single-page app never reports as new page loads.
const module: ClientModule = {
  onRouteDidUpdate({ location, previousLocation }) {
    if (!previousLocation || location.pathname === previousLocation.pathname) {
      return;
    }
    window.goatcounter?.count({ path: location.pathname + location.search });
  },
};

export default module;
