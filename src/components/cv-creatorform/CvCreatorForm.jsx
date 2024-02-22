import { Box, TextField } from "@mui/material";
import React from "react";

const CvCreatorForm = () => {
  const formFelds = [
    { name: "Name" },
    { name: "Email" },
    { name: "Phone" },
    { name: "LinkedIn" },
  ];
  return (
    <Box sx={{display:'flex', gap:2, flexWrap:"wrap"}}>
      {formFelds.map((e, i) => {
        return (
            <TextField key={i} variant="outlined" name={e.name} label={e.name} />
        );
      })}
    </Box>
  );
};

export default CvCreatorForm;
