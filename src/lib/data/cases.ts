export interface CaseMetric {
  k: string;
  before?: string;
  after: string;
  delta: string;
  note: string;
}

export interface CaseDecision {
  n: string;
  title: string;
  body: string;
}

export interface CaseCode {
  label: string;
  title: string;
  desc: string;
  body: string;
}

export interface CaseContext {
  k: string;
  v: string;
}

export interface CaseData {
  q: string;
  oneLiner: string;
  why: string;
  problemQ: string;
  problemDef: string;
  year: string;
  label: string;
  role: string;
  stackBadge: string;
  route: string;
  metrics: CaseMetric[];
  context?: CaseContext[];
  decisions: CaseDecision[];
  code?: CaseCode;
  outcomeHeadline: string;
  outcomes: string[];
  relatedPosts: string[];
}

export const caseAwarelabKo: CaseData = {
  q: '왜 메인에서 LCP가 9초가 나올까?',
  oneLiner: '투자 포트폴리오 분석 멤버십 플랫폼.',
  why: '처음부터 결제까지 도는 멤버십 제품을 한 분기 안에 출시해야 했고, 프론트엔드를 맡을 사람은 나 한 명이었습니다. 마케팅 사이트·어드민·CMS 에디터·다국어를 한 사람이 일관된 아키텍처로 설계하면 더 빠르고 흔들림이 없겠다고 판단해 단독으로 맡았습니다.',
  problemQ: '왜 메인에서 LCP가 9초가 나올까?',
  problemDef:
    '원인을 추정하지 않고 진단부터: @next/bundle-analyzer로 본 결과, 첫 번들에 CMS와 차트 라이브러리가 통째로 들어가 있었습니다. 동시에 포트폴리오 탭/필터를 빠르게 전환하면 늦게 도착한 응답이 최신 화면을 덮어쓰는 race condition도 재현되었습니다.',
  year: '2025',
  label: 'Awarelab Membership',
  role: 'Frontend Engineer · Solo frontend',
  stackBadge: 'Next.js · Stripe · Directus',
  route: '/case/awarelab/',
  metrics: [
    { k: 'LIGHTHOUSE', before: '52', after: '87', delta: '+35', note: 'Performance score' },
    { k: 'LCP', before: '9.0s', after: '3.8s', delta: '−44%', note: 'Largest Contentful Paint' },
    { k: 'BUNDLE', before: '100%', after: '54%', delta: '−46%', note: 'Initial JS payload' },
    { k: 'CLS', before: '0.126', after: '0', delta: '−100%', note: 'Layout shift' },
  ],
  context: [
    { k: 'PRODUCT', v: 'Investment portfolio analysis · subscription' },
    { k: 'TIMELINE', v: '2025.04 → 2026.03 (11 months)' },
    { k: 'TEAM', v: '5 total · 4 dev · 1 frontend (me)' },
    { k: 'SCOPE', v: 'Marketing + Admin + CMS editor + i18n' },
    { k: 'STACK', v: 'Next.js · TypeScript · Stripe · Directus' },
    { k: 'I OWNED', v: 'Architecture · perf · payments · deploy' },
  ],
  decisions: [
    {
      n: '01',
      title: 'FSD architecture from day one',
      body: '기능이 늘어나도 폴더가 무너지지 않도록 Feature-Sliced Design을 채택. 5계층으로 의존성을 단방향으로 강제.',
    },
    {
      n: '02',
      title: 'In-memory cache hook for race-prone fetches',
      body: '탭/필터 전환 race condition을 closure + Map + Symbol 토큰 기반 캐싱 훅으로 해결. 늦은 응답은 자동으로 무시.',
    },
    {
      n: '03',
      title: 'Bundle 46% diet',
      body: 'bundle-analyzer로 진단 → 미사용 패키지 동적 임포트, 폰트 서브셋, GSAP context().revert() 패턴으로 SPA 메모리 누수 차단.',
    },
    {
      n: '04',
      title: 'Generic Zustand factory for filters',
      body: 'Admin에서 반복되는 필터 store를 제네릭 팩토리로 추상화. 도메인은 타입 인자로만.',
    },
    {
      n: '05',
      title: 'Stripe flow as a state machine',
      body: '결제 진입부터 완료까지의 상태를 단계별로 모델링. 취소·실패·중단·중복 경로를 명시적으로 처리.',
    },
  ],
  code: {
    label: 'useRequestCache.ts',
    title: 'The fetch that ignores stale answers.',
    desc: '키별로 in-flight 요청을 closure에 저장. 같은 키로 새 요청이 들어오면 이전 요청은 폐기 표시 — 늦게 도착해도 setState를 무시합니다.',
    body: `function useRequestCache<T>(fetcher: (key: string) => Promise<T>) {
  const cache = useRef(new Map<string, T>());
  const inflight = useRef(new Map<string, symbol>());
  const [state, setState] = useState<{key?: string; data?: T}>({});

  const get = useCallback(async (key: string) => {
    if (cache.current.has(key)) {
      setState({ key, data: cache.current.get(key) });
      return;
    }
    const token = Symbol(key);
    inflight.current.set(key, token);
    const data = await fetcher(key);
    if (inflight.current.get(key) !== token) return; // stale
    cache.current.set(key, data);
    setState({ key, data });
  }, [fetcher]);

  return [state, get] as const;
}`,
  },
  outcomeHeadline: 'Shipped subscription. |Halved bundle.| Killed race conditions.',
  outcomes: [
    'Lighthouse 52 → 87, LCP 9.0s → 3.8s.',
    'Bundle −46%, CLS 0.126 → 0.',
    'Membership Stripe flow live in production.',
    'Vitest + MSW 기반 API 독립 테스트 환경 구축.',
    'i18n EN/KO/JA + SEO, Admin + TipTap CMS (12 custom extensions).',
  ],
  relatedPosts: [
    'lighthouse-52-to-87',
    'useRequestCache-hook',
    'zustand-factory-pattern',
    'stripe-flow-state-machine',
    'gsap-spa-memory-leak',
    'tiptap-12-extensions',
  ],
};

