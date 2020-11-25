import React from "react";
import { useMutation } from "@apollo/client";
import { IconButton } from "@material-ui/core";
import { FaRegMinusSquare } from "react-icons/fa";

import {
  DELETE_PING,
  FETCH_PINGS_QUERY,
} from "../utils/graphql";

export default function DeleteButton({ pingId }) {

  const [deleteItem] = useMutation(DELETE_PING, {
    variables: { pingId },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_PINGS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_PINGS_QUERY,
        data: {
          getPings: data.getPings.filter((ping) => ping.id !== pingId),
        },
      });
    },
  });

  return (
    <>
      <IconButton >
        <FaRegMinusSquare style={{ color: "gray" }} size={15} />
      </IconButton>
    </>
  );
}
