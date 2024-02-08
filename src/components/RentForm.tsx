import { RentUserInput } from '../types/PageUserInputs'
import React, { useEffect, useRef } from 'react'
import { FormikProps } from 'formik'
import {
  ApplyForBonusQuestion,
  IncomeQuestion,
  OslobodenieQuestion,
  OslobodenieVyskaQuestion,
  VydavkyQuestion,
  VydavkyFormaQuestion,
  NotEligible,
  PreviousButton,
  SubmitButton,
} from './RentFormSteps'
import { validateRentForm } from '../lib/validateRentForm'

const scrollToElement = (element, smooth = true) => {
  if (element && element.current) {
    element.current.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'center',
    })
  }
}

export interface RentFormProps extends FormikProps<RentUserInput> {
  step: number
  setStep: (step: number) => void
}

export const RentForm = (props: RentFormProps) => {
  const { values, setStep, step } = props
  const questionElements = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ]

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
      if (validateRentForm(values, currentStep)) {
        questions.push(NextQuestion)
      } else {
        questions.push(NotEligible)
      }
    }
  }

  addQuestionForStep(1, IncomeQuestion)
  addQuestionForStep(2, OslobodenieQuestion)
  addQuestionForStep(3, OslobodenieVyskaQuestion)
  addQuestionForStep(4, VydavkyQuestion)
  addQuestionForStep(5, VydavkyFormaQuestion)

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