export const caseAwarelabEn: CaseData = {
  q: 'Why was the main page LCP 9 seconds?',
  oneLiner: 'Investment portfolio analysis membership platform.',
  why: 'We had to ship a subscription product — from scratch to payments — within a single quarter, and I was the only frontend engineer. I judged that a single person owning the marketing site, admin, CMS editor, and i18n with a consistent architecture would be faster and more stable.',
  problemQ: 'Why was the main page LCP 9 seconds?',
  problemDef:
    'Diagnosed with @next/bundle-analyzer first, not guessing: the CMS and chart libraries were bundled entirely in the initial payload. Simultaneously, rapidly switching portfolio tabs/filters reproduced a race condition where stale responses overwrote the latest view.',
  year: '2025',
  label: 'Awarelab Membership',
  role: 'Frontend Engineer · Solo frontend',
  stackBadge: 'Next.js · Stripe · Directus',
  route: '/case/awarelab/',
  metrics: [
    { k: 'LIGHTHOUSE', before: '52', after: '87', delta: '+35', note: 'Performance score' },
    { k: 'LCP', before: '9.0s', after: '3.8s', delta: '−44%', note: 'Largest Contentful Paint' },
    { k: 'BUNDLE', before: '100%', after: '54%', delta: '−46%', note: 'Initial JS payload' },
    { k: 'CLS', before: '0.126', after: '0', delta: '−100%', note: 'Layout shift' },
  ],
  context: [
    { k: 'PRODUCT', v: 'Investment portfolio analysis · subscription' },
    { k: 'TIMELINE', v: '2025.04 → 2026.03 (11 months)' },
    { k: 'TEAM', v: '5 total · 4 dev · 1 frontend (me)' },
    { k: 'SCOPE', v: 'Marketing + Admin + CMS editor + i18n' },
    { k: 'STACK', v: 'Next.js · TypeScript · Stripe · Directus' },
    { k: 'I OWNED', v: 'Architecture · perf · payments · deploy' },
  ],
  decisions: [
    {
      n: '01',
      title: 'FSD architecture from day one',
      body: 'Adopted Feature-Sliced Design so the folder structure would not collapse as features grew. Enforced unidirectional dependencies across 5 layers.',
    },
    {
      n: '02',
      title: 'In-memory cache hook for race-prone fetches',
      body: 'Solved the tab/filter race condition with a closure + Map + Symbol token-based caching hook. Stale responses are automatically ignored.',
    },
    {
      n: '03',
      title: 'Bundle 46% diet',
      body: 'Diagnosed with bundle-analyzer → dynamic imports for unused packages, font subsetting, GSAP context().revert() pattern to prevent SPA memory leaks.',
    },
    {
      n: '04',
      title: 'Generic Zustand factory for filters',
      body: 'Abstracted repeated filter stores in Admin into a generic factory. Domains are just type arguments.',
    },
    {
      n: '05',
      title: 'Stripe flow as a state machine',
      body: 'Modeled the payment flow from entry to completion as explicit states. Cancellation, failure, interruption, and duplication paths handled explicitly.',
    },
  ],
  code: {
    label: 'useRequestCache.ts',
    title: 'The fetch that ignores stale answers.',
    desc: 'Stores in-flight requests per key in a closure. When a new request arrives for the same key, the previous one is marked as discarded — even if it arrives late, setState is ignored.',
    body: `function useRequestCache<T>(fetcher: (key: string) => Promise<T>) {
  const cache = useRef(new Map<string, T>());
  const inflight = useRef(new Map<string, symbol>());
  const [state, setState] = useState<{key?: string; data?: T}>({});

  const get = useCallback(async (key: string) => {
    if (cache.current.has(key)) {
      setState({ key, data: cache.current.get(key) });
      return;
    }
    const token = Symbol(key);
    inflight.current.set(key, token);
    const data = await fetcher(key);
    if (inflight.current.get(key) !== token) return; // stale
    cache.current.set(key, data);
    setState({ key, data });
  }, [fetcher]);

  return [state, get] as const;
}`,
  },
  outcomeHeadline: 'Shipped subscription. |Halved bundle.| Killed race conditions.',
  outcomes: [
    'Lighthouse 52 → 87, LCP 9.0s → 3.8s.',
    'Bundle −46%, CLS 0.126 → 0.',
    'Membership Stripe flow live in production.',
    'Vitest + MSW based API-independent test environment.',
    'i18n EN/KO/JA + SEO, Admin + TipTap CMS (12 custom extensions).',
  ],
  relatedPosts: [
    'lighthouse-52-to-87',
    'useRequestCache-hook',
    'zustand-factory-pattern',
    'stripe-flow-state-machine',
    'gsap-spa-memory-leak',
    'tiptap-12-extensions',
  ],
};

