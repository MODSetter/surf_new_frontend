"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { 
  Loader2, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw, 
  Copy, 
  ArrowUp,
  X,
  Search,
  ExternalLink,
  Globe,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  Microscope,
  Telescope,
  Atom,
  Check
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Dummy data to match the screenshots
const dummyStatusMessages = [
  { id: 1, message: "Searching the web for 'SurfSense technology'...", type: "info", timestamp: "00:00" },
  { id: 2, message: "Found 2 relevant web results", type: "success", timestamp: "00:02" },
  { id: 3, message: "Searching academic papers for 'SurfSense technology'...", type: "info", timestamp: "00:03" },
  { id: 4, message: "Found 2 relevant academic papers", type: "success", timestamp: "00:05" },
  { id: 5, message: "Searching X/Twitter for 'SurfSense technology'...", type: "info", timestamp: "00:06" },
  { id: 6, message: "Found 1 relevant tweet", type: "success", timestamp: "00:07" },
  { id: 7, message: "Analyzing information...", type: "info", timestamp: "00:08" },
  { id: 8, message: "Generating comprehensive answer...", type: "info", timestamp: "00:10" },
  { id: 9, message: "Research complete!", type: "success", timestamp: "00:12" }
];

// Dummy connector sources
const dummyConnectorSources = [
  {
    id: 1,
    name: "Serper API",
    type: "SERPER_API",
    sources: [
      { 
        id: 1, 
        title: "SurfSense - Personal AI Assistant", 
        description: "SurfSense is a Personal AI Assistant for anything you see on the web.",
        url: "https://surfsense.ai"
      },
      { 
        id: 2, 
        title: "MODSetter/SurfSense: A Personal NotebookLM and...", 
        description: "GitHub - MODSetter/SurfSense: A Personal NotebookLM and...",
        url: "https://github.com/MODSetter/SurfSense"
      },
      { 
        id: 3, 
        title: "SurfSense - Personal AI Assistant", 
        description: "SurfSense is a Personal AI Assistant for anything you see on the web.",
        url: "https://surfsense.io"
      },
      { 
        id: 4, 
        title: "SurfSense Technology Overview", 
        description: "A comprehensive overview of SurfSense technology and its applications.",
        url: "https://surfsense.ai/technology"
      },
      { 
        id: 5, 
        title: "SurfSense vs Competitors: A Comparison", 
        description: "How SurfSense compares to other AI assistants in the market.",
        url: "https://surfsense.ai/comparison"
      },
      { 
        id: 6, 
        title: "SurfSense Privacy Policy", 
        description: "Learn about how SurfSense handles your data and privacy.",
        url: "https://surfsense.ai/privacy"
      },
      { 
        id: 7, 
        title: "SurfSense Documentation", 
        description: "Technical documentation for developers using SurfSense API.",
        url: "https://docs.surfsense.ai"
      },
      { 
        id: 8, 
        title: "SurfSense Blog: Latest Updates", 
        description: "Stay updated with the latest features and improvements in SurfSense.",
        url: "https://blog.surfsense.ai"
      },
      { 
        id: 9, 
        title: "SurfSense Community Forum", 
        description: "Join the SurfSense community to discuss features and get help.",
        url: "https://community.surfsense.ai"
      },
      { 
        id: 10, 
        title: "SurfSense Chrome Extension", 
        description: "Install the SurfSense Chrome extension for seamless browsing.",
        url: "https://chrome.google.com/webstore/detail/surfsense"
      },
      { 
        id: 11, 
        title: "SurfSense Firefox Add-on", 
        description: "Install the SurfSense Firefox add-on for enhanced browsing.",
        url: "https://addons.mozilla.org/en-US/firefox/addon/surfsense"
      },
      { 
        id: 12, 
        title: "SurfSense Edge Extension", 
        description: "Install the SurfSense extension for Microsoft Edge.",
        url: "https://microsoftedge.microsoft.com/addons/detail/surfsense"
      },
      { 
        id: 13, 
        title: "SurfSense Safari Extension", 
        description: "Install the SurfSense extension for Safari browser.",
        url: "https://apps.apple.com/app/surfsense-for-safari"
      },
      { 
        id: 14, 
        title: "SurfSense Mobile App", 
        description: "Download the SurfSense mobile app for iOS and Android.",
        url: "https://surfsense.ai/mobile"
      },
      { 
        id: 15, 
        title: "SurfSense Desktop Application", 
        description: "Download the SurfSense desktop application for Windows, macOS, and Linux.",
        url: "https://surfsense.ai/desktop"
      }
    ]
  },
  {
    id: 2,
    name: "Tavily API",
    type: "TAVILY_API",
    sources: [
      { 
        id: 16, 
        title: "SurfSense: The Future of Web Browsing", 
        description: "How SurfSense is changing the way we interact with the web",
        url: "https://tavily.com/blog/surfsense-future"
      },
      { 
        id: 17, 
        title: "AI Assistants in 2023: SurfSense and Beyond", 
        description: "A comprehensive look at AI assistants including SurfSense",
        url: "https://tavily.com/research/ai-assistants-2023"
      }
    ]
  },
  {
    id: 3   ,
    name: "Academic API",
    type: "ACADEMIC_API",
    sources: [
      { 
        id: 18, 
        title: "SurfSense: A Novel Approach to Web Content Organization", 
        description: "Journal of AI Research, 2023",
        url: "https://journal.ai/papers/surfsense-approach"
      },
      { 
        id: 19, 
        title: "Privacy-Preserving AI Assistants: The Case of SurfSense", 
        description: "International Conference on AI Ethics, 2022",
        url: "https://ai-ethics.org/papers/privacy-assistants"
      }
    ]
  },
  {
    id: 4,
    name: "Twitter API",
    type: "TWITTER_API",
    sources: [
      { 
        id: 20, 
        title: "Just tried the new SurfSense AI assistant and it's amazing for saving...", 
        description: "7:09 AM · Aug 28, 2018 · 1.1K likes",
        url: "https://twitter.com/user/status/123456789"
      }
    ]
  },
];

