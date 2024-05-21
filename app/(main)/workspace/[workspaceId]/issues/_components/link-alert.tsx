"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "lucide-react";
import { FC, useState } from "react";

interface LinkAlertProps {
  id: string;
  currentUrls: string[];
}

const LinkAlert: FC<LinkAlertProps> = ({ id, currentUrls }) => {
  console.log(currentUrls);
  const [currentLinks, setCurrentLinks] = useState(currentUrls);

  const handleRemove = (urlToRemove: string) => {
    console.log(urlToRemove);
    setCurrentLinks(currentUrls.filter((url) => url !== urlToRemove));

  };

  return (
    <>
      <Dialog>
        <DialogTrigger
          disabled={currentUrls === null}
          className={buttonVariants({
            variant: "sidebar",
            size: "sidebar",
            className: "",
          })}
          asChild
        >
          <Button
            variant="sidebar"
            size={"sidebar"}
            className="text-muted-foreground hover:text-indigo-400"
          >
            {currentUrls ? (
              <Link className="w-4 h-4" />
            ) : (
              <Link className="w-4 h-4 invisible" />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Links</DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex flex-col">
            {currentUrls
              ? currentUrls.map((url, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center align-middle mb-2"
                  >
                    <div className="max-w-[300px] text-ellipsis overflow-hidden">
                      <a
                        href={url}
                        target="_blank"
                        className="text-base hover:text-indigo-400 "
                      >
                        {url}
                      </a>
                    </div>
                    <div>
                      <Button
                        onClick={() => handleRemove(url)}
                        variant={"sidebar"}
                        size={"sidebar"}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))
              : "No Links attached with this issue"}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LinkAlert;
