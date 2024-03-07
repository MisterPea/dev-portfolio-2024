interface SectionTextBlockProps {
  title: string;
  body?: string;
  list_items?: string[];
  isSubsection?: boolean;
  children?: React.ReactNode;
}

// Can be used as a way to create section titles and text or as that and a section wrapper
export default function SectionTextBlock({ title, body, list_items, isSubsection = false, children }: SectionTextBlockProps) {

  const createClassName = (title: string) => {
    const regex = /(?<=\p{L}) (?=\p{L})|\/|:| /gu;
    const cleanedClass = title.split(regex);
    return 'section-' + cleanedClass.filter(Boolean).join('_').toLowerCase();
  };

  return (
    <section className={`project_page-section ${createClassName(title)}`}>
      {!isSubsection && <h3>{title}</h3>}
      {isSubsection && <h4 className="subsection_title">{title}</h4>}
      {body?.length && <p>{body}</p>}
      {list_items && list_items.length > 0 && (
        <ul>
          {list_items.map((element) => {
            const [preamble, body] = element.split(': ');
            if (body) {
              return (
                <li key={element}><u>{preamble}</u>{`: ${body}`}</li>
              );
            } else {
              return (
                <li key={element}>{element}</li>
              );
            }
          })}
        </ul>
      )}
      {children && children}
    </section>
  );
}