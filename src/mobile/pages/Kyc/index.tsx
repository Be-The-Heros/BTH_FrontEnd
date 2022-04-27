import React from "react";
import { IdentityVerification, PersonalInformation } from "./containers";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useGetKycStatus } from "hooks/kyc/kycStatus/useGetKycStatus";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Typography } from "@mui/material";
import Loading from "components/Loading";
import ErrorIcon from "@mui/icons-material/Error";
import PendingIcon from "@mui/icons-material/Pending";
import { Button } from "antd";
import { setLocalStorage } from "helpers/setTitleDocument";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 3rem 1rem;

  .ant-input-disabled,
  .ant-input[disabled] {
    color: #000;
    cursor: not-allowed;
    opacity: 1;
  }
  img {
    object-fit: contain;
  }
`;

export const VerifyAgainButton = styled(Button)`
  width: 100%;
  margin: 3em 0;
  background-color: #7cdfff;
  color: #000;
`;

const KycScreen = () => {
  const [tabState, setTabState] = React.useState<
    "personalInformation" | "identityVerification"
  >("personalInformation");

  const [isVerifyingAgainState, setIsVerifyingAgainState] =
    React.useState<boolean>();

  const [searchParams, setSearchParams] = useSearchParams();
  const userToken = searchParams.get("token");

  const getKycStatus = useGetKycStatus();

  React.useEffect(() => {
    getKycStatus.mutate(userToken || "");
  }, []);

  const renderStatus = (
    status: "pending" | "failed" | "unsent" | "verified"
  ) => {
    switch (status) {
      case "pending":
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10em",
            }}
          >
            <PendingIcon
              style={{ width: "5em", height: "5em", color: "green" }}
            />
            <Typography variant="h3">Pending</Typography>
            <Typography variant="h6">
              Your verification is in the waiting list
            </Typography>
          </div>
        );
      case "failed":
        return (
          <>
            {!isVerifyingAgainState ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "10em",
                }}
              >
                <ErrorIcon
                  style={{ width: "5em", height: "5em", color: "red" }}
                />
                <Typography variant="h4">Verification failed</Typography>
                <Typography variant="h6">
                  {getKycStatus.data?.reason}
                </Typography>

                <VerifyAgainButton
                  onClick={() => setIsVerifyingAgainState(true)}
                >
                  Verify Again
                </VerifyAgainButton>
              </div>
            ) : (
              <>
                <PersonalInformation
                  active={tabState === "personalInformation"}
                  handleSetTabState={() => setTabState("identityVerification")}
                />
                <IdentityVerification
                  active={tabState === "identityVerification"}
                  token={userToken || ""}
                />
              </>
            )}
          </>
        );
      case "unsent":
        return (
          <>
            <PersonalInformation
              active={tabState === "personalInformation"}
              handleSetTabState={() => setTabState("identityVerification")}
            />
            <IdentityVerification
              active={tabState === "identityVerification"}
              token={userToken || ""}
            />
          </>
        );
      case "verified":
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10em",
            }}
          >
            <CheckCircleRoundedIcon
              style={{ width: "5em", height: "5em", color: "green" }}
            />
            <Typography variant="h3">You are verified!</Typography>
            <Typography variant="h6">Your account is verified</Typography>
          </div>
        );
    }
  };
  if (getKycStatus.isLoading || getKycStatus.data === undefined) {
    return <Loading />;
  }

  return (
    <Container>
      {userToken ? (
        <>{renderStatus(getKycStatus.data.status)}</>
      ) : (
        <h3
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          You need to login to use KYC
        </h3>
      )}
    </Container>
  );
};

export default KycScreen;
