import { Typography } from '@mui/material';
import { Button, DatePicker, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';
import VietNamIcon from 'assets/icons/vietnam-icon.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ContinueButton } from '../../components';
import { Controller, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { kycState } from 'recoil/kycState/state';

const Container = styled.div<PersonalInformationProps>`
  display: ${(props) => !props.active && 'none'};
  width: 100%;
  height: 100%;

  .ant-input-prefix {
    margin-right: -21px;
  }
  /* #f7f7f8 */
  .ant-input-affix-wrapper-disabled,
  .ant-input-affix-wrapper[disabled] {
    color: #000;
    background-color: #ededed;
  }
`;

const Title = styled(Typography)`
  && {
    font-weight: 700;
    line-height: 42px;
    letter-spacing: 0em;
    padding-bottom: 0.6em;
  }
`;

const SubTitle = styled(Typography)`
  && {
    font-weight: 600;
    line-height: 42px;
    letter-spacing: 0em;
    padding-bottom: 0.6em;
  }
`;

const Label = styled(Typography)`
  && {
    font-weight: 500;
    line-height: 42px;
    letter-spacing: 0em;
    padding-bottom: 0.2em;
  }
`;

const CustomInput = styled(Input)`
  margin-bottom: 0.5em;
`;

const Error = styled.span`
  color: red;
  display: block;
`;

interface PersonalInformationProps {
  active: boolean;
  handleSetTabState?: () => void;
}

interface PersonalInformationField {
  national_id: string;
  full_name: string;
  date_of_birth: Date;
  residential_address: string;
  city: string;
}

const PersonalInformation = (props: PersonalInformationProps) => {
  const { active, handleSetTabState } = props;

  const [dateOfBirthState, setDateOfBirthState] = React.useState<string>('');
  const [isSubmittedInSecondScreenState, setIsSubmittedInSecondScreenState] =
    React.useState<boolean>(false);

  const [kyc, setRecoilKyc] = useRecoilState(kycState);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PersonalInformationField>();

  const [progressState, setProgressState] = React.useState<number>(1);

  const renderBody = () => {
    switch (progressState) {
      case 1:
        return (
          <React.Fragment>
            <SubTitle variant='h6'>Identity Information</SubTitle>
            <SubTitle variant='h6'>Nationality</SubTitle>
            <Input
              size='large'
              placeholder='large size'
              value={'VietNam (Việt Nam)'}
              disabled={true}
              prefix={<img src={VietNamIcon} style={{ width: '50%' }} />}
              style={{ marginBottom: '0.5em', color: '#000' }}
            />
            <Label>National ID</Label>
            <Controller
              name='national_id'
              control={control}
              rules={{ required: true }}
              defaultValue=''
              render={({ field }) => (
                <CustomInput {...field} size='large' type={'number'} />
              )}
            />
            {errors.national_id && <Error>National ID is required</Error>}
            <Label>Full Name</Label>
            <Controller
              name='full_name'
              control={control}
              rules={{ required: true, pattern: /^[a-zA-Z ]*$/ }}
              defaultValue=''
              render={({ field }) => (
                <CustomInput {...field} size='large' type={'text'} />
              )}
            />
            {errors.full_name && <Error>Full name is invalid</Error>}
            <Label>Date of Birth</Label>
            <DatePicker
              placeholder='YYYY-MM-DD'
              size='large'
              style={{ width: '100%' }}
              onChange={(value, dateString) => {
                setDateOfBirthState(dateString);
              }}
            />
            {errors.date_of_birth && <Error>Date of birth is required</Error>}
          </React.Fragment>
        );

      case 2:
        return (
          <React.Fragment>
            <SubTitle variant='h6'>Additional Information</SubTitle>
            <Label>Residential Address</Label>
            <Controller
              name='residential_address'
              control={control}
              rules={{ required: true }}
              defaultValue=''
              render={({ field }) => <CustomInput {...field} size='large' />}
            />
            {isSubmittedInSecondScreenState && errors.residential_address && (
              <Error>Residential Address is required</Error>
            )}
            <Label>City</Label>
            <Controller
              name='city'
              control={control}
              rules={{ required: true, pattern: /^[a-zA-Z ]*$/ }}
              defaultValue=''
              render={({ field }) => <CustomInput {...field} size='large' />}
            />
            {isSubmittedInSecondScreenState && errors.city && (
              <Error>City is required</Error>
            )}
          </React.Fragment>
        );
    }
  };

  const isFormNotValid = () => {
    return (
      !dateOfBirthState ||
      (errors.full_name && true) ||
      (errors.national_id && true) ||
      (progressState === 2 &&
        ((errors.residential_address && true) || (errors.city && true)))
    );
  };

  const onSubmit = (data: PersonalInformationField) => {
    setRecoilKyc((state) => ({
      ...state,
      document_id: data.national_id,
      fullname: data.full_name,
      date_of_birth: dateOfBirthState,
      residential_address: data.residential_address,
      province: data.city,
    }));
  };

  return (
    <Container active={active}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <div>
            {progressState !== 1 && (
              <ArrowBackIcon
                onClick={() => setProgressState((state) => state - 1)}
                style={{ marginBottom: '1em' }}
              />
            )}
            <Title variant='h5'>Personal Information</Title>
            {renderBody()}
          </div>

          <ContinueButton
            disabled={isFormNotValid()}
            htmlType='submit'
            onClick={() => {
              setProgressState((state) => state + 1);

              if (progressState === 2) {
                handleSetTabState!();
              }
            }}
          >
            Continue
          </ContinueButton>
        </div>
      </form>
    </Container>
  );
};

export default PersonalInformation;
