"use client";

import { ListForm } from "./list-form";

import { ListWithCards } from "@/types";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  return (
    <ol>
      <ListForm />
      <div className="flex shrink-0 w-1" />
    </ol>
  );
};
