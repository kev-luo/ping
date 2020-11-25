import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Paper, Modal, Backdrop, Fade, Avatar } from "@material-ui/core";
import { FiImage } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useForm } from "../utils/useForm";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER, DELETE_USER, FETCH_PINGS_QUERY, FETCH_USER_QUERY } from "../utils/graphql";

import { useHistory } from "react-router-dom";
import Actions from '../utils/dashboardActions'
import { useAuthContext } from "../utils/useAuthContext";
import { useDashboardContext } from "../utils/useDashboardContext";

export default function TransitionsModal() {
    // export default function UserSettings() {
    const history = useHistory();
    const classes = useStyles();
    const context = useAuthContext();
    const [_, dispatch] = useDashboardContext();
    const initialState = { imageUrl: "" };
    const [password, setPassword] = useState("");
    const [openImg, setOpenImg] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [errors, setErrors] = useState({});
    


    const { loading, data } = useQuery(FETCH_USER_QUERY, {
        variables: { userId: context.user.id }
    });

    console.log(data?.getUser.imageUrl);

    function logoutOps() {
        dispatch({ type: Actions.CLEAR_USER });
        context.logout();
    }

    function handleOpenImg() {
        setOpenImg(true);
    };

    function handleOpenDel() {
        setOpenDel(true);
    };

    function handleCloseImg() {
        setOpenImg(false);
    };

    function handleCloseDel() {
        setOpenDel(false);
    };

    const { handleChange, handleSubmit, values, setFileInputState, setPreviewSource, previewSource } = useForm(
        updateUserCb,
        initialState
    );

    const [updateUser] = useMutation(UPDATE_USER, {
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
    });

    const [deleteUser] = useMutation(DELETE_USER, {
        onError(err) {
            console.log(err);
        },
        update(cache) {
            const data = cache.readQuery({
                query: FETCH_PINGS_QUERY,
            });
            cache.writeQuery({
                query: FETCH_PINGS_QUERY,
                data: {
                    getPings: data.getPings.filter(ping => ping.author.id !== context.user.id)
                }
            })

            history.push("/");
            logoutOps();
        }
    });

    function updateUserCb(img) {
        updateUser({ variables: { ...values, imageUrl: img } });
    }

    async function deleteUserCb() {
        await deleteUser({ variables: { password } });
    }

    const handlePasswordChange = (event) => {
        const { value } = event.target;
        setPassword(value);
    };

    return (
        <div className={classes.root}>

           { !loading && <form onSubmit={handleSubmit}>
                <Paper>
                    { data.getUser.imageUrl ? <Avatar className={classes.media} src={data.getUser.imageUrl}></Avatar>
                    :<Avatar className={classes.media} src="https://secure.gravatar.com/avatar/eb75ef0fcc9982ff515270a4c00ee18f?s=256&d=mm&r=g"></Avatar>}
                    <Button endIcon={<FiImage />} onClick={handleOpenImg}>Update Profile Picture</Button>
                    <Button endIcon={<MdDelete />} onClick={handleOpenDel}>Delete Profile</Button>
                </Paper>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openImg}
                    onClose={handleCloseImg}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openImg} style={{ minHeight: "250px", minWidth: "250px" }}>
                        <div className={classes.paper}>
                            <input
                                id="file"
                                style={{ display: "none" }}
                                type="file"
                                onChange={handleChange}
                                name="imageUrl"
                                accept="image/*"
                            />
                            <label className={classes.fileBtn} htmlFor="file">
                                Choose a file
                        </label>
                            <Button type="submit" onClick={handleSubmit} endIcon={<FiImage />}>Set Picture</Button>
                            {previewSource && (
                                <img
                                    src={previewSource}
                                    alt="preview of choosen file"
                                    style={{
                                        height: "250px",
                                        display: "block",
                                        margin: "0 auto",
                                        marginTop: 20,
                                    }}
                                />
                            )}
                        </div>
                    </Fade>
                </Modal>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openDel}
                    onClose={handleCloseDel}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openDel} style={{ minHeight: "250px", minWidth: "250px" }}>
                        <div className={classes.paper}>
                            <label>Please confirm your password</label>
                            <br />
                            <TextField
                                type="password"
                                onChange={handlePasswordChange}
                                value={password} 
                                name="password" 
                                error={errors.password ? true : false}
                                helperText={errors.password}
                                />
                            <Button onClick={deleteUserCb}><MdDelete /></Button>
                        </div>
                    </Fade>
                </Modal>
            </form>}
        </div>
    );
}



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: "0 auto",
            marginTop: "150px",
            padding: "33px",
            width: "50%",
            minWidth: "333px",
            height: "auto",
        },
        pic: {
            width: "150px",
            height: "auto",
        },
        textAlign: "center"
    },
    media: {
        display: "block",
        width: "150px",
        height: "150px",
        margin: "0 auto"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    fileBtn: {
        border: "2px solid black",
        padding: "10px",
    },
    imgModal: {
        padding: "33px",
        width: "50%",
        minWidth: "333px",
        height: "auto",

    }
}));

