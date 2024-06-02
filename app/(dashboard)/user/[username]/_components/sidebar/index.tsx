import { Navigation } from "./navidation"
import { Toggle } from "./toggle"
import { Wrapper } from "./wrapper"

export const Sidebar = () => {

  return(
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  )
} 