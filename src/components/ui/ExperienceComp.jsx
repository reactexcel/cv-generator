import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Input from "@mui/joy/Input";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ExperienceComp = ({
  experienceFields,
  register,
  handleRemoveExperience,
  appendExperience,
}) => {
  return (
    <div>
      {" "}
      <div className="font-poppins text-2xl my-4 font-normal">
        Tell us about your most recent job
      </div>
      {experienceFields.map((field, index) => (
        <>
          <Box className="grid md:grid-cols-3 gap-6 my-2" key={field.id}>
            <div>
              <label className="font-poppins font-medium" htmlFor="Company">
                Company
              </label>

              <Input
                {...register(`experience.${index}.company`)}
                id="Company"
                className="mt-2"
                placeholder="e.g Google"
              />
            </div>
            <div>
              {" "}
              <label className="font-poppins font-medium" htmlFor="Position">
                Position
              </label>
              <Input
                {...register(`experience.${index}.position`)}
                id="Position"
                className="mt-2"
                placeholder="e.g Softawre Engineer"
              />
            </div>

            <div>
              {" "}
              <label className="font-poppins font-medium" htmlFor="Achivements">
                Achivements
              </label>
              <Input
                {...register(`experience.${index}.responsibilities`)}
                id="Achivements"
                className="mt-2"
                placeholder="e.g Like Identified a problem and solved it."
                rows={3}
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
                id="Technologies"
                placeholder="e.g JavaScript"
                rows={3}
              />
            </div>
            <div>
              {" "}
              <label className="font-poppins font-medium" htmlFor="StartDate">
                Start Date
              </label>
              <Input
                {...register(`experience.${index}.startDate`)}
                id="StartDate"
                placeholder="e.g 10/2020"
              />
            </div>
            <div>
              {" "}
              <label className="font-poppins font-medium" htmlFor="EndDate">
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
    </div>
  );
};

ExperienceComp.propTypes = {
  experienceFields: PropTypes.array.isRequired,
  register: PropTypes.func.isRequired,
  handleRemoveExperience: PropTypes.func.isRequired,
  appendExperience: PropTypes.func.isRequired,
};

export default ExperienceComp;
