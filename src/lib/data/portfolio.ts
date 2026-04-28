export const portfolio = {
  name: 'Higeuni',
  fullName: '김효근',
  title: 'Frontend Engineer',
  tagline: 'Zero-to-one builder shipping React, Next.js, TypeScript at scale.',
  email: 'khyogeun_@naver.com',
  phone: '+82 10-4697-3837',
  site: 'higeuni.com',

  highlights: [
    { metric: '46%', label: '번들 사이즈 절감', context: 'Awarelab Membership' },
    { metric: '9s → 3.8s', label: 'LCP 개선', context: 'Lighthouse 52 → 87' },
    { metric: '60fps', label: '무한 캔버스 유지', context: 'SVG 아핀 변환 직접 구현' },
    { metric: '80%', label: '배포 리드타임 단축', context: '10분 → 2분' },
  ],

  experience: [
    {
      company: 'Awarelab',
      role: 'Lead Software Engineer',
      period: '2025.04 — Present',
      type: '정규직',
      summary: '투자 포트폴리오 분석 멤버십 플랫폼. 프론트엔드 단독 담당.',
      stack: ['Next.js', 'TypeScript', 'Stripe', 'Directus', 'TanStack', 'TipTap', 'next-intl'],
    },
    {
      company: 'Daqda',
      role: 'Frontend Engineer',
      period: '2024.06 — 2025.03',
      type: '정규직',
      summary: 'ASP.NET 레거시 마이그레이션, 장지 위치 시각화, 답례품 커머스.',
      stack: ['Next.js', 'Vite', 'Recoil', 'Zustand', 'Kakao Map', 'Vercel'],
    },
  ],

  projects: [
    {
      id: 'awarelab-membership',
      name: 'Awarelab Membership',
      year: '2025',
      role: 'Lead, Frontend (단독)',
      tagline: 'Lighthouse 52 → 87. 번들 46% 절감.',
      metrics: [
        { k: 'Lighthouse', v: '52 → 87' },
        { k: 'LCP', v: '9.0s → 3.8s' },
        { k: 'Bundle', v: '−46%' },
        { k: 'CLS', v: '0.126 → 0' },
      ],
    },
    {
      id: 'kumo-factory',
      name: 'Kumo Factory',
      year: '2023',
      role: 'Frontend (단독)',
      tagline: '60fps 무한 캔버스를 처음부터 직접.',
      metrics: [
        { k: 'Frame', v: '60 fps' },
        { k: 'Memory', v: '−30%' },
        { k: 'API calls', v: '−50%' },
        { k: 'SSE latency', v: '<100ms' },
      ],
    },
    {
      id: 'prestige',
      name: 'The Prestige',
      year: '2024',
      role: 'Frontend (단독)',
      tagline: 'ASP.NET → Next.js, 8 페이지를 6주에.',
      metrics: [
        { k: 'Pages', v: '8 / 6 wks' },
        { k: 'Deploy', v: '−80%' },
        { k: 'Refresh', v: '0' },
      ],
    },
  ],

  skills: {
    Core: ['TypeScript', 'React', 'Next.js', 'JavaScript'],
    State: ['Zustand', 'Recoil', 'TanStack Query', 'Immer'],
    Style: ['CSS', 'Emotion', 'Tailwind'],
    Tooling: ['Vite', 'Vitest', 'MSW', 'Lerna', 'Vercel'],
    Concepts: ['FSD', 'SSE', 'Affine Transform', 'RBAC', 'i18n'],
  },

  education: {
    school: 'Seoul National University of Science and Technology',
    degree: 'B.S. Computer Science',
    period: '2018 — 2024',
    paper: 'Towards Interactive Group Experiences in Virtual Reality (CIA 2023, 1st author)',
    awards: ['ACM-ICPC Seoul Regional 2018, Honorable Mention', 'SeoulTech Algorithm Contest, 3rd'],
  },
} as const;

export const routeMap: Record<string, string> = {
  'awarelab-membership': '/case/awarelab/',
  'kumo-factory': '/case/kumo/',
  prestige: '/case/prestige/',
};
