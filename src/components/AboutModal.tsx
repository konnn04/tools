"use client";

import { Bug, ExternalLink, Github } from "lucide-react";
import { Modal } from "@/shared/ui";
import { APP_INFO, CREDITS } from "@/lib/app-info";
import { SITE_NAME } from "@/lib/site";

export function AboutModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal open onClose={onClose} title={`About ${SITE_NAME}`} width="min(92vw, 480px)">
      <div className="about">
        <div>
          <p className="about__name">
            {SITE_NAME} <span className="about__version">v{APP_INFO.version}</span>
          </p>
          <p className="about__desc">Free tools that run entirely in your browser — no sign-up, no upload.</p>
        </div>

        <dl className="about__facts">
          <dt>Author</dt>
          <dd>
            {APP_INFO.authorUrl ? (
              <a href={APP_INFO.authorUrl} target="_blank" rel="noreferrer">
                {APP_INFO.author}
              </a>
            ) : (
              APP_INFO.author
            )}
          </dd>
          <dt>Version</dt>
          <dd>{APP_INFO.version}</dd>
          <dt>License</dt>
          <dd>{APP_INFO.license}</dd>
        </dl>

        <div className="about__links">
          {APP_INFO.repo && (
            <a className="ui-btn ui-btn--primary" href={APP_INFO.repo} target="_blank" rel="noreferrer">
              <Github size={15} /> Source on GitHub
            </a>
          )}
          {APP_INFO.issues && (
            <a className="ui-btn ui-btn--subtle" href={APP_INFO.issues} target="_blank" rel="noreferrer">
              <Bug size={15} /> Report an issue
            </a>
          )}
        </div>

        <div>
          <p className="about__label">Built with</p>
          <ul className="about__credits">
            {CREDITS.map((c) => (
              <li key={c.name}>
                <a href={c.url} target="_blank" rel="noreferrer">
                  {c.name} <ExternalLink size={11} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
