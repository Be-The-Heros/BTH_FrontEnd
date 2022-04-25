interface KycState {
  document_id: string;
  user_photo: String;
  residential_address: String;
  document_photo: String;
  passport: "identity_card" | "license_card";
  date_of_birth: String;
  fullname: String;
  province: String;
}
