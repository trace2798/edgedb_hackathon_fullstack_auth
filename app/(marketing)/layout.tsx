import NavBar from "@/components/navbar";

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default MarketingLayout;
