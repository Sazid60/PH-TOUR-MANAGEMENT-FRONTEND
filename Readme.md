# PH-TOUR-MANAGEMENT-FRONTEND-6

GitHub Link: https://github.com/Apollo-Level2-Web-Dev/ph-tour-management-system-frontend/tree/part-6

## 40-1 Overview of Dummy Components and ShadCN UI Blocks
- For Home Page Components We will use Shadcn Components block 

[Shadcn Blocks](https://www.shadcnblocks.com/)

- routes -> index.ts 

```ts
import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/verify";
import { generateRoutes } from "@/utils/generateRoutes";

import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import { HomePage } from "@/pages/HomePage";

export const router = createBrowserRouter(
    [
        {
            Component: App,
            path: "/",
            children: [
                {
                    Component: HomePage,
                    index: true,
                },
                {
                    Component: withAuth(About),
                    path: "about"
                },
                {
                    Component: withAuth(About),
                    path: "about"
                }
            ]
        },
        {
            Component: withAuth(DashboardLayout, role.superAdmin as TRole),
            path: "/admin",

            children: [
                { index: true, element: <Navigate to="/admin/analytics" /> },
                ...generateRoutes(adminSidebarItems)]
        },
        {
            Component: DashboardLayout,
            path: "/user",
            children: [
                { index: true, element: <Navigate to="/user/bookings" /> },
                ...generateRoutes(userSidebarItems)
            ]
        },
        {
            Component: Login,
            path: "login"
        },
        {
            Component: Register,
            path: "register"
        },
        {
            Component: Verify,
            path: "verify",
        },
        {
            Component: Unauthorized,
            path: "/unauthorized",
        },

    ]
)
```

- pages - > Homepage.tsx 

```tsx 
import { HeroSection } from "@/components/modules/HomePage/HeroSection";




export  function HomePage() {
  return (
    <div>
        <HeroSection/>  
    </div>
  )
}

```

- components -> HomePage -> HeroSection.tsx 

```tsx 
import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";



export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-32 min-h-screen">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
        />
      </div>
      <div className="relative z-10 container mx-auto">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <Logo/>
            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                Export The Beauty Of {" "}
                <span className="text-primary">Bangladesh</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                doloremque mollitia fugiat omnis! Porro facilis quo animi
                consequatur. Explicabo.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Button asChild>
                <Link to="/tours">Explore</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

```