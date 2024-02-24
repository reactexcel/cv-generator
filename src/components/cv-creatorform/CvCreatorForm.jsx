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
      onSubmit={(values) => {
        console.log(values);
        // Call your API function here to submit the form data
        // Example: ApiFetching("POST", "/submit-cv", values);
      }}
    >
      {({ values }) => (
        <Form>
          <Box>
            <Typography variant="h5">Personal Information</Typography>
            <Field name="personalInfo.firstName" as={TextField} label="First Name" />
            <Field name="personalInfo.lastName" as={TextField} label="Last Name" />
            <Field name="personalInfo.email" as={TextField} label="Email" />
            <Field name="personalInfo.phone" as={TextField} label="Phone" />
            <Field name="personalInfo.address" as={TextField} label="Address" />
            <Typography variant="h5">Education</Typography>
            <FieldArray name="education">
              {({ push, remove }) => (
                <>
                  {values.education.map((edu, index) => (
                    <div key={index}>
                      <Field name={`education.${index}.institution`} as={TextField} label="Institution" />
                      <Field name={`education.${index}.degree`} as={TextField} label="Degree" />
                      <Field name={`education.${index}.fieldOfStudy`} as={TextField} label="Field of Study" />
                      <Field name={`education.${index}.startDate`} as={TextField} label="Start Date" />
                      <Field name={`education.${index}.endDate`} as={TextField} label="End Date" />
                      <Button type="button" onClick={() => remove(index)}>Remove</Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => push({ institution: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "" })}>Add Education</Button>
                </>
              )}
            </FieldArray>
            <Typography variant="h5">Experience</Typography>
            <FieldArray name="experience">
              {({ push, remove }) => (
                <>
                  {values.experience.map((exp, index) => (
                    <div key={index}>
                      <Field name={`experience.${index}.company`} as={TextField} label="Company" />
                      <Field name={`experience.${index}.position`} as={TextField} label="Position" />
                      <Field name={`experience.${index}.startDate`} as={TextField} label="Start Date" />
                      <Field name={`experience.${index}.endDate`} as={TextField} label="End Date" />
                      <Field name={`experience.${index}.responsibilities`} as={TextField} label="Responsibilities" />
                      <Button type="button" onClick={() => remove(index)}>Remove</Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => push({ company: "", position: "", startDate: "", endDate: "", responsibilities: "" })}>Add Experience</Button>
                </>
              )}
            </FieldArray>
            {/* Add similar FieldArrays for links, skills, languages, and certifications */}
            <Button type="submit">Submit</Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CvCreatorForm;
