import { db } from "./db";
import { getSelf } from "./auth-service";

// fetch all users i am following
export const getFollowedUsers = async () => {
  try {
    const self = await getSelf();

    const followedUsers = db.follow.findMany({
      where: {
        followerId: self.id,
        // ensure user i am following is not blocking me
        following: {
          blocking: {
            none: {
              blockedId: self.id,
            }
          }
        }
      },
      include: {
        following: true,
      },
    });

    return followedUsers;

  } catch (error) {
    return [];
  }
}


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

  // check if the user exists "already being followed" 
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






// UNFOLLOW USER

export const unfollowUser = async (id: string) => {
  const self = await getSelf();
  
  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  // throw an error if the user you are trying to unfollow does not exist  
  if (!otherUser) {
    throw new Error("User not found");
  }

  // throw an error if the user you are trying to unfollow is yourself 
  if (otherUser.id === self.id) {
    throw new Error("Cannot unfollow yourself");
  }

  // check if user follows the user they are trying to unfollow
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  // throw an error if the follow relationship does not exist
  if (!existingFollow) {
    throw new Error("Not following this user");
  }

  // delete the existing follow 
  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });

  return follow;
};
