export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
  pinned?: boolean;
  tags: string[];
}

export const blogPostsKo: BlogPost[] = [
  {
    slug: 'infinite-canvas-from-scratch',
    title: '라이브러리 한계를 만났을 때 — SVG 아핀 변환으로 무한 캔버스 만들기',
    excerpt:
      'react-zoom-pan-pinch의 캔버스 크기 제한에 부딪힌 날, viewBox와 3×3 행렬로 처음부터 다시 설계한 이야기. 60fps를 유지하기 위한 trade-off들.',
    date: '2026.04.18',
    readTime: '12 min',
    tag: 'Canvas',
    pinned: true,
    tags: ['SVG', 'Performance', 'Canvas'],
  },
  {
    slug: 'useRequestCache-hook',
    title: '비동기 응답이 화면을 덮어쓸 때 — 자체 캐시 훅 설계기',
    excerpt:
      '탭/필터를 빠르게 누르면 늦은 응답이 최신 화면을 덮어쓰는 race condition. Closure + Map + Symbol 토큰으로 in-flight 식별하는 훅을 만들었다.',
    date: '2026.03.02',
    readTime: '9 min',
    tag: 'React',
    tags: ['React', 'Hooks', 'Race'],
  },
  {
    slug: 'lighthouse-52-to-87',
    title: 'Lighthouse 52점에서 87점까지 — 번들을 반으로 깎는 4단계',
    excerpt:
      '측정 → 진단 → 동적 임포트 → 폰트 서브셋. 추측하지 않고 숫자로 푸는 성능 개선의 한 사례.',
    date: '2026.02.11',
    readTime: '14 min',
    tag: 'Performance',
    tags: ['Perf', 'Bundle', 'Next.js'],
  },
  {
    slug: 'asp-net-to-nextjs',
    title: 'ASP.NET 레거시를 6주에 Next.js로 — 기능 삭제 없이',
    excerpt:
      '흰 화면 깜빡임 없는 SPA로 옮기되 기존 동작은 100% 유지. 페이지 단위 우선순위와 위험 관리, 그리고 마이그레이션의 사회학.',
    date: '2026.01.20',
    readTime: '11 min',
    tag: 'Migration',
    tags: ['Next.js', 'Legacy', 'SPA'],
  },
  {
    slug: 'zustand-factory-pattern',
    title: '도메인마다 같은 필터 로직을 다시 쓰지 않기 — Zustand 팩토리',
    excerpt:
      'Admin에서 반복되는 필터 store를 제네릭 팩토리로 추상화. 도메인은 타입 인자로만, 액션과 selector는 자동으로.',
    date: '2025.12.04',
    readTime: '7 min',
    tag: 'State',
    tags: ['Zustand', 'TypeScript', 'DX'],
  },
  {
    slug: 'stripe-flow-state-machine',
    title: '결제 플로우를 상태머신으로 모델링하기',
    excerpt:
      'Stripe 결제는 happy path만 다루면 안 된다. 취소·실패·중단·중복 경로를 명시적으로 다루는 단계별 상태 설계.',
    date: '2025.11.18',
    readTime: '10 min',
    tag: 'State',
    tags: ['Stripe', 'FSM', 'Payment'],
  },
  {
    slug: 'gsap-spa-memory-leak',
    title: 'GSAP를 SPA에서 안전하게 — context().revert() 패턴',
    excerpt:
      '라우팅마다 새로 mount되는 GSAP 애니메이션은 메모리 누수의 단골 손님. context로 묶고, unmount 시 revert.',
    date: '2025.10.22',
    readTime: '6 min',
    tag: 'Animation',
    tags: ['GSAP', 'SPA', 'Memory'],
  },
  {
    slug: 'tiptap-12-extensions',
    title: 'TipTap에 12개의 커스텀 확장을 얹기',
    excerpt:
      'Admin CMS 에디터에서 필요한 커스텀 노드 / 마크 / 명령어들. ProseMirror 모델을 이해하는 데 도움된 멘탈 모델 정리.',
    date: '2025.09.30',
    readTime: '13 min',
    tag: 'Editor',
    tags: ['TipTap', 'ProseMirror', 'CMS'],
  },
];

