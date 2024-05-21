import { Separator } from "./ui/separator";

interface HeadingProps {
  title: string;
  description?: string;
  subdescription?: string;
}

export const Heading = ({
  title,
  description,
  subdescription,
}: HeadingProps) => {
  return (
    <>
      <div className="flex flex-col text-left  gap-x-3 mt-5">
        <h2 className="text-3xl font-satoshiBold text-primary">{title}</h2>
        <p className="text-sm font-ranadeLight text-muted-foreground">
          {description}
        </p>
        <p className="text-sm font-ranadeLight text-muted-foreground">
          {subdescription}
        </p>

        <Separator className="my-5" />
      </div>
    </>
  );
};
