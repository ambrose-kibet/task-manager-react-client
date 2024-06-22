import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa6";

const Socials: React.FC = () => {
  const handleClick = (provider: "google" | "github") => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/${provider}/callback`;
  };
  return (
    <div className="mx-auto flex items-center gap-x-4">
      <Button
        size="lg"
        className="w-full"
        variant={"ghost"}
        onClick={() => handleClick("google")}
      >
        <FcGoogle className="h-6 w-6" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant={"ghost"}
        onClick={() => handleClick("github")}
      >
        <FaGithub className="h-6 w-6" />
      </Button>
    </div>
  );
};
export default Socials;
