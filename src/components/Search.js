import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { db } from "../server/firebase";
import Card from "react-bootstrap/Card";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Search = () => {
  const [value, setValue] = useState("all");
  const [gotMainData, setgotMainData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchInputSuggest, setSearchInputSuggest] = useState([]);
  const [elementId, setElementId] = useState("");
  const [gotMainDataTokenId, setgotMainDataTokenId] = useState([]);
  const [show, setShow] = useState(false);
  const [displayEditedModal, setDisplayEditedModal] = useState(false);
  const [titleType, setTitleType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [alertTokenId, setAlertTokenId] = useState("");
  const filteredTokenId = gotMainDataTokenId.find((x) => {
    return x.tokenId === tokenId;
  });
  const handleClose = () => {
    setShow(false);
    setDisplayEditedModal(false);
    setTokenId("");
    setAlertTokenId("");
  };
  const handleShow = () => setShow(true);

  const editHandler = (element) => {
    setElementId(element.id);
    setDisplayEditedModal(true);
    setTitleType(element.titleType);
    setTitle(element.title);
    setDescription(element.description);
  };

  const deleteHandler = async (elementId) => {
    handleShow();
  };

  const editedSubmitHandler = async (e) => {
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
        await updateDoc(doc(db, "mainData", elementId), {
          titleType,
          title,
          description,
          timeStamp: new Date(),
        })
          .then((data) => {
            alert("Success");
            handleClose();
          })
          .catch((error) => {
            if (error) {
              alert("Something went Wrong & try again.");
            }
          });
        // }
      }
    }
  };

  const deleteSubmitHandler = async () => {
    if (alertTokenId === "") {
      alert("Enter TOKEN ID.");
    } else {
      if (
        gotMainDataTokenId.find((x) => {
          return x.tokenId === alertTokenId;
        }) === undefined
      ) {
        alert("Your are not authorized person!");
      } else {
        await deleteDoc(doc(db, "mainData", elementId))
          .then((data) => {
            handleClose();
            alert("Deleted successful!");
          })
          .catch((error) => {
            alert("Something went Wrong & try again.");
          });
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

  if (searchInput !== "") {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "unset";
  }

  const searchInputHandler = (element) => {
    setSearchInput(element);
    if (value === "all") {
      const sorting = gotMainData.filter((x) =>
        x.title.toLowerCase().includes(element.toLowerCase())  || x.description.toLowerCase().includes(element.toLowerCase())
      );
      if (sorting.length > 0 && element !== "") {
        setSearchInputSuggest(sorting);
      } else {
        setSearchInputSuggest([]);
      }
    }

    if (value === "vocabulary") {
      const data = gotMainData.filter((x) =>
        x.titleType.toLowerCase().includes("vocabulary")
      );
      const sorting = data.filter((x) =>
        x.title.toLowerCase().includes(element.toLowerCase())  || x.description.toLowerCase().includes(element.toLowerCase())
      );
      if (sorting.length > 0 && element !== "") {
        setSearchInputSuggest(sorting);
      } else {
        setSearchInputSuggest([]);
      }
    }

    if (value === "oneWordSubstitutes") {
      const data = gotMainData.filter((x) => {
        return x.titleType === "oneWordSubstitutes";
      });
      const sorting = data.filter((x) =>
        x.title.toLowerCase().includes(element.toLowerCase())  || x.description.toLowerCase().includes(element.toLowerCase())
      );
      if (sorting.length > 0 && element !== "") {
        setSearchInputSuggest(sorting);
      } else {
        setSearchInputSuggest([]);
      }
    }

    if (value === "idiomPhrases") {
      const data = gotMainData.filter((x) => {
        return x.titleType === "idiomPhrases";
      });
      const sorting = data.filter((x) =>
        x.title.toLowerCase().includes(element.toLowerCase())  || x.description.toLowerCase().includes(element.toLowerCase())
      );
      if (sorting.length > 0 && element !== "") {
        setSearchInputSuggest(sorting);
      } else {
        setSearchInputSuggest([]);
      }
    }

    if (value === "antonyms") {
      const data = gotMainData.filter((x) => {
        return x.titleType === "antonyms";
      });
      const sorting = data.filter((x) =>
        x.title.toLowerCase().includes(element.toLowerCase())  || x.description.toLowerCase().includes(element.toLowerCase())
      );
      if (sorting.length > 0 && element !== "") {
        setSearchInputSuggest(sorting);
      } else {
        setSearchInputSuggest([]);
      }
    }

    if (value === "synonyms") {
      const data = gotMainData.filter((x) => {
        return x.titleType === "synonyms";
      });
      const sorting = data.filter((x) =>
        x.title.toLowerCase().includes(element.toLowerCase())  || x.description.toLowerCase().includes(element.toLowerCase())
      );
      if (sorting.length > 0 && element !== "") {
        setSearchInputSuggest(sorting);
      } else {
        setSearchInputSuggest([]);
      }
    }

    if (value === "phrasalVerbs") {
      const data = gotMainData.filter((x) => {
        return x.titleType === "phrasalVerbs";
      });
      const sorting = data.filter((x) =>
        x.title.toLowerCase().includes(element.toLowerCase())  || x.description.toLowerCase().includes(element.toLowerCase())
      );
      if (sorting.length > 0 && element !== "") {
        setSearchInputSuggest(sorting);
      } else {
        setSearchInputSuggest([]);
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
    const pathUrl = window.location.pathname;
    const unsubLoc = () => {
      if (pathUrl === "/") {
        setValue("all");
      }
      if (pathUrl === "/vocabulary") {
        setValue("vocabulary");
      }
      if (pathUrl === "/one-word-substitutes") {
        setValue("oneWordSubstitutes");
      }
      if (pathUrl === "/idiom-&-phrases") {
        setValue("idiomPhrases");
      }
      if (pathUrl === "/phrasal-verbs") {
        setValue("phrasalVerbs");
      }
      if (pathUrl === "/antonyms") {
        setValue("antonyms");
      }
      if (pathUrl === "/synonyms") {
        setValue("synonyms");
      }
    };
    return () => {
      unsubOne();
      unsubLoc();
    };
  }, []);

  return (
    <div id="searchbar">
      <div
        style={{
          backgroundColor: "white",
          boxSizing: "border-box",
          boxShadow: "0 0 10px 0 #c0c0c0",
        }}
      >
        <Form>
          <div style={{ width: "100%", paddingTop: "15px", display: "flex" }}>
            <div style={{ width: "70%", paddingLeft: "15px" }}>
              <Form.Group className="mb-3">
                <Form.Control
                  value={searchInput}
                  onChange={(e) => {
                    searchInputHandler(e.target.value);
                  }}
                  type="search"
                  placeholder="Search"
                />
              </Form.Group>
            </div>
            &nbsp;&nbsp;
            <div
              style={{ width: "30%", textAlign: "end", marginRight: "13px" }}
            >
              <Form.Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                aria-label="Default select example"
              >
                <option value="all">All</option>
                <option value="vocabulary">Vocabulary</option>
                <option value="oneWordSubstitutes">One word subtitutes</option>
                <option value="idiomPhrases">Idiom & phrases</option>
                <option value="antonyms">Antonyms</option>
                <option value="synonyms">Synonyms</option>
                <option value="phrasalVerbs">Phrasal verb</option>
              </Form.Select>
            </div>
          </div>
        </Form>
      </div>
      <div
        style={
          searchInput
            ? { backgroundColor: "white", height: "85vh", overflowY: "scroll", borderTop: "5px solid #D9DCDC"}
            : {}
        }
      >
        {searchInputSuggest.length > 0 ? (
        <>
        {
            searchInputSuggest.map((x) => (
              <div
                key={x.id}
                style={{
                  backgroundColor: "white",
                  padding: "8px 15px",
                  margin: "0",
                  borderBottom: "1px solid grey",
                  textAlign: "start",
                }}
              >
                <div style={{ width: "100%", display: "flex" }}>
                  <div style={{ width: "70%" }}>
                    <div style={{color: "GrayText"}}>{x.titleType.toUpperCase() === "ONEWORDSUBSTITUTES"? "One Word Substitute": ""}</div>
                    <div style={{color: "GrayText"}}>{x.titleType.toUpperCase() === "VOCABULARY"? "Vocabulary": ""}</div>
                    <div style={{color: "GrayText"}}>{x.titleType.toUpperCase() === "IDIOMPHRASES"? "Idiom & Phrase": ""}</div>
                    <div style={{color: "GrayText"}}>{x.titleType.toUpperCase() === "ANTONYMS"? "Antonym": ""}</div>
                    <div style={{color: "GrayText"}}>{x.titleType.toUpperCase() === "SYNONYMS"? "Synonym": ""}</div>
                    <div style={{color: "GrayText"}}>{x.titleType.toUpperCase() === "PHRASALVERBS"? "Phrasal Verb": ""}</div>
                  </div>
                  <div style={{ width: "30%", textAlign: "end" }}>
                    <i
                      className="fa fa-pen-to-square"
                      onClick={(e) => {
                        editHandler(x);
                      }}
                    ></i>
                    &nbsp;&nbsp;&nbsp;
                    <i
                      className="fa fa-trash"
                      onClick={(e) => {
                        deleteHandler(x.id);
                      }}
                    ></i>
                  </div>
                </div>
                <Card.Title style={{color: "darkBlue", fontSize: "18px"}}>{x.title}</Card.Title>
                <Card.Text >{x.description}</Card.Text>
              </div>
            ))
        }
        <br/><br/><br/><br/><br/><br/>
        </>
        )
        : searchInput === "" ? (
          <></>
        ) : (
          <div style={{ paddingTop: "10vh" }}>No seach found</div>
        )}
      </div>

      <>
        <Modal
          show={displayEditedModal}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit own data
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="Enter title"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder="Enter description"
                  as="textarea"
                  rows={3}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Token Id</Form.Label>
                <Form.Control
                  type="password"
                  value={tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                  placeholder="Enter token id"
                />
                <Form.Text className="text-muted">
                  &nbsp;&nbsp;Don't share your TOKEN ID to anyone else.
                </Form.Text>
              </Form.Group>
              <Button
                variant="success"
                onClick={(e) => {
                  editedSubmitHandler(e);
                }}
              >
                Save
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                handleClose();
              }}
              variant="danger"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to delete this data?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                value={alertTokenId}
                onChange={(e) => {
                  setAlertTokenId(e.target.value);
                }}
                placeholder="Enter TOKEN ID"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              deleteSubmitHandler();
            }}
          >
            Yes
          </Button>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Search;
