import './Quiz.css'
import React, { useState, createContext } from 'react'
import ButtonQuiz from './ButtonQuiz';
import { Button } from 'react-bootstrap'
import swal from 'sweetalert';
import Result from './Result'
import { useHistory } from 'react-router-dom';
import NavComp from './NavComp';
import {  db, auth, onAuthStateChanged, getDoc, onSnapshot, doc } from '../Config/firebase'

export const numFromState = createContext()
const Quiz = () => {
    const [userName, setuserName] = useState("")


    const user = auth.currentUser;
    const history = useHistory()
    if (user) {
        console.log("user online ha");
    } else {
        history.push('/')
    }

    








    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User

            const uid = user.uid;
            console.log(uid);
            const unsub = onSnapshot(doc(db, "user", uid), (doc) => {
                console.log("Current data: ", doc.data().first);
                setuserName(doc.data().first + " " +doc.data().last)
            });
            // ...
        } else {
            // User is signed out
            // ...
        }
    });



    var quiz = [
        {
            question: "The value of(5 / 4) – (8 / 3) is:",

            A: "17 / 12",

            B: "-17 / 12",

            C: "12 / 17",

            D: "-12 / 17",

            Answer: "B",
        },


        {
            question: "The associative property is applicable to:",

            A: "Addition and subtraction",

            B: "Multiplication and division",

            C: "Addition and Multiplication",

            D: "Subtraction and Division",

            Answer: "C",

        },
        {

            question: "The value of(-10 / 3) x(-15 / 2) x(17 / 19) x 0 is:",

            A: "0",

            B: "22.66",

            C: "20",

            D: "35",

            Answer: "A",

        },

        {
            question: "The additive identity of rational numbers is:",

            A: "0",

            B: "1",

            C: "2",

            D: "-1",

            Answer: "A",
        },

        {

            question: "The multiplicative identity of rational numbers is:",

            A: "0",

            B: "1",

            C: "2",

            D: "-1",

            Answer: "B",

        },
    ];



    const [num, setnum] = useState(0)
    const [answerValue, setanswerValue] = useState("")
    let getData = quiz[num]
    const [btnValue, setbtnValue] = useState("Submit Your Answer")

    const [score, setscore] = useState(null)

    function getValue(e) {
        setanswerValue(e.target.value)
    }
    function nexQuestions(e) {
        if (answerValue === "A" || answerValue === "B" || answerValue === "C" || answerValue === "D") {
            setnum(num + 1)
            if (answerValue == getData.Answer) {
                setscore(score + 10);
                
            }else{
                setscore(0)
            }
            if (num >= 3) {
                // const value = e.target.value
                setbtnValue("Check Your Result")
            }
            setanswerValue("")
        } else {
            swal("Please Select Atleast One option");
        }
    }
    // console.log(getData.Answer);

    console.log(score);

    let aa = {
        name: userName.toUpperCase(),
        value: score
    }

    // console.log(answerValue);

    return (
        <numFromState.Provider value={aa}>

            <div>
                <div className="quizcard">
                    {
                        num <= 4 ? (
                            <>
                                <NavComp userName={aa.name} />
                                <div className="qustion"> {getData.question}</div>
                                <div className="options">
                                    <Button variant="success" value="A" onClick={getValue}>
                                        {getData.A}
                                    </Button>
                                    <Button variant="success" value="B" onClick={getValue}>

                                        {getData.B}
                                    </Button>
                                    <Button variant="success" value="C" onClick={getValue}>

                                        {getData.C}
                                    </Button>
                                    <Button variant="success" value="D" onClick={getValue}>
                                        {getData.D}
                                    </Button>

                                </div>
                                <ButtonQuiz value={btnValue} onClick={nexQuestions} />
                            </>
                        ) : (<Result />)
                    }



                </div>

            </div>
        </numFromState.Provider >
    )
}

export default Quiz
