import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db"

export const getSelf = async () => {
  const self = await currentUser();
  
  if (!self || !self.username) {
    throw new Error ("Unauthorized User");
  };

  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id
    }
  });

  if (!user) {
    throw new Error ("User not found")
  };

  return user;
};


// this getSelfByUsername function is used to load the creator dashboard using the users username
// different from getUserByUsername function in "user-services" tats used to fetch any user
export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();
  
  // check if te current user exist
  if (!self || !self.username) {
    throw new Error("Unauthorized user")
  }

  // fetch te user by te username from database
  const user = await db.user.findUnique({
    where: { username },
  });

  // throw error user not found if there is no user like that
  if (!user) {
    throw new Error ("User not found")
  }

  // if the username of the currentUser(from the url) and the username in the db is not equal throw error    
  // to make sure any user cant view another users dashboard 
  if (self.username !== user.username) {
    throw new Error ("Unauthorized user")
  }

  return user;
};