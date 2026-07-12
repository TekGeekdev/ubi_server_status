// Pictogrammes des matériaux d'expertise, inspirés des icônes du jeu
// (traits simples, currentColor pour hériter de la couleur de colonne)
const ICONS = {
  steel: (
    // Poutre en I
    <>
      <path d="M6 5h12M6 19h12" />
      <path d="M9 5v2.5c0 1-.8 1.8-.8 1.8v5.4s.8.8.8 1.8V19M15 5v2.5c0 1 .8 1.8.8 1.8v5.4s-.8.8-.8 1.8V19" />
    </>
  ),
  titanium: (
    // Éclat en étoile
    <path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z" />
  ),
  receiverComponents: (
    // Silhouette de récepteur d'arme
    <path d="M4 9h13l3-2v5h-3l-1.5 2.5h-5.5L9 18H6l1.2-3.5H4z" />
  ),
  polycarbonate: (
    // Grappe d'hexagones
    <>
      <path d="M8.5 4.5l2.6 1.5v3L8.5 10.5 5.9 9V6z" />
      <path d="M16 7.5l2.6 1.5v3L16 13.5 13.4 12V9z" />
      <path d="M9.5 13l2.6 1.5v3L9.5 19 6.9 17.5v-3z" />
    </>
  ),
  carbonFiber: (
    // Bobines de fibre
    <>
      <ellipse cx="8" cy="7.5" rx="3.2" ry="1.6" />
      <path d="M4.8 7.5v7.5c0 .9 1.4 1.6 3.2 1.6s3.2-.7 3.2-1.6V7.5" />
      <ellipse cx="16.5" cy="10" rx="3" ry="1.5" />
      <path d="M13.5 10v6.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5V10" />
    </>
  ),
  protectiveFabric: (
    // Rouleau de tissu rayé
    <>
      <circle cx="7" cy="12" r="3.2" />
      <path d="M7 8.8h9.5c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2H7" />
      <path d="M11.5 8.8l-2 6.4M15.5 8.8l-2 6.4" />
    </>
  ),
  ceramic: (
    // Plaques empilées
    <>
      <path d="M4 10l8-4 8 4-8 4z" />
      <path d="M4 14l8 4 8-4" />
    </>
  ),
  electronics: (
    // Puce à broches
    <>
      <rect x="7.5" y="7.5" width="9" height="9" />
      <path d="M10 7.5V4.5M14 7.5V4.5M10 19.5v-3M14 19.5v-3M7.5 10h-3M7.5 14h-3M19.5 10h-3M19.5 14h-3" />
    </>
  ),
  printerFilament: (
    // Bobine de filament
    <>
      <circle cx="11.5" cy="11" r="6.5" />
      <circle cx="11.5" cy="11" r="2.2" />
      <path d="M16.5 15.5L21 20" />
    </>
  ),
  shdCalibration: (
    // Cadran de calibrage
    <>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 5v2.5M12 16.5V19M5 12h2.5M16.5 12H19" />
      <circle cx="12" cy="12" r="1.4" />
    </>
  ),
  fieldReconData: (
    // Signal radar
    <>
      <path d="M4 20a16 16 0 0 1 16-16" />
      <path d="M5 11.5A8.5 8.5 0 0 1 11.5 5" />
      <circle cx="6" cy="18" r="1.8" />
    </>
  ),
  exoticComponents: (
    // Gemme exotique
    <>
      <path d="M7 9h10l-5 10z" />
      <path d="M7 9l2.5-4h5L17 9M9.5 5L12 19M14.5 5L12 19" />
    </>
  ),
};

export function MaterialIcon({ material, className = 'w-4 h-4' }) {
  const icon = ICONS[material];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icon}
    </svg>
  );
}
