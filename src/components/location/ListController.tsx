import React from "react";

import { LocationProps } from "./Location";
import LocationList from "./List";

type OwnProps = {
  isOpen: boolean;
  onClick?: () => void;
};

type Props = OwnProps & LocationProps;

const ListController: React.FC<Props> = ({ isOpen, onClick, ...locProps }) => {
  return (
    <div className="location__arrow" onClick={onClick} data-test="container">
      {isOpen && <LocationList data-test="location-list" {...locProps} />}
    </div>
  );
};

export default ListController;