export const caseKumoKo: CaseData = {
  q: '라이브러리가 캔버스 크기 한계에 부딪힐 때, 어디까지가 라이브러리 책임인가?',
  oneLiner: '클라우드 인프라를 시각적으로 설계하는 노코드 빌더.',
  why: "AWS 콘솔의 복잡함을 시각적 캔버스로 대체하자는 아이디어에서 시작했습니다. 제품의 성패는 '얼마나 큰 아키텍처든 끊김 없이 그릴 수 있는가' 한 가지 경험에 달려 있다고 봤고, 그 핵심을 직접 책임지고 싶었습니다.",
  problemQ: '라이브러리가 캔버스 크기 한계에 부딪힐 때, 어디까지가 라이브러리 책임인가?',
  problemDef:
    '노코드 클라우드 빌더는 사용자가 수백 개 노드의 아키텍처를 한 화면에 그릴 수 있어야 했습니다. react-zoom-pan-pinch는 내부 transform 컨테이너에 한계가 있어 일정 규모를 넘으면 가장자리에서 잘리거나 좌표가 어긋났습니다. 라이브러리를 패치하느니 직접 만드는 편이 빠르고 안정적이라고 판단했습니다.',
  year: '2023',
  label: 'Kumo Factory',
  role: 'Frontend-of-one',
  stackBadge: 'SVG · Affine · Zustand · SSE',
  route: '/case/kumo/',
  metrics: [
    { k: 'FRAMERATE', after: '60', delta: 'fps', note: 'Pan + zoom + drag' },
    { k: 'MEMORY', before: '100%', after: '70%', delta: '−30%', note: 'After normalization' },
    {
      k: 'API CALLS',
      before: '100%',
      after: '50%',
      delta: '−50%',
      note: 'Selective subscriptions',
    },
    { k: 'SSE LATENCY', after: '<100ms', delta: 'live', note: 'Deploy → browser' },
  ],
  decisions: [
    {
      n: '01',
      title: 'Throw out react-zoom-pan-pinch',
      body: '패치 가능 범위를 넘어선 구조적 한계라고 판단. 직접 만들기로 결정.',
    },
    {
      n: '02',
      title: 'SVG viewBox + 3×3 affine matrix',
      body: '캔버스 자체는 무한. viewBox 좌표만 이동·확대해서 화면에 비추는 창만 움직임.',
    },
    {
      n: '03',
      title: 'Pointer-anchored zoom',
      body: '휠 줌은 마우스 포인터 기준으로 동작해야 자연스럽다. 비례 기반 좌표 재계산으로 world point 유지.',
    },
    {
      n: '04',
      title: 'Five Zustand slices',
      body: 'Common · Service · Area · Line · Option. 선택적 구독으로 변경된 slice 구독자만 리렌더, 메모리 30% 절감.',
    },
    {
      n: '05',
      title: 'SSE for live deploy',
      body: '배포 진행 상황을 100ms 이내에 브라우저로 푸시. 이벤트 스트림을 캔버스 노드 상태에 즉시 반영.',
    },
  ],
  code: {
    label: 'pointer-anchored zoom',
    title: 'Keep the world point under the cursor.',
    desc: '줌 전후로 마우스가 가리키는 좌표가 같은 world point를 가리키도록 viewBox 원점을 재계산합니다.',
    body: `function zoomAtPointer(vb, factor, mouse, rect) {
  const wx = (mouse.x / rect.width)  * vb.w + vb.x;
  const wy = (mouse.y / rect.height) * vb.h + vb.y;

  return {
    x: wx - (wx - vb.x) * factor,
    y: wy - (wy - vb.y) * factor,
    w: vb.w * factor,
    h: vb.h * factor,
  };
}`,
  },
  outcomeHeadline: "A canvas |without limits.| A frontend that |doesn't drop frames.|",
  outcomes: [
    '대규모 캔버스에서 60fps 유지.',
    '5-slice store + 정규화로 메모리 30%↓, API 호출 50%↓.',
    'SSE 기반 실시간 배포 시각화 — 100ms 이내 지연.',
  ],
  relatedPosts: ['infinite-canvas-from-scratch'],
};

