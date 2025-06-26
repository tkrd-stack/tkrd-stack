import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * A component that renders a given string as Markdown content,
 * with a bunch of useful styles applied.
 *
 * This is a thin wrapper around `react-markdown`, but it includes
 * a bunch of useful styles for things like headings, paragraphs,
 * code blocks, blockquotes, lists, tables, etc.
 *
 * You can use it like this:
 *
 */ 
export function MdxContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: (props) => (
          <h1
            className="text-3xl font-bold mt-10 mb-4 border-b pb-2"
            {...props}
          />
        ),
        h2: (props) => (
          <h2 className="text-2xl font-semibold mt-8 mb-3" {...props} />
        ),
        h3: (props) => (
          <h3 className="text-xl font-medium mt-6 mb-2" {...props} />
        ),
        p: (props) => <p className="leading-7 mb-4 text-base" {...props} />,
        code: (props) => {
          const { inline, className, children, ...restProps } = props as {
            inline?: boolean;
            className?: string;
            children: React.ReactNode;
            [key: string]: unknown;
          };

          if (inline) {
            return (
              <code
                className="bg-muted px-1 py-0.5 rounded text-sm font-mono"
                {...restProps}
              >
                {children}
              </code>
            );
          }

          return (
            <div className="my-4">
              <pre
                className="bg-muted p-4 rounded-md overflow-x-auto text-sm"
                {...restProps}
              >
                <code className={`font-mono ${className || ""}`}>
                  {children}
                </code>
              </pre>
            </div>
          );
        },
        blockquote: (props) => (
          <blockquote
            className="border-l-4 pl-4 italic opacity-70 text-muted-foreground"
            {...props}
          />
        ),
        ul: (props) => (
          <ul className="list-disc list-inside mb-4 space-y-1" {...props} />
        ),
        ol: (props) => (
          <ol className="list-decimal list-inside mb-4 space-y-1" {...props} />
        ),
        table: (props) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border border-muted">
              {props.children}
            </table>
          </div>
        ),
        th: (props) => (
          <th className="border px-2 py-1 bg-muted font-semibold">
            {props.children}
          </th>
        ),
        td: (props) => <td className="border px-2 py-1">{props.children}</td>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
