# Project Operational Rules & Conventions

## Code Quality & Architecture Rules
1. All web forms must strictly use `react-hook-form` paired with `@hookform/resolvers/zod` for schema validation. Uncontrolled inputs or native `useState` form validation are strictly prohibited.
2. Every interactive form element must include explicit ARIA attributes (`aria-invalid`, `aria-describedby`, and `role="alert"`) to maintain accessibility standards.
3. Component submit handlers must implement explicit loading states, disabled button properties during network requests, and graceful error boundary fallbacks with user-visible feedback notifications.

## Tech Stack Guidelines
- Frontend: React with Vite, Tailwind CSS v4
- Validation: Zod schemas
- State & Forms: React Hook Form
- Testing: Vitest with @testing-library/react