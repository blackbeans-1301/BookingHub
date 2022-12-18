import * as React from "react";
import OwnerLayout from "../../components/Layouts/owner/OwnerLayout";
import ListReservation from "../../components/Screens/owner/ListReservation";

const ListReservationPage = () => {
  return (
    <OwnerLayout>
      <ListReservation />
    </OwnerLayout>
  );
};

export default ListReservationPage;
