import { db } from './db'
import { getSelf } from './auth-service'

// check if the current user is blocked by any specific user
export const isBlokedByUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });
    
    // if cannot find other user throw error
    // so cant check if u are blocked by user you cant find
    if (!otherUser) {
      throw new Error ("User not found")
    }

    // Check if it is you/current user
    // you cant block your self
    if (otherUser.id === self.id) {
      return false;
    }

    // if user has already been blocked current user
    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: self.id, 
        },
      },
    });

    // ensure existingBlock is a boolean
    // return true if it exists and false if it doesnt  
    return !!existingBlock;

  } catch {
    return false;
  }
};

//Block user
export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error ("Cannot block yourself")
  }

  const otherUser = await db.user.findUnique({
    where:{
      id
    }
  });

  // if other user doesnt exist
  if(!otherUser) {
    throw new Error ("User not found")
  }

  // if current user has blocked any user
  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  //if user has already been blocked throw error
  if (existingBlock) {
    throw new Error ("Already blocked");
  }

  // block user function
  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });

  return block;
};



// unblock user function
export const unblockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error ("Cannot unblock your self")
  }

  //get otherUser
  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error ("User not found")
  }

  // if the user has already been blocked by current user
  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });
  
  if (!existingBlock) {
    throw new Error ("User not blocked")
  }

  // unblock user
  const unblock = await db.block.delete({
    where: { 
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      }
    },
    include: {
      blocked: true,
      blocker: true,
    }
  });

  return unblock;
}