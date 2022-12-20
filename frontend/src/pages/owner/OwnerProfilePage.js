import * as React from "react";
import OwnProfile from "../../components/Screens/owner/OwnProfile";
import OwnerLayout from "../../components/Layouts/owner/OwnerLayout";

const OwnerProfilePage = () => {
  return (
    <OwnerLayout>
      <OwnProfile />
    </OwnerLayout>
  );
};

export default OwnerProfilePage;
