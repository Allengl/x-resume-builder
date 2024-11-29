import { EditorFormProps } from "@/lib/type";
import { Form, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workExperiencesSchema } from "@/lib/validation";
import { WorkExperienceValues } from "@/lib/validation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function WorkExperienceForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperiencesSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        workExperiences: values.workExperiences?.filter(
          (exp) => exp !== undefined,
        ),
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Work experience</h2>
        <p className="text-sm text-muted-foreground">
          Add your work experience to your resume
        </p>
      </div>
      <Form {...form}>
        {fields.map((field, index) => (
          <WorkExperienceItem key={field.id} index={index} />
        ))}
        <div className="flex justify-center">
          <Button
            type="button"
            onClick={() =>
              append({
                position: "",
                company: "",
                startDate: "",
                endDate: "",
                description: "",
              })
            }
          >
            Add work experience
          </Button>
        </div>
      </Form>
    </div>
  );
}

function WorkExperienceItem({ index }: { index: number }) {
  return <div>WorkExperienceItem</div>;
}
