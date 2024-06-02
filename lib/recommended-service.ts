import { db } from "./db";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {

  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
          // To not add the current user to the recommended list of the current user
            NOT: {
              id: userId,
            }, 
          },
          // Dont add a user i am already following to the recommended list
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          // Dont add a users blocking me to the recommended list
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId,
                },
              },
            },  
          },
        ],
      },
      orderBy: {
        createdAt: "desc"
      }
    })

  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc"
      },
    })
  };

  return users;
}