import style from "../Search/Search.module.css";
import logo from "../../assets/images/Logocopy.png";
import Card from "../Card/Card";
import { useState } from "react";

function Search() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [songName, setSongName] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("http://localhost:3000/cms/user/upload", {
        method: "POST",
        body: formData,
      });
      console.log(response);
      if (response.message === "FILE_NOT_UPLOADED") {
        alert("error uploading file");
        return;
      }

      const api_url = "http://localhost:3000/cms/user/findMusic";
      try {
        const response = await fetch(api_url, {
          method: "GET",
          credentials: "include",
        });
        let data = await response.json();

        const cleanedJsonString = data.message.replace(/b'/g, "'").replace(/'/g, '"');
        const jsonObject = JSON.parse(cleanedJsonString);
        const maxSong = jsonObject.results.reduce((prev, current) => (prev.fingerprinted_confidence > current.fingerprinted_confidence) ? prev : current);
        assignSongName(maxSong.song_name);
      } catch (_) {
        console.log("error occured", _);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
  };

  const assignSongName = (song_name) => {
    setSongName(song_name);
  };

  return (
    <div className={style.container}>
      <div className={style.search}>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button onClick={handleUpload} className={style.searchbutton}>
          <img src={logo} alt="" />
        </button>
      </div>
      <div className={style.resultcontainer}>
        <Card name={songName}/>
      </div>
    </div>
  );
}

export default Search;
