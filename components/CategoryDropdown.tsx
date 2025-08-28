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
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import FormField from "./FormField";
import { Label } from "./ui/label";

// ✅ Types
interface DropdownValue {
  key: string;
  value: string;
}

interface DropdownGroup {
  dropdownLabel: string;
  dropdownValue: DropdownValue[];
}

interface CategoryDropdownProps<T extends FieldValues> {
  control: Control<T>;
  placeholder?: string;
  dropdownList: DropdownGroup[];
  name: Path<T>; // ✅ ensures name matches form fields
  label?: string;
  error?: string;
}

export const CategoryDropdown = <T extends FieldValues>({
  control,
  placeholder = "Select Category",
  dropdownList,
  name,
  label,
  error,
}: CategoryDropdownProps<T>) => {
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
              {dropdownList.map((dropdownItem) => (
                <SelectGroup key={dropdownItem.dropdownLabel}>
                  <SelectLabel>{dropdownItem.dropdownLabel}</SelectLabel>
                  {dropdownItem.dropdownValue.map((item) => (
                    <SelectItem key={item.key} value={item.value}>
                      {item.value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </FormField>
  );
};
