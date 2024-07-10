import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Post from "./components/post.tsx";

const App: React.FC = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [posts, setPosts] = useState<{ message: string; name: string }[]>([]);
  const [imgSrc, setImgSrc] = useState<string>("/img.png"); // Defina o tipo de imgSrc como string
  let postValid = false;

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    adjustTextareaHeight();
  };
  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const validPost = () => {
    const publicButton = document.querySelector(".public-button");
    if (message.length !== 0 && name.length !== 0) {
      publicButton?.setAttribute(
        "style",
        "background-color: #71bb00; color: white;"
      );
      postValid = true;
    } else {
      publicButton?.setAttribute(
        "style",
        "background-color: #e0e0e0; : color: #494949;"
      );
      postValid = false;
    }
  };

  const closePost = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  const post = () => {
    if (postValid) {
      setPosts([...posts, { message, name }]);
      setName("");
      setMessage("");
    } else {
      alert("Digite uma mensagem para publicar");
    }
  };

  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              if (ctx) {
                const aspectRatio = img.width / img.height;
                canvas.width = 200;
                canvas.height = 200 / aspectRatio;
                ctx.drawImage(img, 0, 0, 200, 200 / aspectRatio);
                setImgSrc(canvas.toDataURL("image/jpeg"));
              }
            };
            img.src = event.target.result as string;
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  useEffect(() => {
    adjustTextareaHeight();
    validPost();
  }, [message]);

  useEffect(() => {
    validPost();
  }, [name]);

  const deleteText = () => {
    setName("");
    setMessage("");
    setImgSrc("/img.png");
  };

  return (
    <>
      <header className="header-container">
        <h1>buildbox</h1>
        <h3>from Leonardo Fonseca</h3>
      </header>

      <div className="central-container">
        <div className="post-pannel">
          <div className="img-box">
            <img
              className="img"
              src={imgSrc} // Renderiza a imagem com o src atualizado
              alt="img"
              onClick={handleImageClick}
            />
          </div>
          <input
            type="text"
            value={name}
            onChange={handleInputName}
            placeholder="Digite seu nome"
          />
          <textarea
            ref={textareaRef}
            placeholder="Mensagem"
            value={message}
            onChange={handleInput}
            rows={1}
            style={{ minHeight: "50px" }}
            className="text-message"
          />
          <div className="enter-buttons">
            <button onClick={deleteText} className="undo-button">
              Descartar
            </button>
            <button className="public-button" onClick={post}>
              {" "}
              Publicar{" "}
            </button>
          </div>
        </div>
      </div>

      <div className="central-container">
        <h3 className="feed">Feed</h3>
        {posts.map((post, index) => (
          <Post
            key={index}
            message={post.message}
            name={post.name}
            handleDelete={() => closePost(index)}
          />
        ))}
      </div>
    </>
  );
};

export default App;
