import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers";
import enLocale from "date-fns/locale/ru";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import green from "@material-ui/core/colors/green";
import Grid from '@mui/material/Grid';


// const theme = createMuiTheme({
//     palette: {
//         primary: { light: green[300], main: green[500], dark: green[700] }
//     }
// });

// class Utils extends DateFnsUtils {
//     getWeekdays() {
//         return ["Su", "M", "Tu", "W", "Th", "F", "Sa"];
//     }
// }

export default function LoadCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const locale = "en";
    const handleDateChange = (date: any) => {
        setSelectedDate(date);
        console.log("Date is: ", date);
    };
    //
    return (
        // <MuiPickersUtilsProvider utils={Utils} locale={localeMap[locale]}>
        <Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
                <Paper style={{ overflow: "hidden" }}>
                    <Calendar date={selectedDate} onChange={handleDateChange} />
                </Paper>
            </MuiPickersUtilsProvider>
        </Grid >
    );
}
