import React from 'react'
import { useMutation } from '@apollo/client';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaRegHeart } from 'react-icons/fa';

import { SUPPORT_PING } from '../utils/graphql';

const useStyles = makeStyles(themes => ({

}))

export default function SupportPing({user, ping}) {
  const classes = useStyles();

  const [support] = useMutation(SUPPORT_PING, {
    variables: {
      pingId: ping.id
    },
    onError(err) {
      console.log(err);
    },
    update(_, result) {
      console.log(result);
    }
  })

  const toggleSupport = () => {
    console.log(user, ping)
  }

  return (
    <IconButton onClick={toggleSupport}>
      <FaRegHeart style={{ color: "red" }} size={15} />
    </IconButton>
  )
}
