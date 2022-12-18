import * as React from "react";
import CreateHotel from "../../components/Screens/owner/CreateHotel";
import OwnerLayout from "../../components/Layouts/owner/OwnerLayout";

const CreateHotelPage = () => {
  return (
    <OwnerLayout>
      <CreateHotel />
    </OwnerLayout>
  );
}

export default CreateHotelPage;