// Dummy answer with citations
const dummyAnswer = {
  introduction: "SurfSense is an innovative personal AI assistant designed to enhance the web browsing experience by capturing and organizing content from the internet into a user's personal knowledge base. This technology aims to provide a seamless and private browsing experience, allowing users to save dynamic content such as social media chats, calendar invites, important emails, tutorials, and recipes directly into their knowledge base. The development of SurfSense reflects a growing trend towards personalized AI assistants that prioritize user privacy and data security. This paper will explore the technology behind SurfSense, its applications, potential controversies, competitors, and future developments, providing a comprehensive analysis supported by various sources.",
  technologyAnalysis: "SurfSense's core technology revolves around its ability to act as a personal AI assistant for web browsing. It utilizes a cross-browser extension that enables users to save dynamic content directly into their personal knowledge base. This functionality is supported by multiple file format uploads, allowing users to save content from their personal files, including documents and images, into the same knowledge base[1]. The technology also employs GraphRAG [18], a method designed to enhance search results by finding relationships between saved content, although detailed technical specifications are not publicly available[2].\n\nThe architecture of SurfSense involves a backend powered by Langchain and FastAPI, which supports the GraphRAG functionality. This backend is self-hostable, requiring components such as Neo4j, PostgreSQL, and an OpenAI API key, indicating a complex integration of various technologies to achieve its goals[2]. The lack of detailed technical documentation poses a challenge in fully understanding the intricacies of SurfSense's implementation."
};

// Helper function to get connector icon
const getConnectorIcon = (connectorType: string) => {
  const iconProps = { className: "h-4 w-4" };
  
  switch(connectorType) {
    case 'SERPER_API':
    case 'TAVILY_API':
      return <Globe {...iconProps} />;
    case 'ACADEMIC_API':
    case 'ARXIV_API':
    case 'BOOKS_API':
      return <BookOpen {...iconProps} />;
    case 'TWITTER_API':
      return <X {...iconProps} />;
    default:
      return <Search {...iconProps} />;
  }
};

