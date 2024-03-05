import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProjectsComp = ({
  projectsFields,
  register,
  handleRemoveProjects,
  appendProjects,
}) => {
  return (
    <div className="mt-2">
      {" "}
      <div className="font-poppins md:text-2xl text-sm font-semibold md:font-medium">
        Projects Details
      </div>
      <div className="font-poppins py-2 text-wrap">
        Let's dive into your projects! Tell us about your latest creations.
      </div>
      {projectsFields.map((field, index) => (
        <>
          <Box
            className="grid md:grid-cols-3 grid-cols-1 gap-2 my-4"
            key={field.id}>
            <div>
              <label className="font-poppins font-medium" htmlFor="projectName">
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
              <label className="font-poppins font-medium" htmlFor="description">
                Description
              </label>
              <Textarea
                {...register(`projects[${index}].desc`)}
                placeholder="About your project description....  "
                id="description"
                maxRows={4}
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
                  className="w-[5%] mt-2"
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
    </div>
  );
};

ProjectsComp.propTypes = {
  projectsFields: PropTypes.array.isRequired,
  register: PropTypes.func.isRequired,
  handleRemoveProjects: PropTypes.func.isRequired,
  appendProjects: PropTypes.func.isRequired,
};

export default ProjectsComp;
