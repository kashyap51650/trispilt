"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, Control } from "react-hook-form";
import FormField from "./FormField";
import { Label } from "./ui/label";

interface CategoryDropdownProps {
  control: Control<any>;
  placeholder?: string;
  dropdownList: [
    { dropdownLabel: string; dropdownValue: { key: string; value: string }[] }
  ];
  name: string;
  label?: string;
  error?: string;
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  control,
  placeholder = "Select Category",
  dropdownList,
  name,
  label,
  error,
}) => {
  return (
    <FormField error={error}>
      {label && (
        <Label className="font-medium mb-3 block" htmlFor={name}>
          {label}
        </Label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {dropdownList.map((dropdownItem) => {
                  return (
                    <div key={dropdownItem.dropdownLabel}>
                      <SelectLabel>{dropdownItem.dropdownLabel}</SelectLabel>
                      {dropdownItem.dropdownValue.map((item) => (
                        <SelectItem key={item.key} value={item.value}>
                          {item.value}
                        </SelectItem>
                      ))}
                    </div>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </FormField>
  );
};
