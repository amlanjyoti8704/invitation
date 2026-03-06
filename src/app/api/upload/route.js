import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {

    const body = await req.json();

    const result = await cloudinary.uploader.upload(
      body.image,
      {
        folder: "events"
      }
    );

    return Response.json({
      url: result.secure_url
    });

  } catch (error) {

    console.error("UPLOAD ERROR:", error);

    return Response.json(
      { error: "Upload failed" },
      { status: 500 }
    );

  }
}