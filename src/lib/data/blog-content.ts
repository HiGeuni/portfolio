export type ContentBlock =
  | { type: 'blockquote'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'p'; html: string }
  | { type: 'code'; lang: string; file: string; body: string }
  | { type: 'list'; items: string[] };

// ============================================================
// POST 1: infinite-canvas-from-scratch (Korean)
// ============================================================

export const infiniteCanvasKo: ContentBlock[] = [
  {
    type: 'blockquote',
    text: '라이브러리가 구조적 한계에 부딪히면, 패치할 것인가 처음부터 만들 것인가. 그 판단이 3주짜리 삽질과 3주짜리 설계를 가른다.',
  },
  {
    type: 'h2',
    text: '캔버스 크기가 제품의 한계가 되는 순간',
  },
  {
    type: 'p',
    html: 'Kumo Factory는 AWS 인프라를 시각적으로 설계하는 노코드 SaaS였다. 사용자가 EC2, VPC, 서브넷을 드래그 앤 드롭으로 배치하면 실제 클라우드가 프로비저닝된다. 제품의 핵심 경험은 단 하나 — <strong>아키텍처가 아무리 커져도 끊김 없이 그릴 수 있는가</strong>.',
  },
  {
    type: 'p',
    html: '처음에는 <code>react-zoom-pan-pinch</code>를 검토했다. 줌/팬 인터랙션을 빠르게 붙일 수 있어서 매력적이었지만, 곧 문제를 발견했다. 이 라이브러리는 내부적으로 CSS <code>transform</code> 컨테이너를 사용하는데, 컨테이너 크기에 물리적 한계가 있다. 노드 수십 개를 넘기면 가장자리에서 잘리거나 좌표가 어긋나기 시작했다.',
  },
  {
    type: 'p',
    html: '패치할 수 있는 문제인지 먼저 따져봤다. 결론은 <em>구조적 한계</em>라는 것이었다. transform 컨테이너 방식 자체가 유한한 픽셀 공간을 전제하기 때문에, 아무리 패치해도 "무한"은 불가능하다. 직접 만들기로 결정했다.',
  },
  {
    type: 'h2',
    text: 'SVG viewBox라는 카메라',
  },
  {
    type: 'p',
    html: 'CSS transform 대신 <strong>SVG의 viewBox</strong>를 선택했다. 핵심 아이디어는 이렇다 — SVG 좌표 공간은 원래 무한하다. viewBox는 그 무한한 공간 위를 떠다니는 카메라 창이다. 카메라를 움직이면 팬, 카메라 시야를 넓히거나 좁히면 줌이 된다.',
  },
  {
    type: 'code',
    lang: 'html',
    file: 'concept.svg',
    body: '<!-- viewBox="x y width height" -->\n<!-- 카메라 위치(x,y)와 시야 크기(width,height)만 조절하면 무한 캔버스 -->\n<svg viewBox="0 0 1200 800">\n  <!-- 이 안에 놓이는 모든 요소는 SVG 좌표 공간에 존재 -->\n  <!-- viewBox를 옮기면 다른 영역이 보인다 -->\n</svg>',
  },
  {
    type: 'p',
    html: '이 모델에서 줌과 팬은 viewBox의 네 값 — <code>x</code>, <code>y</code>, <code>width</code>, <code>height</code> — 만 바꾸면 된다. DOM 요소의 transform을 건드리지 않으니 브라우저 렌더링 파이프라인에서 layout을 다시 계산할 필요가 없다. 이게 성능의 출발점이었다.',
  },
  {
    type: 'h2',
    text: '3x3 아핀 행렬로 좌표 변환 통합하기',
  },
  {
    type: 'p',
    html: '줌과 팬을 따로따로 계산하면 코드가 빠르게 꼬인다. 줌 레벨이 바뀌면 팬 오프셋도 보정해야 하고, 마우스 좌표를 월드 좌표로 변환하는 것도 매번 스케일을 고려해야 한다. 이걸 깔끔하게 풀기 위해 <strong>3x3 아핀 변환 행렬</strong>을 도입했다.',
  },
  {
    type: 'p',
    html: '아핀 행렬 하나에 이동(translate)과 확대(scale)를 모두 인코딩하면, 어떤 좌표든 행렬 곱 한 번으로 변환할 수 있다. 줌 레벨에 따라 달라지는 픽셀 단위 계산이 이 프로젝트에서 가장 까다로운 부분이었는데, 행렬로 통합하니 모든 줌 레벨에서 정확한 좌표 변환이 가능해졌다.',
  },
  {
    type: 'h2',
    text: '포인터 기준 줌 — 순서가 틀리면 좌표가 점프한다',
  },
  {
    type: 'p',
    html: '줌의 사용성은 하나로 결정된다 — <strong>마우스 포인터 아래의 점이 줌 전후로 같은 월드 좌표를 가리키는가</strong>. 이걸 못 맞추면 줌할 때마다 캔버스가 "미끄러진다". 구현 자체는 비례(proportion) 기반 좌표 재계산인데, 여기서 한 가지 치명적인 실수를 했다.',
  },
  {
    type: 'p',
    html: '처음에는 스케일을 먼저 바꾸고 나서 월드 좌표를 계산했다. 결과는 줌할 때마다 좌표가 점프하는 버그. <em>월드 좌표를 스케일 변경 전에 계산해야 한다</em>는 걸 깨닫는 데 하루가 걸렸다. 순서가 중요하다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'CommonSlice.ts',
    body: 'onMouseWheel: (e) => {\n  set((state) => {\n    // 1. 먼저 현재 스케일로 월드 좌표 계산 (순서 중요!)\n    const pt = getGridPoint(e, state.scale, state.viewBox, state.svgRect);\n\n    // 2. 스케일 업데이트\n    let scale = e.deltaY / 1000;\n    state.scale = Math.max(0.5, Math.min(5, state.scale + scale));\n\n    // 3. 포인터 기준으로 viewBox 원점 재계산\n    const { x, y, width, height } = state.viewBox;\n    const [xRatio, yRatio] = [(pt.x - x) / width, (pt.y - y) / height];\n    const [newW, newH] = [\n      state.viewBoxOriginSize.width * state.scale,\n      state.viewBoxOriginSize.height * state.scale,\n    ];\n    state.viewBox = {\n      x: pt.x - xRatio * newW,\n      y: pt.y - yRatio * newH,\n      width: newW,\n      height: newH,\n    };\n  });\n}',
  },
  {
    type: 'p',
    html: '핵심은 <code>getGridPoint</code>를 스케일 변경 <strong>전에</strong> 호출한다는 것이다. 비례값 <code>xRatio</code>, <code>yRatio</code>는 현재 viewBox에서 포인터가 어디에 있는지를 나타내고, 새로운 viewBox 크기에 같은 비율을 적용하면 포인터 아래의 월드 좌표가 고정된다.',
  },
  {
    type: 'h2',
    text: 'getBoundingClientRect가 필요한 이유',
  },
  {
    type: 'p',
    html: 'SVG 요소를 <code>width="100%"</code>로 배치하면, 마우스 이벤트의 <code>clientX</code>/<code>clientY</code>를 SVG 좌표로 변환할 때 함정이 있다. 단순히 <code>* scale</code>로 곱하면 SVG의 실제 렌더링 크기가 뷰포트에 따라 달라지기 때문에 어긋난다.',
  },
  {
    type: 'p',
    html: '해결은 <code>getBoundingClientRect()</code>로 SVG 요소의 실제 화면 크기를 구하고, 그 비율로 변환하는 것이다. 이게 반응형 레이아웃에서 유일하게 정확한 방법이다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'toWorld.ts',
    body: 'function toWorld(clientX: number, clientY: number, vb: ViewBox, svgEl: SVGSVGElement) {\n  const rect = svgEl.getBoundingClientRect();\n  return {\n    x: ((clientX - rect.left) / rect.width)  * vb.width  + vb.x,\n    y: ((clientY - rect.top)  / rect.height) * vb.height + vb.y,\n  };\n}',
  },
  {
    type: 'h2',
    text: '5-slice Zustand으로 60fps 사수하기',
  },
  {
    type: 'p',
    html: '캔버스 엔진의 상태는 복잡하다. 마우스 위치, viewBox, 줌 레벨 같은 <strong>공통 상태</strong>와 서비스 노드, 영역, 연결선, 옵션 같은 <strong>도메인 상태</strong>가 뒤섞인다. 전부 하나의 스토어에 넣으면 마우스가 움직일 때마다 노드 수백 개가 리렌더된다.',
  },
  {
    type: 'p',
    html: 'Zustand의 <strong>slice 패턴</strong>으로 상태를 5개 조각으로 분리했다 — Common, Service, Area, Line, Option. Immer를 결합해서 깊은 중첩 객체도 직관적으로 업데이트하고, <em>선택적 구독(selective subscribing)</em>으로 해당 slice가 바뀔 때만 관련 컴포넌트가 리렌더되게 했다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'useBlueprintStore.ts',
    body: 'type AllStates = AreaState & CommonState & ServiceState & LineState & OptionState;\n\nconst useBlueprintStore = create<AllStates>()(\n  devtools(\n    immer((...a) => ({\n      ...useCommonSlice(...a),\n      ...useServiceSlice(...a),\n      ...useAreaSlice(...a),\n      ...useLineSlice(...a),\n      ...useOptionSlice(...a),\n    })),\n  ),\n);\n\n// 컴포넌트에서 — 필요한 상태만 구독\nconst scale = useBlueprintStore((s) => s.scale);\nconst nodes = useBlueprintStore((s) => s.services);',
  },
  {
    type: 'p',
    html: '결과: 대규모 캔버스에서도 <strong>60fps 유지</strong>, 메모리 사용량 약 <strong>30% 절감</strong>, 불필요한 API 호출 <strong>50% 이상 감소</strong>. 데이터 정규화로 Single Source of Truth를 확보한 것도 API 호출 감소에 크게 기여했다.',
  },
  {
    type: 'h2',
    text: 'SSE로 배포 상태를 100ms 안에 브라우저로',
  },
  {
    type: 'p',
    html: '캔버스에서 설계한 아키텍처는 실제로 클라우드에 배포된다. 배포가 시작되면 각 노드의 상태(pending, creating, running, failed)를 실시간으로 시각화해야 했다. WebSocket 대신 <strong>SSE(Server-Sent Events)</strong>를 선택했다. 서버→클라이언트 단방향 스트림이면 충분했고, 별도의 프로토콜 업그레이드 없이 HTTP 위에서 동작한다.',
  },
  {
    type: 'p',
    html: 'SSE 이벤트를 받으면 해당 노드의 상태를 Zustand 스토어에 즉시 반영한다. 선택적 구독 덕분에 상태가 바뀐 노드만 리렌더되고, 캔버스 전체가 다시 그려지지 않는다. 배포 상태 반영 지연은 <strong>100ms 이내</strong>.',
  },
  {
    type: 'h2',
    text: '3주의 투자가 남긴 것',
  },
  {
    type: 'p',
    html: '라이브러리를 버리고 직접 만드는 결정은 위험했다. 구현에 약 3주가 걸렸고, 그 시간 동안 다른 기능은 손댈 수 없었다. 하지만 결과적으로 제품의 핵심 경험 — "끊김 없는 무한 캔버스" — 을 확보했고, <strong>어떤 라이브러리에도 의존하지 않는 인터랙션 엔진</strong>을 가지게 되었다.',
  },
  {
    type: 'list',
    items: [
      '라이브러리가 "구조적 한계"인지 "패치 가능한 버그"인지 먼저 판단하라',
      'viewBox는 무한한 SVG 좌표 공간 위의 카메라다',
      '포인터 기준 줌: 월드 좌표를 스케일 변경 전에 계산해야 한다',
      'width="100%" SVG에서는 getBoundingClientRect() 비율로 좌표를 변환하라',
      'Zustand slice + 선택적 구독으로 대규모 캔버스 60fps를 사수할 수 있다',
    ],
  },
];

// ============================================================
// POST 1: infinite-canvas-from-scratch (English)
// ============================================================

