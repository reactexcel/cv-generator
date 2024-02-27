import React from "react";
import { Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const CvCreatorForm2 = () => {
  const data = [
    {
      title: "Personal Information",
      fields: [
        { name: "firstName", label: "First Name" },
        { name: "lastName", label: "Last Name" },
        { name: "email", label: "Email" },
        { name: "phone", label: "Phone Number" },
        {
          title: "Social Link",
          SubFields: [
            { name: "github", label: "Git Hub" },
            { name: "linkedin", label: "Linkedin" },
          ],
        },
      ],
    },
  ];
  const education= [
    {
      institution,
      degree ,
      fieldOfStudy,
        startDate ,
        endDate,
        _id
    }
],

  return (
    <Stack spacing={2}>
      {data.map((section, index) => (
        <Box key={index}>
          <div className="font-poppins text-3xl font-medium">
            {section.title}
          </div>
          {section.fields.map((field, i) => (
            <div key={i}>
              {field.title ? (
                <div className="font-poppins text-xl font-medium mt-2">
                  {field.title}
                </div>
              ) : (
                <TextField
                  key={field.name}
                  label={field.label}
                  variant="filled"
                  margin="dense"
                />
              )}
              {field.SubFields && (
                <Stack spacing={1}>
                  {field.SubFields.map((subField, j) => (
                    <TextField
                      key={j}
                      label={subField.label}
                      variant="filled"
                      margin="dense"
                    />
                  ))}
                </Stack>
              )}
            </div>
          ))}
        </Box>
      ))}
      {/* {data.map((e,i)=>{
        return (
            <Stack key={i} >
                <Typography variant="h5">
                    {e.title}
                </Typography>
                <Stack>
                    {e.fields.map((elem,index)=>{
                        return <TextField variant="filled" label={elem.label} name={elem.name} key={index}/>
                    })}
                </Stack>
            </Stack>
        )
      })} */}
    </Stack>
  );
};

export default CvCreatorForm2;
