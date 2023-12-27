import Image from 'next/image';
import Link from 'next/link';
import LinkIcon from './components/LinkIcon';
import Header from './components/Header';
import InfoTag from './components/InfoTag';
import ProjectCard from './components/ProjectCard';

export default function Home() {
  return (
    <main className='main_wrap'>
      <Header />
      <ProjectCard title='the.times.pilot: Tailoring Your NY Times Digest'
        desc='Effortlessly gather and get important stories through a personalized news aggregator and daily email subscription.'
        stack={['Figma', 'TypeScript', 'React', 'Next.js', 'Storybook', 'SCSS', 'NoSQL', 'Twilio SendGrid']}
      />
    </main>
  );
}
