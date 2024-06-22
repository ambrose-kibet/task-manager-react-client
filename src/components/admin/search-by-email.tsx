import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

type Props = {
  email: string | undefined;
  setEmail: (email: string) => void;
};
const SearchEmailComponent = ({ email, setEmail }: Props) => {
  const [tempEmail, setTempEmail] = useState<string | undefined>(email);
  useEffect(() => {
    const debounceId = setTimeout(() => {
      setEmail(tempEmail || "");
    }, 750);
    return () => clearTimeout(debounceId);
  }, [tempEmail, setTempEmail]);
  return (
    <div>
      <Input
        type="text"
        placeholder="search by email"
        value={tempEmail || ""}
        onChange={(e) => setTempEmail(e.target.value)}
      />
    </div>
  );
};
export default SearchEmailComponent;
