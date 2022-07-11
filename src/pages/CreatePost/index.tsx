import { useCreatePost } from "@/hooks/post";
import { userState } from "@/states";
import { Button, Image, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import clsx from "clsx";
import { LIMIT_FILE, SLOGANS } from "constants/slogan";
import {
  getAllCommunes,
  getAllDistricts,
  getAllProvinces,
  getCommune,
  getDistrict,
  getProvince,
} from "helpers";
import { cleanAccents } from "helpers/cleanAccents";
import { validURL } from "helpers/validate";
import toLower from "lodash/toLower";
import upperFirst from "lodash/upperFirst";
import React from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineSafety } from "react-icons/ai";
import { FcFullTrash } from "react-icons/fc";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import IntroductionTitle from "./components/IntroductionTitle";
import { PreviewPost } from "./components/PreviewPost";
import Style from "./style";
const { Option } = Select;
const TIME_CHANGE_TEXT = 3000;
interface FieldCreatePost {
  title: string;
  content: string;
  id_province: string;
  id_ward: string;
  id_district: string;
  residential_address: string;
  join_url: string;
}
const CreatePostPage = () => {
  const navigate = useNavigate();
  // init State
  const user = useRecoilValue(userState);
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldCreatePost>();
  let refInterval = React.useRef<any>();

  const [isOpenPreview, setIsOpenPreview] = React.useState(false);
  const [isCreateChat, setIsCreateChat] = React.useState(false);
  const [randomSlogan, setRandomSlogan] = React.useState(
    Math.floor(Math.random() * SLOGANS.length)
  );
  const [files, setFiles] = React.useState<
    Array<
      File & {
        preview: string;
      }
    >
  >([]);
  const [residence, setResidence] = React.useState({
    province: "",
    district: "",
    ward: "",
  });
  const [toggle, setToggle] = React.useState({ title: "", size: 0 });

  // * API Create Post
  const createPostMutation = useCreatePost();

  //  save in link photo image
  const { getRootProps, getInputProps } = useDropzone({
    accept: ["image/*", "video/*"],
    onDrop: (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      if (newFiles.length + files.length > LIMIT_FILE) {
        toast.warning("You can only upload 10 images");
        return;
      }
      setFiles([...files, ...newFiles]);
    },
  });

  //  TODO: Checking api
  React.useEffect(() => {
    toast.dismiss();
    if (createPostMutation.isLoading) {
      toast.loading("Creating post...");
      return;
    }
    if (createPostMutation.isSuccess) {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      toast.success("Creating post success");

      navigate(`/post/detail/${createPostMutation.data.post_id}`);
      return;
    }
  }, [
    createPostMutation.isLoading,
    createPostMutation.isSuccess,
    createPostMutation.data?.post_id,
  ]);

  // TODO: change slogan
  React.useEffect(() => {
    refInterval.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * SLOGANS.length);
      setRandomSlogan(randomIndex);
    }, TIME_CHANGE_TEXT);
  }, []);

  // TODO: render images
  const renderThumbsFile = () => {
    return files.map((file, index) => {
      const imageClassName = clsx(
        {
          ["pl-0"]: (index + 1) % 3 === 1,
          // ['pr-0']: (index + 1) % 3 === 0,
        },
        "col-4 item-image"
      );

      return (
        <div className={imageClassName} key={index}>
          <div
            className="w-100 h-100"
            style={{
              marginTop: "0.25rem",
              position: "relative",
            }}
          >
            <Image
              src={file.preview}
              style={{
                objectFit: "cover",
              }}
              alt="preview"
            />
            <FcFullTrash
              style={{
                position: "absolute",
                top: "0.25rem",
                right: "0.25rem",
                fontSize: "1.25rem",
                cursor: "pointer",
              }}
              onClick={() => setFiles([...files.filter((f, i) => i !== index)])}
            />
          </div>
        </div>
      );
    });
  };
  // unmount
  React.useEffect(() => {
    //! Make sure to revoke the data uris to avoid memory leaks
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      clearInterval(refInterval.current);
    };
  }, []);

  const onSubmit = (data: FieldCreatePost) => {
    const province = getProvince(data.id_province);
    const ward = getCommune(data.id_ward);
    const district = getDistrict(data.id_district);
    createPostMutation.mutate({
      ...data,
      province,
      district,
      ward,
      photos: files,
      isCreateChat,
    });
  };

  // TODO: Render component
  return (
    <Style className="create-post-page">
      <PreviewPost
        content={watch("content")}
        avatar={user.avatar}
        fullname={user.first_name + " " + user.last_name}
        joined={1000}
        join_url={watch("join_url")}
        title={watch("title")}
        visible={isOpenPreview}
        ward={getCommune(residence.ward)}
        district={getDistrict(residence.district)}
        province={getProvince(residence.province)}
        onCancel={() => setIsOpenPreview(false)}
        residential_address={watch("residential_address")}
        photos={files.map((file) => file.preview)}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="header">
          <div className="slide-right">{SLOGANS[randomSlogan]}</div>
        </div>
        <div className="d-flex">
          <div className="content w-70">
            <div className="form-input">
              <label>Title</label>
              <Controller
                name="title"
                control={control}
                rules={{ required: true, maxLength: 1000 }}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Title"
                    onFocus={(e) => {
                      const height = e.target.scrollHeight;
                      setToggle({ title: "title", size: height });
                    }}
                  />
                )}
              />
              {errors.title && (
                <span className="waring-error">Title is required</span>
              )}
            </div>
            <div className="form-input">
              <label className="w-100">Residence</label>
              <Controller
                name="id_province"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    defaultValue=""
                    showSearch
                    {...field}
                    className="col-4"
                    style={{
                      paddingLeft: "0",
                    }}
                    onFocus={() => {
                      setToggle({ title: "address", size: toggle.size });
                    }}
                    optionFilterProp="children"
                    filterOption={(input, option: any) => {
                      return cleanAccents(toLower(option?.children)).includes(
                        cleanAccents(toLower(input))
                      );
                    }}
                    onChange={(province) => {
                      setResidence({
                        ...residence,
                        province,
                      });

                      field.onChange(province);
                      setValue("id_district", "");
                      setValue("id_ward", "");
                    }}
                  >
                    <Option value={""}>Please Choose Province</Option>
                    {getAllProvinces().map((province) => (
                      <Option
                        value={province.idProvince}
                        key={province.idProvince}
                      >
                        {province.name}
                      </Option>
                    ))}
                  </Select>
                )}
              />
              <Controller
                name="id_district"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <React.Fragment>
                    <Select
                      defaultValue=""
                      className="col-4"
                      style={{
                        paddingRight: "0",
                      }}
                      {...field}
                      onFocus={() => {
                        setToggle({ title: "address", size: toggle.size });
                      }}
                      showSearch
                      filterOption={(input, option: any) => {
                        return cleanAccents(toLower(option?.children)).includes(
                          cleanAccents(toLower(input))
                        );
                      }}
                      onChange={(district) => {
                        setResidence({ ...residence, district });
                        field.onChange(district);
                      }}
                    >
                      <Option value={""}>Please Choose District</Option>

                      {getAllDistricts(residence.province).map((district) => (
                        <Option
                          value={district.idDistrict}
                          key={district.idDistrict}
                        >
                          {district.name}
                        </Option>
                      ))}
                    </Select>
                  </React.Fragment>
                )}
              />
              <Controller
                name="id_ward"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="col-4"
                    defaultValue={""}
                    style={{
                      paddingRight: "0",
                    }}
                    onFocus={() => {
                      setToggle({ title: "address", size: toggle.size });
                    }}
                    showSearch
                    filterOption={(input, option: any) => {
                      return cleanAccents(toLower(option?.children)).includes(
                        cleanAccents(toLower(input))
                      );
                    }}
                    onChange={(ward) => {
                      setResidence({ ...residence, ward });
                      field.onChange(ward);
                    }}
                  >
                    <Option value={""}>Please Choose Ward</Option>

                    {getAllCommunes(residence.district).map((ward) => (
                      <Option value={ward.idCommune} key={ward.idCommune}>
                        {ward.name}
                      </Option>
                    ))}
                  </Select>
                )}
              />
              {errors.id_province && (
                <span className="waring-error">Province is required</span>
              )}
              {!errors.id_province && errors.id_district && (
                <span className="waring-error">District is required</span>
              )}
              {!errors.id_province && !errors.id_district && errors.id_ward && (
                <span className="waring-error">Ward is required</span>
              )}
            </div>
            <div className="form-input">
              <label>Resident address</label>
              <Controller
                name="residential_address"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    onFocus={() => {
                      setToggle({
                        title: "resident_address",
                        size: toggle.size,
                      });
                    }}
                    placeholder="Enter resident address"
                    onBlur={(e) => {
                      field.onChange(
                        e.target.value
                          .split(" ")
                          .map((word) => upperFirst(word))
                          .join(" ")
                      );
                    }}
                  />
                )}
              />
              {errors.residential_address && (
                <span className="waring-error">Resident address invalid</span>
              )}
            </div>
            <div className="form-input">
              <label> Content</label>
              <Controller
                name="content"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    onFocus={() => {
                      setToggle({ ...toggle, title: "content" });
                    }}
                    placeholder="Explain your post"
                    style={{
                      height: "200px",
                    }}
                    autoSize
                    onChange={(e) => {
                      const height = e.target.scrollHeight;
                      setToggle({ title: "content", size: height });
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              {errors.content && (
                <span className="waring-error">Content required</span>
              )}
            </div>

            <div className="form-input">
              <label>URL chat room</label>
              {!isCreateChat && (
                <Controller
                  name="join_url"
                  rules={{
                    required: false,
                    validate: (value) => {
                      return (
                        !value || validURL(value || "") || value?.trim() === ""
                      );
                    },
                  }}
                  control={control}
                  render={({ field }) => (
                    <div className="w-50 position-relative">
                      <Input
                        {...field}
                        onFocus={() => {
                          setToggle({ ...toggle, title: "chat" });
                        }}
                        style={{
                          paddingRight: "3rem",
                        }}
                        placeholder="Example: https://t.me/+de5i4MvIBAMzYmY1"
                      />
                      <AiOutlineSafety
                        className="icon-safe"
                        color={
                          validURL(watch("join_url"))
                            ? "var(--bs-success)"
                            : "var(--bs-danger)"
                        }
                      />
                    </div>
                  )}
                />
              )}
              {isCreateChat && (
                <div>
                  <strong>
                    {" "}
                    we will create a chat room, once you create the post
                    successfully. Join the chat room by clicking the join button
                  </strong>
                </div>
              )}

              <div
                className="create-url-post"
                onClick={() => setIsCreateChat(!isCreateChat)}
              >
                {!isCreateChat ? (
                  <span
                    style={{
                      cursor: "pointer",
                      marginTop: "0.5rem",
                    }}
                  >
                    Create chat room from site
                  </span>
                ) : (
                  <span
                    style={{
                      cursor: "pointer",
                      marginTop: "0.5rem",
                      color: "var(--bs-cyan)",
                    }}
                  >
                    I have a chat room ?
                  </span>
                )}
              </div>

              {errors.join_url && (
                <span className="waring-error">Url is not valid</span>
              )}
            </div>

            <div
              className="form-input"
              onFocus={() => {
                setToggle({ title: "photo", size: toggle.size });
              }}
            >
              <label>Upload Image</label>
              <input {...getInputProps()} />
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
              <aside>
                <div
                  className="d-flex w-100 flex-wrap preview"
                  style={{ margin: "1rem 0" }}
                >
                  <Image.PreviewGroup>{renderThumbsFile()}</Image.PreviewGroup>
                </div>
              </aside>
            </div>
            <div
              className="form-input d-flex justify-content-around"
              style={{
                marginTop: "1rem",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                disabled={createPostMutation.isLoading}
              >
                Publish
              </Button>
              <Button type="default" onClick={() => setIsOpenPreview(true)}>
                Preview
              </Button>
            </div>
          </div>
          <div className="w-30 introduction">
            <IntroductionTitle {...toggle} />
          </div>
        </div>
      </form>
    </Style>
  );
};

export default CreatePostPage;