export const infiniteCanvasEn: ContentBlock[] = [
  {
    type: 'blockquote',
    text: 'When a library hits a structural wall, do you patch it or rebuild from scratch? That judgment call is what separates three weeks of hacking from three weeks of engineering.',
  },
  {
    type: 'h2',
    text: 'When canvas size becomes the product limit',
  },
  {
    type: 'p',
    html: "Kumo Factory was a no-code SaaS for visually designing AWS infrastructure. Users drag-and-drop EC2 instances, VPCs, and subnets, and the actual cloud gets provisioned. The product's core experience came down to a single question: <strong>can you draw any architecture, no matter how large, without stuttering?</strong>",
  },
  {
    type: 'p',
    html: 'We initially evaluated <code>react-zoom-pan-pinch</code>. It was attractive for quickly adding zoom/pan interactions, but we soon found a problem. The library uses an internal CSS <code>transform</code> container, which has a physical size limit. Once you place more than a few dozen nodes, content gets clipped at the edges or coordinates go off.',
  },
  {
    type: 'p',
    html: 'I first evaluated whether it was patchable. The conclusion was that it was a <em>structural limitation</em>. The transform container approach inherently assumes a finite pixel space, so "infinite" is impossible no matter how many patches you apply. I decided to build from scratch.',
  },
  {
    type: 'h2',
    text: 'SVG viewBox as a camera',
  },
  {
    type: 'p',
    html: "Instead of CSS transforms, I chose <strong>SVG's viewBox</strong>. The core idea is this: SVG coordinate space is inherently infinite. The viewBox is a camera window floating over that infinite space. Move the camera and you get panning; widen or narrow the camera's field of view and you get zooming.",
  },
  {
    type: 'code',
    lang: 'html',
    file: 'concept.svg',
    body: '<!-- viewBox="x y width height" -->\n<!-- Just adjust camera position (x,y) and field of view (width,height) -->\n<svg viewBox="0 0 1200 800">\n  <!-- Every element lives in SVG coordinate space -->\n  <!-- Move the viewBox to see a different region -->\n</svg>',
  },
  {
    type: 'p',
    html: "In this model, zoom and pan only require changing four numbers on the viewBox: <code>x</code>, <code>y</code>, <code>width</code>, <code>height</code>. Since we never touch DOM element transforms, the browser's rendering pipeline doesn't need to recalculate layout. That was the starting point for performance.",
  },
  {
    type: 'h2',
    text: 'Unifying coordinate transforms with a 3x3 affine matrix',
  },
  {
    type: 'p',
    html: 'Calculating zoom and pan separately makes code tangled fast. Changing zoom level means adjusting pan offset, and converting mouse coordinates to world coordinates requires factoring in scale every time. To handle this cleanly, I introduced a <strong>3x3 affine transformation matrix</strong>.',
  },
  {
    type: 'p',
    html: 'By encoding both translation and scale into a single affine matrix, any coordinate can be transformed with a single matrix multiplication. Pixel-unit calculations that vary with zoom level were the hardest part of this project, but unifying them through the matrix made precise coordinate transforms possible at every zoom level.',
  },
  {
    type: 'h2',
    text: 'Pointer-anchored zoom — wrong order means jumping coordinates',
  },
  {
    type: 'p',
    html: 'Zoom usability comes down to one thing: <strong>does the point under the mouse cursor stay at the same world coordinate before and after zoom?</strong> Get this wrong and the canvas "slides" on every zoom. The implementation is a proportional coordinate recalculation, but I made one critical mistake.',
  },
  {
    type: 'p',
    html: 'Initially, I changed the scale first and then calculated the world coordinate. The result was coordinates jumping on every zoom. It took me a day to realize that <em>the world coordinate must be calculated before the scale change</em>. Order matters.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'CommonSlice.ts',
    body: 'onMouseWheel: (e) => {\n  set((state) => {\n    // 1. Calculate world coordinate at CURRENT scale first (order matters!)\n    const pt = getGridPoint(e, state.scale, state.viewBox, state.svgRect);\n\n    // 2. Update scale\n    let scale = e.deltaY / 1000;\n    state.scale = Math.max(0.5, Math.min(5, state.scale + scale));\n\n    // 3. Recalculate viewBox origin anchored to pointer\n    const { x, y, width, height } = state.viewBox;\n    const [xRatio, yRatio] = [(pt.x - x) / width, (pt.y - y) / height];\n    const [newW, newH] = [\n      state.viewBoxOriginSize.width * state.scale,\n      state.viewBoxOriginSize.height * state.scale,\n    ];\n    state.viewBox = {\n      x: pt.x - xRatio * newW,\n      y: pt.y - yRatio * newH,\n      width: newW,\n      height: newH,\n    };\n  });\n}',
  },
  {
    type: 'p',
    html: 'The key is calling <code>getGridPoint</code> <strong>before</strong> the scale change. The ratios <code>xRatio</code> and <code>yRatio</code> represent where the pointer sits within the current viewBox. Apply the same ratios to the new viewBox dimensions, and the world coordinate under the pointer stays fixed.',
  },
  {
    type: 'h2',
    text: 'Why getBoundingClientRect matters',
  },
  {
    type: 'p',
    html: 'When an SVG element is placed with <code>width="100%"</code>, there\'s a trap when converting mouse event <code>clientX</code>/<code>clientY</code> to SVG coordinates. Simply multiplying by <code>* scale</code> breaks because the SVG\'s actual rendered size varies with the viewport.',
  },
  {
    type: 'p',
    html: "The fix is using <code>getBoundingClientRect()</code> to get the SVG element's actual screen dimensions and converting via that ratio. This is the only accurate method in responsive layouts.",
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'toWorld.ts',
    body: 'function toWorld(clientX: number, clientY: number, vb: ViewBox, svgEl: SVGSVGElement) {\n  const rect = svgEl.getBoundingClientRect();\n  return {\n    x: ((clientX - rect.left) / rect.width)  * vb.width  + vb.x,\n    y: ((clientY - rect.top)  / rect.height) * vb.height + vb.y,\n  };\n}',
  },
  {
    type: 'h2',
    text: 'Holding 60fps with five Zustand slices',
  },
  {
    type: 'p',
    html: 'Canvas engine state is complex. <strong>Common state</strong> like mouse position, viewBox, and zoom level mixes with <strong>domain state</strong> like service nodes, areas, connection lines, and options. Put it all in one store and every mouse move re-renders hundreds of nodes.',
  },
  {
    type: 'p',
    html: "I split the state into five slices using Zustand's <strong>slice pattern</strong>: Common, Service, Area, Line, and Option. Combined with Immer for intuitive deep-nested updates, <em>selective subscribing</em> ensures only components subscribed to the changed slice re-render.",
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'useBlueprintStore.ts',
    body: 'type AllStates = AreaState & CommonState & ServiceState & LineState & OptionState;\n\nconst useBlueprintStore = create<AllStates>()(\n  devtools(\n    immer((...a) => ({\n      ...useCommonSlice(...a),\n      ...useServiceSlice(...a),\n      ...useAreaSlice(...a),\n      ...useLineSlice(...a),\n      ...useOptionSlice(...a),\n    })),\n  ),\n);\n\n// In components — subscribe only to what you need\nconst scale = useBlueprintStore((s) => s.scale);\nconst nodes = useBlueprintStore((s) => s.services);',
  },
  {
    type: 'p',
    html: 'Results: <strong>60fps maintained</strong> on large canvases, memory usage reduced by roughly <strong>30%</strong>, unnecessary API calls cut by over <strong>50%</strong>. Data normalization to establish a Single Source of Truth also contributed heavily to reducing API calls.',
  },
  {
    type: 'h2',
    text: 'SSE: deploy status to the browser in under 100ms',
  },
  {
    type: 'p',
    html: "Architectures designed on the canvas get actually deployed to the cloud. Once deployment starts, each node's status (pending, creating, running, failed) needs real-time visualization. I chose <strong>SSE (Server-Sent Events)</strong> over WebSocket. A server-to-client unidirectional stream was sufficient, and it runs over plain HTTP without a protocol upgrade.",
  },
  {
    type: 'p',
    html: "When an SSE event arrives, the corresponding node's status is immediately reflected in the Zustand store. Thanks to selective subscribing, only the node whose status changed re-renders — the entire canvas is not repainted. Deploy status latency: <strong>under 100ms</strong>.",
  },
  {
    type: 'h2',
    text: 'What three weeks of investment left behind',
  },
  {
    type: 'p',
    html: 'Ditching the library and building from scratch was risky. It took about three weeks, during which no other features could be touched. But it secured the product\'s core experience — "a seamless infinite canvas" — and gave us <strong>an interaction engine that depends on zero libraries</strong>.',
  },
  {
    type: 'list',
    items: [
      'First determine if a library issue is a "structural limitation" or a "patchable bug"',
      'viewBox is a camera floating over infinite SVG coordinate space',
      'Pointer-anchored zoom: calculate the world coordinate before the scale change',
      'For width="100%" SVGs, convert coordinates via getBoundingClientRect() ratios',
      'Zustand slices + selective subscribing can hold 60fps on large-scale canvases',
    ],
  },
];

// ============================================================
// POST 2: useRequestCache-hook (Korean)
// ============================================================

export const useRequestCacheKo: ContentBlock[] = [
  {
    type: 'blockquote',
    text: '빠른 손가락이 만드는 버그는 느린 네트워크가 드러낸다. 탭을 연속으로 누를 때 화면이 "깜빡이며 과거로 돌아간다"면, 그건 race condition이다.',
  },
  {
    type: 'h2',
    text: '문제: 탭을 빠르게 누르면 화면이 과거로 돌아간다',
  },
  {
    type: 'p',
    html: '어웨어랩에서 투자 포트폴리오 분석 플랫폼을 만들고 있었다. 포트폴리오 대시보드에는 기간별 필터와 자산 유형별 탭이 있는데, 사용자가 탭이나 필터를 빠르게 전환하면 이상한 일이 벌어졌다.',
  },
  {
    type: 'list',
    items: [
      '"1개월" 탭 클릭 → "3개월" 탭 클릭 → "1년" 탭 클릭',
      '화면에 "1년" 데이터가 잠깐 보이다가, 갑자기 "3개월" 데이터로 바뀐다',
      'GSAP 차트 애니메이션이 깜빡이며 잘못된 데이터로 다시 그려진다',
    ],
  },
  {
    type: 'p',
    html: '원인은 분명했다. 비동기 API 응답은 <strong>요청 순서대로 도착하지 않는다</strong>. "1년" 요청이 먼저 응답하고 "3개월" 요청이 나중에 도착하면, 늦게 온 "3개월" 응답이 <code>setState</code>를 호출해서 최신 화면을 덮어쓴다. 금융 데이터에서 이건 잘못된 수치를 보여주는 것이니 단순한 UX 문제가 아니라 <em>데이터 정합성 문제</em>였다.',
  },
  {
    type: 'h2',
    text: '기존 솔루션을 쓰지 않은 이유',
  },
  {
    type: 'p',
    html: 'React Query(TanStack Query)를 도입하면 race condition을 구조적으로 해결할 수 있다. 하지만 이 프로젝트는 이미 Zustand 기반으로 상태 관리가 설계되어 있었고, 필요한 건 딱 하나 — <strong>같은 키로 in-flight 요청이 있을 때, 이전 요청의 응답을 무시하는 것</strong>이었다.',
  },
  {
    type: 'p',
    html: 'React Query를 도입하면 캐시 관리, 리트라이, 뮤테이션까지 따라오는데, 이 시점에서 필요한 건 in-flight 식별뿐이었다. 자체 캐시 훅을 만드는 게 더 가볍고 정확하다고 판단했다.',
  },
  {
    type: 'h2',
    text: '설계 핵심: Closure + Map + Symbol',
  },
  {
    type: 'p',
    html: '세 가지 도구를 조합했다.',
  },
  {
    type: 'list',
    items: [
      '<code>Map&lt;string, T&gt;</code> — 키별 캐시 저장소. 이미 응답받은 데이터는 다시 요청하지 않는다.',
      '<code>Map&lt;string, symbol&gt;</code> — 키별 in-flight 토큰. 현재 진행 중인 요청을 식별한다.',
      '<code>Symbol(key)</code> — 요청마다 생성되는 유일한 토큰. 같은 키로 새 요청이 들어오면 이전 토큰이 무효화된다.',
    ],
  },
  {
    type: 'p',
    html: '<code>Symbol()</code>이 이 패턴의 핵심이다. JavaScript에서 <code>Symbol()</code>은 호출할 때마다 <strong>전역적으로 유일한 값</strong>을 생성한다. 같은 설명 문자열을 넣어도 <code>Symbol("tab") !== Symbol("tab")</code>이다. 이 성질을 이용해 요청별 토큰을 만든다.',
  },
  {
    type: 'h2',
    text: '구현: 늦게 온 응답이 스스로를 무시하게 만들기',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'useRequestCache.ts',
    body: 'function useRequestCache<T>(fetcher: (key: string) => Promise<T>) {\n  const cache = useRef(new Map<string, T>());\n  const inflight = useRef(new Map<string, symbol>());\n  const [state, setState] = useState<{ key?: string; data?: T }>({});\n\n  const get = useCallback(async (key: string) => {\n    // 1. 캐시 히트 — 즉시 반환\n    if (cache.current.has(key)) {\n      setState({ key, data: cache.current.get(key) });\n      return;\n    }\n\n    // 2. 새 토큰 발급 — 이전 토큰은 자동 무효화\n    const token = Symbol(key);\n    inflight.current.set(key, token);\n\n    // 3. 네트워크 요청\n    const data = await fetcher(key);\n\n    // 4. 응답 시점에 토큰 비교 — stale이면 무시\n    if (inflight.current.get(key) !== token) return;\n\n    // 5. 유효한 응답만 캐시 + 렌더\n    cache.current.set(key, data);\n    setState({ key, data });\n  }, [fetcher]);\n\n  return [state, get] as const;\n}',
  },
  {
    type: 'h2',
    text: '흐름을 따라가 보자',
  },
  {
    type: 'p',
    html: '사용자가 "1개월" → "3개월" → "1년" 순으로 탭을 빠르게 누르는 시나리오를 따라가 보자.',
  },
  {
    type: 'list',
    items: [
      '<code>get("1m")</code> 호출 → <code>token_A = Symbol("1m")</code> 발급, inflight에 저장',
      '<code>get("3m")</code> 호출 → <code>token_B = Symbol("3m")</code> 발급, inflight에 저장',
      '<code>get("1y")</code> 호출 → <code>token_C = Symbol("1y")</code> 발급, inflight에 저장',
      '"1년" 응답 도착 → <code>inflight.get("1y") === token_C</code> ✓ → setState 실행, 캐시 저장',
      '"3개월" 응답 도착 → <code>inflight.get("3m") === token_B</code> ✓ → 하지만 화면은 이미 "1년"이므로 정상',
      '"1개월" 응답 도착 → <code>inflight.get("1m") === token_A</code> ✓ → 마찬가지로 정상',
    ],
  },
  {
    type: 'p',
    html: '그런데 같은 키를 연속으로 누르는 경우는 다르다. <code>get("1m")</code> → <code>get("1m")</code>이면, 두 번째 호출에서 <code>token_A</code>가 <code>token_B</code>로 덮어씌워진다. 첫 번째 요청이 나중에 응답해도 <code>inflight.get("1m") !== token_A</code>이므로 <strong>자동으로 무시</strong>된다. 이게 Symbol의 유일성이 빛나는 지점이다.',
  },
  {
    type: 'h2',
    text: 'Promise 중복 제거는 넣지 않은 이유',
  },
  {
    type: 'p',
    html: '같은 키로 요청이 in-flight일 때 같은 Promise를 반환하는 패턴(dedup)도 고려했다. 실제로 Zustand 스토어 레벨에서는 <code>pendingRequest</code>를 저장하는 방식으로 별도 구현이 되어 있었다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'usePortfolioHoldingsStore.ts',
    body: '// Zustand 스토어에서의 Promise dedup 패턴\nif (pendingRequest) {\n  await pendingRequest;\n  return;\n}\n\nconst requestPromise = (async () => {\n  set({ isLoading: true, error: null });\n  try {\n    const data = await PortfolioDashboardApi.getPortfolioHoldings();\n    set({ data: sortHoldingsBy(data, sortOption), isLoading: false, pendingRequest: null });\n  } catch (error) {\n    set({ error: error.message, isLoading: false, pendingRequest: null });\n  }\n})();\nset({ pendingRequest: requestPromise });',
  },
  {
    type: 'p',
    html: '<code>useRequestCache</code> 훅에서는 이 패턴을 분리했다. 훅의 책임은 "stale 응답 무시"에 집중하고, Promise dedup은 스토어 레이어에서 처리하는 것이 관심사 분리에 맞다고 판단했다.',
  },
  {
    type: 'h2',
    text: 'GSAP cleanup까지 묶어야 완성',
  },
  {
    type: 'p',
    html: '데이터만 해결하면 끝이 아니었다. 포트폴리오 차트는 GSAP 애니메이션으로 그려지는데, 탭 전환 시 이전 애니메이션의 cleanup이 누락되면 새 데이터 위에 옛 애니메이션이 겹쳐 그려졌다. <code>gsap.context().revert()</code>를 컴포넌트 언마운트에 연결해서 이 문제까지 해결했다.',
  },
  {
    type: 'p',
    html: 'race condition은 데이터 페칭만의 문제가 아니다. 비동기로 동작하는 모든 사이드 이펙트 — 애니메이션, 구독, 타이머 — 가 잠재적인 race condition 소스이고, 각각에 대한 cleanup 전략이 필요하다.',
  },
  {
    type: 'h2',
    text: '돌아보며',
  },
  {
    type: 'p',
    html: '이 훅은 50줄도 안 된다. React Query 같은 도구를 쓰면 더 많은 기능을 공짜로 얻을 수 있다. 하지만 "문제를 정확히 정의하고, 딱 그 문제만 푸는 도구를 만드는" 경험은 라이브러리를 쓸 때도 <em>어디를 커스터마이즈해야 하는지</em> 판단하는 근거가 된다.',
  },
  {
    type: 'list',
    items: [
      'race condition의 본질은 "늦게 온 응답이 최신 상태를 덮어쓰는 것"',
      'Symbol()의 유일성으로 요청별 토큰을 만들면 stale 판별이 한 줄로 끝난다',
      '캐시와 in-flight 식별은 관심사가 다르다 — 분리하라',
      'GSAP 등 비동기 사이드 이펙트도 cleanup 전략이 필요하다',
      '라이브러리를 도입하기 전에, 진짜 필요한 범위를 먼저 정의하라',
    ],
  },
];

// ============================================================
// POST 2: useRequestCache-hook (English)
// ============================================================

