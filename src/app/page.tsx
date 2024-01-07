import ProjectCard from './components/ProjectCard';
import siteContent from "./siteContent.json";

export default function Home() {

  return (
    <main className='main_wrap'>
     
      <ul className='project_card_wrap'>
        {siteContent.map(({ title, stack, slug, description, image_url }, index) => (
          <li className='project_card-li' key={`${index}-${slug}`}>
            <ProjectCard title={title}
              desc={description}
              stack={stack}
              slug={slug}
              image={image_url}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
