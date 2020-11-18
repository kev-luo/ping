import React from 'react'
import { useMutation } from '@apollo/client';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AiFillDelete } from 'react-icons/ai';

const useStyles = makeStyles(themes => ({

}))

export default function DeleteButton() {
  return (
    <IconButton>
      <AiFillDelete style={{ color: "gray" }} size={17} />
    </IconButton>
  )
}
