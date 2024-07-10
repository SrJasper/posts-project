import React from "react";
import "./post.css";

type Props = {
  message: string;
  name: string;
  image?: string | ArrayBuffer | null;
  handleDelete?: () => void;
};

const Post: React.FC<Props> = ({ message, name, image, handleDelete }) => {
  return (
    <div className="post-pannel post-display">
      <button className="delete-button" onClick={handleDelete}>
        <img className="close" src="/close-button.png" alt="close" />
      </button>
      <div className="img-box">
        <img className="img" src="/img.png" alt="Logo" />
      </div>
      <div className="post-text">
        <p>{message}</p>
        <label>Enviado por</label>
        <p>{name}</p>
      </div>
    </div>
  );
};
export default Post;
