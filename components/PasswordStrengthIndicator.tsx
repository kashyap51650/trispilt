import { STRENGTH_COLORS, STRENGTH_LABELS } from "@/constants";

const PasswordStrengthIndicator: React.FC<{
  password: string;
  strength: number;
}> = ({ password, strength }) => {
  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex space-x-1">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded transition-colors duration-200 ${
              i < strength ? STRENGTH_COLORS[strength - 1] : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Strength: {STRENGTH_LABELS[strength - 1] || "Very Weak"}
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;
