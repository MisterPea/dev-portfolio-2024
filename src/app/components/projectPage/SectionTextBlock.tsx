interface SectionTextBlockProps {
  title: string;
  body?: string;
  list_items?: string[];
}

export default function SectionTextBlock({ title, body, list_items }: SectionTextBlockProps) {
  return (
    <section className="project_page-section project_page-main_section">
      <h2>{title}</h2>
      {body?.length && <p>{body}</p>}
      {list_items && list_items.length > 0 && (
        <ul className="project_page-main_section-ul">
          {list_items.map((element) => (
            <li key={element}>{element}</li>
          ))}
        </ul>
      )}
    </section>
  );
}