import React from "react";
import { useState } from "react";
import { Box, Button, Select, MenuItem } from "@mui/material";

interface Props {
  name: string;
  date: string;
  assigned: string;
  balance: number;
}

const mockMemberInfo = [
  { id: 1, name: "Liane Doe", email: "liane.doe@gmail.com", role: "Admin" },
  { id: 2, name: "Dad Doe", email: "dad.doe@gmail.com", role: "Admin" },
  { id: 3, name: "Logan Doe", email: "logan.doe@gmail.com", role: "Member" },
  { id: 4, name: "Aly Doe", email: "aly.doe@gmail.com", role: "Member" },
];

export default function ExpensesRow({ name, date, assigned, balance }: Props) {

  return (
    <>
      <Box className="expensesTableRow tableCellsFormatting" width="20%">
        {name}
      </Box>
      <Box className="expensesTableRow tableCellsFormatting" width="15%">
        {date}
      </Box>

      <Box className="expensesTableRow tableCellsFormatting" width="35%">
        {assigned}
      </Box>
      <Box className="expensesTableRow tableCellsFormatting" width="20%">
        ${balance.toFixed(2)}
      </Box>
      <Box className="expensesTableRow" width="5%">
        <Button>X</Button>
      </Box>
      <Box className="expensesTableRow" width="5%">
        <Button sx={{ textDecoration: "underline" }}>edit</Button>
      </Box>
    </>
  );
}
