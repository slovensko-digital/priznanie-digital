import { RentUserInput } from "../types/PageUserInputs";
import React, { useEffect, useRef } from "react";
import { FormikProps } from "formik";
import {
  ApplyForBonusQuestion,
  IncomeQuestion,
  OslobodenieQuestion,
  OslobodenieVyskaQuestion,
  VydavkyQuestion,
  PreviousButton,
  SubmitButton,
} from "./RentFormSteps";

const scrollToElement = (element, smooth = true) => {
  if (element && element.current) {
    element.current.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "center",
    });
  }
};

export interface RentFormProps extends FormikProps<RentUserInput> {
  step: number;
  setStep: (step: number) => void;
}

export const RentForm = (props: RentFormProps) => {
  const { setStep, step } = props
  const questionElements = [
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
      questions.push(NextQuestion);
    }
  };

  addQuestionForStep(1, IncomeQuestion);
  addQuestionForStep(2, VydavkyQuestion);
  addQuestionForStep(3, OslobodenieQuestion);
  addQuestionForStep(4, OslobodenieVyskaQuestion);

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
