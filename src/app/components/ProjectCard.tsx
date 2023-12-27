import InfoTag from "./InfoTag";
import createId from "./createId";

interface ProjectCardProps {
  title: string;
  desc: string;
  stack: string[];
  // image
}

export default function ProjectCard({ title, desc, stack }: ProjectCardProps) {
  const id = createId();
  return (
    <div className="project_card">
      <div className="project_card-text">
        <h1>{title}</h1>
        <summary>{desc}</summary>
        <ul className="project_card-stack_ul">{
          stack.map((elem, index) => (
            <li key={`${index}-${id}`}><InfoTag label={elem} /></li>
          ))
        }</ul>
      </div>
      <div className="image-placeholder" />
      <p className="project_card-cta">View Case Study →</p>
    </div>
  );
}