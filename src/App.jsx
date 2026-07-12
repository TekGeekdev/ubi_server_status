import { useHashRoute } from './hooks/useHashRoute';
import { NavMenu } from './components/NavMenu';
import { SiteFooter } from './components/SiteFooter';
import { StatusPage } from './pages/StatusPage';
import { AugmentsPage } from './pages/AugmentsPage';
import { DamagePage } from './pages/DamagePage';
import { ExpertisePage } from './pages/ExpertisePage';

const PAGES = {
  status: StatusPage,
  augments: AugmentsPage,
  damage: DamagePage,
  expertise: ExpertisePage,
};

export default function App() {
  const route = useHashRoute();
  const Page = PAGES[route] || StatusPage;

  return (
    <div className="min-h-screen bg-div2-bg relative">
      {/* Scan line overlay */}
      <div className="fixed inset-0 scan-line pointer-events-none z-0 opacity-40" />

      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(232,128,10,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,128,10,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* max-w-4xl (896px) élargi de 100px pour la lisibilité des tables */}
      <div className="relative z-10 max-w-[996px] mx-auto px-4 py-10">
        <NavMenu route={route} />
        <Page />
        <SiteFooter showRefreshNote={route === 'status'} />
      </div>
    </div>
  );
}
