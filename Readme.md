# PH-TOUR-MANAGEMENT-FRONTEND-4

GitHub Link: https://github.com/Apollo-Level2-Web-Dev/ph-tour-management-system-frontend/tree/part-4

## 38-1 Setting Up the Dashboard and Admin Routes

- Lets make a dashboard for all kind of role 

- a common DashboardLayout.tsx for all roles 

```tsx 
import { Outlet } from "react-router";

const DashboardLayout = () => {
    return (
        <div>
            {/* <h1>This is DashboardLayout component</h1> */}
            <Outlet />
        </div>
    );
};

export default DashboardLayout;
```
- Routes -> index.tsx 

```tsx 
import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import About from "@/pages/About";
import AddTour from "@/pages/Admin/AddTour";
import Analytics from "@/pages/Admin/Analytics";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Bookings from "@/pages/User/Bookings";
import Verify from "@/pages/verify";

import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter(
    [
        {
            Component: App,
            path: "/",
            children: [
                {
                    Component: About,
                    path: "about"
                }
            ]
        },
        {
            Component: DashboardLayout,
            path: "/admin",
            children: [
                {
                    Component: Analytics,
                    path: "analytics"
                },
                {
                    Component: AddTour,
                    path: "add-tour"
                }
            ]
        },
        {
            Component: DashboardLayout,
            path: "/user",
            children: [
                {
                    Component: Bookings,
                    path: "bookings"
                }
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

    ]
)
```
- This is not right way to keep all the routes inb one single file we will split the routes and we have to make a mechanism like the dashboard is common but the routes will be dynamic. 


## 38-2 Building the Dashboard Using ShadCN UI Blocks

- here relative path is used 

```ts
 {
            Component: DashboardLayout,
            path: "/admin",
            children: [
                {
                    Component: Analytics,
                    path: "analytics"
                },
                {
                    Component: AddTour,
                    path: "add-tour"
                }
            ]
        },
```

- if want to make it absolute path 

```ts 
 {
            Component: DashboardLayout,
            path: "/admin",
            children: [
                {
                    Component: Analytics,
                    path: "/admin/analytics"
                },
                {
                    Component: AddTour,
                    path: "/admin/add-tour"
                }
            ]
        },
```


| Type          | How It’s Resolved              | Depends on Parent Path? | Maintenance |
| ------------- | ------------------------------ | ----------------------- | ----------- |
| Relative path | Joins with parent path         | ✅ Yes                   | Easier      |
| Absolute path | Taken as is, starting from `/` | ❌ No                    | More manual |

- Install a sidebar from shadcn 

```
npx shadcn@latest add sidebar-01
```

- layouts -> DashboardLayout.tsx 

```tsx 
import { AppSidebar } from "@/components/app-sidebar"

import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router"

export default function DashboardLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />

                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

```

- components -> app-sidebar.tsx

```tsx 
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Logo from "@/assets/icons/Logo"
import { Link } from "react-router"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
        }
      ],
    },
    {
      title: "Tour Management",
      url: "#",
      items: [
        {
          title: "Add Tour",
          url: "/admin/add-tour",
        },
        {
          title: "Add Tour Type",
          url: "/admin/add-tour-type",
        },
      ],
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Logo/>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

```
- Here the Sidebar nav links should dynamic as we want to make a common dashboard for all roles 


