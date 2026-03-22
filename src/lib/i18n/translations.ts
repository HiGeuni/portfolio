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
import heartyFridgeMain from '$lib/assets/projects/screenshots/hearty-fridge/main.png';
import heartyFridgeDonateForm from '$lib/assets/projects/screenshots/hearty-fridge/food-donate-form.png';
import heartyFridgeReserveForm from '$lib/assets/projects/screenshots/hearty-fridge/food-reserve-form.png';
import heartyFridgeLocation from '$lib/assets/projects/screenshots/hearty-fridge/location-visualization-and-fridge-info.png';
import heartyFridgeMyPage from '$lib/assets/projects/screenshots/hearty-fridge/my-page.png';
import sihyunhadaCrm from '$lib/assets/projects/screenshots/sihuynhada/crm.png';
import sihyunhadaPhoto from '$lib/assets/projects/screenshots/sihuynhada/after-take-photo.png';
import webGiftMain from '$lib/assets/projects/screenshots/web-gift/main.png';
import webGiftOrder from '$lib/assets/projects/screenshots/web-gift/order.png';

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
  seo: {
    title: 'HyoGeun Kim | Frontend Engineer',
    description:
      'Frontend Engineer with 2+ years of hands-on experience. I focus on web performance, FSD architecture, and building products that actually work well for users.',
    keywords:
      'Frontend Engineer, Web Performance, FSD Architecture, React, Next.js, SvelteKit, Portfolio',
    ogTitle: 'HyoGeun Kim | Frontend Engineer',
    ogDescription:
      'Frontend engineer who cares about performance and clean architecture. Check out what I have been building.',
  },
  skills: {
    title: 'Technical Skills',
    description: 'Tools and technologies I use day-to-day.',
    categories: {
      frontend: 'Frontend Core',
      styling: 'Styling & UI',
      state: 'State & Data',
      formsAndTables: 'Forms & Tables',
      infra: 'Infrastructure & Tools',
      integration: 'Integrations',
    },
  },
  hero: {
    available: 'Open to new opportunities',
    greeting: "Hi, I'm",
    name: 'HyoGeun Kim',
    role: ['Frontend Engineer', 'Software Engineer'],
    description:
      'I build fast, well-structured web applications. Most recently, I took a site from **Lighthouse 52 to 87** as a solo frontend engineer, and I have a habit of building things from scratch when libraries fall short -- like a **custom SVG infinite canvas** with raw DOM manipulation.',
    viewProjects: 'View Projects',
    downloadResume: 'Download Resume',
    yearsExp: 'Years Exp',
    perfBoost: 'Perf Boost',
    architecture: 'Architecture',
    evaluatorIntro:
      'A frontend engineer who has shipped production apps solo, obsesses over Core Web Vitals, and designs systems that scale with FSD architecture.',
  },
  about: {
    title: 'About Me',
    p1: "I'm a **Frontend Engineer** with 2+ years of experience, mostly as the sole frontend developer on small teams. I have been responsible for everything from performance optimization and architecture decisions to payment integrations and CMS builds.",
    p2: "At AwareLab, I inherited a site scoring **Lighthouse 52** with a 9-second LCP. I brought it to 87 by cutting the bundle 46% with dynamic imports, subsetting fonts from 800KB to 250KB, and fixing race conditions in financial chart rendering. Before that, I studied **Computer Graphics** as an undergrad researcher (published at CIA 2023) and competed in **ACM-ICPC** regionals -- which is where I picked up the habit of thinking about problems systematically.",
    p3: "These days I'm focused on **FSD architecture** for organizing large codebases, **Stripe** and **Directus** integrations with full type safety, and building custom editors with **TipTap**. I like working on products where I can own the frontend end-to-end and make real impact on user experience.",
    cards: {
      perf: {
        title: 'Performance First',
        desc: 'Took Lighthouse from 52 to 87. Bundle analysis, code splitting, font subsetting, fixing CLS -- whatever it takes to make the site fast.',
      },
      scale: {
        title: 'Scalable Architecture',
        desc: 'I use Feature-Sliced Design (FSD) to keep large codebases organized and maintainable as they grow.',
      },
      system: {
        title: 'System Integration',
        desc: 'Stripe payments, Directus CMS, 3-language i18n -- I wire up complex systems with type safety so things stay reliable.',
      },
    },
  },
  contact: {
    title: "Let's Connect",
    description:
      "I'm open to full-time roles or interesting contract work. If you are looking for a frontend engineer who can own the entire frontend independently, I'd love to hear from you.",
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
    description: 'Where I have worked and what I built there.',
    jobs: [
      {
        company: 'AwareLab',
        role: 'Frontend Engineer',
        period: '2025.04 - Present',
        description:
          'Solo frontend engineer on an investment portfolio analysis platform. The team went from 6 to 4 devs, and I became the only frontend engineer after my colleague was let go.',
        achievements: [
          'Improved Core Web Vitals: LCP 9s to 3.8s (60% reduction), CLS 0.126 to 0, Lighthouse 52 to 87.',
          'Cut bundle size 46% (253KB to 136KB) using @next/bundle-analyzer to find the worst offenders, then applied code splitting and dynamic imports.',
          'Set up Feature-Sliced Design (FSD) architecture to keep the growing codebase manageable.',
          'Built an Admin Dashboard with Zustand Factory pattern for reusable filter stores, RBAC, and TanStack Table.',
          'Developed a TipTap CMS editor with 12 custom extensions including SlashCommand, Paywall blocks, and Stock chart embeds.',
          'Fixed race conditions in financial chart rendering -- closures were capturing stale data, solved it with closure scoping + Map-based caching + gsap.context().revert().',
          'Integrated Stripe (membership, period selection, coupon, payment flow) and Directus CMS with shared types between FE and BE.',
          'Implemented 3-language support (EN/KO/JA) with next-intl, including hreflang tags for SEO.',
        ],
      },
      {
        company: 'Daqda',
        role: 'Frontend Engineer',
        period: '2024.06 - 2025.03',
        description:
          'Solo frontend developer on a 3-person dev team (CTO, backend, me). Built and migrated products for funeral-related services at a 30-person company.',
        achievements: [
          'Migrated The Prestige from legacy ASP.NET to Next.js (8 pages in 6 weeks). The old site had full page refreshes on every filter change -- I rebuilt it as a SPA with real-time filtering. Alpha testers said it was a much better experience.',
          'Set up Vercel CI/CD to replace the old manual deployment process (deploy time went from 10 min to 2 min). Previously had to hand off build files because I had no access to the Windows Server.',
          'Worked with the backend developer to design clean API response structures.',
          'Built a gift e-commerce site with Vite+React (chose it over Next.js since there was no SEO need). Used LocalStorage persistence to stop users from losing order data when switching between the site and their contacts app for recipient info -- this directly reduced phone-order fallback CS calls.',
        ],
      },
      {
        company: 'SW Maestro',
        role: 'Frontend Engineer',
        period: '2023.04 - 2023.11',
        description:
          'Selected for the 14th cohort of SW Maestro, a government software talent program.',
        achievements: [
          "Built 'Kumo Factory', a no-code cloud deployment platform where you design infrastructure visually on a canvas.",
          'Started with react-zoom-pan-pinch but hit canvas size limitations for large architectures. Ended up building a custom infinite canvas with pure SVG DOM manipulation and 3x3 affine transformation matrices. The hardest part was getting pixel calculations right at different zoom levels.',
          'Achieved 60fps rendering and 30% memory reduction through data normalization and Zustand selective subscribing.',
          'Reduced unnecessary API calls by 50%+ with a 3-layer state architecture (domain/UI/server).',
          'Implemented real-time deployment logs using Server-Sent Events (SSE) with <100ms latency.',
        ],
      },
      {
        company: 'GDSC Seoultech',
        role: 'Frontend Developer',
        period: '2022.09 - 2023.04',
        description: 'Core member of Google Developer Student Clubs at Seoul National University of Science & Technology.',
        achievements: [
          'Built a shared fridge service for food donations using Next.js 13 and Recoil.',
          'Integrated Google Maps API for finding and visualizing fridge locations.',
          'Learned and implemented Optimistic Updates here -- a pattern I later used in production at Daqda.',
        ],
      },
    ],
  },
  projects: {
    title: 'Featured Projects',
    description: 'Things I have built.',
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
        role: 'Solo Frontend Engineer',
        description:
          'Investment portfolio analysis platform with financial charts, Stripe-powered memberships, and 3-language support. I handle all frontend work as the sole FE engineer.',
        problem:
          'The platform launched with serious performance issues -- Lighthouse 52, LCP over 9 seconds. Users were waiting too long to see their investment data, and the initial bundle was bloated.',
        solution:
          'Rebuilt the frontend architecture with FSD, optimized Core Web Vitals through bundle analysis and code splitting, and integrated Stripe for subscriptions and Directus as the headless CMS -- all with shared TypeScript types between FE and BE.',
        challenges:
          'Financial charts had race conditions where closures captured stale data during re-renders. Fixed it with closure scoping + Map-based caching + gsap.context().revert(). Cut the bundle 46% (253KB to 136KB) after finding the biggest offenders with @next/bundle-analyzer. Reduced font files from 800KB to 250KB through subsetting, which eliminated CLS.',
        tech: [
          'Next.js 16',
          'React 19',
          'TypeScript',
          'Tailwind CSS',
          'Stripe',
          'Directus',
          'GSAP',
          'next-intl',
        ],
        features: [
          'Real-time Financial Charts',
          'Stripe Subscription',
          'Portfolio Analysis',
          'FSD Architecture',
          '3-Language Support (EN/KO/JA)',
          'Core Web Vitals Optimization',
        ],
        impact: [
          'Lighthouse 52 → 87 (+67%)',
          'LCP 9s → 3.8s (60% faster)',
          'Bundle size 253KB → 136KB (46% reduction)',
          'CLS 0.126 → 0 (eliminated)',
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
        role: 'Solo Frontend Engineer',
        description:
          'Funeral home location and comparison service. Migrated the entire frontend from legacy ASP.NET to Next.js in 6 weeks, ahead of a demo for Yonsei Severance Hospital.',
        problem:
          'The existing ASP.NET site was a multi-page app that did a full page refresh every time you changed a filter. Each filter step required navigating to a new page. Deployments were manual on a Windows Server, taking 10+ minutes, and I did not even have server access -- I had to hand off build files.',
        solution:
          'Rebuilt all 8 pages in Next.js as a SPA with real-time client-side filtering using Kakao Map. Set up Vercel CI/CD so deployments went from 10 minutes manual to 2 minutes automatic. CSR conversion of the map and filter UI made a noticeable difference in responsiveness.',
        challenges:
          'Had to finish the migration in 6 weeks to be ready for the Yonsei Severance demo. Maintained full feature parity with the legacy system while redesigning the filtering UX. Coordinated API response structure with the backend developer.',
        tech: ['Next.js', 'React', 'TypeScript', 'Recoil', 'Kakao Map API', 'Vercel'],
        features: [
          'Map-based Location Visualization',
          'Client-side SPA Filtering',
          'Image CDN + Lazy Loading',
          'Vercel CI/CD Pipeline',
        ],
        impact: [
          'Legacy ASP.NET → Next.js (8 pages, 6 weeks)',
          'Deployment 10 min → 2 min (80% faster)',
          'Alpha testers reported much better filtering experience',
        ],
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
          { src: kumoAbstract, caption: 'SVG canvas with cloud architecture' },
          {
            src: kumoApplicationDeploy,
            caption: 'Application deployment configuration',
          },
          { src: kumoOptionChange, caption: 'Real-time option changes' },
          {
            src: kumoEnvironmentBranch,
            caption: 'Environment and branch management',
          },
        ],
        image: 'bg-gradient-to-br from-teal-400 to-cyan-600',
        role: 'Solo Frontend Engineer',
        description:
          'No-code cloud deployment platform where you design infrastructure visually on an infinite canvas. Built during SW Maestro 14th cohort.',
        problem:
          'Cloud deployment is intimidating for people who are not DevOps specialists. We wanted to let users visually design their cloud architecture by dragging and dropping components on a canvas, then deploy with one click.',
        solution:
          'Started with react-zoom-pan-pinch, but it could not handle large architectures due to canvas size limitations. Built a custom infinite canvas from scratch using pure SVG DOM manipulation and 3x3 affine transformation matrices for pan, zoom, and drag.',
        challenges:
          'The hardest part was getting pixel calculations right at different zoom levels -- translating screen coordinates to canvas coordinates through the transformation matrix. Used data normalization and Zustand selective subscribing to hit 60fps with 30% less memory.',
        tech: ['Next.js 13', 'React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'SSE', 'SVG'],
        features: [
          'Custom SVG Infinite Canvas',
          'Drag & Drop Cloud Architecture',
          'Real-time Deployment Logs (SSE)',
          '3-Layer State Architecture',
        ],
        impact: [
          '60fps rendering performance',
          '30% memory reduction via data normalization',
          '50%+ reduction in unnecessary API calls',
          'SSE latency <100ms',
        ],
        links: { demo: '#', github: '#' },
      },
      {
        id: 4,
        title: 'AwareLab Admin Dashboard',
        category: 'Internal Tool',
        imageUrl: awarelabLogo,
        isFeatured: false,
        gallery: [
          { src: awarelabAdminHome, caption: 'Admin dashboard home' },
          { src: awarelabAdminMemberDetail, caption: 'Member detail management' },
        ],
        image: 'bg-gradient-to-br from-green-500 to-emerald-700',
        role: 'Solo Frontend Engineer',
        description:
          'Internal admin dashboard for managing members, subscriptions, and content. Built with a Zustand Factory pattern so filter logic is reusable across every data view.',
        problem:
          'The membership platform needed an admin tool for managing users, subscriptions, and articles -- with different permission levels for different team roles.',
        solution:
          'Built a dashboard using a Zustand Factory pattern that automatically generates domain-specific filter stores. Used TanStack Table for data grids and implemented RBAC for access control.',
        challenges:
          'Designed a Generic Filter Store Factory so we did not have to write separate filter logic for each domain (members, subscriptions, articles, etc.). Set up hierarchical React Query keys for scope-based cache invalidation.',
        tech: [
          'React',
          'TypeScript',
          'Vite',
          'Zustand',
          'TanStack Query',
          'TanStack Table',
          'Directus',
          'MSW',
          'Vitest',
        ],
        features: [
          'Zustand Factory Pattern',
          'RBAC Permission System',
          'TanStack Table Data Grids',
          'Auto Token Refresh',
          'MSW API Testing',
        ],
        impact: [
          'Generic filter store reusable across domains',
          'Scope-based cache invalidation',
          'API-independent testing with MSW',
        ],
        links: { demo: '#', github: '#' },
      },
      {
        id: 5,
        title: 'AwareLab CMS Editor',
        category: 'Content Management',
        imageUrl: awarelabLogo,
        isFeatured: false,
        gallery: [],
        image: 'bg-gradient-to-br from-emerald-400 to-green-600',
        role: 'Solo Frontend Engineer',
        description:
          'Custom rich text editor for writing investment analysis articles. Built on TipTap with 12 extensions, including SlashCommand for block insertion, Paywall markers, and Stock chart embeds.',
        problem:
          'The platform needed writers to create investment analysis articles with custom content blocks -- paywalled sections, embedded stock charts, and structured financial data -- that a standard WYSIWYG editor cannot handle.',
        solution:
          'Built a TipTap-based editor with 12 custom extensions. SlashCommand lets writers insert blocks by typing "/", Paywall marks where free content ends, and Stock embeds live financial data inline.',
        challenges:
          'Managing complex editor state was tricky -- validation getters check content integrity, and the editor auto-generates API payloads from its internal state. Implemented Dirty Tracking so users get warned about unsaved changes.',
        tech: ['React', 'TypeScript', 'Vite', 'TipTap', 'Zustand', 'Directus'],
        features: [
          '12 Custom TipTap Extensions',
          'SlashCommand Block Selection',
          'Paywall Content Marking',
          'Stock Chart Embedding',
          'Dirty Tracking',
        ],
        impact: [
          '12 custom extensions for domain-specific editing',
          'Auto-generated API payloads from editor state',
          'Reliable change detection with Dirty Tracking',
        ],
        links: { demo: '#', github: '#' },
      },
      {
        id: 6,
        title: 'Gift E-commerce',
        category: 'E-commerce',
        imageUrl: webGiftMain,
        isFeatured: false,
        gallery: [
          { src: webGiftMain, caption: 'Gift e-commerce main page' },
          { src: webGiftOrder, caption: 'Multi-step order flow' },
        ],
        image: 'bg-gradient-to-br from-amber-400 to-orange-600',
        role: 'Solo Frontend Engineer',
        description:
          'Funeral gift ordering site. Chose Vite+React over Next.js since SEO was not needed. The key problem I solved was users losing order data when they switched to their contacts app to look up recipient info.',
        problem:
          'Users were abandoning the web order form mid-way because they had to switch to their phone contacts to look up recipient information. When they came back, their data was gone -- so they would call in a phone order instead, creating CS overhead.',
        solution:
          'Built a 6-step order flow (Product, Shipping, Sender, Recipient, Address, Payment) with Zustand + Immer for state management and LocalStorage persistence. Users can leave and come back without losing anything.',
        challenges:
          'Had to persist deeply nested order state across 6 steps while handling edge cases like back navigation and browser refreshes. Added search parameter auto-fill for returning users coming from marketing links.',
        tech: ['React', 'TypeScript', 'Vite', 'Zustand', 'Immer'],
        features: [
          '6-Step Order Flow',
          'LocalStorage Persistence',
          'Search Parameter Auto-fill',
          'Complex State Management',
        ],
        impact: [
          'Eliminated data loss during multi-step ordering',
          'Reduced phone order CS calls by keeping users on the web flow',
        ],
        links: { demo: '#', github: '#' },
      },
      {
        id: 7,
        title: 'Sihyunhada Admin',
        category: 'Admin Dashboard',
        imageUrl: sihyunhadaCrm,
        isFeatured: false,
        gallery: [
          { src: sihyunhadaCrm, caption: 'Photobooth CRM dashboard' },
          { src: sihyunhadaPhoto, caption: 'Photo capture management' },
        ],
        image: 'bg-gradient-to-br from-pink-400 to-rose-600',
        role: 'Solo Frontend Engineer',
        description:
          'Admin dashboard for a photobooth franchise. 15+ pages with 4-stage cascading filters and data export to Excel, print, and clipboard.',
        problem:
          'A photobooth franchise network needed to manage devices across a hierarchy: Franchise, Group, Branch, Device. Operations staff needed to filter data at each level and export it in multiple formats.',
        solution:
          'Built a 4-stage cascading filter where each level narrows down based on the previous selection. Data export supports Excel (Blob download), print (react-to-print), and clipboard (Clipboard API).',
        challenges:
          'The cascading filter logic was the tricky part -- each dropdown depends on the previous selection, and the whole chain needs to reset correctly. Created a generic DataType<T> pattern to handle form metadata consistently across 15+ pages.',
        tech: [
          'React 18',
          'TypeScript',
          'Vite',
          'Recoil',
          'TanStack Query',
          'react-hook-form',
          'Zod',
        ],
        features: [
          '4-Stage Cascading Filters',
          'Excel/Print/Clipboard Export',
          '15+ Management Pages',
          'Zod Type-safe Forms',
        ],
        impact: [
          'Efficient device management across franchise hierarchy',
          'Multi-format data export for operations',
        ],
        links: { demo: '#', github: '#' },
      },
      {
        id: 8,
        title: 'Panmun Admin/Account',
        category: 'Monorepo Platform',
        imageUrl: null,
        isFeatured: false,
        gallery: [],
        image: 'bg-gradient-to-br from-violet-400 to-purple-600',
        role: 'Solo Frontend Engineer',
        description:
          'Lerna monorepo with admin and account sites sharing a common package. Designed a React Query Service pattern that bundles everything related to a data entity into one object.',
        problem:
          'Two apps (admin and account) needed to share auth logic and UI components but deploy independently. Without a shared package, we were duplicating code and getting inconsistencies.',
        solution:
          'Set up a Lerna monorepo with 3 workspaces: admin-site, account-site, and shared. Created a React Query Service pattern where each entity bundles its queryKey, getCache, queryOptions, and prefetchQuery together.',
        challenges:
          'The React Query Service pattern was the main design challenge -- figuring out the right abstraction so that queryKey, cache access, and prefetching are all co-located per entity, making data fetching consistent across both apps.',
        tech: ['React', 'TypeScript', 'Lerna', 'Recoil', 'TanStack Query'],
        features: [
          'Lerna Monorepo (3 Workspaces)',
          'React Query Service Pattern',
          'Shared Authentication',
          'Independent Deployment',
        ],
        impact: [
          'Code sharing across admin/account apps',
          'Consistent API management with Service pattern',
        ],
        links: { demo: '#', github: '#' },
      },
      {
        id: 9,
        title: 'Kunstkammer',
        category: 'Art Management',
        imageUrl: null,
        isFeatured: false,
        gallery: [],
        image: 'bg-gradient-to-br from-indigo-400 to-blue-600',
        role: 'Frontend Engineer',
        description:
          'Art collection management system. Used openapi-typescript to auto-generate types from the Swagger schema, so API types were always in sync without manual maintenance.',
        problem:
          'Managing art collections required complex data grids, multi-image uploads with featured image selection, and API types that stay in sync with the backend without manual effort.',
        solution:
          'Used openapi-typescript to auto-generate TypeScript types from the OpenAPI schema. AG Grid Enterprise for the data tables. Storybook for documenting the component library.',
        challenges:
          'Built a multi-image upload system (max 10 images) where you can set a featured image and track deletions. The deletion tracking was managed with Recoil atoms so the UI stayed in sync with what needed to be sent to the API.',
        tech: [
          'React',
          'TypeScript',
          'SWR',
          'openapi-typescript',
          'AG Grid',
          'Storybook',
          'react-dropzone',
        ],
        features: [
          'OpenAPI Auto-generated Types',
          'AG Grid Enterprise',
          'Multi-image Upload',
          'Storybook Documentation',
          'Custom Multi-select Dropdown',
        ],
        impact: [
          'Type-safe API calls with zero manual type maintenance',
          'Documented component library with Storybook',
        ],
        links: { demo: '#', github: '#' },
      },
      {
        id: 10,
        title: 'Hearty Fridge',
        category: 'Social Good',
        imageUrl: heartyFridgeMain,
        isFeatured: false,
        gallery: [
          { src: heartyFridgeMain, caption: 'Main page with fridge listings' },
          { src: heartyFridgeDonateForm, caption: 'Food donation form' },
          { src: heartyFridgeReserveForm, caption: 'Food reservation form' },
          {
            src: heartyFridgeLocation,
            caption: 'Location visualization and fridge info',
          },
          { src: heartyFridgeMyPage, caption: 'My page with donation history' },
        ],
        image: 'bg-gradient-to-br from-cyan-400 to-blue-600',
        role: 'Frontend Developer',
        description:
          'A shared fridge service built with GDSC Seoultech for community food donations. This project is where I first learned Optimistic Updates -- a pattern I later used in production at Daqda. Also where I realized I needed TypeScript (this was pure JavaScript).',
        problem:
          'Communities needed a way to share surplus food through public refrigerators, with real-time tracking of what is available in each fridge.',
        solution:
          'Built a web app with Google Maps API for finding fridge locations, food donation/reservation flows, and optimistic update patterns so the UI responds instantly without waiting for the server.',
        challenges:
          'This was my starting point as a frontend developer. I learned Optimistic Updates here for the first time -- giving users instant UI feedback during food reservation and donation actions. This pattern became one of my go-to tools that I later applied in production at Daqda.',
        tech: ['Next.js 13', 'JavaScript', 'Recoil', 'styled-components', 'Google Maps API'],
        features: [
          'Google Maps Integration',
          'Food Donation/Reservation',
          'Optimistic Updates',
          'Location Visualization',
        ],
        impact: [
          'Real-time fridge availability tracking',
          'Optimistic update pattern reused in production',
        ],
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
  seo: {
    title: '김효근 | 프론트엔드 엔지니어',
    description:
      '2년 이상 실무 경험의 프론트엔드 엔지니어 김효근입니다. 웹 성능 최적화와 FSD 아키텍처, 사용자 경험 개선에 집중합니다.',
    keywords:
      '프론트엔드 엔지니어, 웹 성능 최적화, FSD 아키텍처, React, Next.js, SvelteKit, 포트폴리오',
    ogTitle: '김효근 | 프론트엔드 엔지니어',
    ogDescription:
      '성능과 아키텍처에 진심인 프론트엔드 엔지니어입니다. 포트폴리오와 프로젝트를 확인해보세요.',
  },
  skills: {
    title: '기술 스택',
    description: '실무에서 매일 사용하는 기술들입니다.',
    categories: {
      frontend: '프론트엔드 코어',
      styling: '스타일링 & UI',
      state: '상태 관리 & 데이터',
      formsAndTables: '폼 & 테이블',
      infra: '인프라 & 도구',
      integration: '외부 연동',
    },
  },
  hero: {
    available: '새로운 기회를 찾고 있습니다',
    greeting: '안녕하세요, 저는',
    name: '김효근입니다',
    role: ['프론트엔드 엔지니어', '소프트웨어 엔지니어'],
    description:
      '빠르고 구조가 탄탄한 웹 애플리케이션을 만듭니다. 최근에는 혼자서 **Lighthouse 52점짜리 사이트를 87점까지** 끌어올렸고, 라이브러리가 한계를 보이면 직접 만드는 편입니다 -- 순수 DOM 조작으로 **커스텀 SVG 무한 캔버스**를 구현한 적도 있습니다.',
    viewProjects: '프로젝트 보기',
    downloadResume: '이력서 다운로드',
    yearsExp: '년차',
    perfBoost: '성능 개선',
    architecture: '아키텍처',
    evaluatorIntro:
      '솔로 프론트엔드로 프로덕션 서비스를 직접 구축해온 엔지니어. Core Web Vitals에 집착하고, FSD 아키텍처로 확장 가능한 구조를 설계합니다.',
  },
  about: {
    title: '소개',
    p1: '2년 이상 경력의 **프론트엔드 엔지니어**입니다. 대부분 소규모 팀에서 유일한 프론트엔드 개발자로 일해왔고, 성능 최적화부터 아키텍처 설계, 결제 연동, CMS 구축까지 프론트엔드 전반을 맡아왔습니다.',
    p2: 'AwareLab에서는 **Lighthouse 52점**, LCP 9초짜리 사이트를 넘겨받았습니다. @next/bundle-analyzer로 번들을 46% 줄이고, 폰트를 800KB에서 250KB로 서브셋팅하고, 금융 차트의 Race Condition을 잡아서 87점까지 올렸습니다. 그 전에는 서울과학기술대학교에서 **컴퓨터 그래픽스 연구실** 학부 연구생으로 CIA 2023에 1저자 논문을 게재했고, **ACM-ICPC** 서울 리저널에 진출했습니다. 문제를 체계적으로 분석하는 습관은 거기서 시작됐습니다.',
    p3: '요즘은 대규모 코드베이스를 정리하기 위한 **FSD 아키텍처**, **Stripe**와 **Directus**의 타입 안전한 통합, **TipTap** 기반 커스텀 에디터 개발에 관심이 많습니다. 프론트엔드를 처음부터 끝까지 주도하면서 사용자 경험에 실질적인 영향을 줄 수 있는 환경을 좋아합니다.',
    cards: {
      perf: {
        title: '성능에 진심',
        desc: 'Lighthouse 52에서 87까지. 번들 분석, 코드 스플리팅, 폰트 서브셋팅, CLS 제거 -- 사이트를 빠르게 만들기 위해 필요한 건 다 합니다.',
      },
      scale: {
        title: '확장 가능한 아키텍처',
        desc: 'Feature-Sliced Design(FSD)을 활용해서 코드베이스가 커져도 구조가 무너지지 않게 관리합니다.',
      },
      system: {
        title: '시스템 통합',
        desc: 'Stripe 결제, Directus CMS, 3개국어 i18n -- 복잡한 외부 시스템을 타입 안전하게 연동해서 안정성을 확보합니다.',
      },
    },
  },
  contact: {
    title: '연락하기',
    description:
      '정규직이나 흥미로운 프로젝트에 열려 있습니다. 프론트엔드를 독립적으로 맡길 수 있는 엔지니어를 찾고 계시다면, 편하게 연락 주세요.',
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
    description: '어디서 무엇을 만들어왔는지.',
    jobs: [
      {
        company: 'AwareLab',
        role: '프론트엔드 엔지니어',
        period: '2025.04 - 현재',
        description:
          '투자 포트폴리오 분석 멤버십 플랫폼의 프론트엔드를 혼자 담당하고 있습니다. 팀이 6명에서 4명으로 줄면서 FE 동료가 퇴사한 후, 플랫폼 FE 전체를 맡게 됐습니다.',
        achievements: [
          'Core Web Vitals 개선: LCP 9초 → 3.8초(60% 단축), CLS 0.126 → 0, Lighthouse 52 → 87.',
          '@next/bundle-analyzer로 가장 큰 원인을 찾아내고, 코드 스플리팅과 동적 임포트로 번들 46% 감소(253KB → 136KB).',
          '코드베이스가 커져도 관리 가능하도록 Feature-Sliced Design(FSD) 아키텍처 도입.',
          '도메인별 재사용 가능한 Zustand Factory 패턴, RBAC, TanStack Table 기반 Admin 대시보드 구축.',
          'SlashCommand, Paywall, Stock 차트 임베드 등 12개 커스텀 확장이 포함된 TipTap CMS 에디터 개발.',
          '금융 차트 렌더링 Race Condition 해결 -- 클로저가 stale 데이터를 캡처하는 문제를 closure 스코핑 + Map 기반 캐싱 + gsap.context().revert()로 수정.',
          'Stripe(멤버십, 기간 선택, 쿠폰, 결제) 및 Directus CMS 연동. FE/BE 간 Directus 모델 기반 타입 공유.',
          'next-intl 기반 3개국어(EN/KO/JA) 지원 및 hreflang SEO 구현.',
        ],
      },
      {
        company: 'Daqda',
        role: '프론트엔드 엔지니어',
        period: '2024.06 - 2025.03',
        description:
          '3인 개발팀(CTO, 백엔드, 저)에서 프론트엔드를 혼자 담당했습니다. 30인 규모 장례 관련 서비스 회사에서 제품을 만들고 레거시를 마이그레이션했습니다.',
        achievements: [
          'The Prestige를 레거시 ASP.NET에서 Next.js로 전체 마이그레이션(8페이지, 6주). 기존 사이트는 필터 변경마다 풀 페이지 리프레시 -- SPA로 재구축해서 실시간 필터링 구현. 연세 세브란스 데모 전에 완성. 알파 테스터들의 반응: "훨씬 좋아졌다".',
          '기존 수동 배포(Windows Server에 빌드 파일 전달, 서버 접근 권한도 없었음)를 Vercel CI/CD로 전환. 배포 시간 10분 → 2분.',
          '백엔드 개발자와 함께 깔끔한 API 응답 구조 설계.',
          'Gift E-commerce를 Vite+React로 개발(SEO 불필요해서 Next.js 대신 선택). LocalStorage로 주문 데이터를 유지해서, 사용자가 수신인 정보를 확인하려고 연락처 앱에 갔다 와도 데이터가 날아가지 않도록 처리 -- 전화 주문 CS가 줄었습니다.',
        ],
      },
      {
        company: 'SW Maestro',
        role: '프론트엔드 엔지니어',
        period: '2023.04 - 2023.11',
        description: 'SW Maestro 14기 연수생으로 선발.',
        achievements: [
          "노코드 클라우드 배포 플랫폼 'Kumo Factory' 개발. 캔버스 위에서 인프라를 시각적으로 설계하는 서비스.",
          'react-zoom-pan-pinch로 시작했지만 대규모 아키텍처에서 캔버스 크기 제한에 부딪혔습니다. 결국 순수 SVG DOM 조작 + 3x3 아핀 변환 행렬로 커스텀 무한 캔버스를 직접 구현. 가장 어려웠던 건 줌 레벨마다 달라지는 픽셀 좌표 계산.',
          '데이터 정규화와 Zustand 선택적 구독으로 60fps 렌더링, 메모리 30% 절감.',
          '3계층 상태 아키텍처(도메인/UI/서버)로 불필요한 API 호출 50%+ 절감.',
          'Server-Sent Events(SSE) 기반 실시간 배포 로그 구현(지연 100ms 미만).',
        ],
      },
      {
        company: 'GDSC Seoultech',
        role: '프론트엔드 개발자',
        period: '2022.09 - 2023.04',
        description: 'Google Developer Student Clubs(서울과학기술대학교) 핵심 멤버.',
        achievements: [
          'Next.js 13과 Recoil로 공유 냉장고(나눔 냉장고) 서비스 개발.',
          'Google Maps API로 냉장고 위치 시각화 구현.',
          'Optimistic Updates 패턴을 처음 배우고 적용한 프로젝트 -- 이후 Daqda 실무에서 재사용.',
        ],
      },
    ],
  },
  projects: {
    title: '주요 프로젝트',
    description: '직접 만든 것들.',
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
        role: '프론트엔드 단독 개발',
        description:
          '투자 포트폴리오 분석 플랫폼. 금융 차트, Stripe 멤버십 결제, 3개국어 지원을 갖추고 있고, 유일한 FE 엔지니어로 프론트엔드 전체를 담당합니다.',
        problem:
          '런칭 초기 심각한 성능 문제가 있었습니다. Lighthouse 52점, LCP 9초 이상. 사용자가 투자 데이터를 보기까지 너무 오래 기다려야 했고, 초기 번들이 비대했습니다.',
        solution:
          'FSD로 프론트엔드 아키텍처를 재설계하고, 번들 분석과 코드 스플리팅으로 Core Web Vitals를 최적화했습니다. Stripe 구독 결제와 Directus 헤드리스 CMS를 연동하면서 FE/BE 간 TypeScript 타입을 공유했습니다.',
        challenges:
          '금융 차트에서 클로저가 stale 데이터를 캡처하는 Race Condition이 발생. closure 스코핑 + Map 기반 캐싱 + gsap.context().revert()로 해결. @next/bundle-analyzer로 가장 큰 원인을 찾아 번들 46%(253KB → 136KB) 감소. 폰트 서브셋팅(800KB → 250KB)으로 CLS 제거.',
        tech: [
          'Next.js 16',
          'React 19',
          'TypeScript',
          'Tailwind CSS',
          'Stripe',
          'Directus',
          'GSAP',
          'next-intl',
        ],
        features: [
          '실시간 금융 차트',
          'Stripe 구독 결제',
          '포트폴리오 분석',
          'FSD 아키텍처',
          '3개국어 지원 (EN/KO/JA)',
          'Core Web Vitals 최적화',
        ],
        impact: [
          'Lighthouse 52 → 87 (+67%)',
          'LCP 9초 → 3.8초 (60% 단축)',
          '번들 크기 253KB → 136KB (46% 감소)',
          'CLS 0.126 → 0 (완전 제거)',
        ],
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
        role: '프론트엔드 단독 개발',
        description:
          '장례식장 위치 조회 및 비교 서비스. 연세 세브란스 병원 데모를 앞두고 레거시 ASP.NET에서 Next.js로 6주 만에 전체 마이그레이션.',
        problem:
          '기존 ASP.NET 사이트는 MPA로, 필터를 바꿀 때마다 페이지 전체가 리프레시됐습니다. 필터 단계마다 새 페이지로 이동해야 했고, 배포는 Windows Server에 수동으로 10분 이상 걸렸습니다. 서버 접근 권한조차 없어서 빌드 파일을 전달해야 했습니다.',
        solution:
          '8개 페이지를 Next.js SPA로 재구축. Kakao Map 연동과 클라이언트 사이드 실시간 필터링을 구현. Vercel CI/CD로 배포 자동화(10분 수동 → 2분 자동). 지도와 필터 UI의 CSR 전환이 UX 반응성을 확실히 개선했습니다.',
        challenges:
          '연세 세브란스 데모에 맞춰 6주 내 마이그레이션 완료. 레거시 시스템의 기능을 모두 유지하면서 필터링 UX를 재설계. 백엔드 개발자와 API 응답 구조를 함께 설계.',
        tech: ['Next.js', 'React', 'TypeScript', 'Recoil', 'Kakao Map API', 'Vercel'],
        features: [
          '지도 기반 위치 시각화',
          '클라이언트 사이드 SPA 필터링',
          'Image CDN + Lazy Loading',
          'Vercel CI/CD 파이프라인',
        ],
        impact: [
          '레거시 ASP.NET → Next.js (8페이지, 6주)',
          '배포 시간 10분 → 2분 (80% 단축)',
          '알파 테스터들의 반응: 필터링 경험이 훨씬 좋아짐',
        ],
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
          { src: kumoAbstract, caption: 'SVG 캔버스 클라우드 아키텍처' },
          {
            src: kumoApplicationDeploy,
            caption: '애플리케이션 배포 설정',
          },
          { src: kumoOptionChange, caption: '실시간 옵션 변경' },
          {
            src: kumoEnvironmentBranch,
            caption: '환경 및 브랜치 관리',
          },
        ],
        image: 'bg-gradient-to-br from-teal-400 to-cyan-600',
        role: '프론트엔드 단독 개발',
        description:
          '무한 캔버스 위에서 클라우드 인프라를 시각적으로 설계하는 노코드 배포 플랫폼. SW Maestro 14기에서 개발.',
        problem:
          '클라우드 배포는 DevOps 전문가가 아닌 사람에게는 진입 장벽이 높습니다. 캔버스에 컴포넌트를 드래그 앤 드롭으로 배치하고, 원클릭으로 배포할 수 있게 만들고 싶었습니다.',
        solution:
          'react-zoom-pan-pinch로 시작했지만 대규모 아키텍처에서 캔버스 크기 제한에 부딪혔습니다. 순수 SVG DOM 조작과 3x3 아핀 변환 행렬로 커스텀 무한 캔버스를 직접 구현했습니다.',
        challenges:
          '가장 어려웠던 건 줌 레벨마다 달라지는 픽셀 좌표 계산 -- 화면 좌표를 변환 행렬을 통해 캔버스 좌표로 정확히 변환하는 것. 데이터 정규화와 Zustand 선택적 구독으로 60fps를 달성하면서 메모리를 30% 줄였습니다.',
        tech: ['Next.js 13', 'React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'SSE', 'SVG'],
        features: [
          '커스텀 SVG 무한 캔버스',
          '드래그 앤 드롭 클라우드 아키텍처',
          '실시간 배포 로그 (SSE)',
          '3계층 상태 아키텍처',
        ],
        impact: [
          '60fps 렌더링 성능',
          '데이터 정규화로 30% 메모리 감소',
          '불필요한 API 호출 50%+ 절감',
          'SSE 지연 <100ms',
        ],
        links: { demo: '#', github: '#' },
      },
      {
        id: 4,
        title: 'AwareLab Admin Dashboard',
        category: '내부 도구',
        imageUrl: awarelabLogo,
        isFeatured: false,
        gallery: [
          { src: awarelabAdminHome, caption: '관리자 대시보드 홈' },
          { src: awarelabAdminMemberDetail, caption: '회원 상세 관리' },
        ],
        image: 'bg-gradient-to-br from-green-500 to-emerald-700',
        role: '프론트엔드 단독 개발',
        description:
          '회원, 구독, 콘텐츠 관리를 위한 내부 관리자 대시보드. Zustand Factory 패턴으로 필터 로직을 모든 데이터 뷰에서 재사용할 수 있게 설계했습니다.',
        problem:
          '멤버십 플랫폼에 사용자, 구독, 아티클 관리 기능이 필요했고, 팀 역할별로 다른 권한 레벨이 요구됐습니다.',
        solution:
          '도메인별 필터 스토어를 자동 생성하는 Zustand Factory 패턴으로 대시보드를 구축. TanStack Table로 데이터 그리드, RBAC로 접근 제어를 구현했습니다.',
        challenges:
          'Generic Filter Store Factory를 설계해서 도메인마다(회원, 구독, 아티클 등) 별도의 필터 로직을 작성하지 않아도 되게 만들었습니다. 범위 기반 캐시 무효화를 위한 계층적 React Query 키 시스템도 구축.',
        tech: [
          'React',
          'TypeScript',
          'Vite',
          'Zustand',
          'TanStack Query',
          'TanStack Table',
          'Directus',
          'MSW',
          'Vitest',
        ],
        features: [
          'Zustand Factory 패턴',
          'RBAC 권한 시스템',
          'TanStack Table 데이터 그리드',
          '자동 토큰 갱신',
          'MSW API 테스트',
        ],
        impact: [
          '도메인 간 재사용 가능한 범용 필터 스토어',
          '범위 기반 캐시 무효화',
          'MSW를 활용한 API 독립적 테스트',
        ],
        links: { demo: '#', github: '#' },
      },
      {
        id: 5,
        title: 'AwareLab CMS Editor',
        category: '콘텐츠 관리',
        imageUrl: awarelabLogo,
        isFeatured: false,
        gallery: [],
        image: 'bg-gradient-to-br from-emerald-400 to-green-600',
        role: '프론트엔드 단독 개발',
        description:
          '투자 분석 글 작성을 위한 커스텀 리치 텍스트 에디터. TipTap 기반으로 SlashCommand, Paywall, Stock 차트 임베드 등 12개 확장 기능을 갖추고 있습니다.',
        problem:
          '투자 분석 아티클에 페이월 구간, 주식 차트 임베드, 구조화된 금융 데이터 같은 커스텀 콘텐츠 블록이 필요한데, 일반적인 WYSIWYG 에디터로는 처리가 안 됐습니다.',
        solution:
          'TipTap 기반 에디터에 12개 커스텀 확장을 구축. "/" 입력으로 블록을 삽입하는 SlashCommand, 무료 콘텐츠 경계를 표시하는 Paywall, 실시간 금융 데이터를 인라인으로 보여주는 Stock 등.',
        challenges:
          '에디터 상태 관리가 까다로웠습니다 -- 검증 getter로 콘텐츠 무결성을 체크하고, 에디터 내부 상태에서 API 페이로드를 자동 생성하는 구조. 미저장 변경 감지를 위한 Dirty Tracking도 구현.',
        tech: ['React', 'TypeScript', 'Vite', 'TipTap', 'Zustand', 'Directus'],
        features: [
          '12개 커스텀 TipTap 확장',
          'SlashCommand 블록 선택',
          'Paywall 콘텐츠 표시',
          'Stock 차트 임베딩',
          'Dirty Tracking',
        ],
        impact: [
          '도메인 특화 편집을 위한 12개 커스텀 확장',
          '에디터 상태에서 자동 생성되는 API 페이로드',
          'Dirty Tracking으로 안정적인 변경 감지',
        ],
        links: { demo: '#', github: '#' },
      },
      {
        id: 6,
        title: 'Gift E-commerce',
        category: '이커머스',
        imageUrl: webGiftMain,
        isFeatured: false,
        gallery: [
          { src: webGiftMain, caption: '답례품 이커머스 메인 페이지' },
          { src: webGiftOrder, caption: '다단계 주문 플로우' },
        ],
        image: 'bg-gradient-to-br from-amber-400 to-orange-600',
        role: '프론트엔드 단독 개발',
        description:
          '장례 답례품 주문 사이트. SEO가 필요 없어서 Next.js 대신 Vite+React를 선택. 핵심 문제는 사용자가 수신인 정보를 확인하려고 연락처 앱에 갔다 오면 주문 데이터가 날아가는 것이었습니다.',
        problem:
          '사용자가 웹에서 주문을 하다가 수신인 정보를 확인하려고 연락처 앱으로 전환하면 돌아왔을 때 입력 데이터가 사라졌습니다. 결국 전화 주문으로 돌아가면서 CS 부담이 생겼습니다.',
        solution:
          'Zustand + Immer 상태 관리와 LocalStorage 영속성을 갖춘 6단계 주문 플로우(상품, 배송, 보내는 분, 받는 분, 주소, 결제). 사이트를 떠났다 돌아와도 데이터가 유지됩니다.',
        challenges:
          '6단계에 걸친 깊게 중첩된 주문 상태를 유지하면서, 뒤로가기나 브라우저 새로고침 같은 엣지 케이스를 처리. 마케팅 링크에서 유입되는 재방문 사용자를 위한 검색 파라미터 자동 채우기도 추가.',
        tech: ['React', 'TypeScript', 'Vite', 'Zustand', 'Immer'],
        features: [
          '6단계 주문 플로우',
          'LocalStorage 영속성',
          '검색 파라미터 자동 채우기',
          '복잡한 상태 관리',
        ],
        impact: [
          '다단계 주문 중 데이터 손실 제거',
          '웹 주문 유지로 전화 주문 CS 감소',
        ],
        links: { demo: '#', github: '#' },
      },
      {
        id: 7,
        title: 'Sihyunhada Admin',
        category: '관리자 대시보드',
        imageUrl: sihyunhadaCrm,
        isFeatured: false,
        gallery: [
          { src: sihyunhadaCrm, caption: '포토부스 CRM 대시보드' },
          { src: sihyunhadaPhoto, caption: '사진 촬영 관리' },
        ],
        image: 'bg-gradient-to-br from-pink-400 to-rose-600',
        role: '프론트엔드 단독 개발',
        description:
          '포토부스 프랜차이즈 관리 대시보드. 15개 이상의 페이지에 4단계 캐스케이딩 필터와 Excel, 인쇄, 클립보드 데이터 내보내기 기능.',
        problem:
          '프랜차이즈 네트워크 전반의 포토부스 디바이스를 관리하려면 프랜차이즈-그룹-지점-디바이스 계층 구조에 맞는 필터링과 다양한 형식의 데이터 내보내기가 필요했습니다.',
        solution:
          '이전 선택에 따라 다음 레벨이 좁혀지는 4단계 캐스케이딩 필터 구축. 데이터 내보내기는 Excel(Blob 다운로드), 인쇄(react-to-print), 클립보드(Clipboard API) 지원.',
        challenges:
          '캐스케이딩 필터 로직이 까다로웠습니다 -- 각 드롭다운이 이전 선택에 의존하고, 체인 전체가 올바르게 리셋돼야 합니다. 15개 이상의 페이지에서 폼 메타데이터를 일관되게 다루기 위한 Generic DataType<T> 패턴도 설계.',
        tech: [
          'React 18',
          'TypeScript',
          'Vite',
          'Recoil',
          'TanStack Query',
          'react-hook-form',
          'Zod',
        ],
        features: [
          '4단계 캐스케이딩 필터',
          'Excel/인쇄/클립보드 내보내기',
          '15개+ 관리 페이지',
          'Zod 타입 안전 폼',
        ],
        impact: [
          '프랜차이즈 계층 전반의 효율적 디바이스 관리',
          '운영을 위한 다중 형식 데이터 내보내기',
        ],
        links: { demo: '#', github: '#' },
      },
      {
        id: 8,
        title: 'Panmun Admin/Account',
        category: '모노레포 플랫폼',
        imageUrl: null,
        isFeatured: false,
        gallery: [],
        image: 'bg-gradient-to-br from-violet-400 to-purple-600',
        role: '프론트엔드 단독 개발',
        description:
          'Lerna 모노레포 기반 관리자/계정 사이트. 데이터 엔티티 관련 로직을 하나의 객체로 묶는 React Query Service 패턴을 설계했습니다.',
        problem:
          '두 앱(관리자, 계정)이 인증 로직과 UI 컴포넌트를 공유하면서도 독립 배포가 필요했습니다. 공유 패키지 없이는 코드 중복과 불일치가 생겼습니다.',
        solution:
          '3개 워크스페이스(admin-site, account-site, shared)의 Lerna 모노레포를 구축. 각 엔티티의 queryKey, getCache, queryOptions, prefetchQuery를 하나로 묶는 React Query Service 패턴을 만들었습니다.',
        challenges:
          'React Query Service 패턴 설계가 핵심 과제 -- queryKey, 캐시 접근, 프리페칭을 엔티티별로 같은 위치에 두는 적절한 추상화를 찾아서, 두 앱에서 데이터 페칭이 일관되게 동작하도록 했습니다.',
        tech: ['React', 'TypeScript', 'Lerna', 'Recoil', 'TanStack Query'],
        features: [
          'Lerna 모노레포 (3 워크스페이스)',
          'React Query Service 패턴',
          '공유 인증',
          '독립 배포',
        ],
        impact: [
          '관리자/계정 앱 간 코드 공유',
          'Service 패턴으로 일관된 API 관리',
        ],
        links: { demo: '#', github: '#' },
      },
      {
        id: 9,
        title: 'Kunstkammer',
        category: '미술품 관리',
        imageUrl: null,
        isFeatured: false,
        gallery: [],
        image: 'bg-gradient-to-br from-indigo-400 to-blue-600',
        role: '프론트엔드 개발자',
        description:
          '미술품 컬렉션 관리 시스템. openapi-typescript로 Swagger 스키마에서 타입을 자동 생성해서, 수동 타입 관리 없이 API 타입이 항상 동기화됩니다.',
        problem:
          '미술품 관리에 복잡한 데이터 그리드, 다중 이미지 업로드(대표 이미지 선택 포함), 백엔드와 수동 작업 없이 동기화되는 API 타입이 필요했습니다.',
        solution:
          'openapi-typescript로 OpenAPI 스키마에서 TypeScript 타입을 자동 생성. AG Grid Enterprise로 데이터 테이블, Storybook으로 컴포넌트 라이브러리 문서화.',
        challenges:
          '다중 이미지 업로드 시스템(최대 10개)에서 대표 이미지 설정과 삭제 추적을 구현. 삭제 추적은 Recoil atom으로 관리해서 UI와 API에 보낼 데이터가 항상 동기화되도록 했습니다.',
        tech: [
          'React',
          'TypeScript',
          'SWR',
          'openapi-typescript',
          'AG Grid',
          'Storybook',
          'react-dropzone',
        ],
        features: [
          'OpenAPI 자동 생성 타입',
          'AG Grid Enterprise',
          '다중 이미지 업로드',
          'Storybook 문서화',
          '커스텀 다중 선택 드롭다운',
        ],
        impact: [
          '수동 타입 유지보수 없는 타입 안전 API 호출',
          'Storybook을 통한 문서화된 컴포넌트 라이브러리',
        ],
        links: { demo: '#', github: '#' },
      },
      {
        id: 10,
        title: 'Hearty Fridge',
        category: '사회 공헌',
        imageUrl: heartyFridgeMain,
        isFeatured: false,
        gallery: [
          { src: heartyFridgeMain, caption: '냉장고 목록 메인 페이지' },
          { src: heartyFridgeDonateForm, caption: '음식 기부 양식' },
          { src: heartyFridgeReserveForm, caption: '음식 예약 양식' },
          {
            src: heartyFridgeLocation,
            caption: '위치 시각화 및 냉장고 정보',
          },
          { src: heartyFridgeMyPage, caption: '기부 내역 마이페이지' },
        ],
        image: 'bg-gradient-to-br from-cyan-400 to-blue-600',
        role: '프론트엔드 개발자',
        description:
          'GDSC Seoultech에서 만든 지역사회 음식 나눔 서비스. Optimistic Updates를 처음 배운 프로젝트이고, 이후 Daqda 실무에서 재사용했습니다. 순수 JavaScript로 만들었는데, 이 프로젝트 이후 TypeScript로 전환했습니다.',
        problem:
          '지역 사회에서 공용 냉장고를 통해 잉여 식품을 나누고, 각 냉장고에 뭐가 있는지 실시간으로 확인할 수 있어야 했습니다.',
        solution:
          'Google Maps API로 냉장고 위치를 찾고, 음식 기부/예약 플로우를 만들고, Optimistic Updates 패턴으로 서버 응답을 기다리지 않고 UI가 즉시 반응하도록 구현했습니다.',
        challenges:
          '프론트엔드 개발의 시작점이었던 프로젝트입니다. 여기서 Optimistic Updates를 처음 배웠습니다 -- 음식 예약/기부 시 즉각적인 UI 피드백을 주는 패턴. 이후 Daqda 실무에서 즐겨 쓰는 패턴이 됐습니다.',
        tech: ['Next.js 13', 'JavaScript', 'Recoil', 'styled-components', 'Google Maps API'],
        features: [
          'Google Maps 연동',
          '음식 기부/예약',
          'Optimistic Updates',
          '위치 시각화',
        ],
        impact: [
          '실시간 냉장고 가용성 추적',
          'Optimistic Updates 패턴 프로덕션 재사용',
        ],
        links: { demo: '#', github: '#' },
      },
    ],
  },
};
