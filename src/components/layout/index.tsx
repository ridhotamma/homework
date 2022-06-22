import React from "react";

const BasicLayout = (props: any) => {
  return (
    <React.Fragment>
      <div className="container w-full md:px-10 bg-orange-200 h-full">
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default BasicLayout;
