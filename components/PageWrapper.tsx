import React from "react";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-4 h-full">{children}</div>;
};

export default PageWrapper;
