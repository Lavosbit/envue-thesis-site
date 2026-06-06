export function SectionHeading({ headingId, number, title }: { headingId?: string; number: string; title: string }) {
  return (
    <div className="section-heading">
      <span>{number}</span>
      <h2 id={headingId}>{title}</h2>
    </div>
  );
}
