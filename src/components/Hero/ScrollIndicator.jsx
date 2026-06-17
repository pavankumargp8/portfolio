import { ChevronDown } from "react-feather";

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">

      <a href="#about">
        <ChevronDown />
      </a>

    </div>
  );
}