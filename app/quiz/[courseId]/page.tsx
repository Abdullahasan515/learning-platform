"use client"

import { useState, useEffect } from "react"
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
  const isCorrect = answers[currentQuestion] === question.correctAnswer

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {!submitted ? (
          <div className="space-y-8">
            {/* Quiz Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2">Course Quiz</h1>
              <p className="text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <Card className="glass-effect border-border/50 p-8">
              <h2 className="text-2xl font-bold mb-8">{question.question}</h2>

              {/* Options */}
              <div className="space-y-4 mb-8">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={submitted}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                      answers[currentQuestion] === index
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/50 hover:border-primary/50 hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          answers[currentQuestion] === index ? "border-primary bg-primary" : "border-border/50"
                        }`}
                      >
                        {answers[currentQuestion] === index && (
                          <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                        )}
                      </div>
                      {option}
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex gap-4 pt-6 border-t border-border/50">
                <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNextQuestion}
                  disabled={currentQuestion === questions.length - 1}
                >
                  Next
                </Button>
                {currentQuestion === questions.length - 1 && (
                  <Button
                    onClick={handleSubmitQuiz}
                    disabled={!isAnswered}
                    className="ml-auto bg-primary hover:bg-primary/90"
                  >
                    Submit Quiz
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
                  <CheckCircle2 className="w-20 h-20 text-green-600" />
                ) : (
                  <XCircle className="w-20 h-20 text-red-600" />
                )}
              </div>
              <h1 className="text-4xl font-bold mb-2">{score >= 70 ? "Great Job!" : "Try Again"}</h1>
              <p className="text-muted-foreground text-lg">
                You scored <span className="text-primary font-bold">{score}%</span>
              </p>
            </div>

            {/* Results Details */}
            <Card className="glass-effect border-border/50 p-8">
              <h2 className="text-2xl font-bold mb-6">Your Answers</h2>
              <div className="space-y-4">
                {questions.map((q, index) => (
                  <div key={index} className="pb-4 border-b border-border/50">
                    <p className="font-semibold mb-2">{q.question}</p>
                    <p
                      className={`text-sm mb-1 ${answers[index] === q.correctAnswer ? "text-green-600" : "text-red-600"}`}
                    >
                      Your answer: {q.options[answers[index]]}
                    </p>
                    {answers[index] !== q.correctAnswer && (
                      <p className="text-sm text-green-600">Correct answer: {q.options[q.correctAnswer]}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90">Back to Dashboard</Button>
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
                  className="flex-1"
                >
                  Retake Quiz
                </Button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
