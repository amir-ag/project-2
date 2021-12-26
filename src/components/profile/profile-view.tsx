import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { useAppSelector } from '../../hooks/store.hooks';
import { DropzoneArea } from 'material-ui-dropzone';
import { ProfileFormData } from './profile.container';
import { getAuth } from 'firebase/auth';
import { selectUser } from '../../store/selectors';

const useStyles = makeStyles((theme) => ({
    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    rightTop: {
        height: '50%',
    },
    rightBottom: {
        height: '50%',
    },
    dropzone: {
        minHeight: '200px',
    },
    avatarContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10vh',
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

type ProfileProps = {
    handleSubmit: (formData: ProfileFormData) => void;
};

const Profile = ({ handleSubmit }: ProfileProps) => {
    const classes = useStyles();
    const auth = getAuth();
    const user = auth.currentUser;

    const { firstName, lastName, email, address } = useAppSelector(selectUser);

    const [formData, setFormData] = useState<ProfileFormData>({
        image: null,
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        newPassword: '',
        newPasswordConfirm: '',
    });

    const onImageChange = (images: File[]) => {
        setFormData((prevState) => ({
            ...prevState,
            image: images[0],
        }));
    };

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const onChangeAddress = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            address: {
                ...prevState.address,
                [e.target.id]: e.target.value,
            },
        }));
    };

    const onSubmit = () => {
        handleSubmit(formData);
    };

    return (
        <Container component={Paper} elevation={0}>
            <Typography variant={'h4'}>Profile</Typography>
            <Grid container spacing={2} component={'form'}>
                <Grid item xs={12} sm={6}>
                    <Typography variant={'body2'}>General Info</Typography>
                    {user?.photoURL && (
                        <div className={classes.avatarContainer}>
                            <Avatar className={classes.avatar} src={user.photoURL} />
                        </div>
                    )}
                    <DropzoneArea
                        acceptedFiles={['image/*']}
                        dropzoneText={'Drag and drop your profile image here'}
                        onChange={(images) => onImageChange(images)}
                    />
                    <TextField
                        value={formData.firstName}
                        onChange={(e) => onChange(e)}
                        variant={'outlined'}
                        margin={'normal'}
                        fullWidth
                        id={'firstName'}
                        label={'Firstname'}
                        name={'firstname'}
                        autoComplete={'firstname'}
                        autoFocus
                        required
                    />
                    <TextField
                        value={formData.lastName}
                        onChange={(e) => onChange(e)}
                        variant={'outlined'}
                        margin={'normal'}
                        fullWidth
                        id={'lastName'}
                        label={'Lastname'}
                        name={'lastname'}
                        autoComplete={'lastname'}
                        required
                    />
                    <TextField
                        value={formData.email}
                        onChange={(e) => onChange(e)}
                        variant={'outlined'}
                        margin={'normal'}
                        fullWidth
                        id={'email'}
                        label={'Email'}
                        name={'email'}
                        autoComplete={'email'}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.rightContainer}>
                    <div className={classes.rightTop}>
                        <Typography variant={'body2'}>Address</Typography>
                        <TextField
                            value={formData.address.addressLine1}
                            onChange={(e) => onChangeAddress(e)}
                            variant={'outlined'}
                            margin={'normal'}
                            fullWidth
                            id={'addressLine1'}
                            label={'Street, Number'}
                            name={'addressLine1'}
                            autoComplete={'street'}
                            type={'string'}
                        />
                        <TextField
                            value={formData.address.postCode}
                            onChange={(e) => onChangeAddress(e)}
                            variant={'outlined'}
                            margin={'normal'}
                            fullWidth
                            id={'postCode'}
                            label={'PLZ'}
                            name={'postCode'}
                            autoComplete={'postCode'}
                            type={'number'}
                        />
                        <TextField
                            value={formData.address.city}
                            onChange={(e) => onChangeAddress(e)}
                            variant={'outlined'}
                            margin={'normal'}
                            fullWidth
                            id={'city'}
                            label={'City'}
                            name={'city'}
                            autoComplete={'city'}
                            type={'string'}
                        />
                    </div>
                    <div className={classes.rightBottom}>
                        <Typography variant={'body2'}>Account & Security</Typography>
                        <TextField
                            value={formData.newPassword}
                            onChange={(e) => onChange(e)}
                            variant={'outlined'}
                            margin={'normal'}
                            fullWidth
                            id={'newPassword'}
                            label={'Enter new password'}
                            name={'password'}
                            autoComplete={'password'}
                            type={'password'}
                        />
                        <TextField
                            value={formData.newPasswordConfirm}
                            onChange={(e) => onChange(e)}
                            variant={'outlined'}
                            margin={'normal'}
                            fullWidth
                            id={'newPasswordConfirm'}
                            label={'Confirm Password'}
                            name={'newPasswordConfirm'}
                            autoComplete={'newPasswordConfirm'}
                            type={'password'}
                        />
                    </div>
                </Grid>
            </Grid>
            <Button onClick={onSubmit}>Update</Button>
        </Container>
    );
};

export default Profile;
