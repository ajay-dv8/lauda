"use server";

//Follow
import { followUser, unfollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    // kinda like refresh path or url
    revalidatePath("/")

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }
    return followedUser;

  } catch (error) {
    throw new Error ("Internal Error")
  };
};




// Unfollow

export const onUnfollow = async (id: string) => {
  try {
    // user thats been unfollowed
    const unfollowedUser = await unfollowUser(id);

    revalidatePath("/")

    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`);
    }
    return unfollowedUser;

  } catch (error) {
    console.error("an error occurred: ", error)
    throw new Error ("Internal Error")
  };
};
