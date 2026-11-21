import { process } from "../data/content";
import Icon from "./Icon";
import Tabs from "./Tabs";

/** Interactive "How I work" stepper. */
export default function ProcessSteps() {
  return (
    <Tabs
      label="How I work"
      variant="steps"
      items={process.map((step, i) => ({
        id: step.title.toLowerCase().replace(/\W+/g, "-"),
        label: (
          <>
            <span className="step__num">0{i + 1}</span>
            <span className="step__text">
              <span className="step__title">{step.title}</span>
              <span className="step__summary">{step.summary}</span>
            </span>
          </>
        ),
        content: (
          <div className="step-panel">
            <span className="icon-box icon-box--lg" aria-hidden="true">
              <Icon name={step.icon} size={24} />
            </span>
            <div>
              <p className="step-panel__kicker">
                Step {i + 1} of {process.length}
              </p>
              <h3 className="step-panel__title">{step.title}</h3>
              <ul className="checklist">
                {step.details.map((d) => (
                  <li key={d}>
                    <Icon name="check" size={18} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ),
      }))}
    />
  );
}