type SegmentedControlProps = {
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
    icon: React.ReactNode;
  }>;
};

/**
 * A segmented control component for selecting between different options
 */
const SegmentedControl = ({ value, onChange, options }: SegmentedControlProps) => (
  <div className="flex rounded-md border border-border overflow-hidden scale-90 origin-left">
    {options.map((option) => (
      <button
        key={option.value}
        className={`flex items-center gap-1 px-2 py-1 text-xs transition-colors ${
          value === option.value 
            ? 'bg-primary text-primary-foreground' 
            : 'hover:bg-muted'
        }`}
        onClick={() => onChange(option.value)}
        aria-pressed={value === option.value}
      >
        {option.icon}
        <span>{option.label}</span>
      </button>
    ))}
  </div>
);

/**
 * Displays a small icon for a connector type
 */
const ConnectorIcon = ({ type, index = 0 }: { type: string; index?: number }) => (
  <div 
    className="w-4 h-4 rounded-full flex items-center justify-center bg-muted border border-background"
    style={{ zIndex: 10 - index }}
  >
    {getConnectorIcon(type)}
  </div>
);

/**
 * Displays a count indicator for additional connectors
 */
const ConnectorCountBadge = ({ count }: { count: number }) => (
  <div className="w-4 h-4 rounded-full flex items-center justify-center bg-primary text-primary-foreground text-[8px] font-medium border border-background z-0">
    +{count}
  </div>
);

type ConnectorButtonProps = {
  selectedConnectors: string[];
  onClick: () => void;
};

/**
 * Button that displays selected connectors and opens connector selection dialog
 */
