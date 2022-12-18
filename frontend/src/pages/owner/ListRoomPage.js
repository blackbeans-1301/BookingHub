import * as React from "react";
import ListRoom from "../../components/Screens/owner/ListRoom";
import OwnerLayout from "../../components/Layouts/owner/OwnerLayout";

const ListOfRoomPage = () => {
  return (
    <OwnerLayout>
      <ListRoom />
    </OwnerLayout>
    // <div className="flex">
    //   <div className="flex-1 h-screen">
    //     <OwnerHeader />

        
    //   </div>
    // </div>
  );
};

export default ListOfRoomPage;
