import { db } from "./db";

export const getStreamByUserId = async (userId: string) => {
  
  //find stream by userId
  //this is so only one stream for a user. ie. cant save streams  
  const stream = await db.stream.findUnique({
    where: { userId }, 
  });

  return stream;
}