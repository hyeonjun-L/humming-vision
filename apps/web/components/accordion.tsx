"use client";

import { ChevronDown } from "lucide-react";
import { useState, ReactNode } from "react";
import cn from "libs/cn";

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

function Accordion({
  title,
  children,
  defaultOpen = false,
  className,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("w-full", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-gray100/30 flex w-full items-center justify-between py-4 text-left transition-colors"
      >
        <span className="text-gray600 font-medium">{title}</span>
        <ChevronDown
          className={cn(
            "text-gray400 size-5 transition-transform duration-200",
            isOpen && "text-gray600 rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          isOpen ? "max-h-96 pb-2" : "max-h-0",
        )}
      >
        <div className="space-y-2">{children}</div>
      </div>
    </div>
  );
}

export default Accordion;
