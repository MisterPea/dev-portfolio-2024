import Link from "next/link";
import InfoTag from "./InfoTag";
import createId from "./createId";
import SingleImage from "./SingleImage";
import ExportedImage from "next-image-export-optimizer";


interface ProjectCardProps {
  title: string;
  desc: string;
  stack: string[];
  slug: string;
  image: any;
}

export default function ProjectCard({ title, desc, stack, slug, image }: ProjectCardProps) {
  const { defaultImage } = image;
  const id = createId();

  return (
    <Link href={`work/${slug}`}>
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
        <div className="project_card-image_wrap">
          <div className="image-placeholder">
            <ExportedImage
              src={defaultImage.img}
              alt={defaultImage.alt}
              style={{ objectFit: "cover" }}
              priority
              fill
            />
          </div>
          <p className="project_card-cta">View Case Study <span className="project_card-cta-arrow"> →</span></p>
        </div>
      </div>
    </Link>
  );
}