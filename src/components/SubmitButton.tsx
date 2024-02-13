import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="inline-flex w-full justify-center rounded-md bg-zinc-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-600 sm:ml-3 sm:w-auto"
    >
      {
        pending? "Submitting..." : "Submit"
      }
    </button>
  );
}