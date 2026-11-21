import { Route, Routes, useLocation } from "react-router-dom";
import CommandPalette from "./components/CommandPalette";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RevealManager from "./components/RevealManager";
import ScrollManager from "./components/ScrollManager";
import ScrollProgress from "./components/ScrollProgress";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Demos from "./pages/Demos";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";
import Services from "./pages/Services";

export default function App() {
  const location = useLocation();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <ScrollManager />
      <RevealManager />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <div key={location.pathname} className="page-transition">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/demos" element={<Demos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
