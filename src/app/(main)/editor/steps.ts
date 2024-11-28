import React from "react";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import { EditorFromProps } from "@/lib/type";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFromProps>;
  key: string;
}[] = [
  {
    title: "General info",
    component: GeneralInfoForm,
    key: "general-info",
  },
  {
    title: "Personal info",
    component: PersonalInfoForm,
    key: "personal-info",
  },
];
