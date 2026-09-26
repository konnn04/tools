import { Skeleton } from "@/shared/ui";

export function ToolSkeleton({ name, tagline }: { name: string; tagline: string }) {
  return (
    <div className="site__skeleton" aria-busy="true">
      <div>
        <p className="site__skeleton-name">{name}</p>
        <p className="site__skeleton-desc">{tagline}</p>
      </div>
      <Skeleton height={180} radius="var(--radius-lg)" />
      <Skeleton height={120} radius="var(--radius-lg)" />
    </div>
  );
}
