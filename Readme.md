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

