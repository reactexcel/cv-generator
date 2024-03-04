import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { ErrorMessage } from "@hookform/error-message";
function PersonalComponent({ register, errors, id }) {
  return (
    <>
      <div className="font-poppins md:text-xl text-sm font-semibold md:font-medium">
        Personal information
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
        <div className="flex flex-col">
          <TextField
            {...register("personalInfo.firstName")}
            margin="dense"
            sx={{ backgroundColor: "white" }}
            label={id.editId ? "" : "First Name"}
            variant="outlined"
            focused={id.editId ? true : false}
            disabled={id.editId ? true : false}
            placeholder="First name"
          />

          <p className=" px-2">
            {errors.personalInfo?.firstName && (
              <p className="text-red-500">
                {errors.personalInfo.firstName.message}
              </p>
            )}
          </p>
        </div>

        <div className="flex flex-col">
          <TextField
            {...register("personalInfo.lastName")}
            margin="dense"
            label={id.editId ? "" : "Last Name"}
            variant="outlined"
            focused={id.editId ? true : false}
            disabled={id.editId ? true : false}
          />
          <p className=" px-2">
            {errors.personalInfo?.lastName && (
              <p className="text-red-500">
                {" "}
                {errors.personalInfo.lastName.message}
              </p>
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
              <p className="text-red-500">
                {" "}
                {errors.personalInfo.email.message}
              </p>
            )}
          </p>
        </div>

        <div className="flex flex-col">
          <TextField
            {...register("personalInfo.phone")}
            margin="dense"
            required
            label="Phone"
            variant="outlined"
            focused={id.editId ? true : false}
          />
          <p className=" px-2">
            {errors.personalInfo?.phone && (
              <p className="text-red-500">
                {" "}
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
      </div>
      <div className="font-poppins md:text-xl text-sm font-semibold md:font-medium">
        Websites, Portfolios, Profiles
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
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
      </div>
    </>
  );
}

export default PersonalComponent;

PersonalComponent.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  id: PropTypes.object.isRequired,
};
