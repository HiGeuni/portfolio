import awarelabImg from '$lib/assets/projects/awarelab.png';
import prestigeImg from '$lib/assets/projects/prestige.png';
import kumoImg from '$lib/assets/projects/kumo.png';
import awarelabLogo from '$lib/assets/projects/screenshots/awarelab/logo.png';
import awarelabHome from '$lib/assets/projects/screenshots/awarelab/home.png';
import awarelabI18n from '$lib/assets/projects/screenshots/awarelab/i18n.png';
import awarelabPortfolio from '$lib/assets/projects/screenshots/awarelab/portfolio.png';
import awarelabSubscription from '$lib/assets/projects/screenshots/awarelab/subscription.png';
import awarelabAdminHome from '$lib/assets/projects/screenshots/awarelab/admin-home.png';
import awarelabAdminMemberDetail from '$lib/assets/projects/screenshots/awarelab/admin-member-detail.png';
import prestigeBookmark from '$lib/assets/projects/screenshots/the-prestige/bookmark.png';
import facilityDetail from '$lib/assets/projects/screenshots/the-prestige/facility-detail.png';
import inquiry from '$lib/assets/projects/screenshots/the-prestige/inquiry.png';
import main from '$lib/assets/projects/screenshots/the-prestige/main.png';
import prestigeLogo from '$lib/assets/projects/screenshots/the-prestige/logo.png';
import kumoAbstract from '$lib/assets/projects/screenshots/kumo/abstract.gif';
import kumoMain from '$lib/assets/projects/screenshots/kumo/main.gif';
import kumoLogo from '$lib/assets/projects/screenshots/kumo/logo.png';
import kumoApplicationDeploy from '$lib/assets/projects/screenshots/kumo/application-deploy.jpg';
import kumoEnvironmentBranch from '$lib/assets/projects/screenshots/kumo/environment-branch.jpg';
import kumoOptionChange from '$lib/assets/projects/screenshots/kumo/optionChange.gif';

