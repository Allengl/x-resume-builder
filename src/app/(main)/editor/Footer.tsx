import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "./steps";
import { FileUserIcon, PenLineIcon } from "lucide-react";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmResumePreview: boolean;
  setShowSmResumePreview: (show: boolean) => void;
}

export default function Footer({
  currentStep,
  setCurrentStep,
  showSmResumePreview,
  setShowSmResumePreview,
}: FooterProps) {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;
  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key;

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            disabled={!previousStep}
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
          >
            Previous step
          </Button>
          <Button
            disabled={!nextStep}
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
          >
            Next step
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          title={
            showSmResumePreview ? "Show input form" : "Show resume preview"
          }
          onClick={() => setShowSmResumePreview(!showSmResumePreview)}
        >
          {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />} preview
        </Button>
        <div className="flex items-start gap-3">
          <Button variant="secondary" asChild>
            <Link href="/resumes">Close</Link>
          </Button>
          <p className="text-muted-foreground opacity-0">Saving...</p>
        </div>
      </div>
    </footer>
  );
}
