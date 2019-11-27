import React, { useState } from "react";

import Dropdown from "./Dropdown";

import arrow from "../../../../../assets/toolbar/arrow.png";

const AllPrograms = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div
      className="start__all-programs"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      data-test="allprograms"
    >
      <img src={arrow} alt="arrow" className="start__all-programs__arrow" />
      <span className="start__all-programs-text">All programs</span>
      {open && <Dropdown data-test="dropdown" />}
    </div>
  );
};

export default AllPrograms;
