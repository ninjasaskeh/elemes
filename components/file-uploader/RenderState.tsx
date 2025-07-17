import React from "react";
import { CloudUpload, ImageIcon, Loader2, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const RenderEmptyState = ({
  isDragActive,
}: {
  isDragActive: boolean;
}) => {
  return (
    <div className="text-center">
      <div className="bg-muted mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
        <CloudUpload
          className={cn(
            "text-muted-foreground size-6",
            isDragActive && "text-primary"
          )}
        />
      </div>

      <p className="text-foreground text-base font-semibold">
        Drop your file here or{" "}
        <span className="text-primary cursor-pointer font-bold">
          Click to Upload
        </span>
      </p>

      <Button className="mt-4 cursor-pointer" type="button">
        Select File
      </Button>
    </div>
  );
};

export const RenderErrorState = () => {
  return (
    <div className="text-center">
      <div className="bg-destructive/20 mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
        <ImageIcon className={cn("text-destructive size-6")} />
      </div>

      <p className="text-base font-semibold">Upload Failed!</p>
      <p className="text-muted-foreground mt-1">Something went wrong...</p>
      <Button type="button" className="mt-3">
        Retry Upload File
      </Button>
    </div>
  );
};

export const RenderUploadedState = ({
  previewUrl,
  isDeleting,
  handleRemoveFile,
}: {
  previewUrl: string;
  isDeleting: boolean;
  handleRemoveFile: () => void;
}) => {
  return (
    <div className="">
      <Image
        src={previewUrl}
        alt="Uploaded File"
        fill
        className="object-contain p-2"
      />

      <Button
        type="button"
        variant="destructive"
        size="icon"
        className={cn("absolute top-4 right-4 cursor-pointer")}
        onClick={handleRemoveFile}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <XIcon className="size-4" />
        )}
      </Button>
    </div>
  );
};

export const RenderUploadingState = ({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <p>{progress}</p>
      <p className="text-foreground mt-2 text-sm font-medium">Uploading...</p>
      <p className="text-muted-foreground mt-1 max-w-xs truncate text-xs">
        {file.name}
      </p>
    </div>
  );
};
