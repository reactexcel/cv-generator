import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import schema from "../Validation/validation";
import SummaryComponent from "../ui/Summary";
import Divider from "@mui/material/Divider";
import ProjectsComp from "../ui/ProjectsComp";
import { techSkills } from "../../utils/staticData/techSkillls";

import { Stack } from "@mui/material";
import ApiFetching from "../../services/ApiFetching";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { setSingleUserData } from "../../redux/slices/CvSlice";
import { useDispatch, useSelector } from "react-redux";
import PersonalComponent from "../ui/PersonalForm";

import SocicalLinks from "../ui/LanguagesComp";
import EducationComp from "../ui/EducationComp";
import ExperienceComp from "../ui/ExperienceComp";
import CertificationsComp from "../ui/CertificationsComp";
import SkillsComp from "../ui/SkillsComp";
import { defaultValues } from "../../utils/staticData/defaultvalues";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Stack
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box width={"100%"}>{children}</Box>}
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
    defaultValues: defaultValues,
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

  const [languagesFields, setLanguagesFields] = useState([
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
          className="md:text-xs">
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
              <SocicalLinks
                languagesFields={languagesFields}
                setLanguagesFields={setLanguagesFields}
                languageOptions={languageOptions}
                proficiencyOptions={proficiencyOptions}
              />
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
            <EducationComp
              educationFields={educationFields}
              register={register}
              handleRemoveEducation={handleRemoveEducation}
              appendEducation={appendEducation}
            />
          </Stack>

          <Stack sx={{ marginTop: "20px" }} spacing={1}>
            <ProjectsComp
              projectsFields={projectsFields}
              register={register}
              handleRemoveProjects={handleRemoveProjects}
              appendProjects={appendProjects}
            />
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={tabvalue} index={3}>
          <Stack spacing={1}>
            <ExperienceComp
              experienceFields={experienceFields}
              register={register}
              handleRemoveExperience={handleRemoveExperience}
              appendExperience={appendExperience}
            />
          </Stack>{" "}
        </CustomTabPanel>
        <CustomTabPanel value={tabvalue} index={4}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <CertificationsComp
                certificationsFields={certificationsFields}
                register={register}
                handleRemoveCertification={handleRemoveCertification}
                appendCertification={appendCertification}
              />
            </Stack>
            <SkillsComp
              selectedTechSkills={selectedTechSkills}
              handleSkillSelect={handleSkillSelect}
              techSkills={techSkills}
              handleSkillRemove={handleSkillRemove}
              loading={loading}
              errors={errors}
            />
          </Stack>
        </CustomTabPanel>
      </form>
    </Stack>
  );
}
