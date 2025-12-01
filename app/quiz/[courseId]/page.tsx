"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

const QUIZ_DATA: Record<number, Question[]> = {
  1: [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
      ],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: "Which CSS property is used to change text color?",
      options: ["text-color", "color", "font-color", "text-style"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "What is the correct way to declare a JavaScript variable?",
      options: ["variable x = 5", "var x = 5", "x = 5 var", "declare x = 5"],
      correctAnswer: 1,
    },
  ],
  2: [
    {
      id: 1,
      question: "What is a generic type in TypeScript?",
      options: [
        "A type that can work with any data type",
        "A function that returns a type",
        "A type that is not specified",
        "A type that is used only once",
      ],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: "How do you create a union type in TypeScript?",
      options: ["type T = A & B", "type T = A | B", "type T = A + B", "type T = A, B"],
      correctAnswer: 1,
    },
  ],
}

export default function QuizPage() {
  const params = useParams()
  const courseId = Number.parseInt(params.courseId as string)

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const quizQuestions = QUIZ_DATA[courseId] || []
    setQuestions(quizQuestions)
    setAnswers(new Array(quizQuestions.length).fill(-1))
  }, [courseId])

  const handleSelectAnswer = (optionIndex: number) => {
    if (!submitted) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = optionIndex
      setAnswers(newAnswers)
    }
  }

  const handleSubmitQuiz = () => {
    const correctCount = questions.reduce((acc, question, index) => {
      return acc + (answers[index] === question.correctAnswer ? 1 : 0)
    }, 0)

    setScore(Math.round((correctCount / questions.length) * 100))
    setSubmitted(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  if (questions.length === 0) return null

  const question = questions[currentQuestion]
  const isAnswered = answers[currentQuestion] !== -1

  return (
    <div className="min-h-screen bg-gradient-to.br from-[#F5FFF7] via-[#F3F7FF] to-[#F7F3FF]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-1.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 md:w-16 md:h-16">
              <Image
                src="/apple-icon.png"
                alt="شعار المنصة التعليمية"
                fill
                priority
                className="object-contain drop-shadow-[0_0_20px_rgba(63,31,140,0.5)]"
              />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-slate-900">اختبار المقرر</h1>
              <p className="text-slate-600 text-xs md:text-sm">قيّم فهمك للمحتوى المرئي الذي شاهدته.</p>
            </div>
          </div>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="gap-2 border-slate-300 bg-white/70 text-slate-800 hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              الرجوع للوحة التحكم
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {!submitted ? (
          <div className="space-y-8">
            {/* Quiz header */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">اختبار المقرر</h2>
              <p className="text-slate-600 text-sm md:text-base">
                السؤال {currentQuestion + 1} من {questions.length}
              </p>
            </div>

            {/* Progress bar */}
            <div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#3F1F8C] via-[#1D96D3] to-[#97C945] transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question card */}
            <Card className="bg-white/90 border border-slate-200 shadow-md p-6 md:p-7">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">{question.question}</h3>

              <div className="space-y-3 mb-6">
                {question.options.map((option, index) => {
                  const isSelected = answers[currentQuestion] === index
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelectAnswer(index)}
                      className={`w-full text-right p-3 rounded-lg border-2 text-sm md:text-base transition-colors ${
                        isSelected
                          ? "border-[#1D96D3] bg-[#F3F7FF]"
                          : "border-slate-200 bg-white hover:border-[#1D96D3] hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? "border-[#1D96D3] bg-[#1D96D3]" : "border-slate-300"
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="flex-1 text-slate-900">{option}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className="border-slate-300 text-slate-800 bg-white/80 hover:bg-slate-100 disabled:opacity-50"
                >
                  السابق
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNextQuestion}
                  disabled={currentQuestion === questions.length - 1}
                  className="border-slate-300 text-slate-800 bg.white/80 hover:bg-slate-100 disabled:opacity-50"
                >
                  التالي
                </Button>
                {currentQuestion === questions.length - 1 && (
                  <Button
                    onClick={handleSubmitQuiz}
                    disabled={!isAnswered}
                    className="ml-auto bg-gradient-to-r.from-[#3F1F8C] via-[#1D96D3] to-[#97C945] text-white hover:opacity-90 disabled:opacity-50"
                  >
                    إنهاء الاختبار
                  </Button>
                )}
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Result summary */}
            <div className="text-center">
              <div className="inline-block mb-5">
                {score >= 70 ? (
                  <CheckCircle2 className="w-16 h-16 text-green-600" />
                ) : (
                  <XCircle className="w-16 h-16 text-red-500" />
                )}
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {score >= 70 ? "نتيجة ممتازة!" : "تستطيع أن تحسّن أكثر"}
              </h2>
              <p className="text-slate-700 text-base md:text-lg">
                حصلت على{" "}
                <span className="font-bold text-[#3F1F8C]">
                  {score}%
                </span>{" "}
                في هذا الاختبار.
              </p>
            </div>

            {/* Answers details */}
            <Card className="bg-white/90 border border-slate-200 shadow-md p-6 md:p-7">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-5">إجاباتك</h3>
              <div className="space-y-4">
                {questions.map((q, index) => {
                  const userAnswerIndex = answers[index]
                  const isCorrect = userAnswerIndex === q.correctAnswer
                  return (
                    <div key={q.id} className="border-b border-slate-100 pb-3">
                      <p className="font-semibold text-slate-900 mb-1">{q.question}</p>
                      <p
                        className={`text-sm mb-1 ${
                          isCorrect ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        إجابتك:{" "}
                        {userAnswerIndex >= 0 ? q.options[userAnswerIndex] : "لم يتم اختيار إجابة"}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-700">
                          الإجابة الصحيحة: {q.options[q.correctAnswer]}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-3">
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-[#3F1F8C] via-[#1D96D3] to-[#97C945] text-white hover:opacity-90">
                  الرجوع للوحة التحكم
                </Button>
              </Link>
              {score < 70 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false)
                    setCurrentQuestion(0)
                    setAnswers(new Array(questions.length).fill(-1))
                    setScore(0)
                  }}
                  className="flex-1.border-slate-300 bg-white/80 text-slate-800 hover:bg-slate-100"
                >
                  إعادة الاختبار
                </Button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
