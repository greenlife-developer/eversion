import React, { useState, useEffect } from "react";
import { Modal } from "antd";

export default function UploadedItems() {
  const [uploaded, setUploaded] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);

  const handleCancel = () => setPreviewVisible(false);

  useEffect(() => {
    fetch("/book")
      .then((res) => res.json())
      .then((data) => {
        if (data !== undefined) {
          console.log(data.uploads);
          setUploaded(data.uploads);
        }
      });
  }, []);

  return (
    <>
      {uploaded ? (
        uploaded.map((upload, index) => {
          return (
            <div key={index} className="uploaded">
              <div className="uploaded-img clickable">
                <img
                  onClick={(e) => {
                    e.preventDefault();
                    setPreviewVisible(true);
                    setPreviewImage(upload.filePath);
                  }}
                  src={upload.filePath}
                  alt=""
                />
              </div>
              <div className="uploaded-content">
                <h2>{upload.user.firstName + " " + upload.user.lastName}</h2>
                <h6>
                  <b>Email:</b> <span>{upload.user.email}</span>
                </h6>
                <h6>
                  <b>WhatsApp no:</b> <span>{upload.number}</span>
                </h6>
                <h6>
                  <b>Address:</b> <span>{upload.address}</span>
                </h6>
                <h6>
                  <b>City:</b> <span>{upload.city[0].name}</span>
                </h6>
                <h6>
                  <b>State:</b> <span>{upload.state[0].name}</span>
                </h6>
              </div>
            </div>
          );
        })
      ) : (
        <h3>There is no data!</h3>
      )}
      <Modal
        visible={previewVisible}
        title={"Image preview"}
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
}
