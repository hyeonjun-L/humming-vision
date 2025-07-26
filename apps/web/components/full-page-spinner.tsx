import cn from "libs/cn";
import { Loader } from "lucide-react";

export default function FullPageSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-150 flex items-center justify-center bg-white/60 backdrop-blur-sm",
        className,
      )}
    >
      <Loader className="size-10 animate-spin text-gray-500" />
    </div>
  );
}
