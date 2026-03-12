import React from "react";
import NextImage from "next/image";

/**
 * A simple custom block renderer for Notion API data.
 * This converts Notion's JSON blocks into React components with Tailwind styling.
 */
export function renderBlock(block: any) {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p key={id} className="mb-6 text-slate-300">
          {value.rich_text.map((t: any, idx: number) => (
            <span
              key={idx}
              className={`${t.annotations.bold ? "font-bold text-white" : ""} ${
                t.annotations.italic ? "italic" : ""
              } ${t.annotations.underline ? "underline" : ""} ${
                t.annotations.code ? "rounded bg-midnight-800 px-1 py-0.5 font-mono text-sm text-gold-300" : ""
              }`}
            >
              {t.href ? (
                <a href={t.href} className="text-teal-400 hover:text-teal-300 underline underline-offset-4">
                  {t.plain_text}
                </a>
              ) : (
                t.plain_text
              )}
            </span>
          ))}
        </p>
      );
    case "heading_1":
      return (
        <h1 key={id} className="mb-6 mt-12 font-display text-4xl font-bold text-gold-200">
          {value.rich_text[0]?.plain_text}
        </h1>
      );
    case "heading_2":
      return (
        <h2 key={id} className="mb-4 mt-10 font-display text-3xl font-semibold text-gold-300">
          {value.rich_text[0]?.plain_text}
        </h2>
      );
    case "heading_3":
      return (
        <h3 key={id} className="mb-4 mt-8 font-display text-2xl font-semibold text-white">
          {value.rich_text[0]?.plain_text}
        </h3>
      );
    case "bulleted_list_item":
      case "numbered_list_item":
      return (
        <li key={id} className="mb-2 ml-4 list-disc text-slate-300">
          {value.rich_text.map((t: any, idx: number) => (
             <span
             key={idx}
             className={`${t.annotations.bold ? "font-bold text-white" : ""} ${
               t.annotations.italic ? "italic" : ""
             }`}
           >
             {t.plain_text}
           </span>
          ))}
        </li>
      );
    case "image":
      const src = value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure key={id} className="my-10">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-midnight-900">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src={src} alt={caption || "Clinical Insight Figure"} className="h-full w-full object-cover" />
          </div>
          {caption && <figcaption className="mt-3 text-center text-sm text-slate-500">{caption}</figcaption>}
        </figure>
      );
    case "quote":
      return (
        <blockquote key={id} className="my-8 border-l-4 border-gold-500/50 bg-gold-500/5 py-4 pl-6 pr-4 italic text-slate-200">
           {value.rich_text[0]?.plain_text}
        </blockquote>
      )
    default:
      console.warn(`Unsupported block type: ${type}`);
      return <div key={id} className="hidden" />;
  }
}
