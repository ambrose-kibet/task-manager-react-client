import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  value:
    | "email asc"
    | "email desc"
    | "role asc"
    | "role desc"
    | "createdAt asc"
    | "createdAt desc";
  handleChange: (
    value:
      | "email asc"
      | "email desc"
      | "role asc"
      | "role desc"
      | "createdAt asc"
      | "createdAt desc",
  ) => void;
};
const SortComponent = ({ handleChange, value }: Props) => {
  const sortOptions = [
    { value: "email+asc", label: "Email Ascending" },
    { value: "email+desc", label: "Email Descending" },
    { value: "role+asc", label: "Role Ascending" },
    { value: "role+desc", label: "Role Descending" },
    { value: "createdAt+asc", label: "Created At Ascending" },
    { value: "createdAt+desc", label: "Created At Descending" },
  ];
  return (
    <div className="flex flex-col justify-center shadow">
      <Select
        onValueChange={(
          value:
            | "email asc"
            | "email desc"
            | "role asc"
            | "role desc"
            | "createdAt asc"
            | "createdAt desc",
        ) => handleChange(value)}
        defaultValue={value}
      >
        <SelectTrigger className="w-fit">
          <SelectValue placeholder={value} />
        </SelectTrigger>

        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
export default SortComponent;
