import * as React from "react";
import OwnerLayout from "../../components/Layouts/OwnerLayout";
import _ from "lodash";
import CreateHotel from "../../components/Screens/owner/CreateHotel";

const CreateHotelPage = () => {
  return (
    <OwnerLayout>
      <CreateHotel />
    </OwnerLayout>
  );
}

export default CreateHotelPage;