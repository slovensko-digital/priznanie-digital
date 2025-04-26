import { UrokyUserInput } from "../types/PageUserInputs";
import React, { useEffect, useRef } from "react";
import { FormikProps } from "formik";
import {
  DalsiDlzniciQuestion,
  ApplyForBonusQuestion,
  ZaciatokUveruQuestion,
  ZaplateneUrokyQuestion,
  NotEligible,
  PreviousButton,
  SubmitButton,
  DalsiUverQuestion,
  VekQuestion,
  PrijemQuestion,
} from "./UrokyBonusFormSteps";
import { validateUrokyBonusForm } from "../lib/validateUrokyBonusForm";

const scrollToElement = (element, smooth = true) => {
  if (element && element.current) {
    element.current.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "center",
    });
  }
};

export interface UrokyBonusFormProps extends FormikProps<UrokyUserInput> {
  step: number;
  setStep: (step: number) => void;
}

export const UrokyBonusForm = (props: UrokyBonusFormProps) => {
  const { values, setStep, step } = props;
  const questionElements = [
    useRef(undefined),
    useRef(undefined),
    useRef(undefined),
    useRef(undefined),
    useRef(undefined),
    useRef(undefined),
    useRef(undefined),
  ]

  useEffect(() => {
    setTimeout(() => {
      scrollToElement(questionElements[step]);
    }, 25);
  }, [step, questionElements]);

  const previousStep = () => {
    setStep(step - 1);
  };

  const questions: React.FC<{ disabled?: boolean }>[] = [ApplyForBonusQuestion];

  const addQuestionForStep = (currentStep, NextQuestion) => {
    if (step >= currentStep) {
      if (validateUrokyBonusForm(values, currentStep)) {
        questions.push(NextQuestion);
      } else {
        questions.push(NotEligible);
      }
    }
  };

  addQuestionForStep(1, DalsiUverQuestion);
  addQuestionForStep(2, ZaciatokUveruQuestion);
  addQuestionForStep(3, DalsiDlzniciQuestion);
  addQuestionForStep(4, VekQuestion);
  addQuestionForStep(5, PrijemQuestion);
  addQuestionForStep(6, ZaplateneUrokyQuestion);

  return (
    <>
      {questions.map((Question, index) => {
        const isLast = index === step;

        return (
          <div
            style={isLast ? {} : { opacity: 0.5 }}
            key={index}
            ref={questionElements[index]}
          >
            <Question {...props} disabled={!isLast} />
          </div>
        );
      })}
      {step > 0 && <PreviousButton onClick={previousStep} />} <SubmitButton />
    </>
  );
};
