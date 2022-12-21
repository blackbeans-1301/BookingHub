import * as React from "react";
import HotelListReservation from "../../components/Screens/owner/HotelListReservation";
import OwnerLayout from "../../components/Layouts/owner/OwnerLayout";

const HotelListReservationPage = () => {
  return (
    <OwnerLayout>
      <HotelListReservation />
    </OwnerLayout>
  );
};

export default HotelListReservationPage;
