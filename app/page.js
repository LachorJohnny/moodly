import Hero from '@/components/Hero';
import Main from '@/components/Main';
import { Fugaz_One } from 'next/font/google';

const fugazOne = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export default function HomePage() {
  return (
    <Main>
      <Hero fugazOne={fugazOne.className} />
    </Main>
  );
}
