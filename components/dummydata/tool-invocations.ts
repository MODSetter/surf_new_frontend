import { ToolInvocationUIPart } from "../chat";

// Dummy status messages for the terminal display
export const dummyStatusMessages = [
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
  export const dummyConnectorSources = [
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
  
  // Tool invocation data structure to match useChat() tool calling
  export const dummyToolInvocations: ToolInvocationUIPart[] = [
    {
      type: 'tool-invocation',
      toolInvocation: {
        state: 'call',
        toolCallId: 'call_1',
        toolName: 'search_web',
        args: {
          query: 'SurfSense technology'
        }
      }
    },
    {
      type: 'tool-invocation',
      toolInvocation: {
        state: 'result',
        toolCallId: 'call_1',
        toolName: 'search_web',
        args: {
          query: 'SurfSense technology'
        },
        result: {
          sources: dummyConnectorSources.filter(c => c.type === 'SERPER_API' || c.type === 'TAVILY_API').flatMap(c => c.sources)
        }
      }
    },
    {
      type: 'tool-invocation',
      toolInvocation: {
        state: 'call',
        toolCallId: 'call_2',
        toolName: 'search_academic',
        args: {
          query: 'SurfSense technology'
        }
      }
    },
    {
      type: 'tool-invocation',
      toolInvocation: {
        state: 'result',
        toolCallId: 'call_2',
        toolName: 'search_academic',
        args: {
          query: 'SurfSense technology'
        },
        result: {
          sources: dummyConnectorSources.filter(c => c.type === 'ACADEMIC_API').flatMap(c => c.sources)
        }
      }
    },
    {
      type: 'tool-invocation',
      toolInvocation: {
        state: 'call',
        toolCallId: 'call_3',
        toolName: 'search_twitter',
        args: {
          query: 'SurfSense technology'
        }
      }
    },
    {
      type: 'tool-invocation',
      toolInvocation: {
        state: 'result',
        toolCallId: 'call_3',
        toolName: 'search_twitter',
        args: {
          query: 'SurfSense technology'
        },
        result: {
          sources: dummyConnectorSources.filter(c => c.type === 'TWITTER_API').flatMap(c => c.sources)
        }
      }
    }
  ];