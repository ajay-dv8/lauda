
import { notFound } from 'next/navigation';
import { getUserByUsername } from './../../../lib/user-service';
import { IsFollowingUser } from '@/lib/follow-service';
import { Actions } from './_components/actions';
// get username as params or add to url
interface UserPageProps {
  params: {
    username: string;
  };
};

const UserPage = async ({ params }: UserPageProps) => {

  const user = await getUserByUsername(params.username)

  if (!user) {
    notFound();
  }

  // check if you are already following user
  const isFollowing = await IsFollowingUser(user.id)
  return (
    <div>
      <p>User Id: {user.id}</p> 
      <p>Username : {user.username}</p>
      <p>is Following : {`${isFollowing}`}</p>

      <Actions 
        userId={user.id}
        isFollowing={isFollowing}
      />
    </div>
  )
}

export default UserPage
