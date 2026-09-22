'use client';
import { useLanguage } from './SiteShell';
import ProjectsPage from '../views/ProjectsPage';
import AboutPage from '../views/AboutPage';
import HobbiesPage from '../views/HobbiesPage';
import CertificationsPage from '../views/CertificationsPage';
const pages = { projects: ProjectsPage, about: AboutPage, hobbies: HobbiesPage, certifications: CertificationsPage };
export default function LegacyPage({ page }) {
  const { lang } = useLanguage();
  const Component = pages[page];
  return <Component lang={lang} />;
}
