import { useEffect, useState } from 'react';

export const ROUTES = ['status', 'augments', 'damage'];
const DEFAULT_ROUTE = 'status';

function parseRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  return ROUTES.includes(hash) ? hash : DEFAULT_ROUTE;
}

// Routing minimal par hash (#/augments) : évite d'ajouter react-router
// pour deux pages, et survit à un rechargement / lien direct.
export function useHashRoute() {
  const [route, setRoute] = useState(parseRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}
