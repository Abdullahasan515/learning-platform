"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
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
  const router = useRouter()
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
    <div className="min-h-screen bg-gradient-to-br from-[#3F1F8C] via-[#1D96D3] to-[#97C945]">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-xl sticky top-0 z-40 bg-black/30">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-14 md:h-14">
              <Image
                src="/apple-icon.png"
                alt="شعار المنصة التعليمية"
                fill
                priority
                className="object-contain drop-shadow-[0_0_30px_rgba(56,189,248,0.7)]"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">اختبار المقرر</h1>
              <p className="text-slate-100/80 text-sm">قيّم فهمك لمحتوى المقرر</p>
            </div>
          </div>
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="gap-2 text-slate-100 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              الرجوع للوحة التحكم
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 text-white">
        {!submitted ? (
          <div className="space-y-8">
            {/* Quiz Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2">اختبار المقرر</h1>
              <p className="text-slate-100/80">
                السؤال {currentQuestion + 1} من {questions.length}
              </p>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#97C945] via-[#1D96D3] to-[#3F1F8C] transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <Card className="glass-effect border-white/30 bg-black/40 p-8">
              <h2 className="text-2xl font-bold mb-8 text-white">{question.question}</h2>

              {/* Options */}
              <div className="space-y-4 mb-8">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={submitted}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-right font-medium ${
                      answers[currentQuestion] === index
                        ? "border-[#1D96D3] bg-[#1D96D3]/10 text-white"
                        : "border-white/30 hover:border-[#1D96D3]/70 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          answers[currentQuestion] === index
                            ? "border-[#1D96D3] bg-[#1D96D3]"
                            : "border-white/40"
                        }`}
                      >
                        {answers[currentQuestion] === index && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="flex-1">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex gap-4 pt-6 border-t border-white/20">
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className="border-white/40 text-white hover:bg-white/10"
                >
                  السابق
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNextQuestion}
                  disabled={currentQuestion === questions.length - 1}
                  className="border-white/40 text-white hover:bg.white/10"
                >
                  التالي
                </Button>
                {currentQuestion === questions.length - 1 && (
                  <Button
                    onClick={handleSubmitQuiz}
                    disabled={!isAnswered}
                    className="ml-auto bg-gradient-to-r from-[#97C945] via-[#1D96D3] to-[#3F1F8C] hover:opacity-90 text-white"
                  >
                    إنهاء الاختبار
                  </Button>
                )}
              </div>
            </Card>
          </div>
        ) : (
          /* Results Screen */
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-block mb-6">
                {score >= 70 ? (
                  <CheckCircle2 className="w-20 h-20 text-green-300" />
                ) : (
                  <XCircle className="w-20 h-20 text-red-300" />
                )}
              </div>
              <h1 className="text-4xl font-bold mb-2">
                {score >= 70 ? "نتيجة ممتازة!" : "حاول مرة أخرى"}
              </h1>
              <p className="text-slate-100/80 text-lg">
                حصلت على <span className="text-[#97C945] font-bold">{score}%</span>
              </p>
            </div>

            {/* Results Details */}
            <Card className="glass-effect border-white/30 bg-black/40 p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">إجاباتك</h2>
              <div className="space-y-4">
                {questions.map((q, index) => (
                  <div key={index} className="pb-4 border-b border-white/20">
                    <p className="font-semibold mb-2">{q.question}</p>
                    <p
                      className={`text-sm mb-1 ${
                        answers[index] === q.correctAnswer ? "text-green-300" : "text-red-300"
                      }`}
                    >
                      إجابتك:{" "}
                      {answers[index] >= 0 ? q.options[answers[index]] : "لم يتم اختيار إجابة"}
                    </p>
                    {answers[index] !== q.correctAnswer && (
                      <p className="text-sm text-green-300">
                        الإجابة الصحيحة: {q.options[q.correctAnswer]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-[#97C945] via-[#1D96D3] to-[#3F1F8C] hover:opacity-90 text-white">
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
                  className="flex-1 border-white/40 text-white hover:bg-white/10"
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
