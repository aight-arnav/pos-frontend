import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function OutlineButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      className={cn("border-gray-300", className)}
      {...props}
    />
  );
}