import FilesRoot from "@/components/files/root";
import FileType from "@/types/file";
import UploadButton from "@/components/buttons/upload-button";

const files: FileType[] = [
  { id: 0, type: "folder", title: "Documents", size: 16546984 },
  { id: 1, type: "folder", title: "Photos", size: 68574289 },
  { id: 2, type: "image", title: "beach.jpg", size: 2987529 },
  { id: 3, type: "audio", title: "song.mp3", size: 59846512 },
  { id: 4, type: "video", title: "movie.mp4", size: 7052498526 },
  { id: 5, type: "document", title: "resume.pdf", size: 270354 },
  { id: 6, type: "spreadsheet", title: "budget.xlsx", size: 198262 },
  { id: 7, type: "image", title: "mountain.png", size: 5695984 },
  { id: 8, type: "audio", title: "podcast.wav", size: 51619841 },
  { id: 9, type: "text", title: "notes.txt", size: 89674 },
];

export default function Home() {
  return (
    <>
      <div className="w-full flex justify-end mb-4">
        <UploadButton />
      </div>
      <FilesRoot files={files} />
    </>
  );
}