export const blogPostsEn: BlogPost[] = [
  {
    slug: 'infinite-canvas-from-scratch',
    title:
      'When the library hit its limit — building an infinite canvas with SVG affine transforms',
    excerpt:
      'The day react-zoom-pan-pinch hit canvas size limits, I redesigned from scratch with viewBox and 3\u00d73 matrices. The trade-offs for maintaining 60fps.',
    date: '2026.04.18',
    readTime: '12 min',
    tag: 'Canvas',
    pinned: true,
    tags: ['SVG', 'Performance', 'Canvas'],
  },
  {
    slug: 'useRequestCache-hook',
    title: 'When async responses overwrite the screen — designing a custom cache hook',
    excerpt:
      'Rapid tab/filter clicks cause stale responses to overwrite the latest view. Built a hook with closure + Map + Symbol tokens for in-flight identification.',
    date: '2026.03.02',
    readTime: '9 min',
    tag: 'React',
    tags: ['React', 'Hooks', 'Race'],
  },
  {
    slug: 'lighthouse-52-to-87',
    title: 'Lighthouse 52 to 87 — four steps to halving the bundle',
    excerpt:
      'Measure \u2192 diagnose \u2192 dynamic imports \u2192 font subsetting. A performance improvement case driven by numbers, not guesswork.',
    date: '2026.02.11',
    readTime: '14 min',
    tag: 'Performance',
    tags: ['Perf', 'Bundle', 'Next.js'],
  },
  {
    slug: 'asp-net-to-nextjs',
    title: 'ASP.NET legacy to Next.js in 6 weeks — zero feature deletions',
    excerpt:
      'Migrating to a flash-free SPA while maintaining 100% feature parity. Page-level prioritization, risk management, and the sociology of migration.',
    date: '2026.01.20',
    readTime: '11 min',
    tag: 'Migration',
    tags: ['Next.js', 'Legacy', 'SPA'],
  },
  {
    slug: 'zustand-factory-pattern',
    title: 'Stop rewriting the same filter logic per domain — Zustand factory',
    excerpt:
      'Abstracted repeated filter stores in Admin into a generic factory. Domains are just type arguments; actions and selectors come automatically.',
    date: '2025.12.04',
    readTime: '7 min',
    tag: 'State',
    tags: ['Zustand', 'TypeScript', 'DX'],
  },
  {
    slug: 'stripe-flow-state-machine',
    title: 'Modeling the payment flow as a state machine',
    excerpt:
      "Stripe payments can't just handle the happy path. Explicit state design for cancellation, failure, interruption, and duplication paths.",
    date: '2025.11.18',
    readTime: '10 min',
    tag: 'State',
    tags: ['Stripe', 'FSM', 'Payment'],
  },
  {
    slug: 'gsap-spa-memory-leak',
    title: 'Using GSAP safely in SPAs — the context().revert() pattern',
    excerpt:
      'GSAP animations that re-mount on every route are a classic memory leak. Bundle with context, revert on unmount.',
    date: '2025.10.22',
    readTime: '6 min',
    tag: 'Animation',
    tags: ['GSAP', 'SPA', 'Memory'],
  },
  {
    slug: 'tiptap-12-extensions',
    title: 'Adding 12 custom extensions to TipTap',
    excerpt:
      'Custom nodes, marks, and commands needed for the Admin CMS editor. A mental model guide for understanding the ProseMirror model.',
    date: '2025.09.30',
    readTime: '13 min',
    tag: 'Editor',
    tags: ['TipTap', 'ProseMirror', 'CMS'],
  },
];

export const blogTagsKo = [
  'All',
  'Canvas',
  'React',
  'Performance',
  'Migration',
  'State',
  'Animation',
  'Editor',
];

export const blogTagsEn = [
  'All',
  'Canvas',
  'React',
  'Performance',
  'Migration',
  'State',
  'Animation',
  'Editor',
];
