import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeTogglerComponent } from "@/components/theme-toggle"
import React from 'react'
import { Separator } from "@/components/ui/separator"

const layout = async ({ params, children }: { params: { search_space_id: string }, children: React.ReactNode }) => {
    // This removes the https://nextjs.org/docs/messages/sync-dynamic-apis error
    const { search_space_id } = await params;

    // TODO: Get user from our FastAPI backend
    const customUser = {
        name: "John Doe",
        email: "john@example.com",
        avatar: "/avatar.png",
    }

    // TODO: Get search space name from our FastAPI backend
    const customNavSecondary = [
        {
            title: `Search Space ${search_space_id}`,
            url: "/dashboard",
            icon: "LifeBuoy",
        },
    ]

    const customRecentChats = [
        {
            name: "Project Alpha",
            url: "/chats/alpha",
            icon: "MessageCircleMore",
        },
        {
            name: "Team Discussion",
            url: "/chats/team",
            icon: "MessageCircleMore",
        },
    ]

    const customNavMain = [
        {
          title: "Researcher",
          url: `/dashboard/${search_space_id}/researcher`,
          icon: "SquareTerminal",
          isActive: true,
          items: [],
        },
    
        {
          title: "Documents",
          url: `/dashboard/${search_space_id}/documents`,
          icon: "FileStack",
          items: [
            {
              title: "Upload Documents",
              url: `/dashboard/${search_space_id}/documents/upload`,
            },
            {
              title: "Manage Documents",
              url: `/dashboard/${search_space_id}/documents`,
            },
          ],
        },
        {
          title: "Connectors",
          url: `/dashboard/${search_space_id}/connectors`,
          icon: "Cable",
          items: [
            {
              title: "Add Connector",
              url: `/dashboard/${search_space_id}/connectors/add`,
            },
            {
              title: "Manage Connectors",
              url: `/dashboard/${search_space_id}/connectors`,
            },
          ],
        },
        {
          title: "Research Synthesizer's",
          url: `/dashboard/${search_space_id}/synthesizer`,
          icon: "SquareLibrary",
          items: [
            {
              title: "Podcast Creator",
              url: `/dashboard/${search_space_id}/synthesizer/podcast`,
            },
            {
              title: "Presentation Creator",
              url: `/dashboard/${search_space_id}/synthesizer/presentation`,
            },
          ],
        },
      ]

    return (
        <SidebarProvider>
            {/* You can use the AppSidebar with default values */}
            {/* <AppSidebar /> */}

            {/* Or pass custom props */}
            <AppSidebar
                user={customUser}
                navSecondary={customNavSecondary}
                RecentChats={customRecentChats}
                navMain={customNavMain}
            />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="h-6" />
                        <ThemeTogglerComponent />
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

export default layout