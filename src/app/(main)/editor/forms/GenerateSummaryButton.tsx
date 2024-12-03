"use client";

import { Button } from "@/components/ui/button";
import { ResumeValues } from "@/lib/validation";

interface GenerateSummaryButtonProps {
  resume: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}
export default function GenerateSummaryButton({
  resume,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const { toast } = useToast();

  const { loading, setLoading } = useState(false);

  async function handleClick() {}
  return <Button>Generate Summary</Button>;
}