export const caseKumoEn: CaseData = {
  q: 'When a library hits canvas size limits, where does its responsibility end?',
  oneLiner: 'A no-code builder for visually designing cloud infrastructure.',
  why: "The idea was to replace AWS console complexity with a visual canvas. I believed the product's success hinged on one experience: 'Can you draw any architecture without stuttering?' — and I wanted to own that core directly.",
  problemQ: 'When a library hits canvas size limits, where does its responsibility end?',
  problemDef:
    'The no-code cloud builder needed users to draw architectures with hundreds of nodes on a single screen. react-zoom-pan-pinch had structural limitations in its internal transform container — content was clipped or coordinates went off beyond a certain scale. Faster and more stable to build from scratch than to patch.',
  year: '2023',
  label: 'Kumo Factory',
  role: 'Frontend-of-one',
  stackBadge: 'SVG · Affine · Zustand · SSE',
  route: '/case/kumo/',
  metrics: [
    { k: 'FRAMERATE', after: '60', delta: 'fps', note: 'Pan + zoom + drag' },
    { k: 'MEMORY', before: '100%', after: '70%', delta: '−30%', note: 'After normalization' },
    {
      k: 'API CALLS',
      before: '100%',
      after: '50%',
      delta: '−50%',
      note: 'Selective subscriptions',
    },
    { k: 'SSE LATENCY', after: '<100ms', delta: 'live', note: 'Deploy → browser' },
  ],
  decisions: [
    {
      n: '01',
      title: 'Throw out react-zoom-pan-pinch',
      body: 'Defined as a structural limitation beyond patchable scope. Decided to build from scratch.',
    },
    {
      n: '02',
      title: 'SVG viewBox + 3×3 affine matrix',
      body: 'The canvas itself is infinite. Only the viewport window moves by shifting and scaling the viewBox coordinates.',
    },
    {
      n: '03',
      title: 'Pointer-anchored zoom',
      body: 'Wheel zoom must anchor to the mouse pointer to feel natural. Maintained world point via proportional coordinate recalculation.',
    },
    {
      n: '04',
      title: 'Five Zustand slices',
      body: 'Common · Service · Area · Line · Option. Selective subscribing re-renders only affected slice subscribers, cutting memory by 30%.',
    },
    {
      n: '05',
      title: 'SSE for live deploy',
      body: 'Pushes deployment progress to the browser within 100ms. Event stream immediately reflected in canvas node states.',
    },
  ],
  code: {
    label: 'pointer-anchored zoom',
    title: 'Keep the world point under the cursor.',
    desc: 'Recalculates the viewBox origin so the same world point stays under the cursor before and after zoom.',
    body: `function zoomAtPointer(vb, factor, mouse, rect) {
  const wx = (mouse.x / rect.width)  * vb.w + vb.x;
  const wy = (mouse.y / rect.height) * vb.h + vb.y;

  return {
    x: wx - (wx - vb.x) * factor,
    y: wy - (wy - vb.y) * factor,
    w: vb.w * factor,
    h: vb.h * factor,
  };
}`,
  },
  outcomeHeadline: "A canvas |without limits.| A frontend that |doesn't drop frames.|",
  outcomes: [
    '60fps maintained on large-scale canvas.',
    '5-slice store + normalization: memory −30%, API calls −50%.',
    'SSE-based real-time deploy visualization — latency under 100ms.',
  ],
  relatedPosts: ['infinite-canvas-from-scratch'],
};

