import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Menu() {
  const [recipes, setRecipes] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  // Fetch recipes from API
  async function getRecipes() {
    try {
      const response = await axios.get("https://foodbook-backend-jfk6.onrender.com/menu");
      setRecipes(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // Fetch uploaded files from API
  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get("https://foodbook-backend-jfk6.onrender.com");
      setUploadedFiles(response.data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  // Combine recipes with uploaded files
  const combineData = () => {
    return recipes.map((recipe, index) => {
      const imageUrl = uploadedFiles[index] ? uploadedFiles[index].url : "";
      return { ...recipe, imageUrl };
    });
  };

  // Fetch data on component mount
  useEffect(() => {
    getRecipes();
    fetchUploadedFiles();
  }, []);

  const combinedData = combineData();

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

  const handleClosePopup = () => {
    setSelectedCardIndex(null);
  };

  return (
    <>
      <div className="container-fluid menubg">
        <div className="row pt-4">
          <div className="row">
            <div className="col-12 d-flex justify-content-center mb-3">
              <h3 className="c1">Cooking Recipes</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-3">
              <div className="row">
                {combinedData.map((item, index) => (
                  <div className="col-3" key={index}>
                    <div
                      className="card"
                      style={{
                        width: "100%",
                        marginBottom: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleCardClick(index)}
                    >
                      <img
                        src={item.imageUrl}
                        className="card-img-top"
                        alt={item.dishName}
                        style={{ height: "230px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.dishName}</h5>
                        <p className="card-text">{item.preparation}</p>
                      </div>
                    </div>

                    {selectedCardIndex === index && (
                      <>
                        <div className="popup-blur" />
                        <div className="popup">
                          <div className="popup-content">
                            <span
                              className="close-button"
                              onClick={handleClosePopup}
                            >
                              &times;
                            </span>
                            <h2 className="popuptext">{item.dishName}</h2>
                            <h2 className="ing">Ingredients</h2>
                            <p>{item.ingredients}</p>
                            <hr />
                            <h2 className="ing">Preparation</h2>
                            <p>{item.preparation}</p>
                            <hr />
                            <h2 className="ing">Instruction</h2>
                            <p>{item.instruction}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
