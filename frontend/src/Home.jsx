import React, { useEffect, useState } from "react";
import './homestyles.css';
import axios from "axios";
import Popup from "./Popup";
import { useNavigate,useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


function Home(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [Data, setData] = useState([]); // Initialize Data as an empty array
    const [Loading, setLoading] = useState(true);
    const [Showpop, setShowpop] = useState(false);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [userId, setUserId] = useState(location.state?.message || '');
    const [myItems, setmyItems] = useState([]);
    const [Loading2, setLoading2] = useState(true);
    const [userName, setuserName] = useState(location.state?.username||'Sign in');
    const [Incorrect, setIncorrect] = useState(false)
    const [Logout, setLogout] = useState(false)
    const [showLogout, setshowLogout] = useState(false)
    const [lastName, setlastName] = useState('');
    const [showAdd,setshowAdd] = useState(false);
    const [courseId, setcourseId] = useState('');

    function handleOpenpopup()
    {
        setShowpop(true);
    }

    function handleClosepopup()
    {
        setShowpop(false);
    }

    function handlelogoutpop()
    {
        setshowLogout(true);
    }
    function HideLogout()
    {
        setshowLogout(false);
    }
    function CALLMYCOURSES()
    {
        setLogout(true);
        const fetchdata = async () => {
            axios.post('http://localhost:3000/api/v1/user/purchaseid', {
                userId
            }).then(response => {
                setmyItems(response.data); // Update state with response data
            }).catch(error => {
                console.error(error); 
            }).finally(() => {
                setLoading2(false)
                console.log("Request completed");
            });
    }
        fetchdata();
    }

    function Logoutsession()
    {
        navigate('/login')
        setLogout(false);
        setmyItems('');
        setuserName('');
        setshowLogout(false)
        setuserName('Sign in')
    }

    function CALLSIGNIN(e) 
    {
        e.preventDefault(); 

        const fetchdata = async () => {
            axios.post('http://localhost:3000/api/v1/user/signin', {
                email,
                password
            }).then(response => {
                setuserName(response.data.username)
                setUserId(response.data.userId)
                console.log(userId)
                handleClosepopup()
                setIncorrect(false)
                setLogout(true)
            }).catch(error => {
                setIncorrect(true);
            });
        };
        fetchdata(); // Call fetchdata to trigger the POST request
    }

    function CALLAUTH() 
    {
        const fetchdata = async () => {
            axios.post('http://localhost:3000/api/v1/user/authorized', {
                email, 
                userName,
                 lastName
            }).then(response => {
                setuserName(response.data.username)
                setUserId(response.data.userId)
                setIncorrect(false)
                setLogout(true)
            }).catch(error=>{
                
            })
        };
        fetchdata(); // Call fetchdata to trigger the POST request
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const token = params.get('token');
        if(token)
        {
            const decoded = jwtDecode(token);
            setemail(decoded.email[0].value);
            setuserName(decoded.name.givenName);
            setlastName(decoded.name.familyName);
            CALLAUTH();
        }

        if (userId) {
            console.log("HEY")
            CALLMYCOURSES();  // This will be triggered after userId is updated
        }
    }, [userId]);

    function handlechange(e)
    {
        const {name, value } = e.target;
        if(name === "email")
        {
            setemail(value)
        }
        else if(name === "password"){
            setpassword(value)
        }
    }

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/course/preview");
                setData(response.data); // Update state with fetched data
                console.log(response.data); // Log the fetched data
            } catch (e) {
                console.log(e); // Log any errors
            } finally {
                setLoading(false); // Set loading to false after data fetching
            }
        };
        fetchdata(); // Call the fetch function
    }, []);

    useEffect(()=>{
            if(Showpop)
            {
                document.body.style.overflow = 'hidden';
            }
            else
            {
                document.body.style.overflow = 'auto';
            }
            return () => {
                document.body.style.overflow = 'auto';
              };
    },[Showpop])


    function Loadpurchasecourse() {
        if (!myItems || !myItems.courseData) {
            return <p>No Purchased Courses</p>; // Handle case when myItems or courseData is undefined
        }
    
        const items = myItems.courseData;
        return (
            Loading ? (
                <p>Loading...</p> // Show loading text while fetching data
            ) : (
                items.length > 0 ? (
                    items.map((course, index) => (
                        <div className="purchasebox" key={index}>
                            <div className="box">
                                <h1><i className="ri-apps-line"></i>{course.title}</h1>
                                <div className="title">
                                    {course.description}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Purchased Courses</p> // Show if no purchased courses are available
                )
            )
        );
    }

    function ADDNEWCOURSE(e)
    {
        setcourseId(e._id);
        setshowAdd(true);
    }

    function INVOKE_ADD()
    {
        const fetchdata = async()=>{
            axios.post("http://localhost:3000/api/v1/course/purchase",{
                userId: userId,
                courseId: courseId
            }).then(response =>{
                console.log({"Added successfully": response.data});
            }).catch(error =>{
                console.log("Error while adding group")
            })  
        }
        fetchdata();
        CALLMYCOURSES();
        Loadpurchasecourse();
        setshowAdd(false);
    }

    function CLOSE_ADD()
    {
        setshowAdd(false);
    }
    function LoadCourses() {
        const items = Data.course
        return (
            <div className="containers">
                {Loading ? (
                    <p>Loading...</p> // Show loading text while fetching data
                ) : (
                    items.length > 0 ? ( // Check if Data has items
                        items.map((course, index) => ( // Map through the Data array
                            <div className="box" onClick={() => ADDNEWCOURSE(course)} key={index}>
                                <div className="type">
                                    <h1><i className="ri-apps-line"></i>{course.title}</h1> {/* Assuming course has a category */}
                                </div>
                                <div className="description">
                                   <h3>{course.title} - {course.description}</h3> 
                                </div>
                                <div className="price">
                                    <h3>${course.price}/-</h3>
                                </div>
                                <div className="courseimage">
                                    <img src="https://www.vikingsoftware.com/wp-content/uploads/2024/02/C-2.png" alt="" />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No courses available</p> // Show if there are no courses
                    )
                )}
            </div>
        );
    }

    return (
        <div>
            <div className="homemain">
                <div className="nav">
                    <h4 className="uppernav"><i className="ri-leaf-fill"></i></h4>
                    <h4><i className="ri-home-2-line"></i></h4>
                    <h4><i className="ri-file-add-line"></i></h4>
                    <h4><i className="ri-contacts-line"></i></h4>
                    <h4><i className="ri-article-line"></i></h4>
                    {
                        Logout ? <h4 className="lowernav" onClick={handlelogoutpop}><i className="ri-logout-circle-line"></i></h4>
                        :
                        <h4 className="lowernav" onClick={handleOpenpopup}><i className="ri-login-box-line"></i></h4>
                    }
                </div>
                <div className="feature">
                    <h1>Invest in your education</h1>
                    <div className="filter">
                        <div className="filterchild"><i className="ri-apps-line"></i>All</div>
                        <div className="filterchild"><i className="ri-mac-line"></i>It & Software</div>
                        <div className="filterchild"><i className="ri-video-chat-line"></i>Media Training</div>
                        <div className="filterchild"><i className="ri-briefcase-line"></i>Business</div>
                    </div>
                    <h4>Featured Courses</h4>
                    {LoadCourses()} {/* Call the LoadCourses function */}
                </div>
                <div className="mycourse">
                    <div className="userinfo">
                        <h1><i className="ri-user-line"></i></h1>
                        <h3>{userName}</h3>
                        <div className="github">
                            <h2><i className="ri-github-line"></i>github</h2>
                        </div>
                    </div>
                    <div className="purchasedcourse">
                        <div className="mycoursetab">
                            <h1>My courses</h1>
                        </div>
                        {Loadpurchasecourse()}
                    </div>
                </div>


            {/* Popup Component for login */}
            <Popup show={Showpop} onClose={handleClosepopup}>
                <div className="loginparent">
                    <h2 className="loginchild">Login</h2>
                    <button className="close-button" onClick={handleClosepopup}><i className="ri-close-line"></i></button>
                    <form className="loginchild" onSubmit={CALLSIGNIN}>
                        <div >
                            <label>Email:</label>
                            <input
                            name = "email" 
                            onChange={handlechange}
                            type="email"
                            value={email}
                            placeholder="Enter your email" 
                              />
                        </div>

                        <div className="loginchild">
                        <label>Password:</label>
                        <input name = "password" 
                        onChange={handlechange}
                        type="password" 
                        value={password}
                        placeholder="Enter your password"
                         />
                    </div>
                    
                    {
                        Incorrect ?  <div className="loginchild incorrect">
                        <h2><i class="ri-signal-wifi-error-line"></i>Incorrect id or password. Please try again</h2>
                    </div> : null
                    }
                    
                    <button className="loginchild" type="submit" >Submit</button>
                </form>
                </div>
            </Popup>

            <Popup show = {showLogout} >
                <div className="logout-parent">
                    <h1>Are you are you want to Logout</h1>
                    <button onClick={Logoutsession}>Yes</button>
                    <button onClick={HideLogout}>No</button>
                </div>
            </Popup>

            <Popup show = {showAdd} >
                <div className="logout-parent">
                    <h1>Add this course</h1>
                    <button onClick={INVOKE_ADD}>Yes</button>
                    <button onClick={CLOSE_ADD}>No</button>
                </div>
            </Popup>
        </div>
        </div>
    );
}

export default Home;
