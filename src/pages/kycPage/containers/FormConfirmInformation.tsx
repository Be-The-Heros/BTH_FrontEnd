import { useRecoilValue } from "recoil";
import { kycState } from "@/states/kycState/state";
import Style from "./style";
export const FormConfirmInformation = () => {
  const kyc = useRecoilValue(kycState);

  return (
    <Style>
      <h6>
        <strong> Confirm Information</strong>
      </h6>
      <div className="form-confirm-information">
        <div className="container">
          <div className="form-info d-flex justify-content-between">
            <div className="form-info__key">Nationality</div>
            <div className="form-info__value">Viet Nam</div>
          </div>
          <div className="form-info d-flex justify-content-between mt-2">
            <div className="form-info__key">National ID</div>
            <div className="form-info__value">{kyc.document_id}</div>
          </div>
          <div className="form-info d-flex justify-content-between mt-2">
            <div className="form-info__key">Date Of Birth</div>
            <div className="form-info__value">{kyc.date_of_birth}</div>
          </div>

          <div className="form-info d-flex justify-content-between mt-2">
            <div className="form-info__key">Residential Address</div>
            <div className="form-info__value">{kyc.residential_address}</div>
          </div>
          <div className="form-info d-flex justify-content-between mt-2">
            <div className="form-info__key">City</div>
            <div className="form-info__value">{kyc.province}</div>
          </div>

          <div className="form-info d-flex justify-content-between mt-2">
            <img src={kyc.document_photo} className="w-40"></img>
            <img src={kyc.user_photo} className="w-40"></img>
          </div>
        </div>
      </div>
    </Style>
  );
};
