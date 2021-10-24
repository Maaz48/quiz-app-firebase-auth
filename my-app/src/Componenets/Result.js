import './Quiz.css'
import passed from './passed.png'
import fail from './fail.png'
import React, { useContext, useEffect } from 'react'
import { numFromState } from '../Componenets/Quiz'
import { onAuthStateChanged, auth, setDoc, doc, db, signOut } from '../Config/firebase'
import ButtonQuiz from './ButtonQuiz'
import { useHistory } from 'react-router-dom'

const Result = () => {





    
    let history = useHistory()
    function logout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            history.push("/")
        }).catch((error) => {
            // An error happened.
        });
    }



    const result = useContext(numFromState)
    console.log(result);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                const docRef = setDoc(doc(db, "Score", uid), {
                    Score: result.value,
                });
                console.log("Document written with ID: ", docRef.id);
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    }, [])


    let emoji;
    let emojiImage

    if (result.value <= 20) {
        console.log("you are failed");
        emoji = "you are failed"
        emojiImage = fail
    } else if (result.value > 20 && result.value <= 50) {
        console.log("you are passed");
        emoji = "you are passed"
        emojiImage = passed
    } else {
        console.log("kuch tu gar bar ha daya");
    }



    return (
        <>
            <div className="resultMainDiv">
                <div className="result">
                    <h1> {result.name}</h1>
                    <p>
                        YOUR RESULT IS {result.value}
                    </p>
                    <img style={{ width: "200px" }} src={emojiImage} alt="emoji ha bhai" />
                    <p>{emoji}</p>
                    <ButtonQuiz value="Log Out" onClick={logout} />
                </div>
            </div>
        </>
    )
}

export default Result
