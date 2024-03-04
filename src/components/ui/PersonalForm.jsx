import Input from "@mui/joy/Input";
import PropTypes from "prop-types";
import Textarea from "@mui/joy/Textarea";
// import CustomInputField from "./CustomInputField";

function PersonalComponent({ register, errors, id }) {
  return (
    <>
      <div className="font-poppins md:text-xl text-sm font-semibold md:font-medium">
        Personal information
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
        <div className="flex flex-col">
          <label className="font-poppins font-medium" htmlFor="firstName">
            First Name
          </label>
          <Input
            {...register("personalInfo.firstName")}
            id="firstName"
            disabled={id.editId ? true : false}
            placeholder="e.g  Amit"
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
          <label className="font-poppins font-medium" htmlFor="lastName">
            Last Name
          </label>
          <Input
            {...register("personalInfo.lastName")}
            label={id.editId ? "" : "Last Name"}
            placeholder="e.g  Paswan"
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
          <label className="font-poppins font-medium" htmlFor="lastName">
            Email
          </label>
          <Input
            {...register("personalInfo.email", {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            type="email"
            required
            id="email"
            placeholder="e.g  example@example.com"
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
          <label className="font-poppins font-medium" htmlFor="Phone">
            Phone
          </label>
          <Input
            {...register("personalInfo.phone")}
            required
            placeholder="e.g  +91 1234567890"
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
        <div>
          <label className="font-poppins font-medium" htmlFor="Address">
            Address
          </label>
          <Textarea
            {...register("personalInfo.address")}
            placeholder="e.g Sector-8, Noida, Uttar Pradesh 201301"
            multiline
            rows={2}
            focused={id.editId ? true : false}
          />
        </div>
      </div>
      <div className="font-poppins md:text-xl text-sm font-semibold md:font-medium">
        Websites, Portfolios, Profiles
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
        <div>
          {" "}
          <label className="font-poppins font-medium" htmlFor="firstName">
            Github
          </label>
          <Input
            {...register("personalInfo.links.github")}
            name="Github"
            placeholder="Github"
            variant="outlined"
            focused={id.editId ? true : false}
          />
        </div>
        <div>
          <label className="font-poppins font-medium" htmlFor="firstName">
            Linkdin
          </label>
          <Input
            {...register("personalInfo.links.linkedin")}
            placeholder="Linkdin"
          />
        </div>
        <div>
          <label className="font-poppins font-medium" htmlFor="Website">
            Website
          </label>
          <Input
            {...register("personalInfo.links.website")}
            placeholder="Website"
            name="Website"
          />
        </div>
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
