import React from "react";
import moment from "moment";

function Comment({ id, createdAt, body, author }) {
  return (
    <div>
      <p>
        {body}
        <span>{` | ${author.username} | Posted ${moment(
          Number(createdAt)
        ).fromNow()}`}</span>
      </p>
    </div>
  );
}

export default Comment;
