import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

const GuessInput = () => (
  <div className="form-control mt-1 w-full">
    <div className="relative mt-1 rounded-md shadow-sm">
      <input
        type="text"
        placeholder="Type here"
        className="input-bordered input block w-full"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
        <ExclamationCircleIcon
          className="h-5 w-5 text-error"
          aria-hidden="true"
        />
      </div>
    </div>
  </div>
);

export default GuessInput;
