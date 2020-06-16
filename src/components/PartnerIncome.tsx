import { PartnerUserInput } from '../types/PageUserInputs'
import React, { useEffect, useRef } from 'react'
import { FormikProps } from 'formik'
import {
  AppliedQuestion,
  ConditionsQuestion,
  EligiblePartnerForm,
  HouseholdQuestion,
  IncomeQuestion,
  NotEligible,
  PreviousButton,
  SubmitButton,
} from './PartnerIncomeQuestions'
import { validatePartnerIncome } from '../lib/validatePartnerIncome'

const scrollToElement = (element) => {
  if (element && element.current) {
    element.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

export interface PartnerIncomeProps extends FormikProps<PartnerUserInput> {
  step: number
  setStep: (step: number) => void
}

export const PartnerIncome = (props: PartnerIncomeProps) => {
  const { values, setStep, step } = props
  const questionElements = [useRef(), useRef(), useRef(), useRef(), useRef()]

  useEffect(() => {
    scrollToElement(questionElements[step])
  }, [step, questionElements])

  const previousStep = () => {
    setStep(step - 1)
    scrollToElement(questionElements[step - 1].current)
  }

  const questions: React.FC<any>[] = [IncomeQuestion]

  const addQuestionForStep = (currentStep, NextQuestion) => {
    if (step >= currentStep) {
      if (validatePartnerIncome(values, currentStep)) {
        questions.push(NextQuestion)
      } else {
        questions.push(NotEligible)
      }
    }
  }

  addQuestionForStep(1, HouseholdQuestion)
  addQuestionForStep(2, AppliedQuestion)
  addQuestionForStep(3, ConditionsQuestion)
  addQuestionForStep(4, EligiblePartnerForm)

  return (
    <>
      {questions.map((Question, index) => {
        const isLast = index === step

        return (
          <div
            style={isLast ? {} : { opacity: 0.5 }}
            key={index}
            ref={questionElements[index]}
          >
            <Question {...props} disabled={!isLast} />
          </div>
        )
      })}
      {step > 0 && <PreviousButton onClick={previousStep} />} <SubmitButton />
    </>
  )
}
