import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FcConferenceCall } from "react-icons/fc";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { organizationState } from "recoil/organizations/state";
import Style from "./style";

export const SidebarRight = () => {
  const [organizations, setOrganizations] = useRecoilValue(organizationState);
  const orgs = useRecoilValue(organizationState);

  return (
    <Style>
      <div className="sidebar_top">
        <div>Top Organizations</div>
        <Link to="/">See All</Link>
      </div>
      {orgs.map((org, index) => {
        return (
          <div className="sidebar_group" key={index}>
            <Link to="" className="sidebar_group_detail">
              <FcConferenceCall
                style={{ fontSize: "3rem", marginTop: "-5px" }}
              />
              <div className="sidebar_group_detail_name">
                {org.name}
                <p>
                  <IoLocationOutline style={{ marginBottom: "0.2rem" }} />{" "}
                  {org.address}
                </p>
              </div>
            </Link>
            <div className="sidebar_group_rate">
              <div style={{ textAlign: "center" }}>
                5{" "}
                <AiOutlineStar
                  style={{ fontSize: "1.1rem", marginBottom: "0.2rem" }}
                />
              </div>
              <span>(100 reviews)</span>
            </div>
          </div>
        );
      })}
    </Style>
  );
};
