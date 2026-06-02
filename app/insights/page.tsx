import type { Metadata } from 'next';
import InsightsDashboard from '@/components/InsightsDashboard';

// Private page — keep it out of search engines and crawlers.
export const metadata: Metadata = {
  title: 'Analytics',
  robots: { index: false, follow: false },
};

export default function InsightsPage() {
  return (
    <main className="relative z-10 pt-[60px]">
      <InsightsDashboard />
    </main>
  );
}
