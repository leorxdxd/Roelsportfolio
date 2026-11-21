import type { ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: string;
  id?: string;
  lead?: ReactNode;
  center?: boolean;
}

export default function SectionHeader({ eyebrow, title, id, lead, center }: Props) {
  return (
    <div className={`section-header${center ? " section-header--center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}
