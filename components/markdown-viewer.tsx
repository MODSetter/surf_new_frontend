import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export function MarkdownViewer({ content, className }: MarkdownViewerProps) {
  return (
    <div className={cn("prose prose-sm dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          // Define custom components for markdown elements
          p: ({node, ...props}) => <p className="my-2" {...props} />,
          a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-2" {...props} />,
          h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-2" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-5 mb-2" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
          h4: ({node, ...props}) => <h4 className="text-base font-bold mt-3 mb-1" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-muted pl-4 italic my-2" {...props} />,
          hr: ({node, ...props}) => <hr className="my-4 border-muted" {...props} />,
          img: ({node, ...props}) => <img className="max-w-full h-auto my-4 rounded" {...props} />,
          table: ({node, ...props}) => <div className="overflow-x-auto my-4"><table className="min-w-full divide-y divide-border" {...props} /></div>,
          th: ({node, ...props}) => <th className="px-3 py-2 text-left font-medium bg-muted" {...props} />,
          td: ({node, ...props}) => <td className="px-3 py-2 border-t border-border" {...props} />,
          code: ({node, className, children, ...props}: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            return isInline 
              ? <code className="bg-muted px-1 py-0.5 rounded text-xs" {...props}>{children}</code>
              : (
                <div className="relative my-4">
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code className="text-xs" {...props}>{children}</code>
                  </pre>
                </div>
              );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 