import { db } from "./db";
import { getSelf } from "./auth-service";

export const IsFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();

    // the other user you want to follow 
    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    //if the user you want to follow is not found,
    //you cant follow a user that does not exist
    if (!otherUser) {
      throw new Error ("User no found")
    }

    //if te user you want to follow is you,
    //you are already a follower of your self 
    //so cant follow your self
    if (otherUser.id === self.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    })
    // "!!" turns the result into a boolean
    return !!existingFollow;

    } catch {
    return false;
  }
};


//Follow user action
export const followUser = async (id: string) => {

  const self = await getSelf();

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error ("User no found")
  }

  if (otherUser.id === self.id) {
    throw new Error ("Can not follow your self");
  }

  // filter users based on followerId & followingId  
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) {
    throw new Error ("Already following user");
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    // get access to who was followed and by who
    include: {
      following: true,
      follower: true,
    }
  });

  return follow;

}