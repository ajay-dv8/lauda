"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Stream } from "@prisma/client";
import { getSelf } from "@/lib/auth-service";

//action to update the stream
export const updateStream = async (values : Partial<Stream>) => {
  try {
    const self = await getSelf();
    const selfStream = await db.stream.findUnique({
      where: {
        userId: self.id,
      },
    });

    if (!selfStream) {
      throw new Error ("Stream not found")
    };

    // since values<stream> is rendered partially, 
    // define which data will be rendered using validData object
    // and allow update the stream with the validData object
    const validData = {
      name: values.name, 
      isChatEnabled: values.isChatEnabled,
      isChatDelayed: values.isChatDelayed,
      isChatFollowersOnly: values.isChatFollowersOnly
    };
    
    // update the stream 
    const stream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: { ...validData, },
    }); 

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return stream;

  } catch {
    throw new Error ("Internal error")
  };

} 