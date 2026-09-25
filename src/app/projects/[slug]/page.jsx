import { notFound } from 'next/navigation';
import { getCaseStudy } from '../../../data/caseStudies';
import CaseStudyPage from '../../../components/CaseStudyPage';
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getCaseStudy(slug);
  return item ? { title: item.title, description: item.intro.en, alternates: { canonical: `/projects/${slug}` } } : {};
}
export default async function Page({ params }) {
  const { slug } = await params;
  if (!getCaseStudy(slug)) notFound();
  return <CaseStudyPage slug={slug} />;
}