export const casePrestigeKo: CaseData = {
  q: 'ASP.NET 레거시의 진짜 문제는 무엇인가?',
  oneLiner: '장지 위치 시각화 서비스.',
  why: "대형 의료원에 시연하는 B2B 제품인데, 레거시의 느린 첫인상이 계약에 직접 영향을 줬습니다. 기능을 더하기 전에 '전환 경험'부터 다시 만들어야 한다고 판단해 전면 마이그레이션을 먼저 제안했습니다.",
  problemQ: 'ASP.NET 레거시의 진짜 문제는 무엇인가?',
  problemDef:
    '기능이 아니라 페이지 전환마다 발생하는 전체 새로고침이 의료원 시연에서 첫인상을 깎는 핵심 원인이었습니다. 배포는 사람이 빌드 산출물을 옮기는 방식이라 한 번에 10분이 걸렸습니다. 마이그레이션 목표는 SPA 경험을 6주 안에 — 기능 삭제는 0건.',
  year: '2024',
  label: 'The Prestige',
  role: 'Frontend-of-one',
  stackBadge: 'Next.js · Recoil · Kakao Map',
  route: '/case/prestige/',
  metrics: [
    { k: 'PAGES MIGRATED', before: '0', after: '8', delta: '6 weeks', note: 'Core pages' },
    { k: 'DEPLOY TIME', before: '10m', after: '2m', delta: '−80%', note: 'Manual → Vercel' },
    { k: 'PAGE REFRESH', before: 'every nav', after: '0', delta: 'SPA', note: 'No flash' },
    { k: 'DEMO RECEPTION', after: '✓', delta: 'positive', note: 'Severance, large clinics' },
  ],
  decisions: [
    {
      n: '01',
      title: 'Full migration, 6 weeks, 8 pages',
      body: 'ASP.NET 라우팅과 상태 관리 흐름을 Next.js로 1:1 매핑. 기능 삭제 없이 6주 안에 8개 핵심 페이지 이전.',
    },
    {
      n: '02',
      title: 'Kakao Map + Recoil with no-refresh filters',
      body: '필터 변경 시 새로고침 없이 지도와 검색이 즉시 반응하도록 상태 + 쿼리 파라미터를 동기화.',
    },
    {
      n: '03',
      title: 'Recoil effects ↔ LocalStorage',
      body: '필터 상태를 LocalStorage와 양방향 동기화 — 새로고침해도 사용자가 보던 필터가 그대로 유지.',
    },
    {
      n: '04',
      title: 'Drove API design, then implemented',
      body: '백엔드와의 협업에서 응답 구조를 직접 설계해 요청. 프론트엔드 사용 시점에 가장 효율적인 모양으로.',
    },
    {
      n: '05',
      title: 'Manual builds → Vercel CI/CD',
      body: '수동 빌드 파일 전달 방식을 GitHub → Vercel 자동 배포로 전환.',
    },
  ],
  outcomeHeadline: 'Eight pages. |No flashes.| No friction.',
  outcomes: [
    '8개 핵심 페이지 6주 마이그레이션 완료, 기능 삭제 0건.',
    '배포 리드타임 10분 → 2분 (−80%).',
    '세브란스 등 대형 의료원 시연 긍정 피드백.',
  ],
  relatedPosts: ['asp-net-to-nextjs'],
};

