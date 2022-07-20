import React, { useState, useRef } from "react";
import "antd/dist/antd.css";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { useEffect } from "react";

const FileUpload = (props) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const fileInputRef = useRef();

  const [image, setImage] = useState();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(previewImage);
    } else {
      setPreviewImage(null);
    }
  }, [image]);

  const handleCancel = () => setPreviewVisible(false);

  const uploadButton = (
    <div
      style={{
        marginTop: 8,
        border: "1px dashed blue",
        cursor: "pointer",
        width: "100px",
        margin: "auto",
        padding: "1.2rem",
      }}
    >
      <PlusOutlined />
      <div>Upload</div>
    </div>
  );
  return (
    <>
      <input
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files[0];
          setImage(file.url || file.preview);
          setPreviewVisible(true);
          setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
          );
          console.log(file);
        }}
        type="file"
        name="images"
        style={{ display: "none" }}
        // multiple={false}
      />
      <div
        onClick={(e) => {
          e.preventDefault();
          fileInputRef.current.click();
        }}
      >
        {" "}
        {uploadButton}{" "}
      </div>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <p>{previewImage}</p>
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default FileUpload;
