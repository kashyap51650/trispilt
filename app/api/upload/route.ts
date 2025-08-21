import { imagekit } from "@/lib/imagekit";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const base64 = await file.arrayBuffer();
    const base64String = Buffer.from(base64).toString("base64");

    const response = await imagekit.upload({
      file: `data:${file.type};base64,${base64String}`,
      fileName: (file as any).name || "unknown",
    });

    return NextResponse.json(
      {
        message: "Image uploaded successfully",
        data: response.url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Image upload failed:", error);
    return NextResponse.json(
      {
        message: "Image upload failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
