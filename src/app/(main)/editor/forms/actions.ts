"use server";

import { GenerateSummaryInput, generateSummarySchema } from "@/lib/validation";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummary(input: GenerateSummaryInput) {
  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `
  You are a job resume generator AI. Your task is to write a professional introduction summary for a resume given the user's provided data
  Only resturn the summary and do not include any other information in the response. Keep it concise and professional.
  `;

  const userMessage = `
  Please generate a professional resume summary from this data:
  
  Job Title: ${jobTitle || "N/A"}
  Work Experiences: 
    ${workExperiences
      ?.map(
        (exp) => `
    Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}
    
    Description: ${exp.description || "N/A"}
  `,
      )
      .join("\n")}

  Educations:
    ${educations
      ?.map(
        (edu) => `
        Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}`,
      )
      .join("\n")}
  
  Skills: 
  ${skills}
  `;

  console.log("systemMessage", systemMessage);
  console.log("userMessage", userMessage);

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
    model: "deepseek-chat",
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("No response from AI");
  }

  return aiResponse;
}
