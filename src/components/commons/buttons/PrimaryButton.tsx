import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PrimaryButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(
        "bg-green-600 hover:bg-green-700 text-white",
        className
      )}
      {...props}
    />
  );
}