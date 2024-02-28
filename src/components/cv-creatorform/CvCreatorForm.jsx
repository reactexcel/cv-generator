import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import ApiFetching from "../../services/ApiFetching";
import CloseIcon from "@mui/icons-material/Close";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { setSingleUserData } from "../../redux/slices/CvSlice";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers";

// import { useNavigate } from "react-router";

const CvCreatorForm = () => {
  const [loading, setLoading] = useState(false);
  const id = useParams();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
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
  const navigate = useNavigate();
  const SingleUserData = useSelector(
    (state) => state.CvSlice.getSingleUserData
  );
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
    const requestData = {
      ...data,
      languages: languagesFields.map((language) => ({
        language: language.language,
        proficiency: language.proficiency,
      })),
      skills: selectedTechSkills,
    };

    if (id.editId) {
      // If editing an existing CV, send a PUT request to update the CV
      const res = await ApiFetching(
        "PUT",
        `user/cv/update/${id.editId}`,
        requestData
      );
      if (res.status === 200) {
        toast.success("CV updated successfully");
        navigate(`../cvTemlate/${res.data.data._id}`);
      }
    } else {
      setLoading(true);
      const dataToSend = await ApiFetching(
        "POST",
        "user/cv/create",
        requestData
      );
      if (dataToSend.status === 200) {
        toast.success("CV Created Successfully");
        navigate(`../cvTemlate/${dataToSend.data.data._id}`);
        setLoading(false);
      }
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
  const dispatch = useDispatch();
  useEffect(() => {
    const getSingleUserData = async () => {
      const getSingleData = await ApiFetching(
        "GET",
        `user/cv/fetch/${id.editId}`,
        null
      );
      if (getSingleData.status === 200) {
        dispatch(setSingleUserData(getSingleData.data.data));
      }
    };
    if (id.editId) {
      getSingleUserData();
    }
  }, []);

  useEffect(() => {
    if (id.editId && SingleUserData._id) {
      const { personalInfo, education, experience, certifications } =
        SingleUserData;
      console.log(certifications, "asdad");
      console.log(education);
      if (id.editId) {
        education.forEach((item, index) => {
          Object.keys(item).forEach((key) => {
            setValue(`education[${index}].${key}`, item[key]);
          });
        });
        experience.forEach((item, index) => {
          Object.keys(item).forEach((key) => {
            setValue(`experience[${index}].${key}`, item[key]);
          });
        });
        certifications.forEach((item, index) => {
          Object.keys(item).forEach((key) => {
            setValue(`certifications[${index}].${key}`, item[key]);
          });
        });
      }

      Object.keys(personalInfo).forEach((key) => {
        setValue(`personalInfo.${key}`, personalInfo[key]);
      });

      const languagesData = SingleUserData.languages.map((language) => ({
        language: language.language,
        proficiency: language.proficiency,
      }));
      setLanguagesFields(languagesData);
      setSelectedTechSkills(SingleUserData.skills);
    }
  }, [id.editId, SingleUserData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="py-2 text-wrap">
        We suggest including an email and phone number.
      </div>
      <Stack spacing={2}>
        {/* Personal Information */}
        <Stack spacing={1}>
          <div className="font-poppins md:text-xl  text-sm font-semibold md:font-medium">
            Personal information
          </div>
          <Box className="grid md:grid-cols-3 grid-cols-1 gap-2">
            <TextField
              {...register("personalInfo.firstName")}
              margin="dense"
              required
              sx={{ backgroundColor: "white" }}
              label="First Name"
              error={!!errors.personalInfo?.firstName}
              variant="outlined"
              disabled={id.editId ? true : false}
            />
            <TextField
              {...register("personalInfo.lastName")}
              margin="dense"
              label="Last Name"
              variant="outlined"
              disabled={id.editId ? true : false}
            />
            <TextField
              {...register("personalInfo.email")}
              type="email"
              margin="dense"
              required
              label="Email"
              variant="outlined"
            />
            <TextField
              {...register("personalInfo.phone")}
              margin="dense"
              required
              label="Phone"
              variant="outlined"
            />
            <TextField
              {...register("personalInfo.address")}
              margin="dense"
              label="Address"
              variant="outlined"
              multiline
              rows={2}
            />
          </Box>
        </Stack>
        <Stack spacing={1}>
          <div className="font-poppins md:text-xl  text-sm font-semibold md:font-medium">
            Social Link
          </div>
          <Box className="grid md:grid-cols-3 grid-cols-1 gap-2">
            <TextField
              {...register("personalInfo.links.github")}
              margin="dense"
              label="Github"
              variant="outlined"
            />
            <TextField
              {...register("personalInfo.links.linkedin")}
              margin="dense"
              label="LinkedIn"
              variant="outlined"
            />
            <TextField
              {...register("personalInfo.links.website")}
              margin="dense"
              label="Website"
              variant="outlined"
            />
          </Box>
        </Stack>

        {/* Languages */}
        <Stack spacing={1}>
          <div className="font-poppins md:text-xl  text-sm font-semibold md:font-medium">
            Languages
          </div>
          {languagesFields.map((field, index) => (
            <Box className="grid md:grid-cols-4 grid-cols-1 gap-2" key={index}>
              <TextField
                select
                label="Language"
                variant="outlined"
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
                variant="outlined"
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
          <div className="font-poppins md:text-xl  text-sm font-semibold md:font-medium">
            Education Detail
          </div>
          {educationFields.map((field, index) => (
            <>
              <div className="font-poppins text-sm font-medium">
                {`Education Detail ${index + 1}`}
              </div>
              <Box
                className="grid md:grid-cols-3 grid-cols-1 gap-2"
                key={field.id}>
                <TextField
                  {...register(`education.${index}.institution`)}
                  margin="dense"
                  label="Institution"
                  variant="outlined"
                  // value={field.institution}
                />
                <TextField
                  {...register(`education.${index}.degree`)}
                  margin="dense"
                  label="Degree"
                  variant="outlined"
                  // value={field.degree}
                />
                <TextField
                  {...register(`education.${index}.fieldOfStudy`)}
                  margin="dense"
                  label="Field of Study"
                  variant="outlined"
                  // value={field.fieldOfStudy}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    control={control}
                    name={`education.${index}.dateRange`}
                    render={({ field }) => (
                      <DateRangePicker
                        {...field}
                        label="Responsive variant"
                        localeText={{ start: "Start Date", end: "End Date" }}
                        onChange={(dateRange) => field.onChange(dateRange)}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </>
          ))}

          {educationFields.length < 2 && (
            <Button
              className="md:w-[20%] w-full text-sm"
              type="button"
              variant="outlined"
              onClick={() => appendEducation({})}>
              Add Education
            </Button>
          )}
        </Stack>
        {/* Experience Detail */}
        <Stack spacing={1}>
          <div className="font-poppins md:text-xl  text-sm font-semibold md:font-medium">
            Experience
          </div>
          {experienceFields.map((field, index) => (
            <>
              <div className="font-poppins text-sm font-medium">
                {`Experience Detail ${index + 1}`}
              </div>
              <Box className="grid md:grid-cols-3 gap-2" key={field.id}>
                <TextField
                  {...register(`experience.${index}.company`)}
                  margin="dense"
                  label="Company"
                  variant="outlined"
                />
                <TextField
                  {...register(`experience.${index}.position`)}
                  margin="dense"
                  label="Position"
                  variant="outlined"
                />
                {/* Use Controller for DatePicker */}
                <div className="w-full mt-2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      control={control}
                      name={`experience.${index}.dateRange`}
                      render={({ field }) => (
                        <DateRangePicker
                          {...field}
                          label="Responsive variant"
                          component="DateRangePicker"
                          localeText={{ start: "Start Date", end: "End Date" }}
                          onChange={(dateRange) => field.onChange(dateRange)}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <Button
                  onClick={() => handleRemoveExperience(index)}
                  className="w-[30%]"
                  color="error">
                  <CloseIcon />
                </Button>
              </Box>
            </>
          ))}

          <Button
            className="md:w-[20%] w-full text-sm"
            type="button"
            variant="outlined"
            onClick={() => appendExperience()}>
            Add Experience
          </Button>
        </Stack>
        {/* Certifications */}
        <Stack spacing={1}>
          <div className="font-poppins md:text-xl  text-sm font-semibold md:font-medium">
            Certifications
          </div>
          {certificationsFields.map((field, index) => (
            <Box className="grid md:grid-cols-3 gap-2" key={field.id}>
              <TextField
                {...register(`certifications.${index}.name`)}
                margin="dense"
                label="Certification Name"
                variant="outlined"
              />
              <TextField
                {...register(`certifications.${index}.organization`)}
                margin="dense"
                label="Organization"
                variant="outlined"
              />
              <div className="mt-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    control={control}
                    name={`certifications.${index}.date`}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          {...field}
                          label="Certified Date"
                          onChange={(date) => field.onChange(date)}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </LocalizationProvider>
              </div>
              <Button
                onClick={() => handleRemoveCertification(index)}
                color="error"
                className="w-[30%]">
                {" "}
                <CloseIcon />
              </Button>
            </Box>
          ))}
          <Button
            type="button"
            className="md:w-[20%] w-full text-sm"
            variant="outlined"
            onClick={appendCertification}>
            Add Certification
          </Button>
        </Stack>
        <Stack spacing={1}>
          <div className="font-poppins md:text-xl  text-sm font-semibold md:font-medium">
            Skills
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
                    <span key={index} className="selected-skill max-w-sm">
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

        <Button
          className="w-[10%]"
          type="submit"
          variant="contained"
          color="primary">
          {loading ? <CircularProgress sx={{ color: "inherit" }} /> : "Submit"}
        </Button>
      </Stack>
    </form>
  );
};

export default CvCreatorForm;
