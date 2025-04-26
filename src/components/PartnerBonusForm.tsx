import { PartnerUserInput } from '../types/PageUserInputs'
import React, { useEffect, useRef } from 'react'
import { FormikProps } from 'formik'
import {
  ApplyForBonusQuestion,
  ConditionsQuestion,
  EligiblePartnerForm,
  HouseholdQuestion,
  IncomeQuestion,
  NotEligible,
  PreviousButton,
  SubmitButton,
} from './PartnerBonusFormSteps'
import { validatePartnerBonusForm } from '../lib/validatePartnerBonusForm'

const scrollToElement = (element, smooth = true) => {
  if (element && element.current) {
    element.current.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'center',
    })
  }
}

export interface PartnerBonusFormProps extends FormikProps<PartnerUserInput> {
  step: number
  setStep: (step: number) => void
}

export const PartnerBonusForm = (props: PartnerBonusFormProps) => {
  const { values, setStep, step } = props
  const questionElements = [useRef(undefined), useRef(undefined), useRef(undefined), useRef(undefined), useRef(undefined)]

  useEffect(() => {
    setTimeout(() => {
      scrollToElement(questionElements[step])
    }, 25)
  }, [step, questionElements])

  const previousStep = () => {
    setStep(step - 1)
  }

  const questions: React.FC<any>[] = [ApplyForBonusQuestion]

  const addQuestionForStep = (currentStep, NextQuestion) => {
    if (step >= currentStep) {
      if (validatePartnerBonusForm(values, currentStep)) {
        questions.push(NextQuestion)
      } else {
        questions.push(NotEligible)
      }
    }
  }

  addQuestionForStep(1, HouseholdQuestion)
  addQuestionForStep(2, ConditionsQuestion)
  addQuestionForStep(3, IncomeQuestion)
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
