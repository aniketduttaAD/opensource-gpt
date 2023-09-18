import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { checkSubscription } from "@/lib/subscription";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limits";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired.", { status: 403 });
    }
    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt: prompt,
        },
      }
    );
    // const response = await replicate.run(
    //   "andreasjansson/stable-diffusion-animation:ca1f5e306e5721e19c473e0d094e6603f0456fe759c10715fcd6c1b79242d4a5",
    //   {
    //     input: {
    //       prompt_start: prompt,
    //     },
    //   }
    // );
    //     await replicate.run(
    //   "nateraw/stable-diffusion-videos:2d87f0f8bc282042002f8d24458bbf588eee5e8d8fffb6fbb10ed48d1dac409e",
    //   {
    //     input: {
    //       prompts: "a cat | a dog | a horse"
    //     }
    //   }
    // );
    if (!isPro) {
      await increaseApiLimit();
    }
    return NextResponse.json(response);
  } catch (error) {
    console.log("[VIDEO_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
