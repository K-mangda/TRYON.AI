import { fal } from "@fal-ai/client";
import { NextRequest, NextResponse } from "next/server";

fal.config({ credentials: process.env.FAL_KEY });

export async function POST(req: NextRequest) {
  try {
    const { humanImageUrl, garmentImageUrl, category } = await req.json();

    if (!humanImageUrl || !garmentImageUrl) {
      return NextResponse.json({ error: "Missing images" }, { status: 400 });
    }

    const result = await fal.subscribe("fashn/tryon", {
      input: {
        model_image: humanImageUrl,
        garment_image: garmentImageUrl,
        category: category ?? "tops", // "tops" | "bottoms" | "one-pieces"
        adjust_hands: true,
        restore_background: true,
        restore_clothes: true,
      },
      logs: false,
    });

    const output = result.data as { image?: { url: string }; images?: { url: string }[] };
    const imageUrl =
      output?.image?.url ||
      (output?.images && output.images[0]?.url) ||
      null;

    if (!imageUrl) {
      return NextResponse.json({ error: "No output image" }, { status: 500 });
    }

    return NextResponse.json({ imageUrl });
  } catch (err: unknown) {
    console.error("[try-on API]", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
