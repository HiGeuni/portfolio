# Design Principles

This document outlines the core design principles and architectural decisions that guide the development of this portfolio website.

## 1. Visual Aesthetics & Theme
- **Color Palette**: A consistent **Green/Emerald** theme is used throughout the site to convey growth, stability, and energy.
  - Primary: `green-600`, `emerald-600`
  - Accents: `teal-500`, `cyan-600` (used in gradients)
  - Backgrounds: `gray-50` for sections, `white` for cards to create depth.
- **Typography**: **Inter** is used as the primary font for its clean, modern, and highly readable characteristics.
- **Glassmorphism**: Subtle use of semi-transparent backgrounds with blur effects (`backdrop-blur-md`) in the navigation and overlays adds a modern, premium feel.

## 2. User Experience (UX) & Interactivity
- **Motion & Feedback**: The site feels "alive" through the strategic use of animations.
  - **Scroll Reveals**: Sections and elements fade in and slide up as the user scrolls (`svelte-inview`, `svelte-motion`).
  - **Micro-interactions**: Hover effects on cards, buttons, and links provide immediate visual feedback.
  - **Typewriter Effect**: The hero section features a dynamic text effect to grab attention.
- **Command Palette**: A keyboard-accessible command palette (`Cmd+K`) provides power users with quick navigation and actions, enhancing usability.
- **Project Case Studies**: Projects are not just links but detailed case studies presented in an immersive modal, allowing users to explore the "Problem," "Solution," and "Impact" without leaving the context.

## 3. Technical Architecture
- **Framework**: Built with **SvelteKit** for a highly performant, SEO-friendly, and hydration-efficient application.
- **Styling**: **Tailwind CSS** is used for utility-first styling, enabling rapid development and consistent design tokens.
- **Reactivity**: Leverages **Svelte 5 Runes** (`$state`, `$effect`) for fine-grained reactivity and state management.
- **Component-Based**: The UI is decomposed into reusable, self-contained components (e.g., `Reveal.svelte`, `Projects.svelte`) to ensure maintainability and consistency.

## 4. Accessibility (a11y)
- **Semantic HTML**: Proper use of `<nav>`, `<section>`, `<h1>`-`<h3>`, and `<button>` elements.
- **Keyboard Navigation**: All interactive elements, including the custom Command Palette and Project Modals, are accessible via keyboard.
- **ARIA Attributes**: Roles and attributes (e.g., `role="dialog"`, `aria-modal="true"`) are used to ensure compatibility with assistive technologies.

## 5. Content Strategy
- **Resume-Driven**: The content structure directly reflects the professional narrative, highlighting specific skills, detailed experience, and tangible achievements.
- **Impact-Focused**: Project descriptions focus on the "Why" and "How" (Problem/Solution/Impact) rather than just listing features.
