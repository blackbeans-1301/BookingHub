import * as React from "react";
import OwnerLayout from "../../components/Layouts/OwnerLayout";
import ListRoom from "../../components/Screens/owner/ListRoom";

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
