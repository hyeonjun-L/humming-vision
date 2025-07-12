import { ArrowRight, Loader2 } from "lucide-react";

interface SubmitButtonProps {
  isSubmitting: boolean;
  disabled?: boolean;
  text: string;
  loadingText?: string;
}

const SubmitButton = ({
  isSubmitting,
  disabled = false,
  text,
  loadingText,
}: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={isSubmitting || disabled}
    className="group border-gray300 ml-auto flex w-64 border-b py-2.5 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
  >
    <div className="text-gray300 flex w-full items-center justify-end gap-5 text-xl font-normal group-hover:font-semibold">
      {isSubmitting && loadingText ? loadingText : text}
      <div className="border-gray300 group-hover:bg-gray100 flex size-9 items-center justify-center rounded-full border bg-white">
        {isSubmitting ? (
          <Loader2 className="text-gray300 h-4 w-4 animate-spin" />
        ) : (
          <ArrowRight className="text-gray300" />
        )}
      </div>
    </div>
  </button>
);

export default SubmitButton;
