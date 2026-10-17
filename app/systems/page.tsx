import type { Metadata } from 'next';
import SystemsExplorer from '@/components/portfolio/SystemsExplorer';

export const metadata: Metadata = {
  title: 'Skills & Tools',
  description: 'See the web, mobile, backend, machine-learning, and development tools Bernard Mangulabnan uses.',
};

export default function SystemsPage() {
  return <main id="main"><SystemsExplorer/></main>;
}
