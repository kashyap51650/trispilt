import React from "react";

const ErrorComponent = ({ errorMessage }: { errorMessage?: string }) => {
  return (
    <div className="rounded-md bg-destructive/10 border border-destructive p-3">
      <p className="text-sm text-destructive">{errorMessage}</p>
    </div>
  );
};

export default ErrorComponent;