export const useRequestCacheEn: ContentBlock[] = [
  {
    type: 'blockquote',
    text: 'Fast fingers create bugs that slow networks reveal. If the screen "flickers back to the past" when you tap tabs in quick succession, that is a race condition.',
  },
  {
    type: 'h2',
    text: 'The problem: fast tab switching takes the screen back in time',
  },
  {
    type: 'p',
    html: 'I was building an investment portfolio analysis platform at Awarelab. The portfolio dashboard had period filters and asset-type tabs. When users switched tabs or filters rapidly, something strange happened.',
  },
  {
    type: 'list',
    items: [
      'Click "1 month" tab, then "3 months", then "1 year"',
      'The "1 year" data appears briefly, then suddenly gets replaced by "3 months" data',
      'GSAP chart animations flicker and redraw with the wrong dataset',
    ],
  },
  {
    type: 'p',
    html: 'The cause was clear. Async API responses <strong>do not arrive in request order</strong>. If the "1 year" request responds first and the "3 months" request arrives later, the late "3 months" response calls <code>setState</code> and overwrites the current view. For financial data, this meant showing incorrect numbers — not just a UX issue, but a <em>data integrity problem</em>.',
  },
  {
    type: 'h2',
    text: 'Why I did not use an existing solution',
  },
  {
    type: 'p',
    html: "React Query (TanStack Query) could structurally solve race conditions. But this project already had its state management designed around Zustand, and the specific need was exactly one thing: <strong>when an in-flight request exists for the same key, ignore the previous request's response</strong>.",
  },
  {
    type: 'p',
    html: 'Adopting React Query would bring cache management, retries, and mutations along for the ride, but all I needed at that point was in-flight identification. Building a custom cache hook was lighter and more precise.',
  },
  {
    type: 'h2',
    text: 'Design core: Closure + Map + Symbol',
  },
  {
    type: 'p',
    html: 'I combined three tools.',
  },
  {
    type: 'list',
    items: [
      '<code>Map&lt;string, T&gt;</code> — per-key cache store. Already-fetched data is never re-requested.',
      '<code>Map&lt;string, symbol&gt;</code> — per-key in-flight token. Identifies the currently active request.',
      '<code>Symbol(key)</code> — a unique token generated per request. When a new request comes in for the same key, the previous token is automatically invalidated.',
    ],
  },
  {
    type: 'p',
    html: '<code>Symbol()</code> is the heart of this pattern. In JavaScript, every <code>Symbol()</code> call produces a <strong>globally unique value</strong>. Even with the same description string, <code>Symbol("tab") !== Symbol("tab")</code>. This property lets us create a per-request token.',
  },
  {
    type: 'h2',
    text: 'Implementation: making stale responses ignore themselves',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'useRequestCache.ts',
    body: 'function useRequestCache<T>(fetcher: (key: string) => Promise<T>) {\n  const cache = useRef(new Map<string, T>());\n  const inflight = useRef(new Map<string, symbol>());\n  const [state, setState] = useState<{ key?: string; data?: T }>({});\n\n  const get = useCallback(async (key: string) => {\n    // 1. Cache hit — return immediately\n    if (cache.current.has(key)) {\n      setState({ key, data: cache.current.get(key) });\n      return;\n    }\n\n    // 2. Issue new token — previous token auto-invalidated\n    const token = Symbol(key);\n    inflight.current.set(key, token);\n\n    // 3. Network request\n    const data = await fetcher(key);\n\n    // 4. Compare tokens on response — stale means ignore\n    if (inflight.current.get(key) !== token) return;\n\n    // 5. Valid response only: cache + render\n    cache.current.set(key, data);\n    setState({ key, data });\n  }, [fetcher]);\n\n  return [state, get] as const;\n}',
  },
  {
    type: 'h2',
    text: 'Walking through the flow',
  },
  {
    type: 'p',
    html: 'Let\'s trace the scenario where a user rapidly clicks "1 month", then "3 months", then "1 year".',
  },
  {
    type: 'list',
    items: [
      '<code>get("1m")</code> called — <code>token_A = Symbol("1m")</code> issued, stored in inflight',
      '<code>get("3m")</code> called — <code>token_B = Symbol("3m")</code> issued, stored in inflight',
      '<code>get("1y")</code> called — <code>token_C = Symbol("1y")</code> issued, stored in inflight',
      '"1 year" response arrives — <code>inflight.get("1y") === token_C</code> ✓ — setState runs, cached',
      '"3 months" response arrives — <code>inflight.get("3m") === token_B</code> ✓ — but screen already shows "1 year", so this is fine',
      '"1 month" response arrives — <code>inflight.get("1m") === token_A</code> ✓ — same, no conflict',
    ],
  },
  {
    type: 'p',
    html: 'But the case of tapping the same key consecutively is different. If <code>get("1m")</code> is called twice, the second call overwrites <code>token_A</code> with <code>token_B</code>. When the first request responds later, <code>inflight.get("1m") !== token_A</code>, so it is <strong>automatically ignored</strong>. This is where Symbol\'s uniqueness shines.',
  },
  {
    type: 'h2',
    text: 'Why I left out promise deduplication',
  },
  {
    type: 'p',
    html: 'I also considered a pattern that returns the same Promise when a request is already in-flight for the same key (dedup). In fact, at the Zustand store level, this was separately implemented by storing a <code>pendingRequest</code>.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'usePortfolioHoldingsStore.ts',
    body: '// Promise dedup pattern at the Zustand store level\nif (pendingRequest) {\n  await pendingRequest;\n  return;\n}\n\nconst requestPromise = (async () => {\n  set({ isLoading: true, error: null });\n  try {\n    const data = await PortfolioDashboardApi.getPortfolioHoldings();\n    set({ data: sortHoldingsBy(data, sortOption), isLoading: false, pendingRequest: null });\n  } catch (error) {\n    set({ error: error.message, isLoading: false, pendingRequest: null });\n  }\n})();\nset({ pendingRequest: requestPromise });',
  },
  {
    type: 'p',
    html: 'I separated this concern from the <code>useRequestCache</code> hook. The hook\'s responsibility is focused on "ignoring stale responses," while Promise dedup belongs at the store layer. This felt like proper separation of concerns.',
  },
  {
    type: 'h2',
    text: 'GSAP cleanup completes the picture',
  },
  {
    type: 'p',
    html: 'Fixing the data was not the end. Portfolio charts were rendered with GSAP animations, and when cleanup was missing on tab switch, old animations would draw over the new data. Connecting <code>gsap.context().revert()</code> to component unmount solved this too.',
  },
  {
    type: 'p',
    html: 'Race conditions are not just a data-fetching problem. Every asynchronous side effect — animations, subscriptions, timers — is a potential race condition source, and each needs its own cleanup strategy.',
  },
  {
    type: 'h2',
    text: 'Looking back',
  },
  {
    type: 'p',
    html: 'This hook is under 50 lines. A tool like React Query gives you far more for free. But the experience of "precisely defining the problem and building a tool that solves exactly that" becomes the basis for judging <em>where to customize</em> even when you do use a library.',
  },
  {
    type: 'list',
    items: [
      'The essence of a race condition is "a late response overwriting the latest state"',
      "Symbol()'s uniqueness turns stale detection into a one-liner",
      'Cache and in-flight identification are different concerns — separate them',
      'Async side effects like GSAP also need cleanup strategies',
      'Before adopting a library, define the actual scope of what you need',
    ],
  },
];

// ============================================================
// POST 3: lighthouse-52-to-87 (Korean)
// ============================================================

export const lighthouseKo: ContentBlock[] = [
  {
    type: 'blockquote',
    text: '성능 최적화는 추측이 아니라 측정에서 시작한다. 숫자가 문제를 가리키면, 해결은 의외로 단순하다.',
  },
  {
    type: 'h2',
    text: '52점짜리 메인 페이지',
  },
  {
    type: 'p',
    html: '어웨어랩에서 투자 포트폴리오 분석 멤버십 플랫폼의 프론트엔드를 단독으로 맡고 있었다. 1차 개발이 끝나고 Lighthouse를 돌려봤는데, 메인 페이지 Performance 점수가 <strong>52점</strong>이었다. LCP는 9~10초, CLS는 0.126. SEO 랭킹을 올려야 하는 플랫폼에서 이 숫자는 치명적이었다.',
  },
  {
    type: 'p',
    html: '어디서부터 손대야 할지 감이 안 왔다. 코드를 대충 훑어보며 "이게 무거울 것 같은데" 하고 추측하는 것은 위험하다. 측정 도구부터 붙이기로 했다.',
  },
  {
    type: 'h2',
    text: 'Step 1 — @next/bundle-analyzer로 측정하기',
  },
  {
    type: 'p',
    html: '번들 분석기를 Next.js 설정에 붙였다. 설정은 간단하다.',
  },
  {
    type: 'code',
    lang: 'javascript',
    file: 'next.config.js',
    body: 'const withBundleAnalyzer = require("@next/bundle-analyzer")({\n  enabled: process.env.ANALYZE === "true",\n});\n\nmodule.exports = withBundleAnalyzer({\n  // ... existing config\n});',
  },
  {
    type: 'p',
    html: '<code>ANALYZE=true npm run build</code>를 실행하면 브라우저에 트리맵이 열린다. 각 모듈이 번들에서 차지하는 비율을 시각적으로 보여준다. 이 시점에서 초기 번들 크기는 <strong>253KB</strong>였다.',
  },
  {
    type: 'h2',
    text: 'Step 2 — 범인을 진단하다',
  },
  {
    type: 'p',
    html: '트리맵에서 세 가지가 눈에 띄었다.',
  },
  {
    type: 'list',
    items: [
      '<strong>Directus CMS SDK</strong> — 메인 페이지에서 쓰지 않는 CMS 관련 모듈이 초기 번들에 포함',
      '<strong>차트 라이브러리</strong> — 포트폴리오 대시보드에서만 쓰는 차트 라이브러리가 모든 페이지의 초기 번들에 포함',
      '<strong>GSAP</strong> — 마케팅 애니메이션용인데 모든 라우트에서 로딩',
    ],
  },
  {
    type: 'p',
    html: '세 가지 모두 같은 패턴이었다. <em>특정 페이지에서만 쓰는 모듈이 초기 번들에 포함</em>되고 있었다. 일반적인 import 문으로 가져오면 빌드 시 하나의 청크에 묶이기 때문이다.',
  },
  {
    type: 'h2',
    text: 'Step 3 — 동적 import로 코드 스플리팅',
  },
  {
    type: 'p',
    html: 'Next.js의 <code>next/dynamic</code>으로 해당 컴포넌트들을 동적 import로 전환했다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'page.tsx',
    body: "import dynamic from 'next/dynamic';\n\n// Before: import PortfolioChart from '@/widgets/PortfolioChart';\n// After:\nconst PortfolioChart = dynamic(\n  () => import('@/widgets/PortfolioChart'),\n  { ssr: false, loading: () => <ChartSkeleton /> }\n);",
  },
  {
    type: 'p',
    html: '핵심은 <code>ssr: false</code>와 <code>loading</code> 컴포넌트다. 차트나 GSAP 같은 클라이언트 전용 모듈은 서버에서 렌더할 필요가 없고, 로딩 중에 Skeleton UI를 보여주면 CLS도 방지할 수 있다. CMS SDK, 차트 라이브러리, GSAP 세 가지 모두 동적 import로 전환했다.',
  },
  {
    type: 'h2',
    text: 'Step 4 — 폰트 서브셋 생성',
  },
  {
    type: 'p',
    html: 'bundle-analyzer에는 안 보이지만 네트워크 탭에서 또 다른 범인이 보였다. <strong>웹폰트 파일이 각각 800KB</strong>. 4개 weight를 로딩하면 3.2MB다. 폰트가 LCP 요소보다 먼저 로딩되면서 렌더링을 블로킹하고 있었다.',
  },
  {
    type: 'p',
    html: '사용하는 글리프만 추출하는 <strong>서브셋</strong>을 생성했다. 800KB → 250KB/파일로 줄였다. 추가로 폰트 로딩 순서를 변경해서 LCP 요소가 폰트보다 먼저 렌더되게 했다. FOUT(Flash of Unstyled Text)가 발생하지만 CLS 영향은 미미했고, SEO 랭킹 목표에 따라 LCP 가중치를 우선 판단했다.',
  },
  {
    type: 'h2',
    text: 'CLS 0 달성 — Skeleton UI',
  },
  {
    type: 'p',
    html: 'CLS 0.126의 원인은 동적 컴포넌트가 로딩되면서 레이아웃이 밀리는 것이었다. 동적 import의 <code>loading</code> 속성에 같은 높이의 Skeleton 컴포넌트를 넣어서, 로딩 전후로 레이아웃 시프트가 0이 되게 했다. 이것으로 <strong>CLS 0</strong>을 달성했다.',
  },
  {
    type: 'h2',
    text: '결과',
  },
  {
    type: 'list',
    items: [
      '번들 사이즈: 253KB → 136KB (<strong>46% 감소</strong>)',
      'LCP: 9~10초 → 3.8초 (<strong>약 60% 개선</strong>)',
      'CLS: 0.126 → <strong>0</strong>',
      'Lighthouse Performance: 52점 → <strong>87점</strong>',
    ],
  },
  {
    type: 'h2',
    text: '교훈: 측정이 먼저다',
  },
  {
    type: 'p',
    html: '52점을 87점으로 올리는 데 걸린 시간은 약 1주일이었다. 그 1주일에서 가장 중요한 하루는 번들 분석기를 붙이고 트리맵을 읽는 하루였다. <strong>추측하지 않고 측정하면, 문제가 가리키는 해결책은 의외로 단순하다</strong> — 동적 import로 분리하고, 폰트를 줄이고, Skeleton으로 CLS를 잡으면 된다.',
  },
  {
    type: 'list',
    items: [
      '성능 최적화의 첫 단계는 번들 분석기를 붙이는 것이다',
      '초기 번들에 불필요한 모듈이 포함되어 있으면 동적 import로 분리하라',
      '폰트 서브셋은 비용 대비 효과가 가장 큰 최적화 중 하나다',
      'CLS는 Skeleton UI로 해결할 수 있다 — 동적 컴포넌트에 같은 높이의 플레이스홀더를 넣어라',
      '추측하지 말고 측정하라. 숫자가 문제를 말해준다',
    ],
  },
];

// ============================================================
// POST 3: lighthouse-52-to-87 (English)
// ============================================================

export const lighthouseEn: ContentBlock[] = [
  {
    type: 'blockquote',
    text: 'Performance optimization starts with measurement, not guesswork. When numbers point to the problem, the fix is often surprisingly simple.',
  },
  {
    type: 'h2',
    text: 'A 52-point main page',
  },
  {
    type: 'p',
    html: 'I was the sole frontend engineer at Awarelab, building an investment portfolio analysis membership platform. After the initial development cycle, I ran Lighthouse on the main page. Performance score: <strong>52</strong>. LCP was 9-10 seconds, CLS was 0.126. For a platform that needed SEO ranking, these numbers were devastating.',
  },
  {
    type: 'p',
    html: 'I had no idea where to start. Scanning the code and guessing "this probably heavy" is dangerous. I decided to attach measurement tools first.',
  },
  {
    type: 'h2',
    text: 'Step 1 — measure with @next/bundle-analyzer',
  },
  {
    type: 'p',
    html: 'I plugged bundle-analyzer into the Next.js config. Setup is straightforward.',
  },
  {
    type: 'code',
    lang: 'javascript',
    file: 'next.config.js',
    body: 'const withBundleAnalyzer = require("@next/bundle-analyzer")({\n  enabled: process.env.ANALYZE === "true",\n});\n\nmodule.exports = withBundleAnalyzer({\n  // ... existing config\n});',
  },
  {
    type: 'p',
    html: "Running <code>ANALYZE=true npm run build</code> opens a treemap in the browser, showing each module's share of the bundle visually. At this point, the initial bundle was <strong>253KB</strong>.",
  },
  {
    type: 'h2',
    text: 'Step 2 — diagnosing the culprits',
  },
  {
    type: 'p',
    html: 'Three things stood out in the treemap.',
  },
  {
    type: 'list',
    items: [
      '<strong>Directus CMS SDK</strong> — CMS modules unused on the main page were included in the initial bundle',
      '<strong>Chart library</strong> — used only on the portfolio dashboard, yet loaded in the initial bundle for every page',
      '<strong>GSAP</strong> — meant for marketing animations, but loaded on every route',
    ],
  },
  {
    type: 'p',
    html: 'All three followed the same pattern: <em>modules used only on specific pages were included in the initial bundle</em>. Standard import statements cause them to be bundled into a single chunk at build time.',
  },
  {
    type: 'h2',
    text: 'Step 3 — code splitting with dynamic imports',
  },
  {
    type: 'p',
    html: 'I converted those components to dynamic imports using <code>next/dynamic</code>.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'page.tsx',
    body: "import dynamic from 'next/dynamic';\n\n// Before: import PortfolioChart from '@/widgets/PortfolioChart';\n// After:\nconst PortfolioChart = dynamic(\n  () => import('@/widgets/PortfolioChart'),\n  { ssr: false, loading: () => <ChartSkeleton /> }\n);",
  },
  {
    type: 'p',
    html: 'The key details are <code>ssr: false</code> and the <code>loading</code> component. Client-only modules like charts and GSAP have no reason to render on the server, and showing a Skeleton UI during loading also prevents CLS. I converted all three — the CMS SDK, chart library, and GSAP — to dynamic imports.',
  },
  {
    type: 'h2',
    text: 'Step 4 — font subsetting',
  },
  {
    type: 'p',
    html: 'The bundle analyzer did not show it, but the Network tab revealed another culprit: <strong>web font files at 800KB each</strong>. Loading 4 weights meant 3.2MB. Fonts were loading before the LCP element and blocking rendering.',
  },
  {
    type: 'p',
    html: 'I generated <strong>subsets</strong> containing only the glyphs actually used. 800KB dropped to 250KB per file. I also reordered font loading so the LCP element renders before fonts. This causes FOUT (Flash of Unstyled Text), but CLS impact was minimal, and I prioritized LCP weight given our SEO ranking goals.',
  },
  {
    type: 'h2',
    text: 'Reaching CLS 0 — Skeleton UI',
  },
  {
    type: 'p',
    html: "The 0.126 CLS was caused by dynamic components pushing the layout as they loaded. I added Skeleton components with matching heights to each dynamic import's <code>loading</code> prop, eliminating layout shift before and after loading. This achieved <strong>CLS 0</strong>.",
  },
  {
    type: 'h2',
    text: 'Results',
  },
  {
    type: 'list',
    items: [
      'Bundle size: 253KB to 136KB (<strong>46% reduction</strong>)',
      'LCP: 9-10s to 3.8s (<strong>~60% improvement</strong>)',
      'CLS: 0.126 to <strong>0</strong>',
      'Lighthouse Performance: 52 to <strong>87</strong>',
    ],
  },
  {
    type: 'h2',
    text: 'Lesson: measure first',
  },
  {
    type: 'p',
    html: 'Getting from 52 to 87 took about a week. The most important day of that week was the one I spent attaching the bundle analyzer and reading the treemap. <strong>When you measure instead of guessing, the solutions that the numbers point to are often surprisingly simple</strong> — split with dynamic imports, shrink fonts, fix CLS with skeletons.',
  },
  {
    type: 'list',
    items: [
      'The first step of performance optimization is attaching a bundle analyzer',
      'If unnecessary modules are in the initial bundle, split them out with dynamic imports',
      'Font subsetting is one of the highest-ROI optimizations available',
      'CLS can be solved with Skeleton UI — add a placeholder matching the dynamic component height',
      'Do not guess. Measure. The numbers tell you the problem',
    ],
  },
];

