import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DangerButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      className={cn(
        "border-red-300 text-red-600 hover:bg-red-50",
        className
      )}
      {...props}
    />
  );
}