import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    <>
     <div
          
        >
        <NavBar />
        {children}
        <Footer/>
      </div>
    </>
  );
};

export default MarketingLayout;