// ============================================================
// POST 4: asp-net-to-nextjs (Korean)
// ============================================================

export const aspNetKo: ContentBlock[] = [
  {
    type: 'blockquote',
    text: '마이그레이션의 신뢰는 "기존 기능이 하나도 사라지지 않았다"에서 시작한다. 새 기술의 장점을 보여주기 전에, 먼저 기존 동작을 증명해야 한다.',
  },
  {
    type: 'h2',
    text: '시연 첫인상 — 흰 화면이 깜빡인다',
  },
  {
    type: 'p',
    html: 'Daqda에서 장지(묘지) 위치를 시각화하는 서비스 The Prestige를 담당하고 있었다. 연세 세브란스 같은 대형 고객사 시연을 앞두고, 기존 ASP.NET 서비스의 문제가 선명해졌다. 필터를 하나 바꿀 때마다 <strong>페이지 전체가 새로고침</strong>되면서 흰 화면이 깜빡였다. step별로 다른 페이지로 이동해야 했고, 뒤로가기를 누르면 사용자가 선택한 필터가 날아갔다.',
  },
  {
    type: 'p',
    html: '서버 사이드 렌더링 기반 MPA 구조의 본질적 한계였다. 패치할 수 있는 문제가 아니라, 아키텍처를 바꿔야 하는 문제였다. Next.js 기반 SPA로 전면 재구축하기로 결정했다. 시간은 <strong>6주</strong>.',
  },
  {
    type: 'h2',
    text: '페이지 단위 우선순위',
  },
  {
    type: 'p',
    html: '8개 페이지를 한꺼번에 옮기면 6주 안에 끝나지 않는다. 페이지별로 우선순위를 매겼다.',
  },
  {
    type: 'list',
    items: [
      '<strong>P0</strong> — 시연에 반드시 필요한 페이지: 지도 뷰, 장지 상세, 필터',
      '<strong>P1</strong> — 시연에 보여주면 좋은 페이지: 통계 대시보드, 관리자 설정',
      '<strong>P2</strong> — 시연 이후 마이그레이션: 레거시 보고서, 기타 유틸리티',
    ],
  },
  {
    type: 'p',
    html: 'P0을 먼저 완성하고 시연에서 검증한 뒤, P1과 P2를 순차적으로 진행했다. 이 순서 덕분에 6주 중 4주 시점에 시연이 가능했다.',
  },
  {
    type: 'h2',
    text: '프론트엔드 주도 API 설계',
  },
  {
    type: 'p',
    html: '레거시 ASP.NET의 API 응답은 프론트엔드 요구에 맞지 않았다. 서버 사이드 렌더링을 전제로 설계된 데이터 구조였기 때문이다. 백엔드에 API 응답 형식을 직접 제안하고 협의했다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'types/api.ts',
    body: '// FE가 필요한 데이터 구조를 인터페이스로 정의하고 BE에 전달\ninterface GraveSiteResponse {\n  id: number;\n  name: string;\n  location: {\n    lat: number;\n    lng: number;\n    address: string;\n  };\n  filters: {\n    type: GraveType;\n    status: GraveStatus;\n    capacity: number;\n  };\n  // ASP.NET 시절에는 이 데이터가 3개 엔드포인트에 분산되어 있었다\n}',
  },
  {
    type: 'p',
    html: '프론트엔드가 필요한 형태를 인터페이스로 정의해서 백엔드에 전달하니, 불필요한 API 호출이 줄고 데이터 변환 로직도 사라졌다. 프론트엔드 개발자가 API 설계에 참여하는 것은 마이그레이션에서 특히 중요하다.',
  },
  {
    type: 'h2',
    text: 'Kakao Map + Recoil + LocalStorage',
  },
  {
    type: 'p',
    html: '지도 기반 서비스의 핵심은 필터 변경 시 지도가 새로고침되지 않는 것이다. Recoil로 필터 상태를 관리하고, Kakao Map API의 마커를 클라이언트 사이드에서 실시간으로 업데이트했다. 기존 ASP.NET에서는 필터를 바꾸면 새 페이지로 이동했는데, SPA에서는 같은 화면에서 마커만 바뀐다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'store/filterState.ts',
    body: "import { atom } from 'recoil';\nimport { recoilPersist } from 'recoil-persist';\n\nconst { persistAtom } = recoilPersist({\n  key: 'prestige-filters',\n  storage: typeof window !== 'undefined' ? localStorage : undefined,\n});\n\nexport const graveFilterState = atom<GraveFilter>({\n  key: 'graveFilter',\n  default: { type: 'all', status: 'available' },\n  effects_UNSTABLE: [persistAtom],\n});",
  },
  {
    type: 'p',
    html: '<code>recoil-persist</code>로 필터 상태를 localStorage에 저장했다. 이전에는 사용자가 뒤로가기를 누르면 선택한 필터가 날아가서 전화로 CS를 해야 했는데, 이 문제가 완전히 사라졌다.',
  },
  {
    type: 'h2',
    text: '배포 — 10분에서 2분으로',
  },
  {
    type: 'p',
    html: '기존 배포 과정은 이랬다. 로컬에서 빌드 → 빌드 파일을 Windows Server 접근 권한이 있는 사람에게 전달 → 그 사람이 서버에 수동 업로드. <strong>10분</strong>이 걸렸고, 접근 권한 문제로 빌드 파일을 넘겨야 하는 비효율적인 중간 단계가 있었다.',
  },
  {
    type: 'p',
    html: 'Vercel 기반 CI/CD를 구축했다. <code>git push</code>하면 자동으로 빌드, 린팅 검사, 배포가 실행된다. 배포 시간은 <strong>2분</strong>으로, <strong>80% 단축</strong>되었다.',
  },
  {
    type: 'h2',
    text: '마이그레이션의 사회학',
  },
  {
    type: 'p',
    html: '코드 마이그레이션보다 어려운 것은 <em>사람을 설득하는 것</em>이다. CTO와 백엔드 개발자에게 "왜 새로 만들어야 하는가"를 납득시키려면, 기존 시스템의 문제를 감정이 아니라 사실로 보여줘야 한다. 시연 중 흰 화면이 깜빡이는 것을 직접 보여주고, 페이지 로딩 시간을 측정해서 비교한 것이 결정적이었다.',
  },
  {
    type: 'p',
    html: '마이그레이션 완료 후 알파 테스터들로부터 "훨씬 좋은 경험"이라는 피드백을 받았다. 가장 큰 차이는 필터를 바꿀 때 흰 화면이 없어진 것이었다.',
  },
  {
    type: 'h2',
    text: '결과',
  },
  {
    type: 'list',
    items: [
      '8개 페이지, 설계 포함 <strong>6주</strong> 완료',
      '기능 삭제 <strong>0건</strong> — 기존 동작 100% 유지',
      '배포 시간 10분 → 2분 (<strong>80% 단축</strong>)',
      '필터 변경 시 전체 새로고침 제거 → SPA 내 실시간 반영',
      'LocalStorage 기반 상태 유지로 CS 전화 문의 감소',
      '알파 테스터 긍정 피드백 확보',
    ],
  },
];

// ============================================================
// POST 4: asp-net-to-nextjs (English)
// ============================================================

export const aspNetEn: ContentBlock[] = [
  {
    type: 'blockquote',
    text: 'Migration trust starts with "not a single existing feature was lost." Before showcasing new technology advantages, you have to prove the old behavior first.',
  },
  {
    type: 'h2',
    text: 'Demo first impression — the white flash',
  },
  {
    type: 'p',
    html: 'At Daqda, I was responsible for The Prestige, a service that visualizes grave site locations on a map. With demos to major hospital clients approaching, the problems with the legacy ASP.NET service became clear. Every time a user changed a filter, the <strong>entire page refreshed</strong> with a white flash. Navigation required jumping between separate pages per step, and hitting back wiped out all selected filters.',
  },
  {
    type: 'p',
    html: 'This was a fundamental limitation of the server-rendered MPA architecture. Not a patchable issue, but one that required an architecture change. I decided to rebuild entirely as a Next.js SPA. Timeline: <strong>6 weeks</strong>.',
  },
  {
    type: 'h2',
    text: 'Page-level prioritization',
  },
  {
    type: 'p',
    html: 'Migrating all 8 pages at once would blow past the 6-week deadline. I prioritized by page.',
  },
  {
    type: 'list',
    items: [
      '<strong>P0</strong> — essential for the demo: map view, site details, filters',
      '<strong>P1</strong> — nice to show at the demo: statistics dashboard, admin settings',
      '<strong>P2</strong> — migrate after the demo: legacy reports, utility pages',
    ],
  },
  {
    type: 'p',
    html: 'By finishing P0 first and validating it at the demo, then sequentially tackling P1 and P2, the demo was ready by week 4 of 6.',
  },
  {
    type: 'h2',
    text: 'Frontend-driven API design',
  },
  {
    type: 'p',
    html: 'The legacy ASP.NET API responses did not fit frontend needs. The data structures were designed for server-side rendering. I proposed API response formats directly to the backend team.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'types/api.ts',
    body: '// Define the data structure FE needs as an interface, hand to BE\ninterface GraveSiteResponse {\n  id: number;\n  name: string;\n  location: {\n    lat: number;\n    lng: number;\n    address: string;\n  };\n  filters: {\n    type: GraveType;\n    status: GraveStatus;\n    capacity: number;\n  };\n  // In the ASP.NET era, this data was scattered across 3 endpoints\n}',
  },
  {
    type: 'p',
    html: 'Defining the shape frontend needed as interfaces and handing them to backend eliminated unnecessary API calls and data transformation logic. Frontend developers participating in API design is especially important during migration.',
  },
  {
    type: 'h2',
    text: 'Kakao Map + Recoil + LocalStorage',
  },
  {
    type: 'p',
    html: 'The core of a map-based service is that the map does not refresh when filters change. I managed filter state with Recoil and updated Kakao Map markers client-side in real time. In the old ASP.NET version, changing a filter navigated to a new page. In the SPA, only the markers update on the same screen.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'store/filterState.ts',
    body: "import { atom } from 'recoil';\nimport { recoilPersist } from 'recoil-persist';\n\nconst { persistAtom } = recoilPersist({\n  key: 'prestige-filters',\n  storage: typeof window !== 'undefined' ? localStorage : undefined,\n});\n\nexport const graveFilterState = atom<GraveFilter>({\n  key: 'graveFilter',\n  default: { type: 'all', status: 'available' },\n  effects_UNSTABLE: [persistAtom],\n});",
  },
  {
    type: 'p',
    html: 'Using <code>recoil-persist</code>, filter state is saved to localStorage. Previously, hitting the back button wiped the selected filters, forcing users to call customer support. That problem vanished entirely.',
  },
  {
    type: 'h2',
    text: 'Deployment — from 10 minutes to 2',
  },
  {
    type: 'p',
    html: 'The old deployment process: build locally, hand the build artifact to someone with Windows Server access, that person manually uploads it. <strong>10 minutes</strong>, with an inefficient handoff step due to access permissions.',
  },
  {
    type: 'p',
    html: 'I set up Vercel-based CI/CD. <code>git push</code> triggers automatic build, lint checks, and deployment. Deploy time dropped to <strong>2 minutes</strong> — an <strong>80% reduction</strong>.',
  },
  {
    type: 'h2',
    text: 'The sociology of migration',
  },
  {
    type: 'p',
    html: 'Harder than migrating the code is <em>convincing the people</em>. To get the CTO and backend developer on board with "why we need to rebuild," you have to show the existing system\'s problems with facts, not feelings. Demonstrating the white flash during a live demo and comparing measured page load times was decisive.',
  },
  {
    type: 'p',
    html: 'After the migration, alpha testers gave feedback that it was "a much better experience." The biggest difference was no more white flash when changing filters.',
  },
  {
    type: 'h2',
    text: 'Results',
  },
  {
    type: 'list',
    items: [
      '8 pages, <strong>6 weeks</strong> including design',
      '<strong>Zero</strong> feature deletions — 100% behavior parity',
      'Deploy time 10 min to 2 min (<strong>80% reduction</strong>)',
      'Full page refresh on filter change eliminated — real-time SPA updates',
      'LocalStorage persistence reduced customer support calls',
      'Positive alpha tester feedback secured',
    ],
  },
];

// ============================================================
// POST 5: zustand-factory-pattern (Korean)
// ============================================================

