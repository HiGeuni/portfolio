export const portfolioKo = {
  name: 'Higeuni',
  fullName: '김효근',
  title: 'Frontend Engineer',
  tagline: 'Measure. Define. Then build.',
  email: 'khyogeun_@naver.com',
  github: 'https://github.com/HiGeuni',
  linkedin: 'https://www.linkedin.com/in/hyogeun-kim-b7b203272/',
  site: 'higeuni.com',
  experienceYears: '2',

  highlights: [
    { metric: '46%', label: '번들 사이즈 절감', context: 'Awarelab Membership' },
    { metric: '9s → 3.8s', label: 'LCP 개선', context: 'Lighthouse 52 → 87' },
    { metric: '60fps', label: '무한 캔버스 유지', context: 'SVG 아핀 변환 직접 구현' },
    { metric: '80%', label: '배포 리드타임 단축', context: '10분 → 2분' },
  ],

  principles: [
    {
      n: '01',
      t: 'Measure first.',
      d: '@next/bundle-analyzer · Lighthouse · 추측이 아니라 진단으로 시작합니다.',
    },
    {
      n: '02',
      t: 'Name the boundary.',
      d: '라이브러리 한계인지, 도메인 한계인지, 사용자 기대치 한계인지 — 어디서 막힌지 정확히 부릅니다.',
    },
    {
      n: '03',
      t: 'Define before you build.',
      d: 'race condition · 메모리 누수 · 캔버스 크기 한계 — 문제를 한 줄로 정의한 다음에야 코드를 씁니다.',
    },
    {
      n: '04',
      t: 'Ship with numbers.',
      d: 'LCP −44%, 번들 −46%, 60fps — 결과는 측정 가능한 숫자로.',
    },
  ],

  problemProjects: [
    {
      id: 'awarelab-membership',
      route: '/case/awarelab/',
      name: 'Awarelab Membership',
      year: '2025',
      problemQ: '왜 메인에서 LCP가 9초가 나올까?',
      problemDef:
        '원인은 첫 번들에 통째로 들어간 CMS·차트 라이브러리. 동시에 탭 전환이 빨라지면 늦은 응답이 최신 화면을 덮어쓰는 race condition도 재현되었습니다.',
      answer: 'Lighthouse 52 → 87, 번들 −46%',
      stack: ['Next.js', 'TypeScript', 'Stripe', 'Zustand'],
    },
    {
      id: 'kumo-factory',
      route: '/case/kumo/',
      name: 'Kumo Factory',
      year: '2023',
      problemQ: '라이브러리가 캔버스 크기 한계에 부딪힐 때, 어디까지가 라이브러리 책임인가?',
      problemDef:
        'react-zoom-pan-pinch는 내부 transform 컨테이너에 한계가 있어 일정 규모를 넘으면 잘림. 패치 가능 범위를 넘어선 구조적 한계로 정의.',
      answer: 'SVG viewBox + 3×3 affine matrix · 60fps',
      stack: ['SVG', 'Affine', 'Zustand', 'SSE'],
    },
    {
      id: 'prestige',
      route: '/case/prestige/',
      name: 'The Prestige',
      year: '2024',
      problemQ: 'ASP.NET 레거시의 진짜 문제는 무엇인가?',
      problemDef:
        '기능이 아니라 페이지 전환마다 발생하는 전체 새로고침이 의료원 시연에서 첫인상을 깎는 핵심 원인. 마이그레이션 목표는 SPA 경험을 6주 안에.',
      answer: '8개 페이지 마이그레이션 · 배포 −80%',
      stack: ['Next.js', 'Recoil', 'Kakao Map'],
    },
  ],

  experience: [
    {
      company: 'Awarelab',
      role: 'Frontend Engineer',
      period: '2025.04 — 2026.03',
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
    awards: [
      'ACM-ICPC Seoul Regional 2023, Honorable Mention',
      'SeoulTech Algorithm Contest 3rd (2022)',
      'GBDCON Data Analysis Hackathon Award (2022)',
    ],
  },

  timeline: [
    { y: '2021–2023', t: 'Computer Graphics Lab · Researcher' },
    { y: '2022', t: 'SeoulTech Algorithm Contest · 3rd' },
    { y: '2023', t: 'ACM-ICPC Seoul Regional · 1st-author paper · CIA' },
    { y: '2023', t: 'SW Maestro 14th · Kumo Factory' },
    { y: '2024', t: 'B.S. Computer Science · Seoul Tech' },
    { y: '2024', t: '→ The Prestige · Daqda' },
    { y: '2025–2026', t: '→ Awarelab · Frontend' },
  ],
} as const;

export const portfolioEn = {
  name: 'Higeuni',
  fullName: 'HyoGeun Kim',
  title: 'Frontend Engineer',
  tagline: 'Measure. Define. Then build.',
  email: 'khyogeun_@naver.com',
  github: 'https://github.com/HiGeuni',
  linkedin: 'https://www.linkedin.com/in/hyogeun-kim-b7b203272/',
  site: 'higeuni.com',
  experienceYears: '2',

  highlights: [
    { metric: '46%', label: 'Bundle size reduction', context: 'Awarelab Membership' },
    { metric: '9s → 3.8s', label: 'LCP improvement', context: 'Lighthouse 52 → 87' },
    { metric: '60fps', label: 'Infinite canvas', context: 'Custom SVG affine transforms' },
    { metric: '80%', label: 'Deploy lead time cut', context: '10 min → 2 min' },
  ],

  principles: [
    {
      n: '01',
      t: 'Measure first.',
      d: '@next/bundle-analyzer · Lighthouse · Start with diagnosis, not guesswork.',
    },
    {
      n: '02',
      t: 'Name the boundary.',
      d: 'Library limitation, domain constraint, or user expectation — name exactly where you are stuck.',
    },
    {
      n: '03',
      t: 'Define before you build.',
      d: 'Race conditions · memory leaks · canvas size limits — define the problem in one sentence before writing code.',
    },
    {
      n: '04',
      t: 'Ship with numbers.',
      d: 'LCP −44%, bundle −46%, 60fps — results in measurable numbers.',
    },
  ],

  problemProjects: [
    {
      id: 'awarelab-membership',
      route: '/case/awarelab/',
      name: 'Awarelab Membership',
      year: '2025',
      problemQ: 'Why was the main page LCP 9 seconds?',
      problemDef:
        'The root cause was the CMS and chart libraries bundled entirely in the initial payload. Simultaneously, rapid tab switching triggered a race condition where stale responses overwrote the latest view.',
      answer: 'Lighthouse 52 → 87, bundle −46%',
      stack: ['Next.js', 'TypeScript', 'Stripe', 'Zustand'],
    },
    {
      id: 'kumo-factory',
      route: '/case/kumo/',
      name: 'Kumo Factory',
      year: '2023',
      problemQ: 'When a library hits canvas size limits, where does its responsibility end?',
      problemDef:
        'react-zoom-pan-pinch had structural limitations in its internal transform container — content was clipped beyond a certain scale. Defined as a structural limitation beyond patchable scope.',
      answer: 'SVG viewBox + 3×3 affine matrix · 60fps',
      stack: ['SVG', 'Affine', 'Zustand', 'SSE'],
    },
    {
      id: 'prestige',
      route: '/case/prestige/',
      name: 'The Prestige',
      year: '2024',
      problemQ: 'What was the real problem with ASP.NET legacy?',
      problemDef:
        'Not features — the full page refresh on every navigation was killing first impressions during hospital demos. Migration goal: SPA experience in 6 weeks.',
      answer: '8-page migration · deploy −80%',
      stack: ['Next.js', 'Recoil', 'Kakao Map'],
    },
  ],

  experience: [
    {
      company: 'Awarelab',
      role: 'Frontend Engineer',
      period: '2025.04 — 2026.03',
      type: 'Full-time',
      summary: 'Investment portfolio analysis membership platform. Sole frontend engineer.',
      stack: ['Next.js', 'TypeScript', 'Stripe', 'Directus', 'TanStack', 'TipTap', 'next-intl'],
    },
    {
      company: 'Daqda',
      role: 'Frontend Engineer',
      period: '2024.06 — 2025.03',
      type: 'Full-time',
      summary: 'ASP.NET legacy migration, burial site visualization, gift e-commerce.',
      stack: ['Next.js', 'Vite', 'Recoil', 'Zustand', 'Kakao Map', 'Vercel'],
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
    awards: [
      'ACM-ICPC Seoul Regional 2023, Honorable Mention',
      'SeoulTech Algorithm Contest 3rd (2022)',
      'GBDCON Data Analysis Hackathon Award (2022)',
    ],
  },

  timeline: [
    { y: '2021–2023', t: 'Computer Graphics Lab · Researcher' },
    { y: '2022', t: 'SeoulTech Algorithm Contest · 3rd' },
    { y: '2023', t: 'ACM-ICPC Seoul Regional · 1st-author paper · CIA' },
    { y: '2023', t: 'SW Maestro 14th · Kumo Factory' },
    { y: '2024', t: 'B.S. Computer Science · Seoul Tech' },
    { y: '2024', t: '→ The Prestige · Daqda' },
    { y: '2025–2026', t: '→ Awarelab · Frontend' },
  ],
} as const;
