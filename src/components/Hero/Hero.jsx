import HeroContent from "./HeroContent";
import DeveloperConsole from "./DeveloperConsole";
import FloatingOrbit from "./FloatingOrbit";
import ScrollIndicator from "./ScrollIndicator";
import Aurora from "./Aurora";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background */}
      <Aurora />

      {/* Main Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:px-10">

        {/* Left Side */}
        <HeroContent />

        {/* Right Side */}
        <div className="relative flex items-center justify-center">

          <FloatingOrbit />

          <DeveloperConsole />

        </div>

      </div>

      {/* Bottom Indicator */}
      <ScrollIndicator />
    </section>
  );
}