import React from "react";
import Sidebar from "./sidebar";
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const MainPages = ({ username, password }) => {
  const isAdminUser = username === "Admin" && password === "Admin@1234a";

  return (
    <div className="bg-grey vh-100 sticky">
      <div className="row">
        <div className="col-2">
          {isAdminUser ? <Sidebar /> : null}
        </div>
        <div className="col-10 vh-100 m-0 p-0">
          {!isAdminUser ? <Outlet /> : null}
        </div>
      </div>
    </div>
  );
};

MainPages.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default MainPages;
