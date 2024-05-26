import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { Clapperboard } from "lucide-react"
import Link from "next/link"


export const Actions = async () => {

  const user = await currentUser()
  // console.log(user);

  return(
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user && (
        <SignInButton>
          <Button>
            Login
          </Button>
        </SignInButton>
      )}

      {!!user && (
        <div className="flex items-center gap-x-4">
          <Button 
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <Clapperboard className="w-5 h-5 lg:mr-2"/>

              <span className="hidden lg:block">
                Dashboard
              </span>
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}