import Header from './components/Header';
import ProjectCard from './components/ProjectCard';

export default function Home() {
  return (
    <main className='main_wrap'>
      <Header />
      <ul className='project_card_wrap'>
        <li className='project_card-li'>
          <ProjectCard title='the.times.pilot: Tailoring Your NY Times Digest'
            desc='Effortlessly gather and get important stories through a personalized news aggregator and daily email subscription.'
            stack={['Figma', 'TypeScript', 'React', 'Next.js', 'Storybook', 'SCSS', 'NoSQL', 'Twilio SendGrid']}
          />
        </li>
        <li className='project_card-li'>
          <ProjectCard title='the.times.pilot: Tailoring Your NY Times Digest'
            desc='Effortlessly gather and get important stories through a personalized news aggregator and daily email subscription.'
            stack={['Figma', 'TypeScript', 'React', 'Next.js', 'Storybook', 'SCSS', 'NoSQL', 'Twilio SendGrid']}
          />
        </li>
      </ul>
    </main>
  );
}
