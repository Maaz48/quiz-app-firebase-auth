import './Signin.css'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import ButtonQuiz from '../ButtonQuiz'
import {
    Link, useHistory
} from "react-router-dom";
import swal from 'sweetalert'
import { auth, signInWithEmailAndPassword } from '../../Config/firebase'

const Signin = () => {
    

    const history = useHistory()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()

    function signin() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .then(() => {
                swal({
                    title: "Good job!",
                    text: "WELCOME TO QUIZ APP",
                    icon: "success",
                    button: "Go to Quiz",
                }).then(async () => {
                    await history.push('/quizapp')
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                swal(errorCode);
            });
    }

    return (
        <div>

            <Form className="form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="email">Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => { setemail(e.target.value) }} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="password">Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => { setpassword(e.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="password">Don't Have An Account <Link to="/signup">Click here</Link> </Form.Label>
                </Form.Group>



                <ButtonQuiz onClick={signin} value="SIGN IN" />
            </Form>


        </div>
    )
}

export default Signin