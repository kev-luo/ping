import React from 'react'
import { useMutation } from '@apollo/client';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaRegHeart } from 'react-icons/fa';

import { SUPPORT_PING } from '../utils/graphql';

const useStyles = makeStyles(themes => ({

}))

export default function SupportPing() {
  const classes = useStyles();
  return (
    <IconButton>
      <FaRegHeart style={{ color: "red" }} size={15} />
    </IconButton>
  )
}
