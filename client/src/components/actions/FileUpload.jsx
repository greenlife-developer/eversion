import React, { useState, useRef } from "react";
import "antd/dist/antd.css";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { useEffect } from "react";

const FileUpload = () => {
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
      reader.readAsDataURL(image);
    } else {
      setPreviewImage("");
    }
  }, [image]);

  const handlePreview = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file && file.type.substring(0, 5) === "image") {
      setImage(file);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    } else {
      setPreviewVisible(false);
      setPreviewTitle("");
    }
  };

  const handleCancel = () => setPreviewVisible(false);

  const uploadButton = (
    <div className="file-upload">
      <div>
        <img
          onClick={(e) => {
            e.preventDefault();
            setPreviewVisible(true);
          }}
          src={previewImage}
          alt=""
        />
      </div>
      <div
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          fileInputRef.current.click();
        }}
      >
        <PlusOutlined />
        <div>Upload</div>
      </div>
    </div>
  );
  return (
    <>
      <input
        ref={fileInputRef}
        onChange={handlePreview}
        type="file"
        accept="image/*"
        name="images"
        style={{ display: "none" }}
      />
      <div>{uploadButton}</div>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
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
