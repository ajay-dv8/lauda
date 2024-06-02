"use server";
import { blockUser, unblockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache";

// block user action
export const onBlock = async (id: string) => {
  // TODO: Adapt to disconnect blocked user from livestream
  // TODO: Allow to remove blocked guest/user from stream
  const blockedUser = await blockUser(id);

  revalidatePath("/");

  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocked.username}`);
  }

  return blockedUser;
};


// unblock user action 
export const onUnblock = async (id: string) => {
  const unblockedUser = await unblockUser(id);

  revalidatePath("/");

  if (unblockedUser) {
    revalidatePath(`/${unblockedUser.blocked.username}`);
  }

  return unblockedUser;
};