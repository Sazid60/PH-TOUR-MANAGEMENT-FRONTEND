# PH-TOUR-MANAGEMENT-FRONTEND-1

GitHub Link: https://github.com/Apollo-Level2-Web-Dev/ph-tour-management-system-frontend

## 35-1 Project Overview and Objectives

### Tech Stack

- React
- React Router
- Redux -> Rtk Query
- Typescript
- Shadcn
- origin ui

## 35-2 Exploring Project Structures: Monorepo vs Polyrepo, Monolith vs Microservices

### Project Organization

- **Mono Repo** : Frontend + Backend same Repository. Here Mostly Docker is used to maintain single deploy.
- **Poly Repo** : Backend Frontend Different Repository. Poly repo is easy to maintain we have take care of cors issue as deployed separately.

#### In Our Project We will use Poly Repo.

### Architecture

- **Micro Service** : Each and Every service will be separated in a project and sending them to frontend by connection. Multiple codebase, Multiple database Multiple deployment then communication system need with each of then and then centralize them in one and send it to frontend.
- **Monolith** : Single codebase, single database single deployment(FRONTEND + BACKEND If we connect using CI/CD Pipeline And Docker)

#### What is CI/CD Pipeline

- We will push the code in git then the pipeline will push the code in repo after checking the code and will automatically trigger the deployment.

## 35-3 Selecting the Right Tech Stack for the Project

- We have Done Backend Using Modular Pattern

### What we will do in frontend?

- There is no specific pattern for frontend. We will change time by time. We will just maintain a structure

### There are some Major works in frontend

- How do we handle Auth (social, google, custom, email pass) in backend we have used passport.js. WE can explore `betterauth` for another system of frontend. Auth can be `Session Base` or `Token Based`. In our bakend we have use token based.
- How Do we handle the State (depends on ecosystem)
  1. Local State (for react - Redux, zustand)
  2. Remote State (Data Fetching in react - tanstack, RTK Query)
- How do we handle The View
  1. Raw Css
  2. Use Frameworks

#### `React Aria` `MUI Base` these are some headless. we can pick and make our own design but the user iteration will be done by headless

## 35-4 Backend Setup and Configuration

- Clone THe REquired Branch Of The Backend

```
git clone https://github.com/Sazid60/PH-TOUR-MANAGEMENT-BACKEND.git --branch Bac-8
```

- Install The package Lock

```
npm i
```

- It is Recommended To Use Only One package Log THat has been used iN this project like `npm`, `bun`

- add the env

- Run The Project. WE can use any run time like `bun`, `npm`

## 35-5 Introduction to JavaScript Package Managers: npm, Yarn, pnpm, and Bun

- Package Manager
  1. Npm comes default wth node installation
  2. except npm we have `yarn`, `bun`, `pnp`
  3. Npm is just a package manager
  4. Developers makes a packages in a registry. From the registry we install a package in or machine. THe Problems with npm is its slow and not secure because anyone can upload npm package. Another problem of npm is it makes node modules for each installation and this is taking more disk space.
  5. For Solving the problems of `npm` Facebook made `yarn` which is faster and safer and this is also a package manager. Two Types of yarn 1. classic 2. v2+. In yarn we can plug and play not like creating node_modules
  6. `pnpm` is wa more faster than yarn and npm and its much more disk efficient. It minimizes the disk space usage using `simlink`. Simlink works like it do not downloads the package rather it links the package. It stores the package information in caching as well. using the `pnpm` in `monorepo` is much easier.
  7. `bun` is beast. It at a time a `package manager`, `task runner`, `ts support that means it also a transpiler`. Bun i the fastest among all of these. bun is wrinnen in zig programming language.

#### We Will Use Bun IN Out Project as its faster and we will use vite

- vite uses `ESM(Es Module)` for bundling and `Live Server` for hot module replacement(Means the change portion will be changed only). Vite is a frontend Tooling created by the creator of Vue js.

## 36-6 Project Scaffolding with Vite, React, and ShadCN

- Install bun in Windows

```
powershell -c "irm bun.sh/install.ps1 | iex"
```

- Install bun in Linux

```
curl -fsSL https://bun.sh/install | bash
```

- install the vite first

```
bun create vite
```

- Select React

![alt text](image.png)

![alt text](image-1.png)

- Install

```
bun install
```

- Run The Project

```
bun run dev
```

