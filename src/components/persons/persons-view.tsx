import React from 'react';
import { Button, Container, makeStyles, Paper, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { grey } from '@material-ui/core/colors';

export type PeopleProps = {
    handleCreate: () => void;
};

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(0),
    },
    header: {
        flexGrow: 1,
    },
    headerContainer: {
        display: 'flex',
        borderBottom: `1px solid ${grey[300]}`,
        padding: theme.spacing(2),
    },
}));

const PersonsView = ({ handleCreate }: PeopleProps) => {
    const classes = useStyles();

    return (
        <Paper elevation={0}>
            <Container className={classes.headerContainer} maxWidth="xl">
                <Typography variant={'h6'} className={classes.header}>
                    Create new People
                </Typography>
                <Button
                    onClick={() => handleCreate()}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<AddIcon />}
                >
                    New
                </Button>
            </Container>
        </Paper>
    );
};

export default PersonsView;
