import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Popup from "./Popup";
function Admincourse() {
  const location = useLocation();
  const [Loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [courseId, setcourseId] = useState('');
  const [showDelete, setshowDelete] = useState(false);
  const [triggerDelete, settriggerDelete] = useState(true);
  const [isEdit, setisEdit] = useState(false);
  const [adminName, setadminName] = useState(location?.state?.adminName)
  const [selectIndex, setselectIndex] = useState(-1);
  const [title, setTitle] = useState('');


  useEffect(() => {
    document.body.style.backgroundImage =
      "url('https://images.unsplash.com/photo-1727259066904-a7a1e43c6a5d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";

    return () => {
      document.body.style.backgroundImage = null;
      document.body.style.backgroundRepeat = null;
      document.body.style.backgroundSize = null; // Reset to original state
    };
  }, []);

  useEffect(() => {
    console.log("location?.state")
    if(triggerDelete || !isEdit)
    {
      axios
      .post("http://localhost:3000/api/v1/course/previewadmin", {
        adminId: location?.state?.message,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((response) => {})
      .finally(() => {
        setLoading(false);
      });
      settriggerDelete(false);
    }
  }, [triggerDelete, isEdit]);


  const DELETEREQUESTPOPUP=(arg)=>{
    setcourseId(arg);
    setshowDelete(true);
  }

   const UPDATEAPI= async(course)=>{
    console.log(course);
    try{
      const response = await axios.put("http://localhost:3000/api/v1/admin/course",{
        title: title,
        description: course.description, 
        price: course.price,
        imageUrl: course.imageUrl,
        courseId: course._id
      }, {headers:{
        adminId: location?.state?.message
      }})

      console.log(response.data);
    }
    catch{
      console.log("Error")
    }
    setisEdit(false);
  }

  function handlechange(e)
  {
     setTitle(e.target.value)
  }

  
  async function HANDLEDELETEAPI()
  {
    setshowDelete(false);
    try{
      const response = await axios.post("http://localhost:3000/api/v1/admin/deletecourse",{
        courseId: courseId
      });
      console.log(response);
    }
    catch(e){
      console.log(e);
    }
    settriggerDelete(true);
  }

  function EDIT_FUNC(course, index)
  {
    setisEdit(true);
    setTitle(course.title);
    setselectIndex(index);
  }


  function CALLCOURSES() {
    console.log("Fuction called");
    const items = data.course;
    if (!data || !data.course.length) {
      return <h1>No added course</h1>;
    }
    console.log(data.course.length)
    return (
      <div className="templatecourse">
        <h1>Hey, {adminName}</h1>
        <h3>These are your own courses, you can manage them</h3>
        {items.map((course, index) => (
          <div className="adminbox">
            <div className="firstbox">
            {isEdit && selectIndex===index?(<div> 
            <input id = "inputtext" 
            type="text"
            name = "Title_text"
             onChange={handlechange} 
             value={title}/>
              <button onClick={()=>UPDATEAPI(course)} className="update">Update</button>
              </div>
            )
            :<h1 key={index}>{course.title}</h1>}
            <div className="twoicons">
            <i onClick={()=>EDIT_FUNC(course, index)} class="ri-edit-line"></i>
            <i onClick={()=>DELETEREQUESTPOPUP(course._id)} class="ri-delete-bin-6-line"></i>
            </div>
            </div>
           
            <div className="admindesc">
              <h3>
                {course.title} - {course.description}
              </h3>
            </div>
            <div className="adminprice">
              <h3>Go to course</h3>
            </div>
            <div className="admincourseType">
              <h3>
                <i class="ri-price-tag-3-fill"></i>
                {course.courseType}
              </h3>
            </div>{" "}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {Loading ? (
        <h1>Your course has been created</h1>
      ) : (
        <div className="Admincourses">{CALLCOURSES()}</div>
      )}

        <div>
          {showDelete?     <div className="popup-overlay ">
            <div className=" popup-delete">
            <div className="delete-parent">
                    <h1>Are you sure to want to delete?</h1>
                    <button onClick={HANDLEDELETEAPI}>Yes</button>
                    <button onClick={()=>{setshowDelete(false) ;document.body.classList.remove('no-scroll');}}>No</button>
                </div>
            </div>
        </div>:
        null}
   
        </div>
    </div>
  );
}
export default Admincourse;
