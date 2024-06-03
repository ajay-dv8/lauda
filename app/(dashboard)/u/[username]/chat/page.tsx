import { getSelf } from "@/lib/auth-service"
import { getStreamByUserId } from "@/lib/stream-service";
import { ToggleCard } from "./_components/toggle-card";

const ChatPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id) //passed self.id to get the stream of the current user

  if (!stream) {
    throw new Error ("Stream not found");
  }
  return (
    <div className="p-6">

      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          Chat settings
        </h1>
      </div>

      <div className="space-y-4">
        {/* Enable chat for the stream ? */}
        <ToggleCard 
          label="Enable chat"
          field="isChatEnabled"
          value={stream.isChatEnabled}
        /> 

        {/* Delay chat for the stream ? */}
        <ToggleCard 
          label="Delay chat"
          field="isChatDelayed"
          value={stream.isChatDelayed}
        />

        {/* Allow chat for followers only ? */}
        <ToggleCard 
          label="Only followers chat"
          field="isChatFollowersOnly"
          value={stream.isChatFollowersOnly}
        />
      </div>

    </div>
  )
}

export default ChatPage