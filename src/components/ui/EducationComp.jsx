import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Input from "@mui/joy/Input";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EducationComp = ({
  educationFields,
  register,
  handleRemoveEducation,
  appendEducation,
}) => {
  return (
    <div>
      {" "}
      <div className="font-poppins md:text-2xl text-sm font-semibold md:font-medium mt-4">
        Tell us about your education
      </div>
      <div className="font-poppins  py-2 text-wrap">
        Enter your education experience so far, even if you are a current
        student or did not graduate
      </div>
      {educationFields.map((field, index) => (
        <>
          <Box className="grid md:grid-cols-3 grid-cols-1 gap-2" key={field.id}>
            <div>
              {" "}
              <label className="font-poppins font-medium" htmlFor="Institution">
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
              <label className="font-poppins font-medium" htmlFor="Degree">
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
              <label className="font-poppins font-medium" htmlFor="StartYear">
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
              <label className="font-poppins font-medium" htmlFor="EndYear">
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
            onClick={() => appendEducation({})}>
            Add Education
          </Button>
        </div>
      )}
    </div>
  );
};

EducationComp.propTypes = {
  educationFields: PropTypes.array.isRequired,
  register: PropTypes.func.isRequired,
  handleRemoveEducation: PropTypes.func.isRequired,
  appendEducation: PropTypes.func.isRequired,
};

export default EducationComp;
