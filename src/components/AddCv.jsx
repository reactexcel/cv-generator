import React from 'react'
const AddCv = () => {
  return (
    <div className="w-full">
      <div className="text-blue-500 text-center text-2xl m-4">
        How do you want to Start
        <div className="flex h-1/2 gap-2 mt-6 ">
          <div className="w-full p-20 bg-slate-100 rounded-lg border-2">
            Create a new CV
            <p>We will help you create a new Cv</p>
            <p className="text-md">-step by step</p>
          </div>
          <div className="w-full p-20 bg-slate-100  rounded-lg  border-2">
            I Already have a cv{" "}
            <p>We will reformat it and fill in your information </p>
            <p>so you don't have to </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCv;
