import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI, { APIError } from "openai";
import { checkSubscription } from "@/lib/subscription";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limits";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount=1, resolution="512x512" } = body;
    const isPro = await checkSubscription();


    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

      const freeTrial = await checkApiLimit();

      if (!freeTrial && !isPro) {
        return new NextResponse("Free trial has expired.", { status: 403 });
      }

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount,10),
      size: resolution,
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof APIError) {
      const errorMessage = error.message || "OpenAI API Error";
      return new NextResponse(errorMessage, { status: error.status || 500 });
    } else {
      // Handle other errors
      console.error("[IMAGE_ERROR]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
}
