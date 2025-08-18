"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export function MultiSelect({
    options = [],
    onValueChange = () => {},
    defaultValue = [],
    placeholder = "Select items",
    animation = 0,
    maxCount = 3,
    modalPopover = false,
    asChild = false,
    className,
    ...props
}) {
    const [open, setOpen] = React.useState(false);
    const [selectedValues, setSelectedValues] = React.useState(defaultValue);
    const inputRef = React.useRef(null);

    const handleUnselect = React.useCallback(
        (value) => {
            const newSelectedValues = selectedValues.filter((v) => v !== value);
            setSelectedValues(newSelectedValues);
            onValueChange(newSelectedValues);
        },
        [selectedValues, onValueChange]
    );

    const handleKeyDown = React.useCallback(
        (e) => {
            const input = inputRef.current;
            if (input) {
                if (e.key === "Delete" || e.key === "Backspace") {
                    if (input.value === "") {
                        const newSelectedValues = [...selectedValues];
                        newSelectedValues.pop();
                        setSelectedValues(newSelectedValues);
                        onValueChange(newSelectedValues);
                    }
                }
                if (e.key === "Escape") {
                    input.blur();
                }
            }
        },
        [selectedValues, onValueChange]
    );

    const selectables = options.filter(
        (option) => !selectedValues.includes(option.value)
    );

    return (
        <Popover open={open} onOpenChange={setOpen} modal={modalPopover}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between text-left font-normal min-h-[40px] h-auto",
                        className
                    )}
                    onClick={() => setOpen(!open)}
                >
                    <div className="flex gap-1 flex-wrap items-center min-h-[20px]">
                        {selectedValues.length > 0 ? (
                            <>
                                {selectedValues
                                    .slice(0, maxCount)
                                    .map((value) => {
                                        const option = options.find(
                                            (option) => option.value === value
                                        );
                                        const IconComponent = option?.icon;
                                        return (
                                            <Badge
                                                variant="secondary"
                                                key={value}
                                                className="mr-1 mb-1 flex items-center gap-1 pr-1"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleUnselect(value);
                                                }}
                                            >
                                                {IconComponent && (
                                                    <IconComponent className="h-3 w-3" />
                                                )}
                                                <span className="text-xs">
                                                    {option?.label}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="ml-1 rounded-full hover:bg-muted p-0.5"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleUnselect(value);
                                                    }}
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        );
                                    })}
                                {selectedValues.length > maxCount && (
                                    <Badge
                                        variant="secondary"
                                        className="mr-1 mb-1"
                                    >
                                        +{selectedValues.length - maxCount} more
                                    </Badge>
                                )}
                            </>
                        ) : (
                            <span className="text-muted-foreground">
                                {placeholder}
                            </span>
                        )}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-[--radix-popover-trigger-width] max-h-[300px] p-0"
                align="start"
            >
                <Command className={className} onKeyDown={handleKeyDown}>
                    <CommandInput
                        ref={inputRef}
                        placeholder="Search..."
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {selectables.map((option) => {
                                const isSelected = selectedValues.includes(
                                    option.value
                                );
                                const IconComponent = option.icon;
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            const newSelectedValues =
                                                selectedValues.includes(
                                                    option.value
                                                )
                                                    ? selectedValues.filter(
                                                          (value) =>
                                                              value !==
                                                              option.value
                                                      )
                                                    : [
                                                          ...selectedValues,
                                                          option.value,
                                                      ];
                                            setSelectedValues(
                                                newSelectedValues
                                            );
                                            onValueChange(newSelectedValues);
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                isSelected
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                        {IconComponent && (
                                            <IconComponent className="mr-2 h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span>{option.label}</span>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