export const zustandFactoryKo: ContentBlock[] = [
  {
    type: 'blockquote',
    text: '복사-붙여넣기는 처음엔 빠르고, 나중엔 부채가 된다. 세 번째 복사를 하는 순간, 그건 추상화 신호다.',
  },
  {
    type: 'h2',
    text: 'Admin은 필터로 이루어져 있다',
  },
  {
    type: 'p',
    html: '어웨어랩의 Admin 대시보드를 만들고 있었다. 회원 관리, 콘텐츠 관리, 결제 내역, 구독 관리, 쿠폰 관리 — 5개 이상의 도메인이 있고, 각각에 상태 필터, 검색어, 날짜 범위, 페이지네이션이 달려 있다. <strong>Admin은 결국 필터의 집합</strong>이다.',
  },
  {
    type: 'p',
    html: '처음에는 도메인마다 Zustand 스토어를 따로 만들었다. 멤버 필터 스토어, 콘텐츠 필터 스토어, 결제 필터 스토어... 구조는 거의 같은데 타입만 다른 코드가 5벌 복사되었다.',
  },
  {
    type: 'h2',
    text: '복사-붙여넣기의 비용',
  },
  {
    type: 'p',
    html: '처음 두 개는 괜찮았다. 세 번째 스토어를 복사하면서 문제가 보이기 시작했다.',
  },
  {
    type: 'list',
    items: [
      '날짜 필터 로직을 수정하면 5개 파일을 모두 고쳐야 한다',
      '하나를 빠뜨리면 특정 도메인에서만 버그가 발생한다',
      '새 도메인이 추가될 때마다 파일을 복사하고, 타입과 기본값을 바꾸고, import를 연결해야 한다',
      '리뷰어가 "이 코드 다른 스토어에서 본 것 같은데" 라고 말하기 시작한다',
    ],
  },
  {
    type: 'p',
    html: '반복되는 구조에서 달라지는 것은 딱 두 가지였다 — <strong>상태(status) 타입</strong>과 <strong>도메인별 추가 필터</strong>. 나머지(검색어, 날짜 범위, 페이지네이션, reset, setter)는 동일했다.',
  },
  {
    type: 'h2',
    text: '팩토리 아이디어',
  },
  {
    type: 'p',
    html: '달라지는 부분을 제네릭 타입 인자로 빼고, 동일한 부분은 팩토리 함수가 자동으로 생성하면 된다. <code>createFilterStore&lt;TStatus, TAdditional&gt;()</code>을 호출하면 완전한 필터 스토어가 반환되는 구조다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'createFilterStore.ts',
    body: "import { create } from 'zustand';\nimport { immer } from 'zustand/middleware/immer';\n\ninterface BaseFilter {\n  search: string;\n  dateRange: { start: Date | null; end: Date | null };\n  page: number;\n  pageSize: number;\n}\n\ntype FilterState<TStatus extends string, TAdditional extends Record<string, unknown>> =\n  BaseFilter & { status: TStatus | 'all' } & TAdditional;\n\ntype FilterActions<TStatus extends string, TAdditional extends Record<string, unknown>> = {\n  setStatus: (status: TStatus | 'all') => void;\n  setSearch: (search: string) => void;\n  setDateRange: (range: { start: Date | null; end: Date | null }) => void;\n  setPage: (page: number) => void;\n  reset: () => void;\n} & {\n  [K in keyof TAdditional as `set${Capitalize<string & K>}`]:\n    (value: TAdditional[K]) => void;\n};\n\nexport function createFilterStore<\n  TStatus extends string,\n  TAdditional extends Record<string, unknown> = Record<string, never>,\n>(defaults: { status: TStatus | 'all' } & TAdditional) {\n  const initialState: FilterState<TStatus, TAdditional> = {\n    search: '',\n    dateRange: { start: null, end: null },\n    page: 1,\n    pageSize: 20,\n    ...defaults,\n  };\n\n  // Generate dynamic setters for TAdditional keys\n  const additionalSetters = Object.keys(defaults).reduce((acc, key) => {\n    if (key === 'status') return acc;\n    const setterName = `set${key.charAt(0).toUpperCase()}${key.slice(1)}`;\n    acc[setterName] = (value: unknown) =>\n      (state: FilterState<TStatus, TAdditional>) => {\n        (state as Record<string, unknown>)[key] = value;\n      };\n    return acc;\n  }, {} as Record<string, Function>);\n\n  return create<FilterState<TStatus, TAdditional> & FilterActions<TStatus, TAdditional>>()(\n    immer((set) => ({\n      ...initialState,\n      setStatus: (status) => set((s) => { s.status = status; }),\n      setSearch: (search) => set((s) => { s.search = search; s.page = 1; }),\n      setDateRange: (range) => set((s) => { s.dateRange = range; s.page = 1; }),\n      setPage: (page) => set((s) => { s.page = page; }),\n      reset: () => set(() => ({ ...initialState }) as any),\n      ...Object.fromEntries(\n        Object.entries(additionalSetters).map(([name, fn]) => [\n          name,\n          (value: unknown) => set(fn(value) as any),\n        ])\n      ),\n    }) as any)\n  );\n}",
  },
  {
    type: 'h2',
    text: '사용 예시',
  },
  {
    type: 'p',
    html: '새 도메인 필터를 추가하는 것은 이제 파일 하나, 몇 줄이면 된다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'stores/members-filter.ts',
    body: "import { createFilterStore } from './createFilterStore';\n\ntype MemberStatus = 'active' | 'expired' | 'cancelled';\n\nexport const useMemberFilterStore = createFilterStore<\n  MemberStatus,\n  { plan: string; country: string }\n>({\n  status: 'all',\n  plan: 'all',\n  country: 'all',\n});",
  },
  {
    type: 'p',
    html: '타입 인자 두 개와 기본값만 넘기면, 검색, 날짜, 페이지네이션, reset, 그리고 <code>setPlan</code>, <code>setCountry</code> 같은 setter까지 자동으로 생성된다.',
  },
  {
    type: 'h2',
    text: 'Date 직렬화 함정',
  },
  {
    type: 'p',
    html: '이 팩토리를 URL 쿼리 파라미터와 동기화하려고 했을 때 함정에 빠졌다. <code>Date</code> 객체는 JSON 직렬화 시 문자열로 바뀌는데, 역직렬화 시 자동으로 <code>Date</code>로 복원되지 않는다. Zustand의 persist 미들웨어를 쓰면 이 문제가 발생한다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'utils/customDateStorage.ts',
    body: "// Date를 ISO 문자열로 저장하고, 복원 시 다시 Date로 변환\nconst customDateStorage = {\n  getItem: (name: string) => {\n    const raw = sessionStorage.getItem(name);\n    if (!raw) return null;\n    return JSON.parse(raw, (key, value) => {\n      if (key === 'start' || key === 'end') {\n        return value ? new Date(value) : null;\n      }\n      return value;\n    });\n  },\n  setItem: (name: string, value: unknown) => {\n    sessionStorage.setItem(name, JSON.stringify(value));\n  },\n  removeItem: (name: string) => sessionStorage.removeItem(name),\n};",
  },
  {
    type: 'p',
    html: 'JSON의 reviver 함수를 사용해서 <code>start</code>와 <code>end</code> 키를 자동으로 <code>Date</code> 객체로 복원하는 커스텀 스토리지를 만들었다.',
  },
  {
    type: 'h2',
    text: '결과',
  },
  {
    type: 'list',
    items: [
      '필터 관련 보일러플레이트 약 <strong>70% 감소</strong>',
      '새 도메인 추가 시 파일 1개 + 5줄로 완성',
      '필터 로직 수정 시 팩토리 1곳만 변경하면 전체 도메인에 반영',
      '리뷰 시간 단축 — 반복 코드가 없으므로 비즈니스 로직에만 집중',
    ],
  },
  {
    type: 'h2',
    text: '팩토리 패턴을 언제 쓸 것인가',
  },
  {
    type: 'p',
    html: '팩토리는 만능이 아니다. 구조가 <em>정말로</em> 같고 타입만 다를 때 효과적이다. 각 도메인의 필터가 구조적으로 다르다면 (예를 들어 한 도메인은 트리 필터, 다른 도메인은 지도 필터), 무리하게 팩토리에 우겨넣는 것이 오히려 복잡도를 높인다.',
  },
  {
    type: 'list',
    items: [
      '세 번 이상 복사했다면 팩토리를 고려하라',
      '달라지는 부분이 타입 인자로 표현 가능한지 먼저 확인하라',
      '팩토리가 복잡해지기 시작하면, 추상화 레벨이 잘못된 것이다',
      'Date 같은 비-JSON 타입은 직렬화/역직렬화 전략을 미리 세워라',
    ],
  },
];

// ============================================================
// POST 5: zustand-factory-pattern (English)
// ============================================================

export const zustandFactoryEn: ContentBlock[] = [
  {
    type: 'blockquote',
    text: 'Copy-paste is fast at first, then becomes debt. The moment you reach for the third copy, that is an abstraction signal.',
  },
  {
    type: 'h2',
    text: 'Admin is made of filters',
  },
  {
    type: 'p',
    html: 'I was building the Admin dashboard at Awarelab. Members, content, payments, subscriptions, coupons — over 5 domains, each with status filters, search terms, date ranges, and pagination. <strong>Admin is, at its core, a collection of filters</strong>.',
  },
  {
    type: 'p',
    html: 'Initially I created a separate Zustand store per domain. Member filter store, content filter store, payment filter store... Nearly identical structure with only the types different, copied five times.',
  },
  {
    type: 'h2',
    text: 'The cost of copy-paste',
  },
  {
    type: 'p',
    html: 'The first two were fine. By the third store copy, problems emerged.',
  },
  {
    type: 'list',
    items: [
      'Fixing date filter logic means editing 5 files',
      'Missing one means a bug in only that domain',
      'Every new domain means copy the file, change types and defaults, wire up imports',
      'Reviewers start saying "I think I saw this code in another store"',
    ],
  },
  {
    type: 'p',
    html: 'What actually varied across the repeated structure was exactly two things: the <strong>status type</strong> and <strong>domain-specific additional filters</strong>. Everything else (search, date range, pagination, reset, setters) was identical.',
  },
  {
    type: 'h2',
    text: 'The factory idea',
  },
  {
    type: 'p',
    html: 'Extract what varies as generic type parameters, let the factory function auto-generate the rest. Call <code>createFilterStore&lt;TStatus, TAdditional&gt;()</code> and get a complete filter store back.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'createFilterStore.ts',
    body: "import { create } from 'zustand';\nimport { immer } from 'zustand/middleware/immer';\n\ninterface BaseFilter {\n  search: string;\n  dateRange: { start: Date | null; end: Date | null };\n  page: number;\n  pageSize: number;\n}\n\ntype FilterState<TStatus extends string, TAdditional extends Record<string, unknown>> =\n  BaseFilter & { status: TStatus | 'all' } & TAdditional;\n\ntype FilterActions<TStatus extends string, TAdditional extends Record<string, unknown>> = {\n  setStatus: (status: TStatus | 'all') => void;\n  setSearch: (search: string) => void;\n  setDateRange: (range: { start: Date | null; end: Date | null }) => void;\n  setPage: (page: number) => void;\n  reset: () => void;\n} & {\n  [K in keyof TAdditional as `set${Capitalize<string & K>}`]:\n    (value: TAdditional[K]) => void;\n};\n\nexport function createFilterStore<\n  TStatus extends string,\n  TAdditional extends Record<string, unknown> = Record<string, never>,\n>(defaults: { status: TStatus | 'all' } & TAdditional) {\n  const initialState: FilterState<TStatus, TAdditional> = {\n    search: '',\n    dateRange: { start: null, end: null },\n    page: 1,\n    pageSize: 20,\n    ...defaults,\n  };\n\n  // Generate dynamic setters for TAdditional keys\n  const additionalSetters = Object.keys(defaults).reduce((acc, key) => {\n    if (key === 'status') return acc;\n    const setterName = `set${key.charAt(0).toUpperCase()}${key.slice(1)}`;\n    acc[setterName] = (value: unknown) =>\n      (state: FilterState<TStatus, TAdditional>) => {\n        (state as Record<string, unknown>)[key] = value;\n      };\n    return acc;\n  }, {} as Record<string, Function>);\n\n  return create<FilterState<TStatus, TAdditional> & FilterActions<TStatus, TAdditional>>()(\n    immer((set) => ({\n      ...initialState,\n      setStatus: (status) => set((s) => { s.status = status; }),\n      setSearch: (search) => set((s) => { s.search = search; s.page = 1; }),\n      setDateRange: (range) => set((s) => { s.dateRange = range; s.page = 1; }),\n      setPage: (page) => set((s) => { s.page = page; }),\n      reset: () => set(() => ({ ...initialState }) as any),\n      ...Object.fromEntries(\n        Object.entries(additionalSetters).map(([name, fn]) => [\n          name,\n          (value: unknown) => set(fn(value) as any),\n        ])\n      ),\n    }) as any)\n  );\n}",
  },
  {
    type: 'h2',
    text: 'Usage',
  },
  {
    type: 'p',
    html: 'Adding a new domain filter is now one file and a few lines.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'stores/members-filter.ts',
    body: "import { createFilterStore } from './createFilterStore';\n\ntype MemberStatus = 'active' | 'expired' | 'cancelled';\n\nexport const useMemberFilterStore = createFilterStore<\n  MemberStatus,\n  { plan: string; country: string }\n>({\n  status: 'all',\n  plan: 'all',\n  country: 'all',\n});",
  },
  {
    type: 'p',
    html: 'Pass two type parameters and defaults, and you get search, date range, pagination, reset, plus auto-generated setters like <code>setPlan</code> and <code>setCountry</code>.',
  },
  {
    type: 'h2',
    text: 'The Date serialization trap',
  },
  {
    type: 'p',
    html: "When syncing this factory with URL query parameters, I hit a trap. <code>Date</code> objects serialize to strings in JSON but do not automatically restore to <code>Date</code> on deserialization. This bites when using Zustand's persist middleware.",
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'utils/customDateStorage.ts',
    body: "// Store Date as ISO string, restore as Date on read\nconst customDateStorage = {\n  getItem: (name: string) => {\n    const raw = sessionStorage.getItem(name);\n    if (!raw) return null;\n    return JSON.parse(raw, (key, value) => {\n      if (key === 'start' || key === 'end') {\n        return value ? new Date(value) : null;\n      }\n      return value;\n    });\n  },\n  setItem: (name: string, value: unknown) => {\n    sessionStorage.setItem(name, JSON.stringify(value));\n  },\n  removeItem: (name: string) => sessionStorage.removeItem(name),\n};",
  },
  {
    type: 'p',
    html: "I built a custom storage adapter using JSON's reviver function to automatically restore <code>start</code> and <code>end</code> keys back to <code>Date</code> objects.",
  },
  {
    type: 'h2',
    text: 'Results',
  },
  {
    type: 'list',
    items: [
      'Filter boilerplate reduced by roughly <strong>70%</strong>',
      'New domain: 1 file + 5 lines to set up',
      'Filter logic fix: change the factory once, applied across all domains',
      'Faster code reviews — no repeated code means focus on business logic only',
    ],
  },
  {
    type: 'h2',
    text: 'When to use the factory pattern',
  },
  {
    type: 'p',
    html: 'Factories are not a universal solution. They work when the structure is <em>genuinely</em> the same and only types differ. If domain filters are structurally different (one domain uses a tree filter, another uses a map filter), forcing them into a factory increases complexity instead.',
  },
  {
    type: 'list',
    items: [
      'If you have copied it three or more times, consider a factory',
      'Check first whether the varying parts can be expressed as type parameters',
      'If the factory is getting complex, the abstraction level is wrong',
      'For non-JSON types like Date, plan your serialization strategy upfront',
    ],
  },
];

// ============================================================
// POST 6: stripe-flow-state-machine (Korean)
// ============================================================

