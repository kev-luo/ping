import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

import { SUPPORT_PING } from '../utils/graphql';

export default function SupportPing({user, ping: { id, support, supportCount }}) {
  const classes = useStyles();
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (user) {
      if (support.find(supporter => user.username === supporter.username)) {
        setSupported(true);
      } else {
        setSupported(false)
      }
    }  
  }, [support, user])

  const [supportMutation] = useMutation(SUPPORT_PING, {
    variables: {
      pingId: id
    },
    onError(err) {
      console.log(err);
    }
  })

  return (
    <IconButton onClick={supportMutation}>
      {supported ? (
        <FaHeart className={classes.icon} size={15} />
      ) : (
        <FaRegHeart className={classes.icon} size={15} />
      )}
    </IconButton>
  )
}

const useStyles = makeStyles(themes => ({
  icon: {
    color: 'red',
  }
}))