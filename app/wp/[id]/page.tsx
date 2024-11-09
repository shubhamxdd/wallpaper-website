import { searchCloudinaryImageByFilename } from "@/config/cloudinary";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function WallpaperPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // console.log(id);
  const wall = await searchCloudinaryImageByFilename(id);

  // console.log(wall)

  if (!wall) {
    // console.log("Not found");
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Image
          src={wall.secure_url}
          alt="Wallpaper"
          width={wall.width}
          height={wall.height}
          className="rounded-lg shadow-lg"
          priority
        />
        <div className="mt-4">
          <h1 className="text-2xl font-bold">Wallpaper Details</h1>
          <p className="my-2">Name: {wall.filename}</p>
          <p>
            Resolution: {wall.width} x {wall.height}
          </p>
          <a
            href={wall.secure_url}
            download
            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download Wallpaper
          </a>
        </div>
      </div>
    </div>
  );
}