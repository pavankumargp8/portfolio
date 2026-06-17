import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Background from "./components/layout/Background";
import ScrollProgress from "./components/layout/ScrollProgress";

import Hero from "./components/Hero/Hero";

import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Education from "./components/sections/Education";
import Achievements from "./components/sections/Achievements";

import Loader from "./components/ui/Loader";
import Spotlight from "./components/ui/Spotlight";
import GridBackground from "./components/ui/GridBackground";

function App() {
  return (
    <>
      
  <Loader />

  <Background />
  <GridBackground />
  <Spotlight />
  <ScrollProgress />

  <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <Footer />
      </main>
    </>
  );
}

export default App;