const ConnectorButton = ({ selectedConnectors, onClick }: ConnectorButtonProps) => {
  const totalConnectors = dummyConnectorSources.length;
  const selectedCount = selectedConnectors.length;
  const progressPercentage = (selectedCount / totalConnectors) * 100;
  
  // Get the name of a single selected connector
  const getSingleConnectorName = () => {
    const connector = dummyConnectorSources.find(c => c.type === selectedConnectors[0]);
    return connector?.name || '';
  };
  
  // Get display text based on selection count
  const getDisplayText = () => {
    if (selectedCount === totalConnectors) return "All Connectors";
    if (selectedCount === 1) return getSingleConnectorName();
    return `${selectedCount} Connectors`;
  };
  
  // Render the empty state (no connectors selected)
  const renderEmptyState = () => (
    <>
      <Plus className="h-3 w-3 text-muted-foreground" />
      <span className="text-muted-foreground">Select Connectors</span>
    </>
  );
  
  // Render the selected connectors preview
  const renderSelectedConnectors = () => (
    <>
      <div className="flex -space-x-1.5 mr-1">
        {/* Show up to 3 connector icons */}
        {selectedConnectors.slice(0, 3).map((type, index) => (
          <ConnectorIcon key={type} type={type} index={index} />
        ))}
        
        {/* Show count indicator if more than 3 connectors are selected */}
        {selectedCount > 3 && <ConnectorCountBadge count={selectedCount - 3} />}
      </div>
      
      {/* Display text */}
      <span className="font-medium">{getDisplayText()}</span>
    </>
  );
  
  return (
    <Button
      variant="outline"
      className="h-7 px-2 text-xs font-medium rounded-md border-border relative overflow-hidden group scale-90 origin-left"
      onClick={onClick}
      aria-label={selectedCount === 0 ? "Select Connectors" : `${selectedCount} connectors selected`}
    >
      {/* Progress indicator */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-primary" 
        style={{ 
          width: `${progressPercentage}%`,
          transition: 'width 0.3s ease'
        }} 
      />
      
      <div className="flex items-center gap-1.5 z-10 relative">
        {selectedCount === 0 ? renderEmptyState() : renderSelectedConnectors()}
        <ChevronDown className="h-3 w-3 ml-0.5 text-muted-foreground opacity-70" />
      </div>
    </Button>
  );
};

const ChatPage = () => {
  const [token, setToken] = React.useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(true);
  const [activeTab, setActiveTab] = useState("SERPER_API");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sourcesPage, setSourcesPage] = useState(1);
  const [expandedSources, setExpandedSources] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [sourceFilter, setSourceFilter] = useState("");
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [terminalExpanded, setTerminalExpanded] = useState(false);
  const [selectedConnectors, setSelectedConnectors] = useState<string[]>([]);
  const [researchMode, setResearchMode] = useState<string>("general");
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  
  const SOURCES_PER_PAGE = 5;
  const INITIAL_SOURCES_DISPLAY = 3;

  // Get token from localStorage on client side only
  React.useEffect(() => {
    setToken(localStorage.getItem('surfsense_bearer_token'));
  }, []);

  // Set the current time only on the client side after initial render
  useEffect(() => {
    setCurrentDate(new Date().toISOString().split('T')[0]);
    setCurrentTime(new Date().toTimeString().split(' ')[0]);
  }, []);

  // Add this CSS to remove input shadow and improve the UI
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.innerHTML = `
        .no-shadow-input {
          box-shadow: none !important;
        }
        .no-shadow-input:focus-visible {
          box-shadow: none !important;
          outline: none !important;
        }
        .shadcn-selector {
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid hsl(var(--border));
          background-color: transparent;
          position: relative;
          overflow: hidden;
        }
        .shadcn-selector:hover {
          background-color: hsl(var(--muted));
          border-color: hsl(var(--primary) / 0.5);
        }
        .shadcn-selector:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 0;
          background: hsl(var(--primary) / 0.1);
          transition: height 300ms ease;
        }
        .shadcn-selector:hover:after {
          height: 100%;
        }
        .shadcn-selector-primary {
          color: hsl(var(--primary));
          border-color: hsl(var(--primary) / 0.3);
        }
        .shadcn-selector-primary:hover {
          border-color: hsl(var(--primary));
          background-color: hsl(var(--primary) / 0.1);
        }
        /* Fix for scrollbar layout shifts */
        html {
          overflow-y: scroll;
        }
        body {
          scrollbar-gutter: stable;
        }
        /* For Firefox */
        * {
          scrollbar-width: thin;
        }
        /* For Webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background-color: rgba(155, 155, 155, 0.5);
          border-radius: 20px;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  const { messages, input, handleInputChange, handleSubmit: handleChatSubmit, status, isLoading } = useChat({
    api: `${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/api/v1/chat`,
    streamProtocol: 'data',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: {
      extra_data: {
        user_id: "user123",
      }
    }
  });

  // Reference to the messages container for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get total sources count for a connector type
  const getSourcesCount = (connectorType: string) => {
    return dummyConnectorSources.find(connector => connector.type === connectorType)?.sources.length || 0;
  };

  // Function to check scroll position and update indicators
  const updateScrollIndicators = () => {
    if (tabsListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10); // 10px buffer
    }
  };

  // Initialize scroll indicators
  useEffect(() => {
    updateScrollIndicators();
    // Add resize listener to update indicators when window size changes
    window.addEventListener('resize', updateScrollIndicators);
    return () => window.removeEventListener('resize', updateScrollIndicators);
  }, []);

  // Function to scroll tabs list left
  const scrollTabsLeft = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      // Update indicators after scrolling
      setTimeout(updateScrollIndicators, 300);
    }
  };

  // Function to scroll tabs list right
  const scrollTabsRight = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      // Update indicators after scrolling
      setTimeout(updateScrollIndicators, 300);
    }
  };

  // Ensure first tab is visible on initial render
  useEffect(() => {
    if (tabsListRef.current) {
      // Reset scroll position to ensure first tab is visible
      tabsListRef.current.scrollLeft = 0;
      updateScrollIndicators();
    }
  }, []);

  // Update scroll indicators when active tab changes
  useEffect(() => {
    if (tabsListRef.current) {
      // Find the active tab element
      const activeTabElement = tabsListRef.current.querySelector(`[data-state="active"]`);
      if (activeTabElement) {
        // Scroll the active tab into view
        activeTabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        // Update indicators after scrolling
        setTimeout(updateScrollIndicators, 300);
      }
    }
  }, [activeTab]);

  // Reset sources page when tab changes or dialog closes
  useEffect(() => {
    if (!dialogOpen) {
      setSourcesPage(1);
      setExpandedSources(false);
    }
  }, [activeTab, dialogOpen]);

  // Function to get sources for the main view
  const getMainViewSources = (connector: typeof dummyConnectorSources[0]) => {
    return connector.sources.slice(0, INITIAL_SOURCES_DISPLAY);
  };

  // Function to get filtered sources for the dialog
  const getFilteredSources = (connector: typeof dummyConnectorSources[0]) => {
    if (!sourceFilter.trim()) {
      return connector.sources;
    }
    
    const filter = sourceFilter.toLowerCase().trim();
    return connector.sources.filter(source => 
      source.title.toLowerCase().includes(filter) || 
      source.description.toLowerCase().includes(filter)
    );
  };

  // Function to get paginated and filtered sources for the dialog
  const getPaginatedDialogSources = (connector: typeof dummyConnectorSources[0]) => {
    const filteredSources = getFilteredSources(connector);
    
    if (expandedSources) {
      return filteredSources;
    }
    return filteredSources.slice(0, sourcesPage * SOURCES_PER_PAGE);
  };

  // Function to handle loading more sources in the dialog
  const handleLoadMoreSources = () => {
    const connector = dummyConnectorSources.find(c => c.type === activeTab);
    if (!connector) return;
    
    const filteredSources = getFilteredSources(connector);
    
    setIsLoadingMore(true);
    
    // Simulate loading delay
    setTimeout(() => {
      if ((sourcesPage + 1) * SOURCES_PER_PAGE >= filteredSources.length) {
        setExpandedSources(true);
      } else {
        setSourcesPage(prev => prev + 1);
      }
      setIsLoadingMore(false);
    }, 500);
  };

  // Reset filter when dialog closes
  useEffect(() => {
    if (!dialogOpen) {
      setSourceFilter("");
    }
  }, [dialogOpen]);

  // Function to get citation source - optimized for incremental IDs
  const getCitationSource = (citationId: number) => {
    // Since IDs are incremental across all connectors, we can directly find the source
    for (const connector of dummyConnectorSources) {
      const source = connector.sources.find(source => source.id === citationId);
      if (source) {
        return {
          ...source,
          connectorType: connector.type,
          connectorName: connector.name,
          connectorId: connector.id
        };
      }
    }
    return null;
  };

  // Citation component to handle individual citations
  const Citation = ({ citationId, citationText, position }: { citationId: number, citationText: string, position: number }) => {
    const [open, setOpen] = useState(false);
    const source = getCitationSource(citationId);
    const citationKey = `citation-${citationId}-${position}`;
    
    if (!source) return <>{citationText}</>;
    
    return (
      <span key={citationKey} className="relative inline-flex items-center">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <sup>
              <span 
                className="inline-flex items-center justify-center text-primary cursor-pointer bg-primary/10 hover:bg-primary/15 w-4 h-4 rounded-full text-[10px] font-medium ml-0.5 transition-colors border border-primary/20 shadow-sm"
              >
                {citationId}
              </span>
            </sup>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-80 p-0">
            <Card className="border-0 shadow-none">
              <div className="p-3 flex items-start gap-3">
                <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-muted rounded-full">
                  {getConnectorIcon(source.connectorType)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm text-card-foreground">{source.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{source.description}</p>
                  <div className="mt-2 flex items-center text-xs text-muted-foreground">
                    <span className="truncate max-w-[200px]">{source.url}</span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 rounded-full"
                  onClick={() => window.open(source.url, '_blank')}
                  title="Open in new tab"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
    );
  };

  // Function to render text with citations
  const renderTextWithCitations = (text: string) => {
    // Regular expression to find citation patterns like [1], [2], etc.
    const citationRegex = /\[(\d+)\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    // Find all citations in the text
    while ((match = citationRegex.exec(text)) !== null) {
      // Add text before the citation
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      // Add the citation
      const citationId = parseInt(match[1], 10);
      parts.push(
        <Citation 
          key={`citation-${match.index}`}
          citationId={citationId}
          citationText={match[0]}
          position={match.index}
        />
      );

      lastIndex = match.index + match[0].length;
    }

    // Add any remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  // Custom handleSubmit function to include selected connectors and answer type
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // You can add additional logic here if needed
    // For example, validation for selected connectors
    if (selectedConnectors.length === 0) {
      alert("Please select at least one connector");
      return;
    }
    
    // Call the original handleSubmit from useChat
    handleChatSubmit(e);
  };

  // Update the body when selectedConnectors or researchMode changes
  useEffect(() => {
    // This is just to demonstrate that we're tracking the changes
    // In a real implementation, you might want to update the useChat configuration
    console.log("Selected connectors:", selectedConnectors);
    console.log("Research mode:", researchMode);
  }, [selectedConnectors, researchMode]);


  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] max-w-4xl mx-auto px-4 py-8 overflow-x-hidden">
      <h1 className="text-2xl font-semibold mb-6">What is SurfSense?</h1>
      
      {/* Status Messages Section */}
      <Card className="mb-6 overflow-hidden border-gray-300 dark:border-gray-700">
        <div className="p-3 border-b dark:border-gray-700 flex items-center justify-between bg-gray-100 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:opacity-80" onClick={() => setTerminalExpanded(false)}></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:opacity-80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:opacity-80" onClick={() => setTerminalExpanded(true)}></div>
            </div>
            <span className="font-medium ml-2 text-sm">surfsense-research-terminal</span>
          </div>
          <span className="text-green-500 text-xs font-medium bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded">Complete</span>
        </div>
         
        <div className={`p-4 overflow-y-auto font-mono text-sm bg-gray-900 dark:bg-gray-950 text-gray-200 leading-relaxed ${terminalExpanded ? 'h-[400px]' : 'max-h-[200px]'} transition-all duration-300`}>
          <div className="text-gray-500 mb-2 text-xs border-b border-gray-800 pb-1">Last login: {currentDate} {currentTime}</div>
          <div className="text-gray-500 mb-1 text-xs flex items-center">
            <span className="text-green-400 mr-1">researcher@surfsense</span>
            <span className="mr-1">:</span>
            <span className="text-blue-400 mr-1">~/research</span>
            <span className="mr-1">$</span>
            <span>surf-researcher --query "What is SurfSense?"</span>
          </div>
          {dummyStatusMessages.map((item) => (
            <div key={item.id} className={`py-0.5 flex items-start ${
              item.type === 'success' ? 'text-green-400' : 
              item.type === 'error' ? 'text-red-400' : 
              'text-gray-300'
            }`}>
              <span className="text-gray-500 text-xs mr-2 w-10 flex-shrink-0">[{item.timestamp}]</span>
              <span className="mr-2 opacity-70">
                {item.type === 'success' ? '✓' : 
                 item.type === 'error' ? '✗' : 
                 '>'} 
              </span>
              <span>
                {item.message}
              </span>
            </div>
          ))}
          <div className="mt-2 flex items-center">
            <span className="text-gray-500 text-xs mr-2 w-10 flex-shrink-0">[00:13]</span>
            <span className="text-green-400 mr-1">researcher@surfsense</span>
            <span className="mr-1">:</span>
            <span className="text-blue-400 mr-1">~/research</span>
            <span className="mr-1">$</span>
            <div className="h-4 w-2 bg-gray-400 animate-pulse"></div>
          </div>
        </div>
      </Card>
      
      {/* Sources Section with Connector Tabs */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-5 w-5 flex items-center justify-center">📄</div>
          <span className="font-medium">Sources</span>
        </div>
        
        <Tabs defaultValue="SERPER_API" className="w-full" onValueChange={setActiveTab}>
          <div className="mb-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={scrollTabsLeft}
                className="flex-shrink-0 mr-2 z-10"
                disabled={!canScrollLeft}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex-1 overflow-hidden">
                <div className="flex overflow-x-auto hide-scrollbar" ref={tabsListRef} onScroll={updateScrollIndicators}>
                  <TabsList className="flex-1 bg-transparent border-0 p-0 custom-tabs-list">
                    {dummyConnectorSources.map((connector) => (
                      <TabsTrigger 
                        key={connector.id} 
                        value={connector.type} 
                        className="flex items-center gap-1 mx-1 data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-800 rounded-md"
                      >
                        {getConnectorIcon(connector.type)}
                        <span className="hidden sm:inline ml-1">{connector.name.split(' ')[0]}</span>
                        <span className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs">
                          {getSourcesCount(connector.type)}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={scrollTabsRight}
                className="flex-shrink-0 ml-2 z-10"
                disabled={!canScrollRight}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {dummyConnectorSources.map(connector => (
            <TabsContent key={connector.id} value={connector.type} className="mt-0">
              <div className="space-y-3">
                {getMainViewSources(connector).map((source) => (
                  <Card key={source.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        {getConnectorIcon(connector.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{source.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{source.description}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => window.open(source.url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
                
                {connector.sources.length > INITIAL_SOURCES_DISPLAY && (
                  <Dialog open={dialogOpen && activeTab === connector.type} onOpenChange={(open) => setDialogOpen(open)}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="w-full text-sm text-gray-500 dark:text-gray-400">
                        Show {connector.sources.length - INITIAL_SOURCES_DISPLAY} More Sources
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto dark:border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          {getConnectorIcon(connector.type)}
                          <span>{connector.name} Sources</span>
                        </DialogTitle>
                        <DialogDescription className="dark:text-gray-400">
                          {sourceFilter ? 
                            `Found ${getFilteredSources(connector).length} sources matching "${sourceFilter}"` : 
                            `Viewing ${getPaginatedDialogSources(connector).length} of ${connector.sources.length} sources`
                          }
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="relative my-4">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                        <Input
                          placeholder="Search sources..."
                          className="pl-8 pr-4"
                          value={sourceFilter}
                          onChange={(e) => {
                            setSourceFilter(e.target.value);
                            setSourcesPage(1);
                            setExpandedSources(false);
                          }}
                        />
                        {sourceFilter && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4"
                            onClick={() => {
                              setSourceFilter("");
                              setSourcesPage(1);
                              setExpandedSources(false);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-3 mt-4">
                        {getPaginatedDialogSources(connector).length > 0 ? (
                          <>
                            {getPaginatedDialogSources(connector).map((source) => (
                              <Card key={source.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                                    {getConnectorIcon(connector.type)}
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-medium text-sm">{source.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{source.description}</p>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-6 w-6"
                                    onClick={() => window.open(source.url, '_blank')}
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </div>
                              </Card>
                            ))}
                            
                            {!expandedSources && getPaginatedDialogSources(connector).length < getFilteredSources(connector).length && (
                              <Button 
                                variant="ghost" 
                                className="w-full text-sm text-gray-500 dark:text-gray-400"
                                onClick={handleLoadMoreSources}
                                disabled={isLoadingMore}
                              >
                                {isLoadingMore ? (
                                  <div className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Loading...</span>
                                  </div>
                                ) : (
                                  `Load ${Math.min(SOURCES_PER_PAGE, getFilteredSources(connector).length - getPaginatedDialogSources(connector).length)} More Sources`
                              )}
                            </Button>
                          )}
                            
                            {expandedSources && getFilteredSources(connector).length > 10 && (
                              <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
                                Showing all {getFilteredSources(connector).length} sources
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>No sources found matching "{sourceFilter}"</p>
                            <Button 
                              variant="ghost" 
                              className="mt-2 text-sm"
                              onClick={() => setSourceFilter("")}
                            >
                              Clear search
                            </Button>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      {/* Answer Section */}
      <div className="mb-6">
        <div 
          className="flex items-center gap-2 mb-4 cursor-pointer"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          <div className="h-5 w-5 flex items-center justify-center">✨</div>
          <span className="font-medium">Answer</span>
          <div className="flex gap-2 ml-auto">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              {showAnswer ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {showAnswer && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{renderTextWithCitations(dummyAnswer.introduction)}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Technology Analysis</h2>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {renderTextWithCitations(dummyAnswer.technologyAnalysis)}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* New Chat Input Form */}
      <div className="mx-2 my-2 py-2 px-4 border border-border rounded-lg bg-background">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            className="no-shadow-input border-0 focus-visible:ring-offset-0 focus-visible:ring-0 resize-none overflow-auto w-full flex-1 bg-transparent p-3 pb-1.5 text-sm outline-none placeholder:text-muted-foreground"
            disabled={isLoading}
          />
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-4">
              {/* Connector Selection Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <ConnectorButton 
                    selectedConnectors={selectedConnectors} 
                    onClick={() => {}}
                  />
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Select Connectors</DialogTitle>
                    <DialogDescription>
                      Choose which data sources to include in your research
                    </DialogDescription>
                  </DialogHeader>
                  
                  {/* Connector selection grid */}
                  <div className="grid grid-cols-2 gap-4 py-4">
                    {dummyConnectorSources.map((connector) => {
                      const isSelected = selectedConnectors.includes(connector.type);
                      
                      return (
                        <div 
                          key={connector.id} 
                          className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-colors ${
                            isSelected
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50 hover:bg-muted'
                          }`}
                          onClick={() => {
                            setSelectedConnectors(
                              isSelected
                                ? selectedConnectors.filter((type) => type !== connector.type)
                                : [...selectedConnectors, connector.type]
                            );
                          }}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={0}
                        >
                          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-muted">
                            {getConnectorIcon(connector.type)}
                          </div>
                          <span className="flex-1 text-sm font-medium">{connector.name}</span>
                          {isSelected && <Check className="h-4 w-4 text-primary" />}
                        </div>
                      );
                    })}
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedConnectors([])}
                    >
                      Clear All
                    </Button>
                    <Button 
                      onClick={() => setSelectedConnectors(dummyConnectorSources.map(c => c.type))}
                    >
                      Select All
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Research Mode Segmented Control */}
              <SegmentedControl
                value={researchMode}
                onChange={setResearchMode}
                options={[
                  { 
                    value: 'general', 
                    label: 'General', 
                    icon: <Sparkles className="h-3.5 w-3.5 text-yellow-500" /> 
                  },
                  { 
                    value: 'deep', 
                    label: 'Deep', 
                    icon: <Microscope className="h-3.5 w-3.5 text-blue-500" /> 
                  },
                  { 
                    value: 'deeper', 
                    label: 'Deeper', 
                    icon: <Telescope className="h-3.5 w-3.5 text-purple-500" /> 
                  },
                  { 
                    value: 'deepest', 
                    label: 'Deepest', 
                    icon: <Atom className="h-3.5 w-3.5 text-red-500" /> 
                  }
                ]}
              />
            </div>

            {/* Send button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              <ArrowUp className="h-4 w-4 text-primary" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </form>
      </div>

      {/* Scroll to bottom button */}
      <div className="fixed bottom-8 right-8">
        <Button
          onClick={scrollToBottom}
          className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          variant="ghost"
          size="icon"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;