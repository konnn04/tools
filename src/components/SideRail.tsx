"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Info, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { groupTools, toolByPath, TOOLS } from "@/lib/tools";
import { AboutModal } from "./AboutModal";
import { SettingsMenu } from "./SettingsMenu";

const GROUPS = groupTools(TOOLS);

/** Left navigation: home, every tool by category, settings at the bottom. Folds to icons on tool pages. */
export function SideRail() {
  const pathname = usePathname() ?? "/";
  const isHome = pathname === "/";
  const active = toolByPath(pathname);

  // auto-collapse when entering a tool, expand on home; the toggle overrides until the next navigation
  const [railPath, setRailPath] = useState(pathname);
  const [collapsed, setCollapsed] = useState(!isHome);
  if (railPath !== pathname) {
    setRailPath(pathname);
    setCollapsed(!isHome);
  }
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <nav
      className={`site__rail ${collapsed ? "site__rail--collapsed" : ""}`}
      aria-label="Tools"
    >
      <button
        type="button"
        className="site__rail-item"
        aria-expanded={!collapsed}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={() => setCollapsed((v) => !v)}
      >
        {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        <span className="site__rail-label">Collapse</span>
      </button>

      <div className="site__rail-scroll">
        <Link
          className={`site__rail-item ${isHome ? "site__rail-item--active" : ""}`}
          href="/"
          title="Home"
        >
          <House size={18} />
          <span className="site__rail-label">Home</span>
        </Link>

        {GROUPS.map(([category, label, list]) => (
          <div
            key={category}
            className="site__rail-group"
            role="group"
            aria-label={label}
          >
            <span className="site__rail-group-title">{label}</span>
            {list.map((tool) => (
              <Link
                key={tool.id}
                className={`site__rail-item ${active?.id === tool.id ? "site__rail-item--active" : ""}`}
                href={tool.path}
                title={tool.name}
              >
                <tool.icon size={18} />
                <span className="site__rail-label">{tool.name}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="site__rail-footer">
        <SettingsMenu />
        <button type="button" className="site__rail-item" title="About" onClick={() => setAboutOpen(true)}>
          <Info size={18} />
          <span className="site__rail-label">About</span>
        </button>
      </div>

      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
    </nav>
  );
}
