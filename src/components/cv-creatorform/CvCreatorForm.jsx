import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const CvCreatorForm = () => {
  const [loading, setLoading] = useState(false);
  const id = useParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
      },
      education: [],
      experience: [],
      certifications: [],
      languages: [],
      skills: [],
    },
  });

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
  }, [id.editId]);

  useEffect(() => {
    if (id.editId && SingleUserData._id) {
      const {
        personalInfo,
        education,
        experience,
        certifications,
        languages,
        skills,
      } = SingleUserData;

      setValue("personalInfo", { ...personalInfo });

      setValue("education", education || []);

      setValue("experience", experience || []);

      setValue("certifications", certifications || []);

      const languagesData = SingleUserData.languages.map((language) => ({
        language: language.language,
        proficiency: language.proficiency,
      }));
      setLanguagesFields(languagesData);
      setSelectedTechSkills(SingleUserData.skills);

      const defaultSkills = skills.filter((skill) => skills.includes(skill));
      setSelectedTechSkills(defaultSkills);
    }
  }, [id.editId, SingleUserData._id]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-2 text-wrap">
          We suggest including an email and phone number.
        </div>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <div className="font-poppins md:text-xl  text-sm font-semibold md:font-medium">
              Personal information
            </div>
            <Box className="grid md:grid-cols-3 grid-cols-1 gap-2">
              <div className="flex flex-col">
                <TextField
                  {...register("personalInfo.firstName", {
                    required: true,
                    maxLength: 10,
                  })}
                  margin="dense"
                  required
                  sx={{ backgroundColor: "white" }}
                  label={id.editId ? "" : "First Name"}
                  variant="outlined"
                  focused={id.editId ? true : false}
                  disabled={id.editId ? true : false}
                />
                <p className=" px-2">
                  {errors.personalInfo?.firstName && (
                    <p className="text-red-500">Please check the First Name</p>
                  )}
                </p>
              </div>

              <div className="flex flex-col">
                <TextField
                  {...register("personalInfo.lastName", {
                    required: true,
                    maxLength: 10,
                  })}
                  margin="dense"
                  label={id.editId ? "" : "Last Name"}
                  variant="outlined"
                  focused={id.editId ? true : false}
                  disabled={id.editId ? true : false}
                />
                <p className=" px-2">
                  {errors.personalInfo?.lastName && (
                    <p className="text-red-500">Please check the Last Name</p>
                  )}
                </p>
              </div>

              <div className="flex flex-col">
                <TextField
                  {...register("personalInfo.email", {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  type="email"
                  margin="dense"
                  required
                  label="Email"
                  variant="outlined"
                  focused={id.editId ? true : false}
                />
                <p className=" px-2">
                  {errors.personalInfo?.email && (
                    <p className="text-red-500">Please check your email</p>
                  )}
                </p>
              </div>

              <div className="flex flex-col">
                <TextField
                  {...register("personalInfo.phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Please enter only digits",
                    },
                    maxLength: {
                      value: 10,
                      message: "Phone number cannot exceed 10 digits",
                    },
                  })}
                  margin="dense"
                  required
                  label="Phone"
                  variant="outlined"
                  focused={id.editId ? true : false}
                />
                <p className=" px-2">
                  {errors.personalInfo?.phone && (
                    <p className="text-red-500">
                      {errors.personalInfo.phone.message}
                    </p>
                  )}
                </p>
              </div>
              <TextField
                {...register("personalInfo.address")}
                margin="dense"
                label="Address"
                variant="outlined"
                multiline
                rows={2}
                focused={id.editId ? true : false}
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
                focused={id.editId ? true : false}
              />
              <TextField
                {...register("personalInfo.links.linkedin")}
                margin="dense"
                label="LinkedIn"
                variant="outlined"
                focused={id.editId ? true : false}
              />
              <TextField
                {...register("personalInfo.links.website")}
                margin="dense"
                label="Website"
                variant="outlined"
                focused={id.editId ? true : false}
              />
            </Box>
          </Stack>
          <Stack spacing={1}>
            <div className="font-poppins md:text-xl  text-sm font-semibold md:font-medium">
              Languages
            </div>
            {languagesFields.map((field, index) => (
              <Box
                className="grid md:grid-cols-4 grid-cols-1 gap-2"
                key={index}>
                <TextField
                  select
                  label="Language"
                  variant="outlined"
                  value={field.language}
                  focused={id.editId ? true : false}
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
                  focused={id.editId ? true : false}
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
            <div className="font-poppins md:text-xl text-sm font-semibold md:font-medium">
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
                    {...register(`education[${index}].institution`)}
                    margin="dense"
                    focused={id.editId ? true : false}
                    label="Institution"
                    variant="outlined"
                  />
                  <TextField
                    {...register(`education[${index}].degree`)}
                    margin="dense"
                    focused={id.editId ? true : false}
                    label="Degree"
                    variant="outlined"
                  />
                  <TextField
                    {...register(`education[${index}].fieldOfStudy`)}
                    margin="dense"
                    focused={id.editId ? true : false}
                    label="Field of Study"
                    variant="outlined"
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      control={control}
                      name={`education[${index}].dateRange`}
                      render={({ field }) => (
                        <DateRangePicker
                          {...field}
                          label="Responsive variant"
                          focused={id.editId ? true : false}
                          localeText={{ start: "Start Date", end: "End Date" }}
                          onChange={(dateRange) => field.onChange(dateRange)}
                          value={field.dateRange}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                <Button
                  onClick={() => handleRemoveEducation(index)}
                  className="w-[30%]"
                  color="error">
                  <CloseIcon />
                </Button>
              </>
            ))}

            {educationFields.length <= 2 && (
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
                    focused={id.editId ? true : false}
                    variant="outlined"
                  />
                  <TextField
                    {...register(`experience.${index}.position`)}
                    margin="dense"
                    label="Position"
                    focused={id.editId ? true : false}
                    variant="outlined"
                  />
                  {/* Use Controller for DatePicker */}
                  <div className="w-full mt-2">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        control={control}
                        {...register(`experience[${index}].dateRange`)}
                        render={({ field }) => (
                          <DateRangePicker
                            {...field}
                            label="Responsive variant"
                            localeText={{
                              start: "Start Date",
                              end: "End Date",
                            }}
                            onChange={(dateRange) => field.onChange(dateRange)}
                            value={field.dateRange}
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
              onClick={() => appendExperience({})}>
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
                  focused={id.editId ? true : false}
                  label="Organization"
                  variant="outlined"
                />
                <div className="mt-2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      control={control}
                      name={`certifications[${index}].date`}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          label="Certificate Date"
                          onChange={(date) => field.onChange(date)}
                          value={field.date}
                        />
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
            {loading ? (
              <CircularProgress sx={{ color: "inherit" }} />
            ) : (
              "Submit"
            )}
          </Button>
        </Stack>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default CvCreatorForm;
