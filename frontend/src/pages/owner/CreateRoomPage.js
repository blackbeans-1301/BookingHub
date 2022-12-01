import * as React from "react";
import { useState } from "react";


import API from "./service";
import _ from "lodash";
import OwnerLayout from "../../components/Layouts/OwnerLayout";
import CreateRoom from "../../components/Screens/owner/CreateRoom";

export default function CreateHotelPage() {
  return (
    <OwnerLayout>
      <CreateRoom />
    </OwnerLayout>
  );
}

// export const Head = () => <title>Home Page</title>;
