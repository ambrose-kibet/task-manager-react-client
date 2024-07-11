import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa6";
import { initiateOAuth } from "@/lib/helpers";

const Socials: React.FC = () => {
  return (
    <div className="mx-auto flex items-center gap-x-4">
      <Button
        size="lg"
        className="w-full"
        variant={"ghost"}
        onClick={() => initiateOAuth("google")}
        data-testId="google-oauth"
      >
        <FcGoogle className="h-6 w-6" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant={"ghost"}
        onClick={() => initiateOAuth("github")}
        data-testId="github-oauth"
      >
        <FaGithub className="h-6 w-6" />
      </Button>
    </div>
  );
};
export default Socials;
