import Button from "../../ui/Button";

export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap gap-4">

      <a href="#projects">
        <Button>
          View My Work
        </Button>
      </a>

      <a
        href="/resume.pdf"
        download
      >
        <Button variant="secondary">
          Download CV
        </Button>
      </a>

    </div>
  );
}