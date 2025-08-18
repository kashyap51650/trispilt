import AppCard from "./AppCard";
import ContributionItem from "./ContributionItem";

const MonthlyContribution = () => {
  const contributors = [
    {
      name: "Yash Shah",
      avatar: "/uiface-1.jpg",
      date: "Dec 1",
      status: "paid",
    },
    {
      name: "Chirag Rathva",
      avatar: "/uiface-2.jpg",
      date: "Dec 1",
      status: "paid",
    },
    {
      name: "Kashyap Patel",
      avatar: "/uiface-3.jpg",
      status: "pending",
      date: "",
    },
  ] as const;

  return (
    <AppCard title="Monthly Contribution">
      <div className="flex flex-col gap-4">
        {contributors.map((c) => (
          <ContributionItem
            key={c.name}
            name={c.name}
            avatar={c.avatar}
            date={c?.date}
            status={c.status}
          />
        ))}
      </div>
    </AppCard>
  );
};

export default MonthlyContribution;
