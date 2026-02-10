import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function OutlineButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      className={cn(
        "border-gray-300 text-zinc-700 hover:border-blue-800 hover:text-blue-900",
        className
      )}
      {...props}
    />
  );
}