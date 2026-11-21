import type { ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  lead?: ReactNode;
  center?: boolean;
  action?: ReactNode;
}

export default function SectionHeader({ eyebrow, title, id, lead, center, action }: Props) {
  return (
    <div className={`section-header${center ? " section-header--center" : ""}${action ? " section-header--split" : ""}`}>
      <div data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title" id={id}>
          {title}
        </h2>
        {lead && <p className="section-lead">{lead}</p>}
      </div>
      {action && <div data-reveal>{action}</div>}
    </div>
  );
}
