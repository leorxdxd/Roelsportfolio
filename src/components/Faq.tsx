import { faqs } from "../data/content";
import { delay } from "../lib/style";
import Icon from "./Icon";

export default function Faq({ limit }: { limit?: number }) {
  const list = limit ? faqs.slice(0, limit) : faqs;
  return (
    <div className="faq">
      {list.map((f, i) => (
        <details key={f.q} className="faq__item" data-reveal style={delay(i * 60)}>
          <summary>
            <span>{f.q}</span>
            <span className="faq__icon" aria-hidden="true">
              <Icon name="chevronDown" size={18} />
            </span>
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
