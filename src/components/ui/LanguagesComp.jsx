import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const SocicalLinks = ({
  languagesFields,
  setLanguagesFields,
  languageOptions,
  proficiencyOptions,
}) => {
  return (
    <div>
      {" "}
      <div className="font-poppins md:text-xl mt-2  text-sm font-semibold md:font-medium">
        What languages do you know?
      </div>
      {languagesFields.map((field, index) => (
        <Box className="grid md:grid-cols-4 grid-cols-1 gap-2 mt-4" key={index}>
          <Select
            label="Language"
            placeholder="Select a Language"
            value={field.language}
            onChange={(e, newValue) => {
              if (e && e.target) {
                const updatedFields = [...languagesFields];
                updatedFields[index].language = newValue;
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
            onChange={(e, newValue) => {
              if (e && e.target) {
                const updatedFields = [...languagesFields];
                updatedFields[index].proficiency = newValue;
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
    </div>
  );
};

SocicalLinks.propTypes = {
  languagesFields: PropTypes.array.isRequired,
  setLanguagesFields: PropTypes.func.isRequired,
  languageOptions: PropTypes.array.isRequired,
  proficiencyOptions: PropTypes.array.isRequired,
};

export default SocicalLinks;
