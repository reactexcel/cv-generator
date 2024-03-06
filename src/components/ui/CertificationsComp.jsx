import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Input from "@mui/joy/Input";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CertificationsComp = ({
  certificationsFields,
  register,
  handleRemoveCertification,
  appendCertification,
}) => {
  return (
    <div>
      {" "}
      <div className="font-poppins md:text-xl mt-4 text-sm font-semibold md:font-medium">
        Certifications
      </div>
      {certificationsFields.map((field, index) => (
        <Box className="grid md:grid-cols-3 gap-2 my-4" key={field.id}>
          <div>
            <label
              className="font-poppins font-medium"
              htmlFor="CertificationName">
              Certification Name
            </label>
            <Input
              {...register(`certifications.${index}.name`)}
              placeholder="e.g Web Development"
              className="mt-2"
              id="CertificationName"
            />
          </div>
          <div>
            {" "}
            <label className="font-poppins font-medium" htmlFor="Organization">
              Organization
            </label>
            <Input
              {...register(`certifications.${index}.organization`)}
              placeholder="e.g Coursera"
              className="mt-2"
              id="Organization"
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
                placeholder="e.g 04/03/2024"
                className="w-full mt-2"
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
    </div>
  );
};

CertificationsComp.propTypes = {
  certificationsFields: PropTypes.array.isRequired,
  register: PropTypes.func.isRequired,
  handleRemoveCertification: PropTypes.func.isRequired,
  appendCertification: PropTypes.func.isRequired,
};

export default CertificationsComp;