export const en = {
  nav: {
    about: 'About',
    career: 'Career',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
    resume: 'Resume',
    letsTalk: "Let's Talk",
  },
  skills: {
    title: 'Technical Skills',
    description: 'Technologies I work with to bring ideas to life.',
    categories: {
      frontend: 'Frontend Core',
      styling: 'Styling & UI',
      state: 'State & Data',
      infra: 'Infrastructure & Tools',
      integration: 'Integrations',
    },
  },
  hero: {
    available: 'Available for new opportunities',
    greeting: "Hi, I'm",
    name: 'HyoGeun Kim',
    role: ['Frontend Engineer', 'Software Engineer'],
    description:
      'Specializing in **Web Performance Optimization**, **FSD Architecture**, and building scalable **SaaS Platforms**. I transform complex problems into elegant, high-performance web solutions.',
    viewProjects: 'View Projects',
    downloadResume: 'Download Resume',
    yearsExp: 'Years Exp',
    perfBoost: 'Perf Boost',
    architecture: 'Architecture',
    evaluatorIntro:
      'A 1.5-year Frontend Engineer who maximizes business value through FSD architecture and performance optimization, prioritizing user experience.',
  },
  about: {
    title: 'About Me',
    p1: 'I am a **Frontend Engineer** with 1.5 years of experience, specializing in web performance optimization, scalable architecture, and seamless system integrations.',
    p2: 'My expertise lies in building large-scale applications using **Feature-Sliced Design (FSD)** and optimizing bundle sizes for lightning-fast user experiences. I have a proven track record of reducing load times by nearly 50% and handling complex data visualizations.',
    p3: 'Beyond coding, I am passionate about creating type-safe ecosystems using tools like **Directus CMS** and integrating secure payment flows with **Stripe**. I thrive in environments where technical excellence meets user-centric design.',
    cards: {
      perf: {
        title: 'Performance Obsessed',
        desc: 'Expert in bundle optimization, code splitting, and dynamic imports to ensure maximum speed.',
      },
      scale: {
        title: 'Scalable Architecture',
        desc: 'Building maintainable, large-scale applications using Feature-Sliced Design (FSD) principles.',
      },
      system: {
        title: 'System Integration',
        desc: 'Seamlessly integrating Stripe payments and Headless CMS (Directus) with type safety.',
      },
    },
  },
  contact: {
    title: "Let's Connect",
    description:
      "I'm currently available for freelance work or full-time positions. If you have a project that needs some creative touch, or just want to say hi, feel free to drop me a message.",
    info: {
      email: 'Email',
      phone: 'Phone',
      github: 'GitHub',
    },
    form: {
      title: 'Send a Message',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      submit: 'Send Message',
      sending: 'Sending...',
      success: 'Message Sent!',
      error: 'Failed to Send',
      placeholders: {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Project Inquiry',
        message: 'Tell me about your project...',
      },
    },
  },
  career: {
    title: 'Experience',
    description: 'My professional journey and key achievements.',
    jobs: [
      {
        company: 'AwareLab',
        role: 'Frontend Engineer',
        period: '2025.04 - Present',
        description:
          'Building a high-performance membership platform for investment portfolio analysis.',
        achievements: [
          'Optimized bundle size by 46% (253KB → 136KB) through code splitting and dynamic imports.',
          'Implemented Feature-Sliced Design (FSD) architecture for scalable development.',
          'Integrated Stripe payments and Directus CMS with full type safety.',
          'Solved complex chart rendering issues with Lightweight Charts.',
        ],
      },
      {
        company: 'Daqda',
        role: 'Frontend Engineer',
        period: '2024.06 - 2025.03',
        description: 'Developed location visualization services and e-commerce platforms.',
        achievements: [
          "Built 'The Prestige', a funeral home location service using Kakao Map API.",
          'Improved UX by implementing tab-based filtering and Image CDN with Lazy Loading.',
          'Developed a web gift mall using React, Vite, and Zustand.',
          'Implemented robust data persistence using LocalStorage to prevent data loss.',
        ],
      },
      {
        company: 'SW Maestro',
        role: 'Frontend Engineer',
        period: '2023.04 - 2023.11',
        description: 'Selected as a trainee for the prestigious software talent nurturing program.',
        achievements: [
          "Developed 'Kumo Factory', a No-Code Cloud Deployment platform.",
          'Built a Drag & Drop UI for designing cloud infrastructure.',
          'Implemented real-time deployment logs using Server-Sent Events (SSE).',
          'Optimized UX with SSR (Server-Side Rendering) in Next.js 13.',
        ],
      },
      {
        company: 'GDSC Seoultech',
        role: 'Frontend Developer',
        period: '2022.09 - 2023.04',
        description: 'Core member of Google Developer Student Clubs.',
        achievements: [
          'Developed a Shared Fridge Service using Next.js 12 and React Query.',
          'Implemented optimistic updates for seamless user interaction.',
          'Built interactive map pages and donation forms.',
        ],
      },
    ],
  },
  projects: {
    title: 'Featured Projects',
    description: 'A selection of my recent work.',
    showFeatured: 'Show Featured Only',
    viewCaseStudy: 'View Case Study',
    modal: {
      problem: 'The Problem',
      solution: 'The Solution',
      challenges: 'Technical Challenges',
      features: 'Key Features',
      impact: 'Impact',
      tech: 'Technologies Used',
      gallery: 'Gallery',
    },
    list: [
      {
        id: 1,
        title: 'AwareLab Membership',
        category: 'Fintech / SaaS',
        imageUrl: awarelabLogo,
        isFeatured: true,
        gallery: [
          { src: awarelabHome, caption: 'Homepage (Light/Dark mode support)' },
          { src: awarelabI18n, caption: 'Multilingual support using next-intl' },
          {
            src: awarelabPortfolio,
            caption: 'Portfolio analysis using high-performance charts',
          },
          {
            src: awarelabSubscription,
            caption: 'Subscription payments using Stripe',
          },
          { src: awarelabAdminHome, caption: 'Admin Page' },
          {
            src: awarelabAdminMemberDetail,
            caption: 'Admin Member Detail Page',
          },
        ],
        image: 'bg-gradient-to-br from-green-400 to-emerald-600',
        role: 'Lead Frontend Engineer',
        description: 'Investment portfolio analysis platform with high-performance charts.',
        problem:
          'Users needed a fast, reliable platform for complex investment data analysis with real-time updates.',
        solution:
          'Built a high-performance web app using Next.js 16 and FSD architecture, integrating Stripe for payments and Directus for content.',
        challenges:
          'Optimizing large JS bundles and handling complex chart rendering. Solved by code splitting (46% load improvement) and dynamic imports.',
        tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Directus'],
        features: [
          'Real-time Charts',
          'Stripe Subscription',
          'Portfolio Analysis',
          'FSD Architecture',
        ],
        impact: [
          'Bundle size reduced 253KB → 136KB',
          '46% faster initial load',
          'Seamless payment integration',
        ],
        links: { demo: 'https://awarelab.io', github: '#' },
      },
      {
        id: 2,
        title: 'The Prestige',
        category: 'Location Service',
        imageUrl: prestigeLogo,
        isFeatured: true,
        gallery: [
          { src: main, caption: 'Main page with Kakao Map API' },
          { src: facilityDetail, caption: 'Facility detail page' },
          { src: inquiry, caption: 'Inquiry page' },
          { src: prestigeBookmark, caption: 'Bookmark page' },
        ],
        image: 'bg-gradient-to-br from-emerald-500 to-teal-700',
        role: 'Frontend Engineer',
        description: 'Funeral home location visualization service with map integration.',
        problem: 'Users found it difficult to find and filter funeral home locations efficiently.',
        solution:
          'Implemented a map-based visualization with Kakao Map API and optimized image loading for a smooth experience.',
        challenges:
          'Managing heavy image assets and complex filter logic. Solved with Image CDN + Lazy Loading and refactoring filter UX.',
        tech: ['Next.js', 'Vite', 'Recoil', 'Kakao Map API'],
        features: ['Map Visualization', 'Location Filtering', 'Image Gallery', 'Tab-based UI'],
        impact: ['Improved UX with tab-based filtering', 'Optimized image loading performance'],
        links: { demo: '#', github: '#' },
      },
      {
        id: 3,
        title: 'Kumo Factory',
        category: 'Cloud DevOps Tool',
        imageUrl: kumoLogo,
        isFeatured: true,
        gallery: [
          {
            src: kumoMain,
            caption: 'Intuitive Drag & Drop infrastructure designer',
          },
          { src: kumoAbstract, caption: 'Real-time deployment logs via SSE' },
          {
            src: kumoApplicationDeploy,
            caption: 'Real-time deployment logs via SSE',
          },
          { src: kumoOptionChange, caption: 'Real-time deployment logs via SSE' },
          {
            src: kumoEnvironmentBranch,
            caption: 'Real-time deployment logs via SSE',
          },
        ],
        image: 'bg-gradient-to-br from-teal-400 to-cyan-600',
        role: 'Frontend Engineer',
        description: 'No-Code Cloud Deployment Platform with Drag & Drop UI.',
        problem: 'Cloud deployment is complex and intimidating for beginners.',
        solution: 'Created a Drag & Drop interface for designing cloud infrastructure visually.',
        challenges:
          'Visualizing deployment status in real-time. Solved using Server-Sent Events (SSE) for live logs.',
        tech: ['Next.js 13', 'Tailwind CSS', 'Zustand', 'SSE'],
        features: ['Drag & Drop UI', 'Real-time Logs (SSE)', 'Cloud Architecture Design'],
        impact: ['Simplified cloud deployment process', 'SSR based UX optimization'],
        links: { demo: '#', github: '#' },
      },
    ],
  },
};

