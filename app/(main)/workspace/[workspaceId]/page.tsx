import { Card, CardHeader } from "@/components/ui/card";

const Page = async ({ params }: { params: { workspaceId: string } }) => {
  return (
    <>
      <div className="pt-[50px]  flex justify-center items-center text-center">
        <Card className=" ml-5">
          <CardHeader>{params.workspaceId}</CardHeader>
        </Card>
      </div>
    </>
  );
};

export default Page;
