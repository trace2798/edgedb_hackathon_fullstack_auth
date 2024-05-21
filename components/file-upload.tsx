"use client";

import { FileIcon, ImageIcon, Paperclip, X } from "lucide-react";
import Image from "next/image";

import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button, buttonVariants } from "./ui/button";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "cardFile" | "boardImage";
  title: string
}

export const FileUpload = ({ onChange, value, endpoint, title }: FileUploadProps) => {
  const fileType = value?.split(".").pop();
  console.log(value, fileType);
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({
          variant: "sidebar",
          size: "sidebar",
          className: "max-w-[100px]",
        })}
        asChild
      >
        <Button
          variant="sidebar"
          size={"sidebar"}
          className="text-muted-foreground hover:text-indigo-400"
        >
          <ImageIcon className="h-4 w-4 mr-1" /> {title}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            onChange(res?.[0].url);
          }}
          onUploadError={(error: Error) => {
            console.log(error);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
