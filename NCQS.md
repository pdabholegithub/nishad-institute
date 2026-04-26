# Nishad Code Quality Standard (NCQS)

This document defines the engineering standards for the Nishad IT Solutions platform. All developers (Human or AI) must adhere to these principles before merging code.

## 1. Core Principles
*   **SOLID:** Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.
*   **DRY:** Don't Repeat Yourself. Logic must be centralized in `/src/lib` or shared components.
*   **KISS:** Keep It Simple, Stupid. Avoid over-engineering.

## 2. Technical Standards
*   **Zero `any` Policy:** Explicit `any` is strictly prohibited. Use interfaces or `unknown`.
*   **Performance:** All public pages must use ISR (Incremental Static Regeneration) or `unstable_cache`.
*   **Aesthetics:** Every UI change must follow the "Premium Design" guidelines (Gradients, Glassmorphism, Micro-animations).
*   **Database:** Any schema change must be followed by `npx prisma generate`.

## 3. Automated Validation (The Gatekeeper)
*   **Linting:** `npm run lint` must pass.
*   **Build:** `npm run build` must succeed.
*   **PR Rule:** No PR shall be merged if the CI (GitHub Actions) status is red.

---
*Created with ❤️ by Antigravity for Nishad IT Solutions.*
