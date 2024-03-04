import PropTypes from "prop-types";
import Input from "@mui/joy/Input";
import { Textarea } from "@mui/joy";
function SummaryComponent({ register, errors, id }) {
  return (
    <>
      <div className="font-poppins md:text-xl text-sm font-semibold md:font-medium">
        Summary
      </div>
      <div className="text-wrap font-poppins">
        Put your Desigination and summary details
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
        <div className="flex flex-col">
          <div>
            {" "}
            <label className="font-poppins font-medium" htmlFor="desigination">
              Desigination
            </label>
            <Input
              {...register("personalInfo.designation")}
              placeholder="Front end Developer"
              id="desigination"
            />
          </div>
        </div>

        <div>
          <label className="font-poppins font-medium" htmlFor="summary">
            Summary
          </label>
          <Textarea
            {...register("summary")}
            name="summary"
            id="summary"
            placeholder="Write your profile summary"
            variant="outlined"
            size="md"
            focused={id.editId ? true : false}
          />
        </div>
      </div>
    </>
  );
}

export default SummaryComponent;

SummaryComponent.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  id: PropTypes.object.isRequired,
};
