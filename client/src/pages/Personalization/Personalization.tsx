import React from "react";
import profile from "../../assets/profile.svg";
import avatar1 from "./pics/avatar1.png";
import avatar2 from "./pics/avatar2.png";
import avatar3 from "./pics/avatar3.png";
import avatar4 from "./pics/avatar4.png";
import avatar5 from "./pics/avatar5.png";
import avatar6 from "./pics/avatar6.png";
import avatar7 from "./pics/avatar7.png";
import avatar8 from "./pics/avatar8.png";
import avatar9 from "./pics/avatar9.png";
import "./Personalization.scss";
import SideDrawer from "../../components/SideDrawer";
import { Button, Grid, Switch, FormGroup, FormControlLabel } from "@material-ui/core";

const Personalization = () => {

    return (
        <>
            <SideDrawer />

            <div className="personalization">
                <Grid
                    className="personalization-user-info"
                    container
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center"
                    style={{ height: "100%" }}
                >
                    <Grid
                        container
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="center"
                    >
                        <Grid><h1>Personalization</h1></Grid>
                        <Grid><img src={profile} /></Grid>
                        <Grid><h2>John Doe</h2></Grid>
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                    >
                        <Grid>
                            <Grid className="personalization-center">
                                <h4>Edit Your Avatar</h4>
                            </Grid>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid item><img src={avatar1} className="personalization-avatar" /></Grid>
                                <Grid item><img src={avatar2} className="personalization-avatar" /></Grid>
                                <Grid item><img src={avatar3} className="personalization-avatar" /></Grid>
                            </Grid>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid item><img src={avatar4} className="personalization-avatar" /></Grid>
                                <Grid item><img src={avatar5} className="personalization-avatar" /></Grid>
                                <Grid item><img src={avatar6} className="personalization-avatar" /></Grid>
                            </Grid>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid item><img src={avatar7} className="personalization-avatar" /></Grid>
                                <Grid item><img src={avatar8} className="personalization-avatar" /></Grid>
                                <Grid item><img src={avatar9} className="personalization-avatar" /></Grid>
                            </Grid>
                            <Grid className="personalization-center">
                                <Button
                                    variant="text"
                                    component="label"
                                >
                                    Upload Your Image Here
                                    <input
                                        type="file"
                                        hidden
                                    />
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid>
                            <Grid className="personalization-center">
                                <h4>Appearance</h4>
                            </Grid>
                            <FormGroup>
                                <FormControlLabel control={<Switch color="primary" />}
                                    label="Dark Mode"
                                    labelPlacement="start" />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Grid>
            </div >
        </>
    );
};

export default Personalization;