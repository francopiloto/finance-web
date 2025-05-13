# Finance-Web 💸

**Finance-Web** is the frontend of a modern personal finance platform. Built with **React 19 + TypeScript + Vite**, it delivers a robust authentication system and a clean, scalable architecture designed to meet the standards of top tech companies.

This project is part of a full-stack portfolio app, integrating with [Finance-API](https://github.com/francopiloto/finance-api), and follows industry best practices for maintainability, scalability, and developer experience.

---

## 🚀 Tech Stack

- **React 19**
- **Vite** for fast builds and DX
- **TypeScript** for type safety
- **Tailwind CSS** + **shadcn/ui** for modern UI design
- **TanStack Query** for powerful data fetching & caching
- **Zod** + **React Hook Form** for schema-based form validation
- **i18next** for internationalization
- **Axios** with interceptor layer for token-based auth
- **Husky** + **lint-staged** + **commitlint** for consistent commits
- **ESLint** + **Prettier** for code quality and formatting

---

## 🔐 Authentication System

The authentication system was built with enterprise-level security and usability in mind:

### Features

- Secure **JWT-based auth** with **access** and **refresh** tokens
- **Token rotation** and **automatic refresh** via interceptors
- Persistent login with `localStorage`
- Reusable `AuthContext` for managing auth state
- Public-only and protected routes via `PublicOnlyLayout` and `ProtectedLayout`
- Custom `SubmitButton`, `TextField`, and `Form` components for consistent and accessible forms
- Modular feature-based folder structure for maintainability
- Seamless error handling and loading feedback using `Sonner` and `Loader` components

### Folder Structure

```
src/
├── components/
│   ├── fields/             // Custom input fields to use with Form context
│   ├── form/               // Form primitives (Form, SubmitButton)
│   ├── layout/             // Route guards and screen wrappers
│   └── ui/                 // Design system based on shadcn/ui
├── features/
│   └── auth/               // Auth API, pages, contexts, types
├── lib/                    // Axios instance, utility helpers
├── routes/                 // App routing structure
└── i18n/                   // Language config and translation keys
```

---

## 🌍 Internationalization (i18n)

- Full i18n support using **i18next**
- Language detection and persistence
- Organized locale files under `public/locales`
- Easy-to-extend translation key system (`keys.ts`)

---

## 🧪 Coming Soon

- Form and auth integration tests
- Personal finance dashboard: expenses, wallets, assets
- User settings and profile management
- Mobile responsiveness and dark mode support

---

## 📦 Getting Started

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Environment variable required:
# VITE_API_BASE_URL=
```

---

## 👨‍💻 About the Author

Hi, I’m Francisco Anselmo, a passionate full-stack developer building modern, user-centric apps with solid engineering practices. This project is part of my portfolio to showcase real-world development approaches.

If you’re a recruiter or hiring manager — let’s talk! 😉

📧 fjmanselmo@gmail.com
🔗 [LinkedIn Profile](https://www.linkedin.com/in/franco-marques/)

---

## 📌 Related Projects

- [Finance-API (NestJS backend)](https://github.com/francopiloto/finance-api)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
