import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI, { APIError } from "openai";
import { checkSubscription } from "@/lib/subscription";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limits";
export const runtime = 'edge'; // Add this line to enable Edge Runtime

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;
    const isPro = await checkSubscription();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired.", { status: 403 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a code generator. You must answer only in markdown code snippets. Use code comments to explain the code. Analyse code erros and fix them. Autocomplete half code snippets provided.",
        },
        ...messages,
      ],
    });

    if (!isPro) {
      await increaseApiLimit();
    }
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    if (error instanceof APIError) {
      const errorMessage = error.message || "OpenAI API Error";
      return new NextResponse(errorMessage, { status: error.status || 500 });
    } else {
      console.error("[CODE_ERROR]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
}