export const ko = {
  nav: {
    about: '소개',
    career: '경력',
    skills: '기술',
    projects: '프로젝트',
    contact: '연락처',
    resume: '이력서',
    letsTalk: '대화하기',
  },
  skills: {
    title: '기술 스택',
    description: '아이디어를 현실로 구현하기 위해 사용하는 기술들입니다.',
    categories: {
      frontend: '프론트엔드 코어',
      styling: '스타일링 & UI',
      state: '상태 관리 & 데이터',
      infra: '인프라 & 도구',
      integration: '외부 연동',
    },
  },
  hero: {
    available: '새로운 도전을 기다리고 있습니다',
    greeting: '안녕하세요, 저는',
    name: '김효근입니다',
    role: ['프론트엔드 엔지니어', '소프트웨어 엔지니어'],
    description:
      '**웹 성능 최적화**와 **FSD 아키텍처** 설계를 전문으로 하며, 확장 가능한 **SaaS 플랫폼**을 구축합니다. 기술적 난제를 해결하여 사용자에게 **최적의 웹 경험**을 제공하는 데 집중합니다.',
    viewProjects: '프로젝트 보기',
    downloadResume: '이력서 다운로드',
    yearsExp: '년차',
    perfBoost: '성능 개선',
    architecture: '아키텍처',
    evaluatorIntro:
      '사용자 경험을 최우선으로, FSD 아키텍처와 성능 최적화를 통해 비즈니스 가치를 극대화하는 1.5년차 프론트엔드 엔지니어입니다.',
  },
  about: {
    title: '소개',
    p1: '저는 1.5년 경력의 **프론트엔드 엔지니어**로, 웹 성능 최적화, 확장 가능한 아키텍처, 그리고 원활한 시스템 통합을 전문으로 합니다.',
    p2: '**Feature-Sliced Design (FSD)**을 사용하여 대규모 애플리케이션을 구축하고 번들 크기를 최적화하여 매우 빠른 사용자 경험을 제공하는 데 전문성이 있습니다. 로딩 시간을 거의 50% 단축하고 복잡한 데이터 시각화를 처리한 실적이 있습니다.',
    p3: '코딩 외에도 **Directus CMS**와 같은 도구를 사용하여 타입 안전한 생태계를 만들고 **Stripe**로 안전한 결제 흐름을 통합하는 데 열정적입니다. 기술적 우수성과 사용자 중심 디자인이 만나는 환경에서 성장합니다.',
    cards: {
      perf: {
        title: '성능 집착',
        desc: '최대 속도를 보장하기 위한 번들 최적화, 코드 분할 및 동적 가져오기 전문가.',
      },
      scale: {
        title: '확장 가능한 아키텍처',
        desc: 'Feature-Sliced Design (FSD) 원칙을 사용하여 유지 관리 가능한 대규모 애플리케이션 구축.',
      },
      system: {
        title: '시스템 통합',
        desc: 'Stripe 결제 및 Headless CMS (Directus)를 타입 안전성과 함께 원활하게 통합.',
      },
    },
  },
  contact: {
    title: '연락하기',
    description:
      '현재 프리랜서 또는 정규직 제안을 받고 있습니다. 창의적인 손길이 필요한 프로젝트가 있거나, 단순히 인사를 나누고 싶다면 언제든 메시지를 보내주세요.',
    info: {
      email: '이메일',
      phone: '전화번호',
      github: 'GitHub',
    },
    form: {
      title: '메시지 보내기',
      name: '이름',
      email: '이메일',
      subject: '제목',
      message: '내용',
      submit: '메시지 보내기',
      sending: '전송 중...',
      success: '전송 완료!',
      error: '전송 실패',
      placeholders: {
        name: '홍길동',
        email: 'hong@example.com',
        subject: '프로젝트 문의',
        message: '프로젝트에 대해 말씀해주세요...',
      },
    },
  },
  career: {
    title: '경력',
    description: '저의 전문적인 여정과 주요 성과들입니다.',
    jobs: [
      {
        company: 'AwareLab',
        role: '프론트엔드 엔지니어',
        period: '2025.04 - 현재',
        description: '투자 포트폴리오 분석을 위한 고성능 멤버십 플랫폼 구축.',
        achievements: [
          '코드 분할 및 동적 가져오기를 통해 번들 크기 46% 최적화 (253KB → 136KB).',
          '확장 가능한 개발을 위한 Feature-Sliced Design (FSD) 아키텍처 구현.',
          '완전한 타입 안전성을 갖춘 Stripe 결제 및 Directus CMS 통합.',
          'Lightweight Charts를 활용하여 복잡한 차트 렌더링 문제 해결.',
        ],
      },
      {
        company: 'Daqda',
        role: '프론트엔드 엔지니어',
        period: '2024.06 - 2025.03',
        description: '위치 시각화 서비스 및 이커머스 플랫폼 개발.',
        achievements: [
          "Kakao Map API를 활용한 장례식장 위치 서비스 'The Prestige' 구축.",
          '탭 기반 필터링 및 Lazy Loading이 적용된 Image CDN을 구현하여 UX 개선.',
          'React, Vite, Zustand를 사용하여 웹 기프트 몰 개발.',
          '데이터 손실 방지를 위해 LocalStorage를 활용한 강력한 데이터 지속성 구현.',
        ],
      },
      {
        company: 'SW Maestro',
        role: '프론트엔드 엔지니어',
        period: '2023.04 - 2023.11',
        description: '소프트웨어 인재 양성 프로그램 연수생으로 선발.',
        achievements: [
          "노코드 클라우드 배포 플랫폼 'Kumo Factory' 개발.",
          '클라우드 인프라 설계를 위한 Drag & Drop UI 구축.',
          'Server-Sent Events (SSE)를 사용하여 실시간 배포 로그 구현.',
          'Next.js 13의 SSR(Server-Side Rendering)로 UX 최적화.',
        ],
      },
      {
        company: 'GDSC Seoultech',
        role: '프론트엔드 개발자',
        period: '2022.09 - 2023.04',
        description: 'Google Developer Student Clubs 핵심 멤버.',
        achievements: [
          'Next.js 12와 React Query를 사용하여 공유 냉장고 서비스 개발.',
          '원활한 사용자 상호작용을 위해 낙관적 업데이트(Optimistic Updates) 구현.',
          '대화형 지도 페이지 및 기부 양식 구축.',
        ],
      },
    ],
  },
  projects: {
    title: '주요 프로젝트',
    description: '최근 진행한 주요 작업물입니다.',
    showFeatured: '주요 프로젝트만 보기',
    viewCaseStudy: '사례 연구 보기',
    modal: {
      problem: '문제 정의',
      solution: '해결 방안',
      challenges: '기술적 도전',
      features: '주요 기능',
      impact: '성과',
      tech: '사용 기술',
      gallery: '갤러리',
    },
    list: [
      {
        id: 1,
        title: 'AwareLab Membership',
        category: '핀테크 / SaaS',
        imageUrl: awarelabLogo,
        isFeatured: true,
        gallery: [
          { src: awarelabHome, caption: '홈페이지 (라이트/다크 모드 지원)' },
          { src: awarelabI18n, caption: 'next-intl을 이용한 다국어 지원' },
          {
            src: awarelabPortfolio,
            caption: '고성능 차트를 이용한 포트폴리오 분석',
          },
          {
            src: awarelabSubscription,
            caption: 'Stripe를 이용한 구독 결제',
          },
          { src: awarelabAdminHome, caption: '관리자 페이지' },
          {
            src: awarelabAdminMemberDetail,
            caption: '관리자 회원 상세 페이지',
          },
        ],
        image: 'bg-gradient-to-br from-green-400 to-emerald-600',
        role: '리드 프론트엔드 엔지니어',
        description: '고성능 차트를 활용한 투자 포트폴리오 분석 플랫폼.',
        problem:
          '사용자들은 실시간 업데이트와 복잡한 투자 데이터 분석을 위한 빠르고 신뢰할 수 있는 플랫폼이 필요했습니다.',
        solution:
          'Next.js 16과 FSD 아키텍처를 사용하여 고성능 웹 앱을 구축하고, Stripe 결제 및 Directus 콘텐츠 관리를 통합했습니다.',
        challenges:
          '대용량 JS 번들 최적화 및 복잡한 차트 렌더링 처리. 코드 분할(46% 로딩 개선) 및 동적 가져오기로 해결했습니다.',
        tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Directus'],
        features: ['실시간 차트', 'Stripe 구독', '포트폴리오 분석', 'FSD 아키텍처'],
        impact: ['번들 크기 253KB → 136KB 감소', '초기 로딩 속도 46% 향상', '원활한 결제 통합'],
        links: { demo: 'https://awarelab.io', github: '#' },
      },
      {
        id: 2,
        title: 'The Prestige',
        category: '위치 기반 서비스',
        imageUrl: prestigeLogo,
        isFeatured: true,
        gallery: [
          { src: main, caption: 'Kakao Map API를 활용한 메인 페이지' },
          { src: facilityDetail, caption: '시설 상세 페이지' },
          { src: inquiry, caption: '문의 페이지' },
          { src: prestigeBookmark, caption: '즐겨찾기 페이지' },
        ],
        image: 'bg-gradient-to-br from-emerald-500 to-teal-700',
        role: '프론트엔드 엔지니어',
        description: '지도 연동 장례식장 위치 시각화 서비스.',
        problem: '사용자들이 장례식장 위치를 효율적으로 찾고 필터링하는 데 어려움을 겪었습니다.',
        solution:
          'Kakao Map API를 활용한 지도 기반 시각화를 구현하고 이미지 로딩을 최적화하여 부드러운 경험을 제공했습니다.',
        challenges:
          '무거운 이미지 자산 및 복잡한 필터 로직 관리. 이미지 CDN + Lazy Loading 및 필터 UX 리팩토링으로 해결했습니다.',
        tech: ['Next.js', 'Vite', 'Recoil', 'Kakao Map API'],
        features: ['지도 시각화', '위치 필터링', '이미지 갤러리', '탭 기반 UI'],
        impact: ['탭 기반 필터링으로 UX 개선', '이미지 로딩 성능 최적화'],
        links: { demo: '#', github: '#' },
      },
      {
        id: 3,
        title: 'Kumo Factory',
        category: '클라우드 데브옵스 도구',
        imageUrl: kumoLogo,
        isFeatured: true,
        gallery: [
          {
            src: kumoMain,
            caption: '직관적인 드래그 앤 드롭 인프라 설계',
          },
          { src: kumoAbstract, caption: 'SSE를 통한 실시간 배포 로그' },
          {
            src: kumoApplicationDeploy,
            caption: 'SSE를 통한 실시간 배포 로그',
          },
          { src: kumoOptionChange, caption: 'SSE를 통한 실시간 배포 로그' },
          {
            src: kumoEnvironmentBranch,
            caption: 'SSE를 통한 실시간 배포 로그',
          },
        ],
        image: 'bg-gradient-to-br from-teal-400 to-cyan-600',
        role: '프론트엔드 엔지니어',
        description: '드래그 앤 드롭 UI를 갖춘 노코드 클라우드 배포 플랫폼.',
        problem: '클라우드 배포는 초보자에게 복잡하고 어렵습니다.',
        solution:
          '클라우드 인프라를 시각적으로 설계할 수 있는 드래그 앤 드롭 인터페이스를 만들었습니다.',
        challenges:
          '실시간 배포 상태 시각화. 실시간 로그를 위해 Server-Sent Events (SSE)를 사용하여 해결했습니다.',
        tech: ['Next.js 13', 'Tailwind CSS', 'Zustand', 'SSE'],
        features: ['드래그 앤 드롭 UI', '실시간 로그 (SSE)', '클라우드 아키텍처 설계'],
        impact: ['클라우드 배포 프로세스 간소화', 'SSR 기반 UX 최적화'],
        links: { demo: '#', github: '#' },
      },
    ],
  },
};
