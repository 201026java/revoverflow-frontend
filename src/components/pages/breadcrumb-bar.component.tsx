import React from 'react';
import { Link, createStyles, makeStyles, Theme, Toolbar, Box, Button, ThemeProvider, createMuiTheme} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory } from 'react-router';

/**
 * @file places breadcrume bar under the navbar with clickable trail
 * @author Keith Salzman
 */

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f26925',
        },
        secondary: {
            main: '#f26925',
        },
    },
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        link: {
            display: 'flex',
            color: "#ffffff"
        },
        icon: {
            marginRight: theme.spacing(0.5),
            width: 20,
            height: 20,
        },
        BCtoolbar: {
            backgroundColor: "#474c55",
            paddingLeft: 80,
            marginTop: 60,
            marginLeft: 20,
            display: "flex",
            flexGrow: 1
            
        }
    }),
);

export const BreadcrumbBarComponent: React.FC = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const pathname = (window.location.pathname).substring(1);

    function refreshPage() {
        window.location.reload(false);
    }

    function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        history.push("/" + pathname);
        refreshPage();
    }

    function handleClick2(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        history.push("/feed")
        refreshPage();
    }

    const handleRedirect = () => {
        history.push('/question');
    }

    return (
        <Toolbar className={classes.BCtoolbar}>
            <Box display='flex' flexGrow={1}>
                <Link color="inherit" href="/feed" onClick={handleClick2} className={classes.link}>
                    <HomeIcon className={classes.icon} />
                </Link>
                <ArrowForwardIosIcon className={classes.link} />
                <Link
                    color="inherit"
                    href={pathname}
                    onClick={handleClick}
                    className={classes.link}
                >
                    {pathname}
                </Link>
            </Box>
            <Box justifyContent="flex-end" display="flex" >
                    <ThemeProvider theme={theme} >
                        <Button variant="contained" color="secondary" onClick={() => handleRedirect()}>
                            Ask a Question
                        </Button>
                    </ThemeProvider>
            </Box>
        </Toolbar>
    );
}