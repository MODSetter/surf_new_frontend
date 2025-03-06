'use client';

import { useEffect, useState } from 'react';
import { AppSidebar } from '@/components/sidebar/app-sidebar';

interface Chat {
  created_at: string;
  id: number;
  type: string;
  title: string;
  messages: string[];
  search_space_id: number;
}

interface SearchSpace {
  created_at: string;
  id: number;
  name: string;
  description: string;
  user_id: string;
}

interface User {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
}

interface AppSidebarProviderProps {
  searchSpaceId: string;
  navSecondary: {
    title: string;
    url: string;
    icon: string;
  }[];
  navMain: {
    title: string;
    url: string;
    icon: string;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}

export function AppSidebarProvider({ 
  searchSpaceId, 
  navSecondary, 
  navMain 
}: AppSidebarProviderProps) {
  const [recentChats, setRecentChats] = useState<{ name: string; url: string; icon: string }[]>([]);
  const [searchSpace, setSearchSpace] = useState<SearchSpace | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isLoadingSearchSpace, setIsLoadingSearchSpace] = useState(true);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [chatError, setChatError] = useState<string | null>(null);
  const [searchSpaceError, setSearchSpaceError] = useState<string | null>(null);
  const [userError, setUserError] = useState<string | null>(null);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Only run on client-side
        if (typeof window === 'undefined') return;

        // Get token from localStorage
        const token = localStorage.getItem('surfsense_bearer_token');
        
        if (!token) {
          console.warn('No authentication token found in localStorage');
          setIsLoadingUser(false);
          return;
        }

        // Fetch user details from API
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          method: 'GET',
          cache: 'no-store',
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(`Failed to fetch user: ${response.status} ${errorData?.detail || ''}`);
        }

        const userData: User = await response.json();
        setUser(userData);
        setUserError(null);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUserError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  // Fetch recent chats
  useEffect(() => {
    const fetchRecentChats = async () => {
      try {
        // Only run on client-side
        if (typeof window === 'undefined') return;

        // Get token from localStorage
        const token = localStorage.getItem('surfsense_bearer_token');
        
        if (!token) {
          console.warn('No authentication token found in localStorage');
          setIsLoadingChats(false);
          return;
        }

        // Fetch recent chats from API
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/api/v1/chats/?limit=5&skip=0`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          method: 'GET',
          cache: 'no-store',
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(`Failed to fetch chats: ${response.status} ${errorData?.error || ''}`);
        }

        const chats: Chat[] = await response.json();
        
        // Transform API response to the format expected by AppSidebar
        const formattedChats = chats.map(chat => ({
          name: chat.title || `Chat ${chat.id}`, // Fallback if title is empty
          url: `/dashboard/${chat.search_space_id}/chat/${chat.id}`,
          icon: 'MessageCircleMore',
        }));

        setRecentChats(formattedChats);
        setChatError(null);
      } catch (error) {
        console.error('Error fetching recent chats:', error);
        setChatError(error instanceof Error ? error.message : 'Unknown error occurred');
        // Provide empty array to ensure UI still renders
        setRecentChats([]);
      } finally {
        setIsLoadingChats(false);
      }
    };

    fetchRecentChats();

    // Set up a refresh interval (every 5 minutes)
    const intervalId = setInterval(fetchRecentChats, 5 * 60 * 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Fetch search space details
  useEffect(() => {
    const fetchSearchSpace = async () => {
      try {
        // Only run on client-side
        if (typeof window === 'undefined') return;

        // Get token from localStorage
        const token = localStorage.getItem('surfsense_bearer_token');
        
        if (!token) {
          console.warn('No authentication token found in localStorage');
          setIsLoadingSearchSpace(false);
          return;
        }

        // Fetch search space details from API
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/api/v1/searchspaces/${searchSpaceId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          method: 'GET',
          cache: 'no-store',
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(`Failed to fetch search space: ${response.status} ${errorData?.detail || ''}`);
        }

        const data: SearchSpace = await response.json();
        setSearchSpace(data);
        setSearchSpaceError(null);
      } catch (error) {
        console.error('Error fetching search space:', error);
        setSearchSpaceError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setIsLoadingSearchSpace(false);
      }
    };

    fetchSearchSpace();
  }, [searchSpaceId]);

  // Create a fallback chat if there's an error or no chats
  const fallbackChats = chatError || (!isLoadingChats && recentChats.length === 0) 
    ? [{ 
        name: chatError ? "Error loading chats" : "No recent chats", 
        url: "#", 
        icon: chatError ? "AlertCircle" : "MessageCircleMore" 
      }] 
    : [];

  // Use fallback chats if there's an error or no chats
  const displayChats = recentChats.length > 0 ? recentChats : fallbackChats;

  // Update the first item in navSecondary to show the search space name
  const updatedNavSecondary = [...navSecondary];
  if (updatedNavSecondary.length > 0) {
    updatedNavSecondary[0] = {
      ...updatedNavSecondary[0],
      title: searchSpace?.name || (isLoadingSearchSpace ? 'Loading...' : searchSpaceError ? 'Error loading search space' : 'Unknown Search Space'),
    };
  }

  // Create user object for AppSidebar
  const customUser = {
    name: user?.email?.split('@')[0] || 'User',
    email: user?.email || (isLoadingUser ? 'Loading...' : userError ? 'Error loading user' : 'Unknown User'),
    avatar: '/avatar.png', // Default avatar
  };

  return (
    <AppSidebar
      user={customUser}
      navSecondary={updatedNavSecondary}
      navMain={navMain}
      RecentChats={displayChats}
    />
  );
} 