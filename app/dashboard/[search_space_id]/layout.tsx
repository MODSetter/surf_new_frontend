import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeTogglerComponent } from "@/components/theme/theme-toggle"
import React from 'react'
import { Separator } from "@/components/ui/separator"
import { AppSidebarProvider } from "@/components/sidebar/AppSidebarProvider"


const layout = async ({ params, children }: { params: { search_space_id: string }, children: React.ReactNode }) => {
  // This removes the https://nextjs.org/docs/messages/sync-dynamic-apis error
  const { search_space_id } = await params;

  // TODO: Get search space name from our FastAPI backend
  const customNavSecondary = [
    {
      title: `All Search Spaces`,
      url: `#`,
      icon: "Info",
    },
    {
      title: `All Search Spaces`,
      url: "/dashboard",
      icon: "Undo2",
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
      url: "#",
      icon: "FileStack",
      items: [
        {
          title: "Upload Documents",
          url: `/dashboard/${search_space_id}/documents/upload`,
        },
        {
          title: "Add Webpages",
          url: `/dashboard/${search_space_id}/documents/webpage`,
        },
        {
          title: "Manage Documents",
          url: `/dashboard/${search_space_id}/documents`,
        },
      ],
    },
    {
      title: "Connectors",
      url: `#`,
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
      url: `#`,
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
      {/* Use AppSidebarProvider which fetches user, search space, and recent chats */}
      <AppSidebarProvider
        searchSpaceId={search_space_id}
        navSecondary={customNavSecondary}
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