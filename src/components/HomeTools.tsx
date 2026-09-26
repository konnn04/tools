"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { groupTools, TOOLS } from "@/lib/tools";

/** Accent- and case-insensitive, so "chinh sua anh" finds "Chỉnh sửa ảnh". */
function fold(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .trim();
}

export function HomeTools() {
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const needle = fold(query);
    const list = needle
      ? TOOLS.filter((t) =>
          fold([t.name, t.tagline, t.nameVi, t.descriptionVi, ...t.keywords].join(" ")).includes(needle),
        )
      : TOOLS;
    return groupTools(list);
  }, [query]);

  return (
    <>
      <div className="home__search">
        <Search size={15} />
        <input
          type="search"
          value={query}
          placeholder="Search tools…"
          aria-label="Search tools"
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button type="button" aria-label="Clear search" onClick={() => setQuery("")}>
            <X size={14} />
          </button>
        )}
      </div>

      {groups.length === 0 && <p className="home__empty">No tool matches “{query}”.</p>}

      {groups.map(([category, label, list]) => (
        <section key={category} className="home__group">
          <h2 className="home__group-title">{label}</h2>
          <div className="home__grid">
            {list.map((tool) => (
              <Link key={tool.id} className="home__card" href={tool.path}>
                <span className="home__card-icon">
                  <tool.icon size={22} />
                </span>
                <span className="home__card-name">{tool.name}</span>
                <span className="home__card-desc">{tool.tagline}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
