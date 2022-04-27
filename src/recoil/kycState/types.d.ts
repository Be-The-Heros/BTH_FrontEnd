interface KycState {
  document_id: string;
  user_photo: string;
  residential_address: string;
  document_photo: string;
  passport: 'identity_card' | 'license_card';
  date_of_birth: string;
  fullname: string;
  province: String;
}
