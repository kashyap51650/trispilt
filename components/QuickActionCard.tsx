import { ArrowUpRight, HandCoins, Landmark, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

type Action = {
  label: string;
  href: string;
  icon: React.ElementType;
  subtitle?: string;
  iconBg?: string; // Tailwind classes for icon badge background
};

export interface QuickActionCardProps {
  title?: string;
  actions?: Action[];
  className?: string;
}

const defaultActions: Action[] = [
  {
    label: "Add Income",
    href: "/transactions?type=income",
    icon: PlusCircle,
    subtitle: "Record incoming funds",
    iconBg: "bg-emerald-500/90",
  },
  {
    label: "Add Expense",
    href: "/transactions?type=expense",
    icon: ArrowUpRight,
    subtitle: "Track spending quickly",
    iconBg: "bg-rose-500/90",
  },
  {
    label: "Add Contri",
    href: "/contributions",
    icon: HandCoins,
    subtitle: "Pay your monthly share",
    iconBg: "bg-amber-500/90",
  },
  {
    label: "Lend Money",
    href: "/investments?type=lend",
    icon: Landmark,
    subtitle: "Record a new loan",
    iconBg: "bg-sky-500/90",
  },
];

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title = "Quick Actions",
  actions = defaultActions,
  className,
}) => {
  return (
    <section
      aria-label={title}
      className={`rounded-xl border bg-card/80 p-4 shadow-sm ${
        className ?? ""
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-md font-semibold text-muted-foreground">{title}</h2>
      </div>

      {/* Mobile: horizontal scroll tiles (icon over two-line text) */}
      <div className="sm:hidden -mx-4 px-4 overflow-x-auto pb-2">
        <div className="flex gap-3">
          {actions.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="group relative flex w-28 flex-col items-center justify-start gap-2 shadow-xs transition-all hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-[0.98]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-muted-foreground/10 text-primary shadow transition-transform group-hover:scale-105">
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-center select-none">
                <span className="block text-sm font-medium leading-tight ">
                  {label}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-foreground/0 via-foreground/[0.03] to-foreground/[0.06] opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop/tablet: grid tiles (icon over two-line text) */}
      <div className="hidden sm:grid grid-cols-4 gap-3">
        {actions.map(({ label, href, icon: Icon, subtitle }) => (
          <Link
            key={label}
            href={href}
            aria-label={label}
            className="group relative flex h-32 flex-col items-center justify-center gap-2 rounded-xl border bg-background/70 p-3 shadow-xs transition-all hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow transition-transform group-hover:scale-105">
              <Icon className="h-6 w-6" />
            </span>
            <span className="text-center select-none">
              <span className="block text-sm font-medium leading-tight">
                {label}
              </span>
              {subtitle && (
                <span className="block text-[12px] text-muted-foreground leading-tight">
                  {subtitle}
                </span>
              )}
            </span>
            <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-foreground/0 via-foreground/[0.03] to-foreground/[0.06] opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuickActionCard;
