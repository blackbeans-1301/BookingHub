import * as React from "react"
import CreateRoom from "../../components/Screens/owner/CreateRoom"
import OwnerLayout from "../../components/Layouts/owner/OwnerLayout"

export default function CreateHotelPage() {
  return (
    <OwnerLayout>
      <CreateRoom />
    </OwnerLayout>
  )
}

// export const Head = () => <title>Home Page</title>;
