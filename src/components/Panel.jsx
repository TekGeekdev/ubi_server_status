export function Panel({ title, hint, action, children }) {
  return (
    <section className="relative bg-div2-surface border border-div2-border clip-panel p-5 mb-7">
      <span className="absolute top-0 left-0 w-12 h-0.5 bg-div2-orange" />
      <div className="flex justify-between items-baseline flex-wrap gap-2 mb-4">
        <h2 className="text-base font-bold uppercase tracking-widest text-div2-text">{title}</h2>
        <div className="flex items-baseline flex-wrap gap-3">
          {hint && <span className="text-xs text-div2-muted/70">{hint}</span>}
          {action}
        </div>
      </div>
      {children}
    </section>
  );
}
