import { cn } from "@/lib/utils";

interface TransactionCardProps {
  title: string;
  description?: string;
  type: "income" | "expense";
  amount: number;
  tag?: string;
  date: string;
  by: string;
  byAvatar?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

const TransactionCard = ({
  title,
  type,
  amount,
  tag,
  date,
  by,
  className,
}: TransactionCardProps) => {
  const isIncome = type === "income";

  return (
    <div
      className={cn(
        "grid grid-cols-5 gap-4 rounded-2xl border p-5",
        "backdrop-blur-md bg-card/60 hover:bg-card/80 transition-all",
        "shadow-md hover:shadow-lg",
        className
      )}
    >
      {/* Left Section */}
      <div className="col-span-3 flex items-start gap-4">
        <div>
          <h3 className="font-semibold text-md">{title}</h3>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            {tag && (
              <span className="rounded-md bg-primary/20 px-2 py-0.5 text-primary text-xs">
                {tag}
              </span>
            )}
            <span>{date}</span>
            <span className="flex items-center gap-1">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-background text-xs">
                {by.charAt(0)}
              </span>
              {by}
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="col-span-2 flex items-start justify-end gap-3">
        <span
          className={cn(
            "font-bold text-sm",
            isIncome ? "text-green-400" : "text-red-400"
          )}
        >
          {isIncome ? "+" : "-"} ₹ {amount.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default TransactionCard;
