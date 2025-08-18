import { CheckCircle } from "lucide-react";
import AppAvatar from "./AppAvatar";
import AppCard from "./AppCard";

const MonthlyContribution = () => {
  return (
    <AppCard title="Monthly Contribution">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <AppAvatar src={"/uiface-1.jpg"} />
            <div>
              <p className="font-medium">Yash Shah</p>
              <p className="text-sm text-muted">Paid on Dec 1</p>
            </div>
          </div>
          <div className="text-right">
            <CheckCircle className="text-green-300" />
          </div>
        </div>

        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <AppAvatar src={"/uiface-2.jpg"} />
            <div>
              <p className="font-medium">Chirag Rathva</p>
              <p className="text-sm text-muted">Paid on Dec 1</p>
            </div>
          </div>
          <div className="text-right">
            <CheckCircle className="text-green-300" />
          </div>
        </div>

        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <AppAvatar src={"/uiface-3.jpg"} />
            <div>
              <p className="font-medium">Kashyap Patel</p>
              {/* <p className="text-sm text-muted">Paid on Dec 1</p> */}
            </div>
          </div>
          <div className="text-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-amber-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </AppCard>
  );
};

export default MonthlyContribution;