export const stripeFlowKo: ContentBlock[] = [
  {
    type: 'blockquote',
    text: 'happy path만 다루면 결제 코드의 절반만 쓴 것이다. 나머지 절반은 실패, 취소, 중단, 중복이 차지한다.',
  },
  {
    type: 'h2',
    text: 'Stripe는 단순하지 않다',
  },
  {
    type: 'p',
    html: '어웨어랩의 멤버십 결제 플로우는 이런 순서였다 — 플랜 선택 → 결제 주기(월/연) 선택 → 쿠폰 적용 → Stripe Checkout. 여기까지는 직선이다. 문제는 이 직선 위에 비선형 경로가 겹친다는 것이다.',
  },
  {
    type: 'list',
    items: [
      '플랜 선택 후 뒤로가기 → 쿠폰 상태는?',
      '결제 중간에 브라우저를 닫으면?',
      'Stripe webhook이 늦게 도착하면?',
      '같은 사용자가 두 탭에서 동시에 결제하면?',
      '쿠폰이 적용된 상태에서 플랜을 바꾸면 가격이 맞는가?',
    ],
  },
  {
    type: 'p',
    html: '이런 질문들을 <code>if/else</code>로 처리하기 시작하면, 금방 관리할 수 없는 분기가 쌓인다.',
  },
  {
    type: 'h2',
    text: 'if/else가 무너지는 지점',
  },
  {
    type: 'p',
    html: '처음에는 각 단계마다 상태 플래그를 두었다 — <code>isPlanSelected</code>, <code>isCouponApplied</code>, <code>isCheckoutStarted</code>, <code>isPaymentComplete</code>. 단계가 직선으로만 진행되면 괜찮지만, 실제로는 <strong>비선형 전이</strong>가 존재한다.',
  },
  {
    type: 'p',
    html: '사용자가 결제 주기 선택 화면에서 뒤로가기를 누르면 <code>isPlanSelected</code>만 false로 돌려야 할까, <code>isCouponApplied</code>도 초기화해야 할까? 이런 판단을 매번 <code>if/else</code>로 하면, 실패 상태의 목록만 정리해도 이렇다:',
  },
  {
    type: 'list',
    items: [
      'Stripe Checkout 세션 만료',
      '결제 수단 인증 실패 (3D Secure)',
      '잔액 부족',
      'Webhook 처리 실패',
      '중복 결제 요청',
      '쿠폰 만료 (결제 진행 중 만료)',
    ],
  },
  {
    type: 'h2',
    text: '상태 머신으로 모델링하기',
  },
  {
    type: 'p',
    html: '결제 플로우를 <strong>상태 머신</strong>으로 모델링했다. 가능한 상태를 열거하고, 상태 간 전이를 명시적으로 정의한다. "이 상태에서 이 이벤트가 발생하면 저 상태로 간다"는 규칙이 전부다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'types/checkout.ts',
    body: "type CheckoutState =\n  | 'idle'\n  | 'plan_selected'\n  | 'period_selected'\n  | 'coupon_applied'\n  | 'checkout_pending'\n  | 'checkout_success'\n  | 'checkout_failed'\n  | 'checkout_cancelled'\n  | 'checkout_expired';\n\ntype CheckoutEvent =\n  | { type: 'SELECT_PLAN'; planId: string }\n  | { type: 'SELECT_PERIOD'; period: 'monthly' | 'yearly' }\n  | { type: 'APPLY_COUPON'; couponCode: string }\n  | { type: 'START_CHECKOUT' }\n  | { type: 'CHECKOUT_COMPLETE'; sessionId: string }\n  | { type: 'CHECKOUT_FAIL'; reason: string }\n  | { type: 'CANCEL' }\n  | { type: 'BACK' }\n  | { type: 'RETRY' };",
  },
  {
    type: 'h2',
    text: '전이 함수',
  },
  {
    type: 'p',
    html: '상태와 이벤트를 받아서 다음 상태를 반환하는 순수 함수. 이 함수 하나에 모든 비즈니스 규칙이 집중된다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'checkoutMachine.ts',
    body: "function transition(state: CheckoutState, event: CheckoutEvent): CheckoutState {\n  switch (state) {\n    case 'idle':\n      if (event.type === 'SELECT_PLAN') return 'plan_selected';\n      return state;\n\n    case 'plan_selected':\n      if (event.type === 'SELECT_PERIOD') return 'period_selected';\n      if (event.type === 'BACK') return 'idle';\n      return state;\n\n    case 'period_selected':\n      if (event.type === 'APPLY_COUPON') return 'coupon_applied';\n      if (event.type === 'START_CHECKOUT') return 'checkout_pending';\n      if (event.type === 'BACK') return 'plan_selected';\n      return state;\n\n    case 'coupon_applied':\n      if (event.type === 'START_CHECKOUT') return 'checkout_pending';\n      if (event.type === 'BACK') return 'period_selected';\n      return state;\n\n    case 'checkout_pending':\n      if (event.type === 'CHECKOUT_COMPLETE') return 'checkout_success';\n      if (event.type === 'CHECKOUT_FAIL') return 'checkout_failed';\n      if (event.type === 'CANCEL') return 'checkout_cancelled';\n      return state;\n\n    case 'checkout_failed':\n      if (event.type === 'RETRY') return 'checkout_pending';\n      if (event.type === 'BACK') return 'period_selected';\n      return state;\n\n    default:\n      return state;\n  }\n}",
  },
  {
    type: 'p',
    html: '이 함수를 보면 <strong>어떤 상태에서 어떤 이벤트가 유효한지</strong>가 한눈에 보인다. <code>checkout_pending</code> 상태에서 <code>BACK</code>은 허용되지 않는다 — 결제가 진행 중이면 뒤로가기를 막아야 하기 때문이다.',
  },
  {
    type: 'h2',
    text: 'Stripe metadata로 상태 추적',
  },
  {
    type: 'p',
    html: 'Stripe의 PaymentIntent에 <code>metadata</code>를 붙여서, 서버 사이드에서도 어떤 상태 전이를 거쳤는지 추적할 수 있게 했다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'api/checkout.ts',
    body: "const paymentIntent = await stripe.paymentIntents.create({\n  amount: calculateAmount(plan, period, coupon),\n  currency: 'usd',\n  metadata: {\n    planId: plan.id,\n    period,\n    couponCode: coupon?.code ?? '',\n    checkoutState: 'checkout_pending',\n    initiatedAt: new Date().toISOString(),\n    userId: user.id,\n  },\n});",
  },
  {
    type: 'p',
    html: 'Webhook에서 결제 결과를 받을 때 metadata를 읽으면, 어떤 플랜과 쿠폰 조합으로 결제가 시작되었는지 확인할 수 있다. 상태 머신의 전이 기록이 Stripe 안에 남는 셈이다.',
  },
  {
    type: 'h2',
    text: '상태별 롤백과 재시도',
  },
  {
    type: 'p',
    html: '각 실패 상태에 대해 구체적인 복구 전략을 정의했다.',
  },
  {
    type: 'list',
    items: [
      '<strong>checkout_failed (잔액 부족)</strong> → 사용자에게 다른 결제 수단 안내, 상태를 period_selected로 롤백',
      '<strong>checkout_failed (3D Secure 실패)</strong> → RETRY 이벤트로 재시도, 동일 세션 유지',
      '<strong>checkout_expired (세션 만료)</strong> → 새 세션 생성, 쿠폰 유효성 재검증',
      '<strong>checkout_cancelled (사용자 취소)</strong> → idle로 롤백, 선택 정보는 유지',
    ],
  },
  {
    type: 'h2',
    text: '디버깅이 달라진다',
  },
  {
    type: 'p',
    html: '상태 머신의 가장 큰 이점은 디버깅이다. 버그 리포트에 "결제가 안 됩니다"라고만 적혀 있어도, Stripe metadata에서 <code>checkoutState</code>와 전이 기록을 보면 어디서 멈췄는지 바로 알 수 있다. <code>if/else</code> 분기에서는 "12번째 조건문에서 뭔가 잘못된 것 같다"고 추측해야 했다.',
  },
  {
    type: 'list',
    items: [
      'happy path만 다루면 결제 코드의 절반이다 — 나머지 절반은 실패 경로',
      '상태와 전이를 명시적으로 정의하면 "불가능한 상태"를 타입으로 막을 수 있다',
      '전이 함수는 순수 함수이므로 테스트가 쉽다',
      'Stripe metadata에 상태를 기록하면 서버 사이드 디버깅이 가능하다',
      '각 실패 상태에 구체적인 복구 전략을 정의하라',
    ],
  },
];

// ============================================================
// POST 6: stripe-flow-state-machine (English)
// ============================================================

export const stripeFlowEn: ContentBlock[] = [
  {
    type: 'blockquote',
    text: 'If you only handle the happy path, you have written half the payment code. The other half is failure, cancellation, interruption, and duplication.',
  },
  {
    type: 'h2',
    text: 'Stripe is not simple',
  },
  {
    type: 'p',
    html: 'The membership payment flow at Awarelab went like this: select plan, choose billing period (monthly/yearly), apply coupon, proceed to Stripe Checkout. So far it is a straight line. The problem is that non-linear paths layer on top of that line.',
  },
  {
    type: 'list',
    items: [
      'User hits back after selecting a plan — what happens to the coupon state?',
      'User closes the browser mid-checkout?',
      'Stripe webhook arrives late?',
      'Same user checks out from two tabs simultaneously?',
      'User changes the plan after applying a coupon — does the price recalculate correctly?',
    ],
  },
  {
    type: 'p',
    html: 'Start handling these questions with <code>if/else</code> and unmanageable branching accumulates fast.',
  },
  {
    type: 'h2',
    text: 'Where if/else breaks down',
  },
  {
    type: 'p',
    html: 'Initially I used status flags for each step: <code>isPlanSelected</code>, <code>isCouponApplied</code>, <code>isCheckoutStarted</code>, <code>isPaymentComplete</code>. Fine when the flow is strictly linear, but in reality <strong>non-linear transitions</strong> exist.',
  },
  {
    type: 'p',
    html: 'When the user hits back from the billing period screen, should only <code>isPlanSelected</code> be reset, or should <code>isCouponApplied</code> be cleared too? Making that call through <code>if/else</code> every time gets messy. Just listing the failure states:',
  },
  {
    type: 'list',
    items: [
      'Stripe Checkout session expired',
      'Payment method authentication failure (3D Secure)',
      'Insufficient balance',
      'Webhook processing failure',
      'Duplicate payment request',
      'Coupon expired during checkout',
    ],
  },
  {
    type: 'h2',
    text: 'Modeling as a state machine',
  },
  {
    type: 'p',
    html: 'I modeled the payment flow as a <strong>state machine</strong>. Enumerate possible states and explicitly define transitions between them. The entire logic is: "in this state, when this event occurs, go to that state."',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'types/checkout.ts',
    body: "type CheckoutState =\n  | 'idle'\n  | 'plan_selected'\n  | 'period_selected'\n  | 'coupon_applied'\n  | 'checkout_pending'\n  | 'checkout_success'\n  | 'checkout_failed'\n  | 'checkout_cancelled'\n  | 'checkout_expired';\n\ntype CheckoutEvent =\n  | { type: 'SELECT_PLAN'; planId: string }\n  | { type: 'SELECT_PERIOD'; period: 'monthly' | 'yearly' }\n  | { type: 'APPLY_COUPON'; couponCode: string }\n  | { type: 'START_CHECKOUT' }\n  | { type: 'CHECKOUT_COMPLETE'; sessionId: string }\n  | { type: 'CHECKOUT_FAIL'; reason: string }\n  | { type: 'CANCEL' }\n  | { type: 'BACK' }\n  | { type: 'RETRY' };",
  },
  {
    type: 'h2',
    text: 'The transition function',
  },
  {
    type: 'p',
    html: 'A pure function that takes state and event, returns the next state. All business rules concentrate in this single function.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'checkoutMachine.ts',
    body: "function transition(state: CheckoutState, event: CheckoutEvent): CheckoutState {\n  switch (state) {\n    case 'idle':\n      if (event.type === 'SELECT_PLAN') return 'plan_selected';\n      return state;\n\n    case 'plan_selected':\n      if (event.type === 'SELECT_PERIOD') return 'period_selected';\n      if (event.type === 'BACK') return 'idle';\n      return state;\n\n    case 'period_selected':\n      if (event.type === 'APPLY_COUPON') return 'coupon_applied';\n      if (event.type === 'START_CHECKOUT') return 'checkout_pending';\n      if (event.type === 'BACK') return 'plan_selected';\n      return state;\n\n    case 'coupon_applied':\n      if (event.type === 'START_CHECKOUT') return 'checkout_pending';\n      if (event.type === 'BACK') return 'period_selected';\n      return state;\n\n    case 'checkout_pending':\n      if (event.type === 'CHECKOUT_COMPLETE') return 'checkout_success';\n      if (event.type === 'CHECKOUT_FAIL') return 'checkout_failed';\n      if (event.type === 'CANCEL') return 'checkout_cancelled';\n      return state;\n\n    case 'checkout_failed':\n      if (event.type === 'RETRY') return 'checkout_pending';\n      if (event.type === 'BACK') return 'period_selected';\n      return state;\n\n    default:\n      return state;\n  }\n}",
  },
  {
    type: 'p',
    html: 'Looking at this function, it is immediately clear <strong>which events are valid in which states</strong>. <code>BACK</code> is not accepted in <code>checkout_pending</code> — because navigation should be blocked while payment is in progress.',
  },
  {
    type: 'h2',
    text: 'Tracking state via Stripe metadata',
  },
  {
    type: 'p',
    html: 'I attached <code>metadata</code> to the Stripe PaymentIntent so the server side could also track which state transitions occurred.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'api/checkout.ts',
    body: "const paymentIntent = await stripe.paymentIntents.create({\n  amount: calculateAmount(plan, period, coupon),\n  currency: 'usd',\n  metadata: {\n    planId: plan.id,\n    period,\n    couponCode: coupon?.code ?? '',\n    checkoutState: 'checkout_pending',\n    initiatedAt: new Date().toISOString(),\n    userId: user.id,\n  },\n});",
  },
  {
    type: 'p',
    html: "When the webhook delivers the payment result, reading the metadata reveals which plan and coupon combination initiated the checkout. The state machine's transition record lives inside Stripe itself.",
  },
  {
    type: 'h2',
    text: 'Per-state rollback and retry',
  },
  {
    type: 'p',
    html: 'I defined specific recovery strategies for each failure state.',
  },
  {
    type: 'list',
    items: [
      '<strong>checkout_failed (insufficient balance)</strong> — prompt user for another payment method, roll back to period_selected',
      '<strong>checkout_failed (3D Secure failure)</strong> — RETRY event to reattempt, keep the same session',
      '<strong>checkout_expired (session timeout)</strong> — create a new session, re-validate coupon',
      '<strong>checkout_cancelled (user cancelled)</strong> — roll back to idle, preserve selection data',
    ],
  },
  {
    type: 'h2',
    text: 'Debugging is transformed',
  },
  {
    type: 'p',
    html: 'The greatest benefit of the state machine is debugging. Even when a bug report just says "payment does not work," checking <code>checkoutState</code> and the transition record in Stripe metadata immediately shows where it got stuck. With <code>if/else</code> branching, you would have to guess "something probably went wrong at the 12th conditional."',
  },
  {
    type: 'list',
    items: [
      'Handling only the happy path is half the payment code — the other half is failure paths',
      'Explicitly defining states and transitions lets you prevent impossible states at the type level',
      'The transition function is pure, making it easy to test',
      'Recording state in Stripe metadata enables server-side debugging',
      'Define a concrete recovery strategy for each failure state',
    ],
  },
];

// ============================================================
// POST 7: gsap-spa-memory-leak (Korean)
// ============================================================

