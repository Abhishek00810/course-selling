import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate,useLocation } from 'react-router-dom';

function Create() {
  const location = useLocation();
  useEffect(() => {
    document.body.style.backgroundImage =
      "url('https://i.pinimg.com/1200x/9a/75/94/9a75941cc1ad9c490ef5c685aeecf932.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    return () => {
      document.body.style.backgroundImage = null;
      document.body.style.backgroundRepeat = null;
      document.body.style.backgroundSize = null; // Reset to original state
    };
  }, []);

  function CALLCREATECOURSE(e)
  {
    e.preventDefault();

    console.log(e.target.choice.value);
      const fetchdata = ()=>{
        axios.post("http://localhost:3000/api/v1/admin/course", {
          //title, description, price, imageUrl
          title: e.target.title.value,
          description: e.target.description.value,
          price: e.target.fees.value,
          imageUrl: e.target.imageUrl.value,
          courseType: e.target.choice.value
        },{
          headers: {
            'adminId': location?.state?.message,
          }
        })
        .then(response=>{
          console.log(response);
        })
        .catch(error=>{
          console.log(error)
        })
    
  }
  fetchdata();
}
  return (
    <div>
      <form className="createcourse" onSubmit={CALLCREATECOURSE}>
        <div className="pagetitle">
            <h1>Create your course and sell it NOW!!!</h1>
        </div>
        <div className="title">
            <h1>Title of course:</h1>
          <input name = "title" type="text" placeholder="Enter the title of your course" required/>
        </div>
        <div className="descriptioncourse">
        <h1>Description:</h1>
          <textarea name="description" placeholder="Enter the description of your course" required></textarea>
        </div>
        <div className="pricecourse">
        <h1>Fees of course:</h1>
          <input name="fees" placeholder="Keep the money amount in dollars (Enter in number)" type="number" required></input>
        </div>
        <div className="courstypecourse">
          <details>
            <summary>Course Tag</summary>
            <select id="choices" multiple name = "choice">
              <option value="It & Software">It & Software</option>
              <option value="Interior">Interior</option>
              <option value="Media Training">Media Training</option>
              <option value="Business">Business</option>
            </select>
          </details>
        </div>
        <div className="imagecourse">
        <h1>Image of course:</h1>
          <input name = "imageUrl" placeholder="Enter ImageURL" type="text" required/>
        </div>
        <button type="submit">Create course</button>
      </form>
    </div>
  );
}
export default Create;
