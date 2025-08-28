import React from "react";

const BackGroundEffect = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-secondary/20 blur-2xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/30 to-transparent" />
    </div>
  );
};

export default BackGroundEffect;
