import { db } from "./db"

// this getUserByUsername function is used to fetch any user at all
// its different from getSelfByUsername in "auth-service" which is used to load creator dashboard using username 
export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });
  return user;
}