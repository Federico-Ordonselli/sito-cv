import { notFound } from 'next/navigation';
import { expertise } from '../../../data/expertise';
import ExpertisePage from '../../../components/ExpertisePage';
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = expertise.find(entry => entry.slug === slug);
  return item ? { title: item.tags.join(', '), description: item.short.en, alternates: { canonical: `/competenze/${slug}` } } : {};
}
export default async function Page({ params }) {
  const { slug } = await params;
  if (!expertise.some(item => item.slug === slug)) notFound();
  return <ExpertisePage slug={slug} />;
}
