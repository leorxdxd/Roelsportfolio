import React from "react";
import "../assets/styles/Testimonials.scss";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Arviel Raymundo",
      position: "CEO, Tech Innovators Inc.",
      feedback:
        "Roel is a truly exceptional developer. His precision, problem-solving mindset, and innovative approach consistently deliver results that exceed expectations.",
    },
    {
      name: "Edgar Baobaoen",
      position: "Project Manager, Creative Solutions",
      feedback:
        "Collaborating with Roel has been seamless and inspiring. His professionalism, technical mastery, and clear communication played a vital role in driving our projects forward.",
    },
    {
      name: "Mj Pajaron",
      position: "CTO, Digital Ventures",
      feedback:
        "Roel’s commitment to excellence sets him apart. Every project he touches reflects quality, creativity, and an unwavering dedication to success.",
    },
  ];

  return (
    <section className="testimonials-container" id="testimonials">
      <h2 className="section-title">Testimonials</h2>
      <div className="testimonials-list">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-item">
            <p className="testimonial-feedback">"{testimonial.feedback}"</p>
            <p className="testimonial-author">
              - {testimonial.name}, {testimonial.position}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

export {}; // Add this line
