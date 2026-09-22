import { expertise } from '../data/expertise';
export default function sitemap() {
  return ['', '/projects', '/about', '/certifications', '/hobbies', ...expertise.map(item => `/competenze/${item.slug}`)].map(path => ({ url: `https://ordonselli.info${path}` }));
}

