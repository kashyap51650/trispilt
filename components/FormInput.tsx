import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import FormField from "./FormField";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  label?: string;
  icon?: LucideIcon;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  register?: UseFormRegisterReturn; // Replace 'any' with the actual type from react-hook-form if available, e.g.
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  type = "text",
  placeholder,
  label,
  icon: Icon,
  helperText,
  error,
  disabled,
  register,
  className,
}) => {
  return (
    <FormField error={error}>
      {label && (
        <Label htmlFor={id} className="font-medium mb-3">
          {label}
        </Label>
      )}
      <div className="relative">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...register}
          className={cn(
            "pl-10 transition-all duration-300",
            error && "border-destructive/80 focus:border-destructive",
            className
          )}
        />
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        )}
      </div>
      {helperText && (
        <p className="text-xs text-muted-foreground mt-1">{helperText}</p>
      )}
    </FormField>
  );
};

export default FormInput;
