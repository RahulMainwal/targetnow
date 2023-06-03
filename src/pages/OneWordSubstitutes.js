import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../server/firebase";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "../components/Loader";
import Badge from "react-bootstrap/Badge";

function OneWordSubstitutes() {
  const [gotMainData, setgotMainData] = useState([]);
  const filteredData = gotMainData.filter((x) => {
    return x.titleType === "oneWordSubstitutes";
  });
  
   console.log(filteredData.map((x)=> {
    return {
    id: x.id,
    title: x.title,
    description: x.description,
    date: "1-5-2023"
    }
  }))
  
  const [elementId, setElementId] = useState("");
  const [gotMainDataTokenId, setgotMainDataTokenId] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [displayEditedModal, setDisplayEditedModal] = useState(false);
  const [titleType, setTitleType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [alertTokenId, setAlertTokenId] = useState("");
  const filteredTokenId = gotMainDataTokenId.find((x) => {
    return x.tokenId === tokenId;
  });
  const access = JSON.parse(localStorage.getItem("token"));
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

  const deleteHandler = async (element) => {
    setElementId(element.id);
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
          timeStamp: `${new Date()}`,
          date: `${(new Date()).getDate()}/${(new Date()).getMonth()+1}/${(new Date()).getFullYear()}`,
          time: `${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`,
        })
          .then((data) => {
            alert("Success");
            handleClose();
            // }
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
    if (gotMainData.length > 0) {
      setLoading(false);
    }
  }, [gotMainData]);

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

  return loading ? (
    <Loader />
  ) : (
    <div style={{ textAlign: "start" }}>
      <div
        style={{
          margin: "16px 0",
          padding: "0 16px",
          width: "100%",
          display: "flex",
        }}
      >
        <div style={{ width: "90%" }}>
          <h2>One word substitutes</h2>
        </div>
        <div style={{ width: "10%", textAlign: "end" }}>
          <Badge bg="secondary">{filteredData.length}</Badge>
        </div>
      </div>
      <ListGroup style={{ margin: "20px" }} variant="flush">
        {filteredData.map((x, index) => (
          <div key={x.id} style={{ marginBottom: "15px", padding: "8px 10px", borderRadius: "5px", boxShadow: "2px 2px 6px 2px #e5e5df" }}>
            <div style={{ width: "100%", display: "flex" }}>
              <div style={{ width: "70%" }}>
                <Card.Title style={{ fontSize: "18px", color: "black" }}>
                  <span style={{ color: "black" }}>{index + 1}.</span> {x.title}
                </Card.Title>
              </div>
              {
                access
                ?
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
                    deleteHandler(x);
                  }}
                ></i>
              </div>
              :
              ""
              }
            </div>
            <Card.Text>{x.description}</Card.Text>
          </div>
        ))}
      </ListGroup>

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
}

export default OneWordSubstitutes;
