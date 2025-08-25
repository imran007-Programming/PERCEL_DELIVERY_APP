import type { IPercel } from "@/types";


type IProps={
    getIncomeingPercel:IPercel
}

export default function ReceiverPerceltimeline({getIncomeingPercel}:IProps) {
    console.log(getIncomeingPercel)
  return (
    <div>
      <ol className="relative space-y-8 before:absolute before:-ml-px before:h-full before:w-0.5 before:rounded-full before:bg-gray-200 dark:before:bg-gray-700">
        <li className="relative -ms-1.5 flex items-start gap-4">
          <span className="size-3 shrink-0 rounded-full bg-blue-600"></span>

          <div className="-mt-2">
            <time className="text-xs/none font-medium text-gray-700 dark:text-gray-200">
              12/02/2025
            </time>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Kickoff
            </h3>

            <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              officiis tempora ipsum adipisci tenetur sunt quae exercitationem
              sed pariatur porro!
            </p>
          </div>
        </li>

        <li className="relative -ms-1.5 flex items-start gap-4">
          <span className="size-3 shrink-0 rounded-full bg-blue-600"></span>

          <div className="-mt-2">
            <time className="text-xs/none font-medium text-gray-700 dark:text-gray-200">
              15/03/2025
            </time>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              First Milestone
            </h3>

            <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              officiis tempora ipsum adipisci tenetur sunt quae exercitationem
              sed pariatur porro!
            </p>
          </div>
        </li>

        <li className="relative -ms-1.5 flex items-start gap-4">
          <span className="size-3 shrink-0 rounded-full bg-blue-600"></span>

          <div className="-mt-2">
            <time className="text-xs/none font-medium text-gray-700 dark:text-gray-200">
              24/04/2025
            </time>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Launch
            </h3>

            <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              officiis tempora ipsum adipisci tenetur sunt quae exercitationem
              sed pariatur porro!
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
}
