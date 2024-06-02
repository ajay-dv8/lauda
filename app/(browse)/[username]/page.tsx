
import { notFound } from 'next/navigation';
import { getUserByUsername } from './../../../lib/user-service';
import { IsFollowingUser } from '@/lib/follow-service';
import { Actions } from './_components/actions';
import { isBlokedByUser } from '@/lib/block-service';
// get username as params or add to url
interface UserPageProps {
  params: {
    username: string;
  };
};

const UserPage = async ({ params }: UserPageProps) => {

  const user = await getUserByUsername(params.username)

  // return notfound page if not user
  if (!user) {
    notFound();
  }

  // check if you are already following user
  const isFollowing = await IsFollowingUser(user.id); 
  const isBlocked = await isBlokedByUser(user.id);

  // return notfound 404 if user is blocked by the otherUser te user is searching
  // if (isBlocked) {
  //   notFound();
  // }

  return (
    <div>
      <p>User Id: {user.id}</p> 
      <p>Username : {user.username}</p>
      <p>is Following : {`${isFollowing}`}</p>
      <p>is Blocked this user : {`${isBlocked}`}</p>

      <Actions 
        userId={user.id}
        isFollowing={isFollowing} 
        isBlocked={false}      
      />
    </div>
  )
};

export default UserPage
