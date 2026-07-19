interface SectionHeadingProps {
  eyebrow: string
  title: string
  description: string
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) => (
  <div className="section-heading">
    <p className="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
)
