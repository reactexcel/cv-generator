import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import schema from "../Validation/validation";

import {
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import ApiFetching from "../../services/ApiFetching";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { setSingleUserData } from "../../redux/slices/CvSlice";
import { useDispatch, useSelector } from "react-redux";
import PersonalComponent from "../ui/PersonalForm";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [tabvalue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [loading, setLoading] = useState(false);
  const id = useParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    shouldUseNativeValidation: true,
    resolver: yupResolver(schema),
    defaultValues: {
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
      },
      projects: [
        {
          projectName: "",
          desc: "",
          technologies: "",
        },
      ],
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
          responsibilities: [],
          environments: [],
        },
      ],
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
    defaultValue: [
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
      },
    ],
  });

  const {
    fields: projectsFields,
    append: appendProjects,
    remove: removeProjects,
  } = useFieldArray({
    control,
    name: "projects",
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
  const handleRemoveProjects = (index) => {
    removeProjects(index);
  };
  const handleRemoveEducation = (index) => {
    removeEducation(index);
  };
  const [certificationsFields, setCertificationsFields] = React.useState([
    {
      name: "",
      organization: "",
      date: "",
    },
  ]);
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
    try {
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
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((validationError) => {
          toast.error(validationError.message);
        });
      } else {
        console.error("Error:", error);
      }
    }
  };

  const handleSkillSelect = (e) => {
    const skill = e.target.value;
    if (selectedTechSkills.includes(skill)) {
      toast.error("Skill already selected!");
      return;
    }
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
        projects,
        education,
        experience,
        certifications,
        languages,
        skills,
      } = SingleUserData;

      setValue("personalInfo", { ...personalInfo });

      setValue("projects", projects || []);

      setValue("education", education || []);

      setValue("experience", experience || []);

      setValue("certifications", certifications || []);

      const languagesData = languages.map((language) => ({
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
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabvalue}
          onChange={handleChange}
          aria-label="basic tabs example">
          <Tab label="Personal" {...a11yProps(0)} />
          <Tab label="Education & Project Details" {...a11yProps(1)} />
          <Tab label="Experience Details" {...a11yProps(2)} />
          <Tab label="Certifications & Skills" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomTabPanel value={tabvalue} index={0}>
          <div className="py-2 text-wrap">
            We suggest including an email and phone number.
          </div>
          <Stack spacing={2}>
            <PersonalComponent register={register} errors={errors} id={id} />
            <Stack spacing={1}>
              <div className="font-poppins md:text-xl  text-sm font-semibold md:font-medium">
                What languages do you know?
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
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={tabvalue} index={1}>
          <Stack spacing={1}>
            <div className="font-poppins md:text-2xl text-sm font-semibold md:font-medium">
              Tell us about your education
            </div>
            <div className="font-poppins text-sm font-normal">
              Enter your education experience so far, even if you are a current
              student or did not graduate
            </div>
            {educationFields.map((field, index) => (
              <>
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
                  <TextField
                    {...register(`education[${index}].startDate`)}
                    margin="dense"
                    focused={id.editId ? true : false}
                    label="Start Year"
                    variant="outlined"
                  />
                  <TextField
                    {...register(`education[${index}].endDate`)}
                    margin="dense"
                    focused={id.editId ? true : false}
                    label="End Year "
                    variant="outlined"
                  />
                </Box>
                <Button
                  onClick={() => handleRemoveEducation(index)}
                  className="w-[5%]"
                  color="error">
                  <CloseIcon />
                </Button>
              </>
            ))}

            {educationFields.length <= 2 && (
              <div className="mt-2">
                <Button
                  className="md:w-[20%] w-full text-sm"
                  type="button"
                  variant="contained"
                  onClick={() => appendEducation({})}>
                  Add Education
                </Button>
              </div>
            )}
          </Stack>

          <Stack sx={{ marginTop: "20px" }} spacing={1}>
            <div className="font-poppins md:text-2xl text-sm font-semibold md:font-medium">
              Projects Details
            </div>
            <div className="font-poppins text-sm font-normal">
              Let's dive into your projects! Tell us about your latest
              creations.
            </div>
            {projectsFields.map((field, index) => (
              <>
                <Box
                  className="grid md:grid-cols-3 grid-cols-1 gap-2"
                  key={field.id}>
                  <TextField
                    {...register(`projects[${index}].projectName`)}
                    margin="dense"
                    focused={id.editId ? true : false}
                    label="Project Name"
                    variant="outlined"
                  />
                  <TextField
                    {...register(`projects[${index}].desc`)}
                    margin="dense"
                    focused={id.editId ? true : false}
                    label="Description"
                    multiple
                    rows={3}
                    variant="outlined"
                  />
                  <TextField
                    {...register(`projects[${index}].technologies`)}
                    margin="dense"
                    focused={id.editId ? true : false}
                    label="Technologies Used"
                    variant="outlined"
                  />
                </Box>
                <Button
                  onClick={() => handleRemoveProjects(index)}
                  className="w-[5%]"
                  color="error">
                  <CloseIcon />
                </Button>
              </>
            ))}

            {projectsFields.length <= 2 && (
              <Button
                className="md:w-[20%] w-full text-sm"
                type="button"
                variant="contained"
                onClick={() =>
                  appendProjects({
                    projectName: "",
                    desc: "",
                    technologies: "",
                  })
                }>
                Add Projects
              </Button>
            )}
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={tabvalue} index={2}>
          <Stack spacing={1}>
            <div className="font-poppins text-2xl font-normal">
              Tell us about your most recent job
            </div>

            {experienceFields.map((field, index) => (
              <>
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
                  <TextField
                    {...register(`experience.${index}.startDate`)}
                    margin="dense"
                    label="Start Date"
                    focused={id.editId ? true : false}
                    variant="outlined"
                  />
                  <TextField
                    {...register(`experience.${index}.endDate`)}
                    margin="dense"
                    label="End Date"
                    focused={id.editId ? true : false}
                    variant="outlined"
                  />
                  <TextField
                    {...register(`experience.${index}.responsibilities`)}
                    margin="dense"
                    label="Achivements"
                    multiline
                    rows={3}
                    focused={id.editId ? true : false}
                    variant="outlined"
                  />
                  <TextField
                    {...register(`experience.${index}.environments`)}
                    margin="dense"
                    label="Technologies"
                    multiline
                    rows={3}
                    focused={id.editId ? true : false}
                    variant="outlined"
                  />

                  <Button
                    onClick={() => handleRemoveExperience(index)}
                    className="w-[5%]"
                    color="error">
                    <CloseIcon />
                  </Button>
                </Box>
              </>
            ))}

            <Button
              className="md:w-[20%] w-full text-sm"
              type="button"
              variant="contained"
              onClick={() => appendExperience({})}>
              Add Experience
            </Button>
          </Stack>{" "}
        </CustomTabPanel>
        <CustomTabPanel value={tabvalue} index={3}>
          <Stack spacing={2}>
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

                  <TextField
                    {...register(`certifications.${index}.date`)}
                    margin="dense"
                    focused={id.editId ? true : false}
                    label="Date"
                    variant="outlined"
                  />

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
                variant="contained"
                onClick={() => appendCertification({})}>
                Add Certification
              </Button>
            </Stack>
            <Stack sx={{ marginTop: "20px" }} spacing={1}>
              <div className="font-poppins md:text-2xl text-sm font-semibold md:font-medium">
                Skills
              </div>
              <div className="font-poppins md:text-lg text-sm font-normal md:font-normal">
                What skills would you like to highlight? Select Below
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
              className="w-[10%] "
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
        </CustomTabPanel>
      </form>
    </Box>
  );
}
