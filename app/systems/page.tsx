import type { Metadata } from 'next';
import SystemsExplorer from '@/components/portfolio/SystemsExplorer';

export const metadata: Metadata = {
  title: 'Systems & Practice',
  description: 'Explore the web, mobile, data, and delivery systems behind Bernard Mangulabnan’s work.',
};

export default function SystemsPage() {
  return <main id="main"><SystemsExplorer/></main>;
}
