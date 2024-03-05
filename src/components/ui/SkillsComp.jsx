import Box from "@mui/material/Box";
import PropTypes from "prop-types";

import {
  Button,
  CircularProgress,
  FormControl,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Option, Select } from "@mui/joy";

const SkillsComp = ({
  selectedTechSkills,
  handleSkillSelect,
  techSkills,
  handleSkillRemove,
  loading,
  errors,
}) => {
  return (
    <div>
      {" "}
      <Stack sx={{ marginTop: "20px" }} spacing={1}>
        <label className="font-poppins md:text-2xl text-sm font-semibold md:font-medium">
          Skills
        </label>
        <div className="font-poppins py-2 text-wrap">
          What skills would you like to highlight? Select Below
        </div>
      </Stack>
      <Box className="grid grid-cols-3 " sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
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
        <Typography color={"error"}>Opps Some Field is Required</Typography>
      ) : null}
      <Button
        className="w-[10%] "
        type="submit"
        variant="contained"
        color="primary">
        {loading ? <CircularProgress sx={{ color: "inherit" }} /> : "Submit"}
      </Button>
    </div>
  );
};

SkillsComp.propTypes = {
  selectedTechSkills: PropTypes.array.isRequired,
  handleSkillSelect: PropTypes.func.isRequired,
  techSkills: PropTypes.array.isRequired,
  handleSkillRemove: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};

export default SkillsComp;
