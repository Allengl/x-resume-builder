import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/validation";
import { WandSparkles } from "lucide-react";
import { useState } from "react";
import { generateSummary } from "./actions";

interface GenerateSummaryButtonProps {
  resume: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}
export default function GenerateSummaryButton({
  resume,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      const aiResponse = await generateSummary(resume);
      onSummaryGenerated(aiResponse);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <LoadingButton
      variant="outline"
      type="button"
      loading={loading}
      onClick={handleClick}
    >
      <WandSparkles className="size-4" />
      Generate (AI)
    </LoadingButton>
  );
}
