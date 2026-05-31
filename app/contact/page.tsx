import Contact from '@/components/Contact';

export const metadata = {
  title: 'Contact — Bernard C. Mangulabnan',
  description: 'Get in touch with Bernard Mangulabnan for freelance projects, collaborations, or full-time roles.',
};

export default function ContactPage() {
  return (
    <main className="relative z-10 pt-[60px]">
      <Contact />
    </main>
  );
}