- THe node Modules folder will come after installing the bun

- Install The REact Router Data Mode

```
bun add react-router
```

- instal hook form

```
bun add react-hook-form
```

- Install ShadCn and tailwind css

```
bun add tailwindcss @tailwindcss/vite
```

- add this to src -> index.css

```
@import "tailwindcss";
```

- Clean THe App.tsx

- add these to tsconfig.json file

```json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- add this to tsconfig.app.json

```json
 "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
```

- Update vite.config.ts

```
bun add -D @types/node
```

- add this to vite.config.ts

```ts
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

- Now Init The Shadcn

```
bunx --bun shadcn@latest init

```

- Install Shadcn Button

```
bunx --bun shadcn@latest add button
```

## 35-7 Configuring React Router for Page Navigation

- By default frontend runs in port 5173. we can change this to 5000 if we want
  -In vite.config.ts add this

```ts
  server: {
    port: 3000,
  }
```

```ts
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
});
```

- Create a router file in routes -> index.ts

```ts
import App from "@/App";
import About from "@/pages/About";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "about",
      },
    ],
  },
]);
```

- Grab it main.tsx

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```

- set the Outlet

```ts
import { Outlet } from "react-router";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1>This is App Component!</h1>
      <Outlet />
    </div>
  );
}

export default App;
```

## 35-8 Designing Layouts for Multiple Views

- routes -> index.tsx

```tsx
import App from "@/App";
import AdminLayout from "@/components/layouts/AdminLayout";
import About from "@/pages/About";
import Analytics from "@/pages/Analytics";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "about",
      },
    ],
  },

  {
    Component: AdminLayout,
    path: "/admin",
    children: [
      {
        Component: Analytics,
        path: "analytics",
      },
    ],
  },
]);
```

- components -> layouts -> CommonLayout.tsx

```tsx
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface IProps {
  children: ReactNode; // we can use ReactElements as well but this only accepts tsx or jsx
}

export default function CommonLayout({ children }: IProps) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
```

- adminLayout.tsx

```tsx
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div>
      <h1>This is Admin Layout</h1>
      <Outlet />
    </div>
  );
}
```

## 35-9 Defining Project Folder Structure and Development Methodology

- Lets make all of these reuseable

```
└── Frontend-App/
    ├── bun.lock
    ├── components.json
    ├── eslint.config.js
    ├── image-1.png
    ├── image.png
    ├── index.html
    ├── package.json
    ├── Readme.md
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── src/
    │   ├── App.css
    │   ├── App.tsx
    │   ├── index.css
    │   ├── main.tsx
    │   ├── vite-env.d.ts
    │   ├── utils/
    │   │   └── generateRoutes.tsx
    │   ├── routes/
    │   │   └── index.tsx
    │   ├── pages/
    │   │   ├── About.tsx
    │   │   └── Analytics.tsx
    │   ├── lib/
    │   │   └── utils.ts
    │   └── components/
    │       ├── ui/
    │       │   └── button.tsx
    │       ├── layouts/
    │       │   ├── AdminLayout.tsx
    │       │   ├── CommonLayout.tsx
    │       │   ├── Footer.tsx
    │       │   └── Navbar.tsx
    │       └── modules/
    │           ├── homepage/
    │           │   └── HeroSection.tsx
    │           └── about/
    │               └── About.tsx
    └── public/
        └── vite.svg

```

## 35-10 Building Core UI Components: Navbar and Footer with Origin UI and Hyper UI

- for making the process faster we will use
- [Hyper Ui ](https://www.hyperui.dev/)
- [Origin Ui](https://originui.com/) - kind of Extension of Shadcn

  1. For Installation We have to use

  ```
  bunx --bun shadcn@latest add https://originui.com/r/comp-577.json
  ```

  2. By default it will bge stored in outer folder we have to rename and use it in desired folder.

- [Logo Ipsum](https://logoipsum.com/)

## 35-11 Refining Spacing and Alignment for Visual Consistency

- Use this for making the footer stick to the bottom of the screen always

```tsx
import type { ReactNode } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
  children: ReactNode; // we can use ReactElements as well but this only accepts tsx or jsx
}

export default function CommonLayout({ children }: IProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="grow-1">{children}</div>
      <Footer />
    </div>
  );
}
```

- use container for making all the section follow a same structure 

```tsx


export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      This  is about page
    </div>
  )
}
```
