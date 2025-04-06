"use client";
import React from "react";
import { DropdownMenu, Button } from "@radix-ui/themes";
import { Link } from "@radix-ui/themes";
import Issuelist from "../components/Issuelist";
import { useState } from "react";
import { OPEN, CLOSE, IN_PROGRESS, UPDATED, CREATED, RESET } from "../constants";

const Dropdown = () => {
  const [ selectedFilter, setSelectedFilter ] = useState<string>('Filter');
  const handleSelect = (selectedFilter: string) => {
    console.log("selectedFilter >> ",selectedFilter);
    setSelectedFilter(selectedFilter);
  };

  return (
    <div className="w-250 h-full flex items-center justify-center flex-col gap-5">
      <div className="w-full flex justify-between items-center">
        {/* --- dropdown goes here --- */}

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft">
              Filter
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item
              onSelect={() => handleSelect(OPEN)}
              shortcut="O"
            >
              Open
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={() => handleSelect(CLOSE)}
              shortcut="C"
            >
              Close
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={() => handleSelect(IN_PROGRESS)}
              shortcut="I"
            >
              In Progress
            </DropdownMenu.Item>

            <DropdownMenu.Separator />
            <DropdownMenu.Item onSelect={() => handleSelect(CREATED)}>
              First Created
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => handleSelect(UPDATED)}>
              Last Modified
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              onSelect={() => handleSelect(RESET)}
              shortcut="⌫"
              color="red"
            >
              Reset
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <Button className="cursor-pointer" variant="soft">
          <Link href="/issues/new">New Issues</Link>
        </Button>
      </div>
      <Issuelist filter = {selectedFilter} />
    </div>
  );
};

export default Dropdown;
