import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  value: "asc" | "desc";
  handleChange: (value: "asc" | "desc") => void;
};
const SortTasksComponent = ({ handleChange, value }: Props) => {
  const sortOptions = [
    { value: "asc", label: "CreatedAt Ascending" },
    { value: "desc", label: "CreatedAt Descending" },
  ];
  return (
    <div className="flex flex-col justify-center shadow">
      <Select
        onValueChange={(value: "asc" | "desc") => handleChange(value)}
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
export default SortTasksComponent;
