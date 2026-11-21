import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { delay } from "../lib/style";

interface Props {
  crumb: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  parent?: { label: string; to: string };
}

/** Top banner used on inner pages. */
export default function PageHeader({ crumb, eyebrow, title, lead, children, parent }: Props) {
  return (
    <section className="page-header">
      <div className="page-header__bg" aria-hidden="true" />
      <div className="container page-header__inner">
        <nav aria-label="Breadcrumb" className="crumbs">
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            {parent && (
              <li>
                <Link to={parent.to}>{parent.label}</Link>
              </li>
            )}
            <li aria-current="page">{crumb}</li>
          </ol>
        </nav>
        {eyebrow && (
          <p className="eyebrow" data-reveal>
            {eyebrow}
          </p>
        )}
        <h1 className="page-header__title" data-reveal style={delay(60)}>
          {title}
        </h1>
        {lead && (
          <p className="page-header__lead" data-reveal style={delay(120)}>
            {lead}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
