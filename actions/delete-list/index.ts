"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { DeleteList } from "./schema";

import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;

  let list;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    list = await db.list.delete({
      where: { id, boardId, board: { orgId } },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: "Failed to delete." };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: list };
};

export const deleteList = createSafeAction(DeleteList, handler);
