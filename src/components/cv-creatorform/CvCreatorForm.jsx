import { Box, TextField, MenuItem } from "@mui/material";

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
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      {/* Personal Information Fields */}
      {Object.entries(cvDataFormat.personalInfo).map(([key, value], index) => (
        <TextField
          key={key}
          variant="outlined"
          name={key}
          label={key.charAt(0).toUpperCase() + key.slice(1)}
          fullWidth
          margin="normal"
        />
      ))}

      {cvDataFormat.education.map((education, index) => (
        <Box key={index}>
          {Object.entries(education).map(([key, value]) => (
            <TextField
              key={key}
              variant="outlined"
              name={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              fullWidth
              margin="normal"
            />
          ))}
        </Box>
      ))}

      {/* Experience Fields */}
      {cvDataFormat.experience.map((experience, index) => (
        <Box key={index}>
          {Object.entries(experience).map(([key, value]) => (
            <TextField
              key={key}
              variant="outlined"
              name={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              fullWidth
              margin="normal"
            />
          ))}
        </Box>
      ))}

      <TextField
        select
        variant="outlined"
        name="skills"
        label="Skills"
        fullWidth
        margin="normal">
        {cvDataFormat.skills.map((skill, index) => (
          <MenuItem key={index} value={skill}>
            {skill}
          </MenuItem>
        ))}
      </TextField>
      {cvDataFormat.languages.map((language, index) => (
        <Box key={index}>
          {Object.entries(language).map(([key, value]) => (
            <TextField
              key={key}
              variant="outlined"
              name={`language_${index}_${key}`}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              fullWidth
              margin="normal"
            />
          ))}
        </Box>
      ))}

      {cvDataFormat.certifications.map((certification, index) => (
        <Box key={index}>
          {Object.entries(certification).map(([key, value]) => (
            <TextField
              key={key}
              variant="outlined"
              name={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              fullWidth
              margin="normal"
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default CvCreatorForm;
