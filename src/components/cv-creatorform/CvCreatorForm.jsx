import React from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ApiFetching from "../../services/ApiFetching";
const CvCreatorForm = () => {
  const cvDataFormat = {
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      links: {
        github: "",
        linkedin: "",
        website: "",
      },
    },
    education: [
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
      },
    ],
    experience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
      },
    ],
    skills: ["Java", "Node", "Python"],
    languages: [{ language: "", proficiency: "" }],
    certifications: [{ name: "", organization: "", date: "" }],
  };

  return (
    <Formik
      initialValues={cvDataFormat}
      onSubmit={async(values) => {
        console.log(values);
        const dataToSend = await ApiFetching('POST', 'user/cv/create', values);
        console.log(dataToSend);
      }}
    >
      <Form>
        <Stack spacing={4}>
          <Stack
            spacing={2}
            sx={{
              background: "#4d434312",
              borderRadius: "10px",
              p: "15px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <Typography sx={{ textAlign: "center" }} variant="h4">
              Personal information
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { md: "49% 49%", xs: "100%" },
                gridColumnGap: 20,
                justifyContent: "space-between",
              }}
            >
              <Field
                name="personalInfo.firstName"
                as={TextField}
                label="First Name"
                variant="outlined"
                margin="normal"
              />
              <Field
                name="personalInfo.lastName"
                as={TextField}
                label="Last Name"
                variant="outlined"
                margin="normal"
              />
              <Field
                name="personalInfo.email"
                as={TextField}
                type="email"
                label="Email"
                variant="outlined"
                margin="normal"
              />
              <Field
                name="personalInfo.phone"
                as={TextField}
                label="Phone"
                variant="outlined"
                margin="normal"
              />
              <Field
                name="personalInfo.address"
                as={TextField}
                label="Address"
                variant="outlined"
                multiline
                rows={4}
                margin="normal"
              />
            </Box>
          </Stack>
          <Stack
            spacing={2}
            sx={{
              background: "#4d434312",
              borderRadius: "10px",
              p: "15px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <Typography sx={{ textAlign: "center" }} variant="h4">
              Social Link
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { md: "49% 49%", xs: "100%" },
                gridColumnGap: 20,
                justifyContent: "space-between",
              }}
            >
              {/* Add links for personal info */}
              <Stack>
                <Field
                  name="personalInfo.links.github"
                  as={TextField}
                  label="Github"
                  variant="outlined"
                  margin="normal"
                />
              </Stack>
              <Stack>
                <Field
                  name="personalInfo.links.linkedin"
                  as={TextField}
                  label="LinkedIn"
                  variant="outlined"
                  margin="normal"
                />
              </Stack>
              <Stack>
                <Field
                  name="personalInfo.links.website"
                  as={TextField}
                  label="Website"
                  variant="outlined"
                  margin="normal"
                />
              </Stack>
            </Box>
          </Stack>
          <Stack
            spacing={2}
            sx={{
              background: "#4d434312",
              borderRadius: "10px",
              p: "15px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <Typography sx={{ textAlign: "center" }} variant="h4">
              Education Detail
            </Typography>

            {/* Education Fields */}
            <FieldArray name="education">
              {({ push }) => (
                <div>
                  {cvDataFormat.education.map((_, index) => (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { md: "49% 49%", xs: "100%" },
                        gridColumnGap: 20,
                        justifyContent: "space-between",
                      }}
                      key={index}
                    >
                      <Field
                        name={`education[${index}].institution`}
                        as={TextField}
                        label="Institution"
                        variant="outlined"
                        margin="normal"
                      />
                      <Field
                        name={`education[${index}].degree`}
                        as={TextField}
                        label="Degree"
                        variant="outlined"
                        margin="normal"
                      />
                      <Field
                        name={`education[${index}].fieldOfStudy`}
                        as={TextField}
                        label="Field of Study"
                        variant="outlined"
                        margin="normal"
                      />
                      <Field
                        name={`education[${index}].startDate`}
                        as={TextField}
                        type="date"
                        label="Start Date"
                        variant="outlined"
                        margin="normal"
                      />
                      <Field
                        name={`education[${index}].endDate`}
                        as={TextField}
                        type="date"
                        label="End Date"
                        variant="outlined"
                        margin="normal"
                      />
                    </Box>
                  ))}
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => push({})}
                  >
                    Add Education
                  </Button>
                </div>
              )}
            </FieldArray>
          </Stack>
          <Stack
            spacing={2}
            sx={{
              background: "#4d434312",
              borderRadius: "10px",
              p: "15px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <Typography sx={{ textAlign: "center" }} variant="h4">
              Experience Detail
            </Typography>

            <FieldArray name="experience">
              {({ push }) => (
                <div>
                  {cvDataFormat.experience.map((_, index) => (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { md: "49% 49%", xs: "100%" },
                        gridColumnGap: 20,
                        justifyContent: "space-between",
                      }}
                      key={index}
                    >
                      <Field
                        name={`experience[${index}].company`}
                        as={TextField}
                        label="Company"
                        variant="outlined"
                        margin="normal"
                      />
                      <Field
                        name={`experience[${index}].position`}
                        as={TextField}
                        label="Position"
                        variant="outlined"
                        margin="normal"
                      />
                      <Field
                        name={`experience[${index}].startDate`}
                        as={TextField}
                        type="date"
                        label="Start Date"
                        variant="outlined"
                        margin="normal"
                      />
                      <Field
                        name={`experience[${index}].endDate`}
                        as={TextField}
                        type="date"
                        label="End Date"
                        variant="outlined"
                        margin="normal"
                      />
                      <Field
                        name="skills"
                        as={TextField}
                        select
                        label="Skills"
                        variant="outlined"
                        margin="normal"
                      >
                        {cvDataFormat.skills.map((skill, index) => (
                          <MenuItem key={index} value={skill}>
                            {skill}
                          </MenuItem>
                        ))}
                      </Field>
                      <Field
                        name={`experience[${index}].responsibilities`}
                        as={TextField}
                        label="Responsibilities"
                        variant="outlined"
                        multiline
                        rows={4}
                        margin="normal"
                      />
                    </Box>
                  ))}

                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => push({})}
                  >
                    Add Experience
                  </Button>
                </div>
              )}
            </FieldArray>
          </Stack>

          <Stack spacing={2} sx={{background:'#4d434312', borderRadius:"10px",p:'15px',boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} >
        <Typography sx={{textAlign:'center'}} variant='h4'>Languages</Typography>
       
        <FieldArray name="languages">
  {({ push }) => (
    <div>
      {cvDataFormat.languages.map((_, index) => (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { md: "49% 49%", xs: "100%" },
            gridColumnGap: 20,
            justifyContent: "space-between",
          }}
          key={index}
        >
          <Field
            name={`languages[${index}].language`}
            as={TextField}
            label="Language"
            variant="outlined"
            margin="normal"
          />
          <Field
            name={`languages[${index}].proficiency`}
            as={TextField}
            label="Proficiency"
            variant="outlined"
            margin="normal"
          />
        </Box>
      ))}
   <Button
  type="button"
  variant="contained"
  onClick={() => {
    push({ language: "", proficiency: "" });
    console.log("Language added");
  }}
>
  Add Language
</Button>

    </div>
  )}
</FieldArray>

          </Stack>
          {/* Certifications */}
          <Stack spacing={2} sx={{background:'#4d434312', borderRadius:"10px",p:'15px',boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} >
        <Typography sx={{textAlign:'center'}} variant='h4'>Certification</Typography>
      
        <FieldArray name="certifications">
  {({ push }) => (
    <div>
      {cvDataFormat.certifications.map((_, index) => (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { md: "49% 49%", xs: "100%" },
            gridColumnGap: 20,
            justifyContent: "space-between",
          }}
          key={index}
        >
          <Field
            name={`certifications[${index}].name`}
            as={TextField}
            label="Certification Name"
            variant="outlined"
            margin="normal"
          />
          <Field
            name={`certifications[${index}].organization`}
            as={TextField}
            label="Organization"
            variant="outlined"
            margin="normal"
          />
          <Field
            name={`certifications[${index}].date`}
            as={TextField}
            type="date"
            label="Date"
            variant="outlined"
            margin="normal"
          />
        </Box>
      ))}
      <Button
        type="button"
        variant="contained"
        onClick={() => push({ name: "", organization: "", date: "" })}
      >
        Add Certification
      </Button>
    </div>
  )}
</FieldArray>

          </Stack>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
};

export default CvCreatorForm;
