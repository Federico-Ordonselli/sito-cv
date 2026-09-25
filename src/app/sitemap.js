import { expertise } from '../data/expertise';
import { caseStudies } from '../data/caseStudies';
export default function sitemap() {
  return ['', '/projects', '/about', '/certifications', '/hobbies', ...caseStudies.map(item => `/projects/${item.slug}`), ...expertise.map(item => `/competenze/${item.slug}`)].map(path => ({ url: `https://ordonselli.info${path}` }));
}