export const gsapKo: ContentBlock[] = [
  {
    type: 'blockquote',
    text: 'SPA에서 애니메이션은 컴포넌트와 생사를 같이해야 한다. 컴포넌트가 죽었는데 애니메이션이 살아 있으면, 그건 메모리 누수다.',
  },
  {
    type: 'h2',
    text: '증상 — 페이지를 오갈수록 느려진다',
  },
  {
    type: 'p',
    html: '어웨어랩 마케팅 사이트에 GSAP 애니메이션을 넣었다. 히어로 섹션의 텍스트 페이드인, 스크롤 기반 패럴랙스, 카드 등장 애니메이션. 로컬에서 개발할 때는 문제가 없었는데, QA 중 이상한 리포트가 들어왔다 — <strong>"페이지를 여러 번 오가면 점점 느려진다."</strong>',
  },
  {
    type: 'p',
    html: 'Chrome DevTools의 Performance 탭을 열어보니, 라우팅할 때마다 GSAP의 글로벌 타임라인에 등록된 트윈 수가 계속 증가하고 있었다. 컴포넌트가 언마운트되어도 GSAP 트윈은 살아 있었다.',
  },
  {
    type: 'h2',
    text: '왜 SPA에서 위험한가',
  },
  {
    type: 'p',
    html: 'GSAP는 내부적으로 <strong>글로벌 레지스트리</strong>에 모든 트윈과 타임라인을 등록한다. MPA(전통적인 페이지 전환)에서는 페이지 이동 시 브라우저가 모든 것을 정리하므로 문제없다. 하지만 SPA에서는 브라우저가 페이지를 유지한 채 컴포넌트만 교체하기 때문에, 글로벌 레지스트리에 등록된 트윈이 <strong>누적</strong>된다.',
  },
  {
    type: 'p',
    html: '10번 라우팅하면 같은 애니메이션이 10번 등록된다. 각각이 DOM 요소를 참조하고 있으므로 GC도 해당 요소를 정리하지 못한다. 메모리 사용량이 선형으로 증가하고, 결국 프레임 드롭으로 이어진다.',
  },
  {
    type: 'h2',
    text: 'gsap.context()로 스코핑하기',
  },
  {
    type: 'p',
    html: 'GSAP 3.11부터 도입된 <code>gsap.context()</code>가 이 문제의 공식 해결책이다. context에 등록된 모든 트윈과 ScrollTrigger를 한 번에 정리할 수 있다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'useGSAPContext.ts',
    body: "import { useEffect, useRef } from 'react';\nimport gsap from 'gsap';\n\nexport function useGSAPContext(scope: React.RefObject<HTMLElement>) {\n  const ctx = useRef<gsap.Context | null>(null);\n\n  useEffect(() => {\n    ctx.current = gsap.context(() => {\n      // 이 안에서 생성되는 모든 트윈은 context에 자동 등록\n    }, scope.current!);\n\n    return () => {\n      // 언마운트 시 context 내 모든 트윈/ScrollTrigger 정리\n      ctx.current?.revert();\n    };\n  }, []);\n\n  return ctx;\n}",
  },
  {
    type: 'p',
    html: '<code>gsap.context()</code>에 콜백과 스코프 엘리먼트를 넘기면, 콜백 안에서 생성되는 모든 트윈이 해당 context에 자동으로 등록된다. <code>revert()</code>를 호출하면 <strong>모든 트윈이 중지되고, DOM 변경이 원래대로 복원되고, ScrollTrigger가 제거</strong>된다.',
  },
  {
    type: 'h2',
    text: 'GSAP 동적 import',
  },
  {
    type: 'p',
    html: 'GSAP는 번들 크기도 무시할 수 없다. 모든 페이지에서 로딩하지 않도록 동적 import로 전환했다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'useLazyGSAP.ts',
    body: "import { useEffect, useState } from 'react';\n\nexport function useLazyGSAP() {\n  const [gsapModule, setGsapModule] = useState<typeof import('gsap') | null>(null);\n\n  useEffect(() => {\n    let cancelled = false;\n    import('gsap').then((mod) => {\n      if (!cancelled) setGsapModule(mod);\n    });\n    return () => { cancelled = true; };\n  }, []);\n\n  return gsapModule;\n}",
  },
  {
    type: 'p',
    html: '이 훅은 GSAP가 필요한 컴포넌트에서만 임포트하게 한다. 메인 번들에서 GSAP를 분리하면서 초기 로딩 성능도 개선됐다.',
  },
  {
    type: 'h2',
    text: 'prefers-reduced-motion 존중하기',
  },
  {
    type: 'p',
    html: '모션 감소를 선호하는 사용자를 위해 미디어 쿼리를 체크했다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'useReducedMotion.ts',
    body: "export function useReducedMotion() {\n  const [reduced, setReduced] = useState(false);\n\n  useEffect(() => {\n    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');\n    setReduced(mq.matches);\n    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);\n    mq.addEventListener('change', handler);\n    return () => mq.removeEventListener('change', handler);\n  }, []);\n\n  return reduced;\n}",
  },
  {
    type: 'p',
    html: '<code>prefers-reduced-motion: reduce</code>가 설정된 경우 GSAP 애니메이션을 건너뛰거나 <code>duration: 0</code>으로 실행한다. 접근성과 성능을 동시에 챙기는 패턴이다.',
  },
  {
    type: 'h2',
    text: '전체 패턴: HeroSection 예시',
  },
  {
    type: 'code',
    lang: 'tsx',
    file: 'HeroSection.tsx',
    body: "function HeroSection() {\n  const containerRef = useRef<HTMLDivElement>(null);\n  const reduced = useReducedMotion();\n\n  useEffect(() => {\n    if (reduced || !containerRef.current) return;\n\n    const ctx = gsap.context(() => {\n      gsap.from('.hero-title', {\n        y: 60,\n        opacity: 0,\n        duration: 1,\n        ease: 'power3.out',\n      });\n\n      ScrollTrigger.create({\n        trigger: '.hero-parallax',\n        start: 'top bottom',\n        end: 'bottom top',\n        scrub: true,\n        animation: gsap.to('.hero-parallax', { y: -100 }),\n      });\n    }, containerRef.current);\n\n    return () => ctx.revert();\n  }, [reduced]);\n\n  return <div ref={containerRef}>{/* ... */}</div>;\n}",
  },
  {
    type: 'h2',
    text: '메모리 안정화 확인',
  },
  {
    type: 'list',
    items: [
      '라우팅 10회 반복 후 GSAP 글로벌 타임라인 트윈 수: <strong>증가하지 않음</strong>',
      'Chrome Memory 탭에서 힙 스냅샷 비교: 컴포넌트 언마운트 후 GSAP 관련 객체 <strong>GC 정상 수행</strong>',
      'Performance 탭 프레임 드롭: <strong>발생하지 않음</strong>',
      'prefers-reduced-motion 설정 시: 애니메이션 <strong>건너뜀</strong>, 번들만 로딩',
    ],
  },
  {
    type: 'h2',
    text: '핵심 정리',
  },
  {
    type: 'p',
    html: 'SPA에서 GSAP를 쓸 때 <code>gsap.context()</code>와 <code>revert()</code>는 선택이 아니라 필수다. 이 두 가지를 빠뜨리면 메모리 누수는 시간 문제일 뿐이다.',
  },
  {
    type: 'list',
    items: [
      'SPA에서 GSAP 트윈은 컴포넌트 언마운트 시 자동으로 정리되지 않는다',
      'gsap.context()로 스코핑하고, 언마운트 시 revert()를 호출하라',
      '동적 import로 GSAP를 필요한 페이지에서만 로딩하라',
      'prefers-reduced-motion을 존중하라 — 접근성과 성능을 동시에 챙긴다',
      '라우팅 반복 후 Memory 탭으로 누수 여부를 검증하라',
    ],
  },
];

// ============================================================
// POST 7: gsap-spa-memory-leak (English)
// ============================================================

export const gsapEn: ContentBlock[] = [
  {
    type: 'blockquote',
    text: 'In an SPA, animations must share the lifecycle of the component. If the component dies but the animation lives on, that is a memory leak.',
  },
  {
    type: 'h2',
    text: 'Symptom — it gets slower the more you navigate',
  },
  {
    type: 'p',
    html: 'I added GSAP animations to the Awarelab marketing site. Hero text fade-in, scroll-based parallax, card entrance animations. No issues during local development, but QA filed a strange report: <strong>"navigating back and forth makes it progressively slower."</strong>',
  },
  {
    type: 'p',
    html: "Opening Chrome DevTools Performance tab revealed that the number of tweens registered on GSAP's global timeline kept increasing with every route change. Tweens survived even after the component unmounted.",
  },
  {
    type: 'h2',
    text: 'Why this is dangerous in SPAs',
  },
  {
    type: 'p',
    html: 'GSAP internally registers all tweens and timelines in a <strong>global registry</strong>. In MPAs (traditional page navigation), the browser cleans everything up on page transition, so no problem. But in SPAs, the browser keeps the page alive and only swaps components, causing tweens in the global registry to <strong>accumulate</strong>.',
  },
  {
    type: 'p',
    html: 'Navigate 10 times and the same animation gets registered 10 times. Each one holds references to DOM elements, preventing GC from collecting those elements. Memory usage grows linearly, eventually leading to frame drops.',
  },
  {
    type: 'h2',
    text: 'Scoping with gsap.context()',
  },
  {
    type: 'p',
    html: '<code>gsap.context()</code>, introduced in GSAP 3.11, is the official solution. It lets you clean up all tweens and ScrollTriggers registered within a context in a single call.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'useGSAPContext.ts',
    body: "import { useEffect, useRef } from 'react';\nimport gsap from 'gsap';\n\nexport function useGSAPContext(scope: React.RefObject<HTMLElement>) {\n  const ctx = useRef<gsap.Context | null>(null);\n\n  useEffect(() => {\n    ctx.current = gsap.context(() => {\n      // All tweens created inside are auto-registered to this context\n    }, scope.current!);\n\n    return () => {\n      // On unmount: kill all tweens/ScrollTriggers in this context\n      ctx.current?.revert();\n    };\n  }, []);\n\n  return ctx;\n}",
  },
  {
    type: 'p',
    html: 'Pass a callback and a scope element to <code>gsap.context()</code>, and all tweens created inside the callback are automatically registered to that context. Calling <code>revert()</code> <strong>stops all tweens, restores DOM changes, and removes ScrollTriggers</strong>.',
  },
  {
    type: 'h2',
    text: 'Dynamic import for GSAP',
  },
  {
    type: 'p',
    html: 'GSAP bundle size is not negligible either. I converted it to a dynamic import so it only loads on pages that need it.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'useLazyGSAP.ts',
    body: "import { useEffect, useState } from 'react';\n\nexport function useLazyGSAP() {\n  const [gsapModule, setGsapModule] = useState<typeof import('gsap') | null>(null);\n\n  useEffect(() => {\n    let cancelled = false;\n    import('gsap').then((mod) => {\n      if (!cancelled) setGsapModule(mod);\n    });\n    return () => { cancelled = true; };\n  }, []);\n\n  return gsapModule;\n}",
  },
  {
    type: 'p',
    html: 'This hook ensures GSAP is only imported in components that actually use it. Separating GSAP from the main bundle also improved initial load performance.',
  },
  {
    type: 'h2',
    text: 'Respecting prefers-reduced-motion',
  },
  {
    type: 'p',
    html: 'I added a media query check for users who prefer reduced motion.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'useReducedMotion.ts',
    body: "export function useReducedMotion() {\n  const [reduced, setReduced] = useState(false);\n\n  useEffect(() => {\n    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');\n    setReduced(mq.matches);\n    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);\n    mq.addEventListener('change', handler);\n    return () => mq.removeEventListener('change', handler);\n  }, []);\n\n  return reduced;\n}",
  },
  {
    type: 'p',
    html: 'When <code>prefers-reduced-motion: reduce</code> is set, GSAP animations are either skipped or run with <code>duration: 0</code>. This pattern addresses both accessibility and performance.',
  },
  {
    type: 'h2',
    text: 'Full pattern: HeroSection example',
  },
  {
    type: 'code',
    lang: 'tsx',
    file: 'HeroSection.tsx',
    body: "function HeroSection() {\n  const containerRef = useRef<HTMLDivElement>(null);\n  const reduced = useReducedMotion();\n\n  useEffect(() => {\n    if (reduced || !containerRef.current) return;\n\n    const ctx = gsap.context(() => {\n      gsap.from('.hero-title', {\n        y: 60,\n        opacity: 0,\n        duration: 1,\n        ease: 'power3.out',\n      });\n\n      ScrollTrigger.create({\n        trigger: '.hero-parallax',\n        start: 'top bottom',\n        end: 'bottom top',\n        scrub: true,\n        animation: gsap.to('.hero-parallax', { y: -100 }),\n      });\n    }, containerRef.current);\n\n    return () => ctx.revert();\n  }, [reduced]);\n\n  return <div ref={containerRef}>{/* ... */}</div>;\n}",
  },
  {
    type: 'h2',
    text: 'Memory stabilized',
  },
  {
    type: 'list',
    items: [
      'After 10 route navigations, GSAP global timeline tween count: <strong>no increase</strong>',
      "Chrome Memory tab heap snapshot comparison: GSAP objects <strong>properly GC'd</strong> after unmount",
      'Performance tab frame drops: <strong>none</strong>',
      'With prefers-reduced-motion set: animations <strong>skipped</strong>, only bundle loaded',
    ],
  },
  {
    type: 'h2',
    text: 'Takeaway',
  },
  {
    type: 'p',
    html: 'When using GSAP in an SPA, <code>gsap.context()</code> and <code>revert()</code> are not optional — they are mandatory. Skip them and a memory leak is only a matter of time.',
  },
  {
    type: 'list',
    items: [
      'GSAP tweens in SPAs are not automatically cleaned up on component unmount',
      'Scope with gsap.context() and call revert() on unmount',
      'Use dynamic imports to load GSAP only on pages that need it',
      'Respect prefers-reduced-motion — it covers both accessibility and performance',
      'Validate with the Memory tab after repeated navigation',
    ],
  },
];

// ============================================================
// POST 8: tiptap-12-extensions (Korean)
// ============================================================

export const tiptapKo: ContentBlock[] = [
  {
    type: 'blockquote',
    text: 'ProseMirror의 스키마를 이해하면 에디터 확장은 레고 블록이 된다. 스키마를 모르면 모든 커스텀이 해킹이 된다.',
  },
  {
    type: 'h2',
    text: '왜 커스텀 에디터가 필요했나',
  },
  {
    type: 'p',
    html: '어웨어랩 Admin CMS에서 투자 분석 콘텐츠를 작성하는 에디터가 필요했다. 일반적인 리치 텍스트(볼드, 이탤릭, 이미지)만으로는 부족했다. <strong>종목 차트 삽입</strong>, <strong>유료 콘텐츠 구간 설정(Paywall)</strong>, <strong>슬래시 명령어</strong> 같은 투자 플랫폼 특화 기능이 필요했다.',
  },
  {
    type: 'p',
    html: 'Directus CMS의 기본 에디터는 이런 커스텀 블록을 지원하지 않았다. TipTap을 선택한 이유는 <strong>ProseMirror 기반</strong>이면서도 확장 시스템이 깔끔하기 때문이다. 결과적으로 12개의 커스텀 확장을 개발했다.',
  },
  {
    type: 'h2',
    text: 'ProseMirror 멘탈 모델',
  },
  {
    type: 'p',
    html: 'TipTap 확장을 만들기 전에, ProseMirror의 문서 모델을 이해해야 한다. ProseMirror 문서는 HTML과 비슷하지만 다른 <strong>트리 구조</strong>다.',
  },
  {
    type: 'list',
    items: [
      '<strong>Document</strong> — 최상위 노드, 전체 문서를 감싼다',
      '<strong>Node</strong> — 블록 레벨 요소 (paragraph, heading, image, custom block)',
      '<strong>Mark</strong> — 인라인 스타일 (bold, italic, link, custom highlight)',
      '<strong>Schema</strong> — 어떤 Node와 Mark가 허용되는지 정의하는 규칙',
    ],
  },
  {
    type: 'code',
    lang: 'text',
    file: 'document-tree.txt',
    body: 'Document\n\u251c\u2500 Heading (level: 2)\n\u2502  \u2514\u2500 "Market Analysis"\n\u251c\u2500 Paragraph\n\u2502  \u251c\u2500 "The S&P 500 showed "\n\u2502  \u251c\u2500 Bold["strong momentum"]\n\u2502  \u2514\u2500 " this quarter."\n\u251c\u2500 StockNode (ticker: "AAPL")     \u2190 Custom Node\n\u251c\u2500 PaywallNode                      \u2190 Custom Node\n\u2502  \u251c\u2500 Paragraph\n\u2502  \u2514\u2500 Paragraph\n\u2514\u2500 Paragraph',
  },
  {
    type: 'p',
    html: 'Schema가 "이 문서에서 무엇이 가능한가"를 정의한다. 커스텀 Node를 Schema에 등록하면, ProseMirror는 그 Node를 문서의 일급 시민으로 취급한다 — 복사/붙여넣기, 실행 취소/다시 실행, 협업 편집까지 자동으로 지원된다.',
  },
  {
    type: 'h2',
    text: '12개 확장 지도',
  },
  {
    type: 'p',
    html: '4개 카테고리로 분류한 12개 확장:',
  },
  {
    type: 'list',
    items: [
      '<strong>블록 노드 (4개)</strong> — StockNode, PaywallNode, ImageBlock (업로드+리사이즈), EmbedBlock',
      '<strong>인라인 마크 (3개)</strong> — HighlightMark, SubscriptMark, FootnoteMark',
      '<strong>명령어 (2개)</strong> — SlashCommand (/ 메뉴), TableOfContents (자동 목차)',
      '<strong>유틸리티 (3개)</strong> — DirtyTracking, AutoSave, CharacterCount',
    ],
  },
  {
    type: 'h2',
    text: 'SlashCommand — / 입력으로 블록 삽입',
  },
  {
    type: 'p',
    html: 'Notion 스타일의 슬래시 명령어다. <code>/</code>를 입력하면 드롭다운이 나타나고, 블록 타입을 선택하면 해당 노드가 삽입된다. ProseMirror의 Plugin 시스템을 사용했다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'extensions/SlashCommand.ts',
    body: "import { Extension } from '@tiptap/core';\nimport { Plugin, PluginKey } from '@tiptap/pm/state';\nimport Suggestion from '@tiptap/suggestion';\n\nexport const SlashCommand = Extension.create({\n  name: 'slashCommand',\n\n  addOptions() {\n    return {\n      suggestion: {\n        char: '/',\n        command: ({ editor, range, props }: any) => {\n          editor.chain().focus().deleteRange(range).run();\n          props.command({ editor });\n        },\n        items: ({ query }: { query: string }) => {\n          return [\n            { title: 'Heading 1', command: ({ editor }: any) =>\n              editor.chain().toggleHeading({ level: 1 }).run() },\n            { title: 'Stock Chart', command: ({ editor }: any) =>\n              editor.chain().insertContent({ type: 'stockNode' }).run() },\n            { title: 'Paywall', command: ({ editor }: any) =>\n              editor.chain().insertContent({ type: 'paywallNode' }).run() },\n          ].filter(item =>\n            item.title.toLowerCase().includes(query.toLowerCase())\n          );\n        },\n      },\n    };\n  },\n\n  addProseMirrorPlugins() {\n    return [Suggestion({ ...this.options.suggestion, editor: this.editor })];\n  },\n});",
  },
  {
    type: 'h2',
    text: 'Paywall Node — 유료 구간 경계',
  },
  {
    type: 'p',
    html: '에디터에서 "여기부터 유료"라는 경계를 시각적으로 표시하는 커스텀 Node다. 이 노드 이후의 콘텐츠는 멤버십 사용자에게만 표시된다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'extensions/PaywallNode.ts',
    body: "import { Node, mergeAttributes } from '@tiptap/core';\n\nexport const PaywallNode = Node.create({\n  name: 'paywallNode',\n  group: 'block',\n  content: 'block+',\n  defining: true,\n\n  parseHTML() {\n    return [{ tag: 'div[data-paywall]' }];\n  },\n\n  renderHTML({ HTMLAttributes }) {\n    return [\n      'div',\n      mergeAttributes(HTMLAttributes, { 'data-paywall': '' }),\n      0,  // 0 = content hole (children go here)\n    ];\n  },\n\n  addNodeView() {\n    return ({ node, getPos }) => {\n      const dom = document.createElement('div');\n      dom.classList.add('paywall-boundary');\n      dom.setAttribute('data-label', 'Premium Content');\n      const contentDOM = document.createElement('div');\n      dom.appendChild(contentDOM);\n      return { dom, contentDOM };\n    };\n  },\n});",
  },
  {
    type: 'p',
    html: '<code>content: \'block+\'</code>는 이 노드 안에 하나 이상의 블록 노드를 넣을 수 있다는 뜻이다. <code>0</code>은 ProseMirror에서 "콘텐츠 구멍(content hole)"을 의미한다 — 자식 노드가 들어갈 자리다.',
  },
  {
    type: 'h2',
    text: 'Stock Node — 종목 차트 삽입',
  },
  {
    type: 'p',
    html: '종목 티커를 입력하면 해당 종목의 차트와 기본 정보가 에디터에 임베딩되는 커스텀 Node.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'extensions/StockNode.ts',
    body: "import { Node, mergeAttributes } from '@tiptap/core';\n\nexport const StockNode = Node.create({\n  name: 'stockNode',\n  group: 'block',\n  atom: true,  // This node has no editable content\n\n  addAttributes() {\n    return {\n      ticker: { default: '' },\n      exchange: { default: 'NYSE' },\n      period: { default: '1Y' },\n    };\n  },\n\n  parseHTML() {\n    return [{ tag: 'div[data-stock]' }];\n  },\n\n  renderHTML({ HTMLAttributes }) {\n    return ['div', mergeAttributes(HTMLAttributes, {\n      'data-stock': '',\n      'data-ticker': HTMLAttributes.ticker,\n    })];\n  },\n});",
  },
  {
    type: 'p',
    html: '<code>atom: true</code>는 이 노드가 편집 불가능한 단위라는 뜻이다. 사용자는 노드를 선택/삭제/이동할 수 있지만, 노드 안의 텍스트를 직접 편집하지는 못한다. 차트 렌더링은 별도 React 컴포넌트가 담당한다.',
  },
  {
    type: 'h2',
    text: 'Dirty Tracking + Validation',
  },
  {
    type: 'p',
    html: '에디터 상태의 변경 감지와 유효성 검증을 Zustand 스토어에서 처리했다. 초기 상태를 스냅샷으로 저장하고, 현재 상태와 비교하여 저장 필요 여부를 판단한다.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'stores/editorStore.ts',
    body: "interface EditorStore {\n  title: string;\n  slug: string;\n  category: string;\n  content: JSONContent | null;\n  initialSnapshot: string | null;\n\n  isDirty: () => boolean;\n  getValidation: () => { valid: boolean; missing: string[] };\n  getUpdatePayload: () => UpdatePayload | null;\n}\n\nconst useEditorStore = create<EditorStore>()(immer((set, get) => ({\n  // ... state\n\n  isDirty: () => {\n    const { initialSnapshot, title, slug, content } = get();\n    const current = JSON.stringify({ title, slug, content });\n    return current !== initialSnapshot;\n  },\n\n  getValidation: () => {\n    const { title, slug, category } = get();\n    const missing: string[] = [];\n    if (!title.trim()) missing.push('title');\n    if (!slug.trim()) missing.push('slug');\n    if (!category) missing.push('category');\n    return { valid: missing.length === 0, missing };\n  },\n\n  getUpdatePayload: () => {\n    const state = get();\n    if (!state.isDirty()) return null;\n    const { valid } = state.getValidation();\n    if (!valid) return null;\n    return { title: state.title, slug: state.slug, content: state.content };\n  },\n})));",
  },
  {
    type: 'p',
    html: '<code>isDirty()</code>는 초기 스냅샷과 현재 상태를 비교한다. <code>getValidation()</code>은 누락 필드 목록을 반환한다. <code>getUpdatePayload()</code>는 dirty이면서 유효한 경우에만 페이로드를 생성한다. UI는 이 getter들만 소비하면 된다.',
  },
  {
    type: 'h2',
    text: '확장의 조합 가능성',
  },
  {
    type: 'p',
    html: '12개 확장을 독립 모듈로 만든 가장 큰 이점은 <strong>조합 가능성</strong>이다. 에디터 설정 파일에서 배열로 확장을 추가하거나 제거하면 된다. "이 에디터에는 Paywall이 필요 없다" → 배열에서 빼면 끝이다. 확장 간 의존성을 최소화했기 때문에 가능한 구조다.',
  },
  {
    type: 'list',
    items: [
      'ProseMirror의 Document/Node/Mark/Schema 모델을 먼저 이해하라 — 커스텀 확장의 기초다',
      'atom: true는 편집 불가능한 임베드 노드, content: "block+"는 편집 가능한 컨테이너 노드',
      '각 확장을 독립 모듈로 만들면 조합과 제거가 설정 변경만으로 가능하다',
      'Dirty tracking은 스냅샷 비교로 구현하고, validation과 payload 생성은 getter로 분리하라',
      '슬래시 명령어는 TipTap의 Suggestion 플러그인으로 깔끔하게 구현할 수 있다',
    ],
  },
];

