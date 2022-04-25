import React from "react";
import styled from "styled-components";
import { useGetKycStatus } from "hooks/kyc/kycStatus/useGetKycStatus";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Typography } from "@mui/material";
import Loading from "components/Loading";
import ErrorIcon from "@mui/icons-material/Error";
import PendingIcon from "@mui/icons-material/Pending";
import { Button } from "antd";

interface OrganizationFormsProps {
  active: boolean;
}

const Container = styled.div<OrganizationFormsProps>`
  width: 100%;
  display: ${(props) => !props.active && "none"};
  background-color: #fff;
  border-radius: 10px;
  padding: 2em 3em;
  margin: 5.6em 0 3em;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
`;

export const VerifyButton = styled(Button)`
  width: 100%;
  margin: 3em 0;
  background-color: #7cdfff;
  color: #000;
`;

const OrganizationForms = (props: OrganizationFormsProps) => {
  const { active } = props;

  const userToken = localStorage.getItem("token");

  const getKycStatus = useGetKycStatus();

  React.useEffect(() => {
    getKycStatus.mutate();
  }, [active]);

  const renderStatus = (
    status: "pending" | "failed" | "unsent" | "verified"
  ) => {
    switch (status) {
      case "pending":
        return (
          <>
            <PendingIcon
              style={{ width: "5em", height: "5em", color: "green" }}
            />
            <Typography variant="h3">Pending</Typography>
            <Typography variant="h6">
              Your verification is in the waiting list
            </Typography>
          </>
        );
      case "failed":
        return (
          <>
            <ErrorIcon style={{ width: "5em", height: "5em", color: "red" }} />
            <Typography variant="h4">Verification failed</Typography>
            <Typography variant="h6">{getKycStatus.data?.reason}</Typography>

            <VerifyButton
              onClick={() => {
                window.open(
                  `http://localhost:3000/profile/kyc?token=${userToken}`,
                  "_blank"
                );
              }}
            >
              Verify Again
            </VerifyButton>
          </>
        );
      case "unsent":
        return (
          <>
            <Typography variant="h3">Let's verify your account!</Typography>
            <VerifyButton
              onClick={() => {
                window.open(
                  `http://localhost:3000/profile/kyc?token=${userToken}`,
                  "_blank"
                );
              }}
            >
              Verify
            </VerifyButton>
          </>
        );
      case "verified":
        return (
          <>
            <CheckCircleRoundedIcon
              style={{ width: "5em", height: "5em", color: "green" }}
            />
            <Typography variant="h3">You are verified!</Typography>
            <Typography variant="h6">Your account is verified</Typography>
          </>
        );
    }
  };
  if (getKycStatus.isLoading || getKycStatus.data === undefined) {
    return <Loading />;
  }

  return (
    <Container active={active}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {renderStatus(getKycStatus.data.status)}
      </div>
    </Container>
  );
};

export default OrganizationForms;
