// Canonical production URL. Override locally with NEXT_PUBLIC_SITE_URL in
// .env.local (e.g. http://localhost:3000) if you need dev-accurate metadata.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bernardmangulabnan.com'
).replace(/\/$/, '');

export const GITHUB_URL = 'https://github.com/Mangulabnan-Bernard';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/bernard-mangulabnan';

export const PROJECT_URLS = {
  rentahuman: 'https://rentahuman-web.vercel.app/',
  touristspots: 'https://touristspots-nine.vercel.app/',
  barangay: 'https://www.barangay-incident-complaint.bernardmangulabnan.com/',
  devpath: 'https://www.devpath.bernardmangulabnan.com/',
  all4home: 'https://www.all4homev2.bernardmangulabnan.com/',
} as const;

export const GITHUB_REPOS = {
  touristspots: `${GITHUB_URL}/touristspots`,
  rentahumanWeb: `${GITHUB_URL}/rentahuman_web`,
  atmGo: `${GITHUB_URL}/ATMGo`,
  anongUlam: `${GITHUB_URL}/Anong-Ulam-Today`,
  barangay: `${GITHUB_URL}/Barangay-Incident-Complaint-Report-System`,
  devpath: `${GITHUB_URL}/devpath-hub`,
  all4home: `${GITHUB_URL}/all4homev2`,
} as const;
