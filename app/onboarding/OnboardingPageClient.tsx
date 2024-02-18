"use client";

import { useState } from "react";
import Ellipse3 from "@/public/Ellipse3.png";
import Ellipse4 from "@/public/Ellipse4.png";
import PiggyBro from "@/public/PiggyBro.png";
import Thinking from "@/public/Thinking.png";
import Image from "next/image";

import { FaArrowAltCircleRight } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Onboarding({
  searchParams,
  submitInformation,
}: {
  searchParams: { message: string };
  submitInformation: (formData: FormData, step: number) => void;
}) {
  const [step, setStep] = useState(0);
  const steps = [
    "Welcome to the onboarding process. Let's get started!",
    "What's your first name?",
    "How much do you make per month?",
    "How much do you spend on rent per month?",
    "How much do you spend on groceries per month?",
    "How much do you spend on gas and insurance per month?",
    "What are your savings goals?",
  ];

  const nextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = async (e: any) => {
    if (step == 0) {
      nextStep();
      return;
    }
    e.preventDefault();
    await submitInformation(new FormData(e.target), step);
    // clear the input
    e.target.reset();
    if (step + 1 > 5) {
      return;
    }
    nextStep();
  };

  if (step == 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Image
          src={Ellipse4}
          alt="Ellipse4"
          width={700}
          height={700}
          className="absolute top-0 left-0 z-[-1]"
        />
        <Image
          src={Ellipse3}
          alt="Ellipse3"
          width={700}
          height={700}
          className="absolute bottom-0 right-0 z-[-1]"
        />
        <div className="flex flex-col items-center justify-center space-y-4">
          <Image
            src={PiggyBro}
            alt="PiggyBro"
            width={300}
            height={300}
            className="mx-auto z-5 mt-16"
          />
          <p className="mb-4 text-2xl font-bold mx-4">
            Hey <span className="text-[#09BFF6]">Future Thrifter</span>!
            Let&apos;s answer some questions before we start{" "}
            <span className="text-[#09BFF6]">splurging</span>.
          </p>
          <form onSubmit={handleSubmit}>
            <Button
              type="submit"
              className="bg-[#09BFF6] rounded-full mt-48 ml-48 shadow-sm"
            >
              Start Assessment
            </Button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-12">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={Thinking}
          alt="Thinking"
          width={300}
          height={300}
          className="mx-auto mt-[-12rem]"
        />
        <p className="mb-4 text-2xl font-bold mx-4 mt-[-16px]">
          Let&apos;s get to know you better.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <p className="mb-4 text-muted-foreground mx-4 text-center">
          {steps[step]}
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full"
        >
          <Input
            type="text"
            name="response"
            className="border border-gray-300 p-2 rounded-lg w-full"
            placeholder={steps[step]}
            required
          />
          <Button
            type="submit"
            className="bg-[#09BFF6] rounded-full mt-8 shadow-sm absolute bottom-16 right-8 mr-4"
          >
            Next
            <FaArrowAltCircleRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </div>
    </main>
  );
}
