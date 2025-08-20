import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import AppAvatar from "./AppAvatar";
import AppCard from "./AppCard";

const MonthlyContribution = () => {
  const contributors = [
    {
      name: "Yash Shah",
      avatar: "/uiface-1.jpg",
      date: "Aug 1",
      status: "paid",
    },
    {
      name: "Chirag Rathva",
      avatar: "/uiface-2.jpg",
      date: "Aug 1",
      status: "paid",
    },
    {
      name: "Kashyap Patel",
      avatar: "/uiface-3.jpg",
      status: "pending",
      date: "",
    },
  ] as const;

  const total = contributors.length;
  const paidCount = contributors.filter((c) => c.status === "paid").length;
  const progress = Math.round((paidCount / total) * 100);

  return (
    <AppCard>
      <div className="space-y-4">
        {/* Summary + CTA */}
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <p className="font-bold">
              This month{" "}
              <span className="text-xs text-muted-foreground">
                {paidCount}/{total} paid
              </span>
            </p>
          </div>
          <Link
            href="/contributions"
            className="text-xs font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        {/* Progress bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* All contributors mixed avatar row with status icon badges */}
        <div className="-mx-1 overflow-x-auto px-1">
          <ul className="flex gap-6">
            {contributors.map((c) => (
              <li key={`mix-${c.name}`} className="relative text-center">
                <div className="relative">
                  <AppAvatar
                    src={c.avatar}
                    width={50}
                    height={50}
                    fallback={c.name[0]}
                  />
                  {c.status === "paid" && (
                    <CheckBadgeIcon className="absolute right-[-15] bottom-0 text-primary h-5 w-5" />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppCard>
  );
};

export default MonthlyContribution;
