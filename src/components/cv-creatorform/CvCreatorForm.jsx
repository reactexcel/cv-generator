import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import ApiFetching from "../../services/ApiFetching";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
// import { useNavigate } from "react-router";

const CvCreatorForm = () => {
  const id=useParams()
  console.log(id);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });

  const [languagesFields, setLanguagesFields] = React.useState([
    { language: "", proficiency: "" },
    { language: "", proficiency: "" },
  ]);

  const handleRemoveCertification = (index) => {
    const updatedCertification = [...certificationsFields];
    updatedCertification.splice(index, 1);
    setCertificationsFields(updatedCertification);
  };

  const handleRemoveExperience = (index) => {
    removeExperience(index);
  };
  const handleRemoveEducation = (index) => {
    removeEducation(index);
  };
  const [certificationsFields, setCertificationsFields] = React.useState([]);
  const [selectedTechSkills, setSelectedTechSkills] = React.useState([]);
  const navigate=useNavigate()

  const languageOptions = ["English", "Spanish", "French", "German", "Chinese"];
  const proficiencyOptions = ["Beginner", "Intermediate", "Advanced", "Fluent"];
  const techSkills = [
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "Python",
    "Java",
    "SQL",
    "MongoDB",
    "Git",
    "TypeScript",
    "Angular",
    "Vue.js",
    "Ruby",
    "PHP",
    "C#",
    "ASP.NET",
    "Express.js",
    "Django",
    "Flask",
    "Spring Boot",
    "AWS",
    "Azure",
    "Google Cloud Platform",
    "Docker",
    "Kubernetes",
    "TensorFlow",
    "Machine Learning",
    "Artificial Intelligence",
    "Blockchain",
  ];

  const appendCertification = () => {
    setCertificationsFields([
      ...certificationsFields,
      { name: "", organization: "", date: "" },
    ]);
  };
  const onSubmit = async (data) => {
    console.log(data);

    const requestData = {
      ...data,
      languages: languagesFields.map((language) => ({
        language: language.language,
        proficiency: language.proficiency,
      })),
      skills: selectedTechSkills,
    };

    console.log(requestData);

    const dataToSend = await ApiFetching("POST", "user/cv/create", requestData);
    if(dataToSend.status===200){
      console.log(dataToSend.data.data._id);
      toast.success('CV Created Successfully');
    navigate(`../cvTemlate/${dataToSend.data.data._id}`)
    }
  };

  const handleSkillSelect = (e) => {
    const skill = e.target.value;
    setSelectedTechSkills([...selectedTechSkills, skill]);
  };
  const handleSkillRemove = (index) => {
    const updatedSkills = selectedTechSkills.filter((_, i) => i !== index);
    setSelectedTechSkills(updatedSkills);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {/* Personal Information */}
        <Stack spacing={1}>
          <div className="font-poppins text-3xl font-medium">
            Personal information
          </div>
          <Box className="grid grid-cols-3 gap-2">
            <TextField
              {...register("personalInfo.firstName")}
              margin="dense"
              required
              label="First Name"
              variant="filled"
            />
            <TextField
              {...register("personalInfo.lastName")}
              margin="dense"
              label="Last Name"
              variant="filled"
            />
            <TextField
              {...register("personalInfo.email")}
              type="email"
              margin="dense"
              required
              label="Email"
              variant="filled"
            />
            <TextField
              {...register("personalInfo.phone")}
              margin="dense"
              required
              label="Phone"
              variant="filled"
            />
            <TextField
              {...register("personalInfo.address")}
              margin="dense"
              label="Address"
              variant="filled"
              multiline
              rows={2}
            />
          </Box>
        </Stack>
        {/* Social Links */}
        <Stack spacing={1}>
          <div className="font-poppins text-3xl font-medium">Social Link</div>
          <Box className="grid grid-cols-3 gap-2">
            <TextField
              {...register("personalInfo.links.github")}
              margin="dense"
              label="Github"
              variant="filled"
            />
            <TextField
              {...register("personalInfo.links.linkedin")}
              margin="dense"
              label="LinkedIn"
              variant="filled"
            />
            <TextField
              {...register("personalInfo.links.website")}
              margin="dense"
              label="Website"
              variant="filled"
            />
          </Box>
        </Stack>

        {/* Languages */}
        <Stack spacing={1}>
          <div className="font-poppins text-3xl font-medium">Languages</div>
          {languagesFields.map((field, index) => (
            <Box className="grid grid-cols-4 gap-2" key={index}>
              <TextField
                select
                label="Language"
                variant="filled"
                value={field.language}
                onChange={(e) => {
                  const updatedFields = [...languagesFields];
                  updatedFields[index].language = e.target.value;
                  setLanguagesFields(updatedFields);
                }}>
                {languageOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Proficiency"
                variant="filled"
                value={field.proficiency}
                onChange={(e) => {
                  const updatedFields = [...languagesFields];
                  updatedFields[index].proficiency = e.target.value;
                  setLanguagesFields(updatedFields);
                }}>
                {proficiencyOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          ))}
        </Stack>
        {/* education */}
        <Stack spacing={1}>
          <div className="font-poppins text-3xl font-medium">
            Education Detail
          </div>
          {educationFields.map((field, index) => (
            <>
              <div className="font-poppins text-sm font-medium">
                {`Education Detail ${index + 1}`}
              </div>
              <Box className="grid grid-cols-3 gap-2" key={field.id}>
                <TextField
                  {...register(`education.${index}.institution`)}
                  margin="dense"
                  label="Institution"
                  variant="filled"
                />
                <TextField
                  {...register(`education.${index}.degree`)}
                  margin="dense"
                  label="Degree"
                  variant="filled"
                />
                <TextField
                  {...register(`education.${index}.fieldOfStudy`)}
                  margin="dense"
                  label="Field of Study"
                  variant="filled"
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    control={control}
                    name={`education.${index}.startDate`}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label="Start Date"
                        onChange={(date) => field.onChange(date)}
                      />
                    )}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    control={control}
                    name={`education.${index}.endDate`}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label="End Date"
                        onChange={(date) => field.onChange(date)}
                      />
                    )}
                  />
                  <CloseIcon onClick={() => handleRemoveEducation(index)} />
                </LocalizationProvider>
              </Box>
            </>
          ))}

          {educationFields.length < 2 && (
            <Button
              type="button"
              variant="contained"
              onClick={() => appendEducation({})}>
              Add Education
            </Button>
          )}
        </Stack>
        {/* Experience Detail */}
        <Stack spacing={1}>
          <div className="font-poppins text-3xl font-medium">
            Experience Detail
          </div>
          {experienceFields.map((field, index) => (
            <>
              <div className="font-poppins text-sm font-medium">
                {`Experience Detail ${index + 1}`}
              </div>
              <Box className="grid grid-cols-3 gap-2" key={field.id}>
                <TextField
                  {...register(`experience.${index}.company`)}
                  margin="dense"
                  label="Company"
                  variant="filled"
                />
                <TextField
                  {...register(`experience.${index}.position`)}
                  margin="dense"
                  label="Position"
                  variant="filled"
                />
                {/* Use Controller for DatePicker */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    control={control}
                    name={`experience.${index}.startDate`}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label="Start Date"
                        onChange={(date) => field.onChange(date)}
                      />
                    )}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    control={control}
                    name={`experience.${index}.endDate`}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label="End Date"
                        onChange={(date) => field.onChange(date)}
                      />
                    )}
                  />
                </LocalizationProvider>
                <CloseIcon onClick={() => handleRemoveExperience(index)} />
              </Box>
            </>
          ))}

          <Button
            type="button"
            variant="contained"
            onClick={() => appendExperience()}>
            Add Experience
          </Button>
        </Stack>
        {/* Certifications */}
        <Stack spacing={1}>
          <div className="font-poppins text-3xl font-medium">
            Certifications
          </div>
          {certificationsFields.map((field, index) => (
            <Box className="grid grid-cols-3 gap-2" key={index}>
              <TextField
                {...register(`certifications.${index}.name`)}
                margin="dense"
                label="Certification Name"
                variant="filled"
              />
              <TextField
                {...register(`certifications.${index}.organization`)}
                margin="dense"
                label="Organization"
                variant="filled"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  control={control}
                  name={`certifications.${index}.date`}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Date"
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />
              </LocalizationProvider>
              <CloseIcon onClick={() => handleRemoveCertification(index)} />
            </Box>
          ))}
          <Button
            type="button"
            variant="contained"
            onClick={appendCertification}>
            Add Certification
          </Button>
        </Stack>
        <Stack spacing={1}>
          <div className="font-poppins text-3xl font-medium">
            Certifications
          </div>
        </Stack>

        <Box className="grid grid-cols-3" sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label"> Skill</InputLabel>
            <Select
              className="bg-slate-1000"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedTechSkills}
              label="skill"
              multiple=""
              onChange={handleSkillSelect}>
              {techSkills.map((skill, index) => (
                <MenuItem key={index} value={skill}>
                  {skill}
                </MenuItem>
              ))}
            </Select>
            {selectedTechSkills && (
              <div>
                {selectedTechSkills.map((skill, index) => (
                  <div
                    className="p-2 border-2 inset-3 m-1 rounded-md bg-slate-200 "
                    key={index}>
                    <span key={index} className="selected-skill ">
                      <span className="px-1"> {skill}</span>
                      <CloseIcon
                        className="text-red-800"
                        onClick={() => handleSkillRemove(index)}
                      />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </FormControl>
        </Box>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default CvCreatorForm;
