import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PrimaryButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(
        "bg-orange-600 hover:bg-orange-700 text-white shadow-sm focus-visible:ring-orange-500",
        className
      )}
      {...props}
    />
  );
}