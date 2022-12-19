import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db } from "../server/firebase";
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";

function AddData() {
  const [titleType, setTitleType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [gotMainData, setgotMainData] = useState([]);
  const [gotMainDataTokenId, setgotMainDataTokenId] = useState([]);
  const filteredData = gotMainData.find((x) => {
    return x.title === title;
  });
  const filteredTokenId = gotMainDataTokenId.find((x) => {
    return x.tokenId === tokenId;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      titleType === "" ||
      title === "" ||
      description === "" ||
      tokenId === ""
    ) {
      alert("fill all fields.");
    } else {
      if (filteredTokenId === undefined) {
        alert("You are not authorized person!");
      } else {
        if (filteredData !== undefined) {
          alert("This title is already taken!");
        } else {
          await addDoc(collection(db, "mainData"), {
            titleType,
            title,
            description,
            timeStamp: `${new Date()}`,
            date: `${(new Date()).getDate()}/${(new Date()).getMonth()+1}/${(new Date()).getFullYear()}`,
            time: `${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`,
          })
            .then((data) => {
              if (data) {
                alert("Success");
                setTitle("");
                setDescription("");
              }
            })
            .catch((error) => {
              if (error) {
                alert("Something went Wrong & try again.");
              }
            });
        }
      }
    }
  };

  useEffect(() => {
    const q = query(collection(db, "mainData"));
    const unsubOne = onSnapshot(q, (QuerySnapshot) => {
      let mainDataArray = [];
      QuerySnapshot.forEach((doc) => {
        mainDataArray.push({ ...doc.data(), id: doc.id });
      });
      setgotMainData(mainDataArray);
    });

    const qTwo = query(collection(db, "AdminPanel"));
    const unsubTwo = onSnapshot(qTwo, (QuerySnapshot) => {
      let mainDataArrayForTokenId = [];
      QuerySnapshot.forEach((doc) => {
        mainDataArrayForTokenId.push({ ...doc.data(), id: doc.id });
      });
      setgotMainDataTokenId(mainDataArrayForTokenId);
    });
    return () => {
      unsubOne();
      unsubTwo();
    };
  }, []);

  return (
    <div style={{ textAlign: "start", margin: "0 5%" }}>
      <br />
      <Form>
        <h2>Please add data below!</h2>
        <Form.Label>Select the type of title</Form.Label>
        <Form.Select
          value={titleType}
          onChange={(e) => {
            setTitleType(e.target.value);
          }}
          aria-label="Default select example"
        >
          <option value="">--select--</option>
          <option value="vocabulary">Vocabulary</option>
          <option value="oneWordSubstitutes">One word subtitutes</option>
          <option value="idiomPhrases">Idiom & phrases</option>
          <option value="antonyms">Antonyms</option>
          <option value="synonyms">Synonyms</option>
          <option value="phrasalVerbs">Phrasal verb</option>
        </Form.Select>
        <br />
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
           <div style={{width: "100%", marginTop: "5px"}}>{title==="" || (gotMainData.filter((x) => {return x.title.toLowerCase().includes(title.toLowerCase())})).length === 0?title===""?"":<span style={{color: "darkgreen"}}><i className="fa-solid fa-check"></i>&nbsp;&nbsp;<span>Accepted</span></span>:<span style={{color: "red"}}><i className="fa-solid fa-xmark"></i>&nbsp;&nbsp;Title already taken!</span>}</div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Token Id</Form.Label>
          <Form.Control
            value={tokenId}
            onChange={(e) => {
              setTokenId(e.target.value);
            }}
            type="password"
          />
        </Form.Group>
      </Form>
      <div style={{ textAlign: "center" }}>
        <Button
          variant="dark"
          className="me-2 mb-2"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default AddData;
