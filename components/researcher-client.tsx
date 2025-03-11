'use client'
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Check } from "lucide-react";
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Logo } from '@/components/Logo';

// Import components from the chat directory
import {
  SegmentedControl,
  ConnectorButton as ConnectorButtonComponent,
  getConnectorIcon,
  ResearchMode,
  researcherOptions
} from '@/components/chat';
import { connectorSourcesMenu } from '@/components/chat/connector-sources';


/**
 * Button that displays selected connectors and opens connector selection dialog
 */
const ConnectorButton = ({ selectedConnectors, onClick }: { selectedConnectors: string[], onClick: () => void }) => {
  return (
    <ConnectorButtonComponent 
      selectedConnectors={selectedConnectors} 
      onClick={onClick} 
      connectorSources={connectorSourcesMenu}
    />
  );
};

interface ResearcherClientProps {
  search_space_id: string;
}

const ResearcherClient = ({ search_space_id }: ResearcherClientProps) => {
  const [input, setInput] = useState('');
  const router = useRouter();

  const [selectedConnectors, setSelectedConnectors] = useState<string[]>(["CRAWLED_URL"]);
  const [researchMode, setResearchMode] = useState<ResearchMode>("general");

  
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



  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim()) {
      const token = window.localStorage.getItem("token");
      // Create Chat & Redirect with its ID

    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-10/12 px-4 py-8">
      <div className="w-full max-w-3xl mx-auto">
        <h2 className="flex gap-2 justify-center text-balance relative z-50 mx-auto mb-6 text-center text-2xl font-semibold tracking-tight text-gray-700 dark:text-neutral-300 md:text-7xl">
          <Logo className='rounded-md'/>
          <div className='text-muted-foreground'>
            Surf{""}
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
              <div className="text-black [text-shadow:0_0_rgba(0,0,0,0.1)] dark:text-white">
                <span className="">Sense</span>
              </div>
            </div>
          </div>
        </h2>
        <div className="relative w-full">
          <div className="absolute inset-x-0 inset-y-[-30%] h-[65%] skew-y-12 bg-gradient-to-r from-gray-100/20 to-gray-50/20 opacity-10 dark:from-gray-800/20 dark:to-gray-900/20"></div>
        </div>

        {/* New Chat Input Form - Exact match to the chat_id page */}
        <div className="mx-2 my-2 py-2 px-4 border border-border rounded-lg bg-background">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="no-shadow-input border-0 focus-visible:ring-offset-0 focus-visible:ring-0 resize-none overflow-auto w-full flex-1 bg-transparent p-3 pb-1.5 text-sm outline-none placeholder:text-muted-foreground"
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
                      {connectorSourcesMenu.map((connector) => {
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
                        onClick={() => setSelectedConnectors(connectorSourcesMenu.map(c => c.type))}
                      >
                        Select All
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Research Mode Segmented Control */}
                <SegmentedControl<ResearchMode>
                  value={researchMode}
                  onChange={setResearchMode}
                  options={researcherOptions}
                />
              </div>

              {/* Send button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
              >
                <ArrowUp className="h-4 w-4 text-primary" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResearcherClient; 