import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

const App = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <h1 className="mt-6 text-center text-2xl font-semibold">
            States Game
          </h1>
          <div className="mx-1 mt-4 flex justify-between">
            <span>
              Correct: <span className="font-semibold text-success">0</span>
            </span>
            <span>
              Remaining: <span className="font-semibold text-error">50</span>
            </span>
          </div>
          <div className="form-control mt-1 w-full">
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type="text"
                placeholder="Type here"
                className="input-bordered input block w-full"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-error"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
