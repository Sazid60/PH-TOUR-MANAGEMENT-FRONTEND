import type { ISidebarItems } from "@/types"



export const generateRoutes = (sidebarItems : ISidebarItems[]) => {
    // return sidebarItems.map((section) => section.items.map(route => ({
    //     path : route.url,
    //     component : route.component
    // })))

    // map is giving the output like [{...}], [{...},{...}] but we want a single array for this reason flatmap is used this gives result like [{..},{..},{...}]
    return sidebarItems.flatMap((section) => section.items.map(route => ({
        path : route.url,
        Component : route.component
    })))

}