export const casePrestigeEn: CaseData = {
  q: 'What was the real problem with ASP.NET legacy?',
  oneLiner: 'Burial site location visualization service.',
  why: "For a B2B product demoed at major hospitals, the legacy's slow first impression was directly hurting contract negotiations. I proposed a full migration before adding features — the 'transition experience' had to come first.",
  problemQ: 'What was the real problem with ASP.NET legacy?',
  problemDef:
    'Not features — the full page refresh on every navigation was the core issue killing first impressions during hospital demos. Deployments required manually transferring build artifacts, taking 10 minutes each time. Migration goal: SPA experience in 6 weeks — zero feature deletions.',
  year: '2024',
  label: 'The Prestige',
  role: 'Frontend-of-one',
  stackBadge: 'Next.js · Recoil · Kakao Map',
  route: '/case/prestige/',
  metrics: [
    { k: 'PAGES MIGRATED', before: '0', after: '8', delta: '6 weeks', note: 'Core pages' },
    { k: 'DEPLOY TIME', before: '10m', after: '2m', delta: '−80%', note: 'Manual → Vercel' },
    { k: 'PAGE REFRESH', before: 'every nav', after: '0', delta: 'SPA', note: 'No flash' },
    { k: 'DEMO RECEPTION', after: '✓', delta: 'positive', note: 'Severance, large clinics' },
  ],
  decisions: [
    {
      n: '01',
      title: 'Full migration, 6 weeks, 8 pages',
      body: 'Mapped ASP.NET routing and state management flow 1:1 to Next.js. 8 core pages migrated in 6 weeks with zero feature deletions.',
    },
    {
      n: '02',
      title: 'Kakao Map + Recoil with no-refresh filters',
      body: 'Synchronized state + query parameters so the map and search respond instantly without refresh on filter changes.',
    },
    {
      n: '03',
      title: 'Recoil effects ↔ LocalStorage',
      body: 'Bidirectional sync of filter state with LocalStorage — filters persist exactly as the user left them even after refresh.',
    },
    {
      n: '04',
      title: 'Drove API design, then implemented',
      body: 'Designed the API response structure in collaboration with backend, then implemented. Shaped responses to be most efficient at the point of frontend consumption.',
    },
    {
      n: '05',
      title: 'Manual builds → Vercel CI/CD',
      body: 'Replaced manual build file handoff with GitHub → Vercel automated deployment.',
    },
  ],
  outcomeHeadline: 'Eight pages. |No flashes.| No friction.',
  outcomes: [
    '8 core pages migrated in 6 weeks, zero feature deletions.',
    'Deploy lead time 10 min → 2 min (−80%).',
    'Positive feedback from demos at Severance and other major hospitals.',
  ],
  relatedPosts: ['asp-net-to-nextjs'],
};

export const allCasesKo = [caseAwarelabKo, caseKumoKo, casePrestigeKo];
export const allCasesEn = [caseAwarelabEn, caseKumoEn, casePrestigeEn];
