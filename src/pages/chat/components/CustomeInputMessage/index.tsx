import { Form, Input } from "antd";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import React, { useState } from "react";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { MdOutlineAttachFile } from "react-icons/md";
import { CustomeFormInputMessStyle } from "./style";

interface ICustomeInputMessage {
  onSendMessage: (value: string) => void;
}

export const CustomeInputMessage = React.memo((props: ICustomeInputMessage) => {
  const [showPickerEmoji, setShowPickerEmoji] = useState(false);
  const { onSendMessage } = props;
  const [form] = Form.useForm();

  const onEmojiClick = (emojiObject: any) => {
    form.setFieldsValue({
      messageInput:
        (form.getFieldValue("messageInput") || "") + emojiObject.native,
    });
  };

  const onSubmit = (e: any) => {
    onSendMessage(e.messageInput);
    form.setFieldsValue({
      messageInput: "",
    });
  };

  const InputEmoji = () => {
    return (
      <>
        {showPickerEmoji && (
          <Picker
            set="apple"
            style={{ position: "absolute", bottom: "40px", right: "10px" }}
            onClick={onEmojiClick}
            showPreview={false}
          />
        )}

        <HiOutlineEmojiHappy
          style={{ cursor: "pointer" }}
          size={20}
          onClick={() => {
            setShowPickerEmoji(!showPickerEmoji);
          }}
        />
      </>
    );
  };

  const InputFile = () => {
    return (
      <>
        <label style={{ cursor: "pointer" }}>
          <input
            accept="image/png, image/jpeg"
            id="file-upload"
            style={{ display: "none" }}
            type="file"
          />
          <MdOutlineAttachFile size={15} />
        </label>
      </>
    );
  };

  return (
    <CustomeFormInputMessStyle>
      <div
        className="textMessage"
        style={{
          maxHeight: "10%",
          position: "absolute",
          bottom: "0",
          width: "100%",
          marginLeft: "1rem",
        }}
      >
        <Form
          className="textMessage_form"
          style={{ display: "flex" }}
          onFinish={onSubmit}
          form={form}
        >
          <Form.Item
            style={{
              width: "97%",
              marginBottom: "8px",
            }}
            name="messageInput"
            rules={[{ required: true }]}
          >
            <Input
              onClick={() => {
                setShowPickerEmoji(false);
              }}
              type={"textarea"}
              prefix={<InputFile />}
              suffix={<InputEmoji />}
            />
          </Form.Item>
        </Form>
      </div>
    </CustomeFormInputMessStyle>
  );
});
