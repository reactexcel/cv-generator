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
import SummaryComponent from "../ui/Summary";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import { Button, CircularProgress, Divider, Stack } from "@mui/material";
import ApiFetching from "../../services/ApiFetching";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { setSingleUserData } from "../../redux/slices/CvSlice";
import { useDispatch, useSelector } from "react-redux";
import PersonalComponent from "../ui/PersonalForm";
import Input from "@mui/joy/Input";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Stack
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box width={'100%'}>{children}</Box>}
    </Stack>
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
        designation: "",
      },
      summary: "",
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

  const [selectedTechSkills, setSelectedTechSkills] = useState([]);
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

  const handleSkillSelect = (e, newValue) => {
    newValue.forEach((skill) => {
      if (!selectedTechSkills.includes(skill)) {
        setSelectedTechSkills([...selectedTechSkills, skill]);
      } else {
        return;
      }
    });
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
    <Stack>
      <Stack>
        <Tabs
          value={tabvalue}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          className="md:text-xs"
        >
          <Tab label="Personal" {...a11yProps(0)} />
          <Tab label="Summary" {...a11yProps(1)} />
          <Tab label="Education & Project Details" {...a11yProps(2)} />
          <Tab label="Experience Details" {...a11yProps(3)} />
          <Tab label="Certifications & Skills" {...a11yProps(4)} />
        </Tabs>
        <Divider />
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomTabPanel value={tabvalue} index={0}>
          <div className="py-2 text-wrap font-poppins">
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
                  <Select
                    label="Language"
                    variant="outlined"
                    placeholder="Select a Language"
                    value={field.language}
                    onChange={(e) => {
                      if (e && e.target) {
                        const updatedFields = [...languagesFields];
                        updatedFields[index].language = e.target.value;
                        setLanguagesFields(updatedFields);
                      }
                    }}>
                    {languageOptions.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                  <Select
                    label="Proficiency"
                    placeholder="Select your Proficiency"
                    value={field.proficiency}
                    onChange={(e, newvalue) => {
                      if (e && e.target) {
                        console.log(e.target.value);
                        console.log(newvalue);
                        const updatedFields = [...languagesFields];
                        console.log(updatedFields);
                        updatedFields[index].proficiency = e.target.value;
                        setLanguagesFields(updatedFields);
                      }
                    }}>
                    {proficiencyOptions.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </Box>
              ))}
            </Stack>
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={tabvalue} index={1}>
          <Stack spacing={2}>
            <SummaryComponent register={register} errors={errors} id={id} />
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={tabvalue} index={2}>
          <Stack spacing={1}>
            <div className="font-poppins md:text-2xl text-sm font-semibold md:font-medium">
              Tell us about your education
            </div>
            <div className="font-poppins py-2 text-wrap">
              Enter your education experience so far, even if you are a current
              student or did not graduate
            </div>
            {educationFields.map((field, index) => (
              <>
                <Box
                  className="grid md:grid-cols-3 grid-cols-1 gap-2"
                  key={field.id}>
                  <div>
                    {" "}
                    <label
                      className="font-poppins font-medium"
                      htmlFor="Institution">
                      Institution
                    </label>
                    <Input
                      {...register(`education[${index}].institution`)}
                      placeholder="e.g Bundelkhand University"
                      className="mt-2"
                      id="Institution"
                    />
                  </div>
                  <div>
                    {" "}
                    <label
                      className="font-poppins font-medium"
                      htmlFor="Degree">
                      Degree
                    </label>
                    <Input
                      {...register(`education[${index}].degree`)}
                      id="Degree"
                      className="mt-2"
                      placeholder="e.g Bachelor of Technology"
                    />
                  </div>
                  <div>
                    <label className="font-poppins font-medium" htmlFor="field">
                      Field of study
                    </label>
                    <Input
                      {...register(`education[${index}].fieldOfStudy`)}
                      id="field"
                      className="mt-2"
                      placeholder="e.g Computer Science"
                    />
                  </div>
                  <div className="my-2">
                    <label
                      className="font-poppins font-medium"
                      htmlFor="StartYear">
                      Start Year
                    </label>
                    <Input
                      {...register(`education[${index}].startDate`)}
                      placeholder="e.g 2019"
                      className="mt-2"
                      id="StartYear"
                    />
                  </div>
                  <div className="my-2">
                    <label
                      className="font-poppins font-medium"
                      htmlFor="EndYear">
                      End Year
                    </label>
                    <div className="flex mt-2">
                      {" "}
                      <Input
                        {...register(`education[${index}].endDate`)}
                        id="EndYear"
                        placeholder="e.g 2023"
                        className="w-full"
                      />
                      <Button
                        onClick={() => handleRemoveEducation(index)}
                        className="w-[5%]"
                        color="error">
                        <CloseIcon />
                      </Button>
                    </div>
                  </div>
                </Box>
              </>
            ))}

              {educationFields.length <= 2 && (
                <div className="mt-2">
                  <Button
                    className="md:w-[20%] w-full text-sm"
                    type="button"
                    variant="contained"
                    onClick={() => appendEducation({})}
                  >
                    Add Education
                  </Button>
                </div>
              )}
            </Stack>

          <Stack sx={{ marginTop: "20px" }} spacing={1}>
            <div className="font-poppins md:text-2xl text-sm font-semibold md:font-medium">
              Projects Details
            </div>
            <div className="font-poppins py-2 text-wrap">
              Let's dive into your projects! Tell us about your latest
              creations.
            </div>
            {projectsFields.map((field, index) => (
              <>
                <Box
                  className="grid md:grid-cols-3 grid-cols-1 gap-2"
                  key={field.id}>
                  <div>
                    <label
                      className="font-poppins font-medium"
                      htmlFor="projectName">
                      Project Name{" "}
                    </label>
                    <Input
                      {...register(`projects[${index}].projectName`)}
                      placeholder="e.g Todo-App"
                      className="mt-2"
                      id="projectName"
                    />
                  </div>
                  <div>
                    <label
                      className="font-poppins font-medium"
                      htmlFor="description">
                      Description
                    </label>
                    <Input
                      {...register(`projects[${index}].desc`)}
                      placeholder="About your project description....  "
                      id="description"
                      className="mt-2"
                      multiple
                      rows={3}
                    />
                  </div>
                  <div>
                    <label
                      className="font-poppins font-medium my-2"
                      htmlFor="technologies">
                      Technologies Used
                    </label>
                    <div className="flex ">
                      <Input
                        {...register(`projects[${index}].technologies`)}
                        id="technologies"
                        className="mt-2 w-full"
                        placeholder="e.g React Js"
                      />
                      <Button
                        onClick={() => handleRemoveProjects(index)}
                        className="w-[5%]"
                        color="error">
                        <CloseIcon />
                      </Button>
                    </div>
                  </div>
                </Box>
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
        <CustomTabPanel value={tabvalue} index={3}>
          <Stack spacing={1}>
            <div className="font-poppins text-2xl font-normal">
              Tell us about your most recent job
            </div>

            {experienceFields.map((field, index) => (
              <>
                <Box className="grid md:grid-cols-3 gap-10" key={field.id}>
                  <div>
                    <label
                      className="font-poppins font-medium"
                      htmlFor="Company">
                      Company
                    </label>

                    <Input
                      {...register(`experience.${index}.company`)}
                      margin="dense"
                      id="Company"
                      placeholder="e.g Google"
                    />
                  </div>
                  <div>
                    {" "}
                    <label
                      className="font-poppins font-medium"
                      htmlFor="Position">
                      Position
                    </label>
                    <Input
                      {...register(`experience.${index}.position`)}
                      margin="dense"
                      id="Position"
                      placeholder="e.g Softawre Engineer"
                    />
                  </div>

                  <div>
                    {" "}
                    <label
                      className="font-poppins font-medium"
                      htmlFor="Achivements">
                      Achivements
                    </label>
                    <Input
                      {...register(`experience.${index}.responsibilities`)}
                      margin="dense"
                      id="Achivements"
                      placeholder="e.g Like Identified a problem and solved it."
                      multiline
                      rows={3}
                      variant="outlined"
                    />
                  </div>

                  <div>
                    {" "}
                    <label
                      className="font-poppins font-medium"
                      htmlFor="Technologies">
                      Technologies
                    </label>
                    <Input
                      {...register(`experience.${index}.environments`)}
                      margin="dense"
                      id="Technologies"
                      placeholder="e.g JavaScript"
                      multiline
                      rows={3}
                      focused={id.editId ? true : false}
                      variant="outlined"
                    />
                  </div>
                  <div>
                    {" "}
                    <label
                      className="font-poppins font-medium"
                      htmlFor="StartDate">
                      Start Date
                    </label>
                    <Input
                      {...register(`experience.${index}.startDate`)}
                      margin="dense"
                      id="StartDate"
                      placeholder="e.g 10/2020"
                    />
                  </div>
                  <div>
                    {" "}
                    <label
                      className="font-poppins font-medium"
                      htmlFor="EndDate">
                      End Date
                    </label>
                    <div className="flex gap-1">
                      {" "}
                      <Input
                        {...register(`experience.${index}.endDate`)}
                        margin="dense"
                        className="w-full"
                        id="EndDate"
                        placeholder="e.g 10/2023"
                      />
                      <Button
                        onClick={() => handleRemoveExperience(index)}
                        className="w-fit"
                        color="error">
                        <CloseIcon />
                      </Button>
                    </div>
                  </div>
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
        <CustomTabPanel value={tabvalue} index={4}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <div className="font-poppins md:text-xl  text-sm font-semibold md:font-medium">
                Certifications
              </div>
              {certificationsFields.map((field, index) => (
                <Box className="grid md:grid-cols-3 gap-2" key={field.id}>
                  <div>
                    <label
                      className="font-poppins font-medium"
                      htmlFor="CertificationName">
                      Certification Name
                    </label>
                    <Input
                      {...register(`certifications.${index}.name`)}
                      margin="dense"
                      placeholder="e.g Web Development"
                      id="CertificationName"
                      variant="outlined"
                    />
                  </div>
                  <div>
                    {" "}
                    <label
                      className="font-poppins font-medium"
                      htmlFor="Organization">
                      Organization
                    </label>
                    <Input
                      {...register(`certifications.${index}.organization`)}
                      margin="dense"
                      placeholder="e.g Coursera"
                      focused={id.editId ? true : false}
                      id="Organization"
                      variant="outlined"
                    />
                  </div>

                  <div>
                    {" "}
                    <label className="font-poppins font-medium" htmlFor="Date">
                      Date
                    </label>
                    <div className="flex gap-1">
                      <Input
                        {...register(`certifications.${index}.date`)}
                        margin="dense"
                        placeholder="e.g 04/03/2024"
                        className="w-full"
                        id="Date"
                      />
                      <Button
                        onClick={() => handleRemoveCertification(index)}
                        color="error"
                        className="w-fit">
                        {" "}
                        <CloseIcon />
                      </Button>
                    </div>
                  </div>
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
              <div className="font-poppins py-2 text-wrap">
                What skills would you like to highlight? Select Below
              </div>
            </Stack>
            <Box className="grid grid-cols-3" sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <label id="skills"> Skill</label>
                <Select
                  className="bg-slate-1000"
                  id="skills"
                  multiple
                  value={selectedTechSkills}
                  label="skill"
                  onChange={handleSkillSelect}
                  sx={{
                    minWidth: "13rem",
                  }}>
                  {techSkills.map((skill, index) => (
                    <Option key={index} value={skill}>
                      {skill}
                    </Option>
                  ))}
                </Select>
                {selectedTechSkills && (
                  <div>
                    {selectedTechSkills.map((skill, index) => (
                      <div
                        className="p-2 border-2 inset-3 m-1 rounded-md bg-slate-200 "
                        key={index}>
                        <div
                          key={index}
                          className="selected-skill flex justify-between px-2 border-2 max-w-sm">
                          <div className="px-1"> {skill}</div>
                          <div>
                            {" "}
                            <CloseIcon
                              className="text-red-800"
                              onClick={() => handleSkillRemove(index)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </FormControl>
            </Box>
            {errors.personalInfo ? (
              <Typography color={"error"}>
                Opps Some Field is Required
              </Typography>
            ) : null}
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
    </Stack>
  );
}
