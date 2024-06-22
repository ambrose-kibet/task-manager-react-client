import { Button } from "@/components/ui/button";
import hero from "../assets/hero.svg";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center px-2">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold">Welcome to Task Manger</h1>
        <p className="text-lg">
          The best way to manage your tasks and get things done.
        </p>

        <img src={hero} alt="Hero" className="w-96" />
        <Button
          variant={"default"}
          asChild
          className="rounded-full font-normal text-white"
        >
          <Link to="/auth">Get Started</Link>
        </Button>
      </div>
    </div>
  );
};
export default LandingPage;
