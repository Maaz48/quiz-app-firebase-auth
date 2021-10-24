import React, { useState } from 'react'
import ButtonQuiz from '../ButtonQuiz'
import { Form } from 'react-bootstrap'
import './Signup.css'
import swal from 'sweetalert'
import {
    Link, useHistory
} from "react-router-dom";
import { auth, createUserWithEmailAndPassword, onAuthStateChanged, setDoc, db, doc, docRef } from "../../Config/firebase";

const Signup = () => {

    const history = useHistory()


    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    let userData = {
        fname,
        lname,
        email,
        password
    }




    function getUserData() {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                // ...

            })
            .then(() => {
                swal({
                    title: "Good job!",
                    text: "WELCOME TO QUIZ APP",
                    icon: "success",
                    button: "Go to Quiz",
                }).then(async () => {
                    try {
                        onAuthStateChanged(auth, (user) => {
                            if (user) {
                                // User is signed in, see docs for a list of available properties
                                // https://firebase.google.com/docs/reference/js/firebase.User
                                const uid = user.uid;
                                const docRef = setDoc(doc(db, "user", uid), {
                                    first: fname,
                                    last: lname,
                                    email: email,
                                });
                                console.log("Document written with ID: ", docRef.id);
                                // ...
                            } else {
                                // User is signed out
                                // ...
                            }
                        });




                       
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                })
                    .then(async () => {
                        await history.push('/quizapp')
                    })
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                swal(errorCode);

            });
        // console.log(fname, lname, email, password)
    }
    return (
        <div>

            <Form className="form" >

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="email">First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" onChange={(e) => {
                        setfname(e.target.value)
                    }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="email">Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" onChange={(e) => {
                        setlname(e.target.value)
                    }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="email">Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => {
                        setemail(e.target.value)
                    }} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="password">Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => {
                        setpassword(e.target.value)
                    }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="password">Already have an account <Link to="/">Click here</Link></Form.Label>
                </Form.Group>

                <ButtonQuiz value="SIGN UP" onClick={getUserData} />
            </Form>
        </div>
    )
}

export default Signup