// ============================================================
// POST 8: tiptap-12-extensions (English)
// ============================================================

export const tiptapEn: ContentBlock[] = [
  {
    type: 'blockquote',
    text: "Understand ProseMirror's schema and editor extensions become LEGO blocks. Without the schema, every customization becomes a hack.",
  },
  {
    type: 'h2',
    text: 'Why a custom editor was needed',
  },
  {
    type: 'p',
    html: 'The Awarelab Admin CMS needed an editor for writing investment analysis content. Standard rich text (bold, italic, images) was not enough. We needed platform-specific features like <strong>stock chart embedding</strong>, <strong>paywall boundary markers</strong>, and <strong>slash commands</strong>.',
  },
  {
    type: 'p',
    html: 'The default Directus CMS editor did not support these custom blocks. I chose TipTap because it is <strong>ProseMirror-based</strong> with a clean extension system. In the end, I built 12 custom extensions.',
  },
  {
    type: 'h2',
    text: 'The ProseMirror mental model',
  },
  {
    type: 'p',
    html: 'Before building TipTap extensions, you need to understand the ProseMirror document model. A ProseMirror document is a <strong>tree structure</strong> similar to HTML but distinct.',
  },
  {
    type: 'list',
    items: [
      '<strong>Document</strong> — the root node wrapping the entire document',
      '<strong>Node</strong> — block-level elements (paragraph, heading, image, custom block)',
      '<strong>Mark</strong> — inline styles (bold, italic, link, custom highlight)',
      '<strong>Schema</strong> — rules defining which Nodes and Marks are allowed',
    ],
  },
  {
    type: 'code',
    lang: 'text',
    file: 'document-tree.txt',
    body: 'Document\n\u251c\u2500 Heading (level: 2)\n\u2502  \u2514\u2500 "Market Analysis"\n\u251c\u2500 Paragraph\n\u2502  \u251c\u2500 "The S&P 500 showed "\n\u2502  \u251c\u2500 Bold["strong momentum"]\n\u2502  \u2514\u2500 " this quarter."\n\u251c\u2500 StockNode (ticker: "AAPL")     \u2190 Custom Node\n\u251c\u2500 PaywallNode                      \u2190 Custom Node\n\u2502  \u251c\u2500 Paragraph\n\u2502  \u2514\u2500 Paragraph\n\u2514\u2500 Paragraph',
  },
  {
    type: 'p',
    html: 'The Schema defines "what is possible in this document." Register a custom Node in the Schema and ProseMirror treats it as a first-class citizen — copy/paste, undo/redo, and collaborative editing are supported automatically.',
  },
  {
    type: 'h2',
    text: 'Map of 12 extensions',
  },
  {
    type: 'p',
    html: 'The 12 extensions across 4 categories:',
  },
  {
    type: 'list',
    items: [
      '<strong>Block Nodes (4)</strong> — StockNode, PaywallNode, ImageBlock (upload + resize), EmbedBlock',
      '<strong>Inline Marks (3)</strong> — HighlightMark, SubscriptMark, FootnoteMark',
      '<strong>Commands (2)</strong> — SlashCommand (/ menu), TableOfContents (auto-generated)',
      '<strong>Utilities (3)</strong> — DirtyTracking, AutoSave, CharacterCount',
    ],
  },
  {
    type: 'h2',
    text: 'SlashCommand — insert blocks by typing /',
  },
  {
    type: 'p',
    html: "A Notion-style slash command. Type <code>/</code> and a dropdown appears; select a block type and the corresponding node is inserted. Built using ProseMirror's Plugin system.",
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'extensions/SlashCommand.ts',
    body: "import { Extension } from '@tiptap/core';\nimport { Plugin, PluginKey } from '@tiptap/pm/state';\nimport Suggestion from '@tiptap/suggestion';\n\nexport const SlashCommand = Extension.create({\n  name: 'slashCommand',\n\n  addOptions() {\n    return {\n      suggestion: {\n        char: '/',\n        command: ({ editor, range, props }: any) => {\n          editor.chain().focus().deleteRange(range).run();\n          props.command({ editor });\n        },\n        items: ({ query }: { query: string }) => {\n          return [\n            { title: 'Heading 1', command: ({ editor }: any) =>\n              editor.chain().toggleHeading({ level: 1 }).run() },\n            { title: 'Stock Chart', command: ({ editor }: any) =>\n              editor.chain().insertContent({ type: 'stockNode' }).run() },\n            { title: 'Paywall', command: ({ editor }: any) =>\n              editor.chain().insertContent({ type: 'paywallNode' }).run() },\n          ].filter(item =>\n            item.title.toLowerCase().includes(query.toLowerCase())\n          );\n        },\n      },\n    };\n  },\n\n  addProseMirrorPlugins() {\n    return [Suggestion({ ...this.options.suggestion, editor: this.editor })];\n  },\n});",
  },
  {
    type: 'h2',
    text: 'Paywall Node — the premium content boundary',
  },
  {
    type: 'p',
    html: 'A custom Node that visually marks "premium starts here" in the editor. Content after this node is only shown to membership subscribers.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'extensions/PaywallNode.ts',
    body: "import { Node, mergeAttributes } from '@tiptap/core';\n\nexport const PaywallNode = Node.create({\n  name: 'paywallNode',\n  group: 'block',\n  content: 'block+',\n  defining: true,\n\n  parseHTML() {\n    return [{ tag: 'div[data-paywall]' }];\n  },\n\n  renderHTML({ HTMLAttributes }) {\n    return [\n      'div',\n      mergeAttributes(HTMLAttributes, { 'data-paywall': '' }),\n      0,  // 0 = content hole (children go here)\n    ];\n  },\n\n  addNodeView() {\n    return ({ node, getPos }) => {\n      const dom = document.createElement('div');\n      dom.classList.add('paywall-boundary');\n      dom.setAttribute('data-label', 'Premium Content');\n      const contentDOM = document.createElement('div');\n      dom.appendChild(contentDOM);\n      return { dom, contentDOM };\n    };\n  },\n});",
  },
  {
    type: 'p',
    html: '<code>content: \'block+\'</code> means this node can contain one or more block nodes. <code>0</code> in ProseMirror means "content hole" — the slot where child nodes go.',
  },
  {
    type: 'h2',
    text: 'Stock Node — embedding ticker charts',
  },
  {
    type: 'p',
    html: 'A custom Node that embeds a stock chart and basic info when a ticker symbol is entered.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'extensions/StockNode.ts',
    body: "import { Node, mergeAttributes } from '@tiptap/core';\n\nexport const StockNode = Node.create({\n  name: 'stockNode',\n  group: 'block',\n  atom: true,  // This node has no editable content\n\n  addAttributes() {\n    return {\n      ticker: { default: '' },\n      exchange: { default: 'NYSE' },\n      period: { default: '1Y' },\n    };\n  },\n\n  parseHTML() {\n    return [{ tag: 'div[data-stock]' }];\n  },\n\n  renderHTML({ HTMLAttributes }) {\n    return ['div', mergeAttributes(HTMLAttributes, {\n      'data-stock': '',\n      'data-ticker': HTMLAttributes.ticker,\n    })];\n  },\n});",
  },
  {
    type: 'p',
    html: '<code>atom: true</code> means this node is a non-editable unit. Users can select, delete, or move the node, but cannot directly edit text inside it. Chart rendering is handled by a separate React component.',
  },
  {
    type: 'h2',
    text: 'Dirty tracking + validation',
  },
  {
    type: 'p',
    html: 'Editor state change detection and validation are handled in a Zustand store. The initial state is saved as a snapshot and compared against the current state to determine if saving is needed.',
  },
  {
    type: 'code',
    lang: 'typescript',
    file: 'stores/editorStore.ts',
    body: "interface EditorStore {\n  title: string;\n  slug: string;\n  category: string;\n  content: JSONContent | null;\n  initialSnapshot: string | null;\n\n  isDirty: () => boolean;\n  getValidation: () => { valid: boolean; missing: string[] };\n  getUpdatePayload: () => UpdatePayload | null;\n}\n\nconst useEditorStore = create<EditorStore>()(immer((set, get) => ({\n  // ... state\n\n  isDirty: () => {\n    const { initialSnapshot, title, slug, content } = get();\n    const current = JSON.stringify({ title, slug, content });\n    return current !== initialSnapshot;\n  },\n\n  getValidation: () => {\n    const { title, slug, category } = get();\n    const missing: string[] = [];\n    if (!title.trim()) missing.push('title');\n    if (!slug.trim()) missing.push('slug');\n    if (!category) missing.push('category');\n    return { valid: missing.length === 0, missing };\n  },\n\n  getUpdatePayload: () => {\n    const state = get();\n    if (!state.isDirty()) return null;\n    const { valid } = state.getValidation();\n    if (!valid) return null;\n    return { title: state.title, slug: state.slug, content: state.content };\n  },\n})));",
  },
  {
    type: 'p',
    html: '<code>isDirty()</code> compares the initial snapshot to the current state. <code>getValidation()</code> returns a list of missing fields. <code>getUpdatePayload()</code> only generates a payload when the state is both dirty and valid. The UI simply consumes these getters.',
  },
  {
    type: 'h2',
    text: 'The power of composable extensions',
  },
  {
    type: 'p',
    html: 'The biggest advantage of building all 12 extensions as independent modules is <strong>composability</strong>. In the editor config file, just add or remove extensions from an array. "This editor does not need Paywall" — remove it from the array and you are done. This is possible because dependencies between extensions were minimized.',
  },
  {
    type: 'list',
    items: [
      "Understand ProseMirror's Document/Node/Mark/Schema model first — it is the foundation for custom extensions",
      'atom: true for non-editable embed nodes, content: "block+" for editable container nodes',
      'Build each extension as an independent module so adding and removing is just a config change',
      'Implement dirty tracking via snapshot comparison; separate validation and payload generation as getters',
      "Slash commands can be cleanly implemented with TipTap's Suggestion plugin",
    ],
  },
];

// ============================================================
// Slug → Content mapping
// ============================================================

export const blogContentKo: Record<string, ContentBlock[]> = {
  'infinite-canvas-from-scratch': infiniteCanvasKo,
  'useRequestCache-hook': useRequestCacheKo,
  'lighthouse-52-to-87': lighthouseKo,
  'asp-net-to-nextjs': aspNetKo,
  'zustand-factory-pattern': zustandFactoryKo,
  'stripe-flow-state-machine': stripeFlowKo,
  'gsap-spa-memory-leak': gsapKo,
  'tiptap-12-extensions': tiptapKo,
};

export const blogContentEn: Record<string, ContentBlock[]> = {
  'infinite-canvas-from-scratch': infiniteCanvasEn,
  'useRequestCache-hook': useRequestCacheEn,
  'lighthouse-52-to-87': lighthouseEn,
  'asp-net-to-nextjs': aspNetEn,
  'zustand-factory-pattern': zustandFactoryEn,
  'stripe-flow-state-machine': stripeFlowEn,
  'gsap-spa-memory-leak': gsapEn,
  'tiptap-12-extensions': tiptapEn,
};
