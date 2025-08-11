
import Bookings from "@/pages/User/Bookings";
import type { ISidebarItems } from "@/types";



export const userSidebarItems : ISidebarItems[] = [
    {
        title: "History",
        items: [
            {
                title: "Bookings",
                url: "/user/bookings",
                component: Bookings
            }
        ],
    },
]