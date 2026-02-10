
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { truncate } from "@/lib/utils/string";

interface Props {
    value: string | null | undefined;
    viewLength?: number;
}

const TrimLongField = ({ value, viewLength = 50 }: Props) => {
  if (!value) return <span>—</span>;

  const isTrimmed = value.length > viewLength;

  return (
    <Tooltip>
        <TooltipTrigger asChild>
            <span className={isTrimmed ? "cursor-help" : ""}>
            {truncate(value, viewLength)}
            </span>
        </TooltipTrigger>

        {isTrimmed && (
            <TooltipContent className="max-w-md wrap-break-word">
            {value}
            </TooltipContent>
        )}
    </Tooltip>
  );
};

export default TrimLongField;