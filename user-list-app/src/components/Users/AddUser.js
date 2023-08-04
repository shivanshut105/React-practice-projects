import { useState } from "react";
import classes from './AddUser.module.css';
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import ErrorModal from "../UI/ErrorModal/ErrorModal";

const DUMMY_DATA = {
    name: '',
    age: '',
}

const AddUser = (props) => {
    const [userData, setUserData] = useState(DUMMY_DATA);
    const [error, setError] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        if (userData.name.trim().length === 0 || userData.age.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).',
            });
            return;
        }
        if (userData.age < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (> 0).'
            });
            return;
        }
        console.log(userData);
        props.onAddUser(userData);
        setUserData(DUMMY_DATA);
    }
    
    const closeModalHandler = ()=>{
        setError(null);
    }

    const inputChangeHandler = (input, value) => {
        setUserData((prevData) => {
            return {
                ...prevData,
                [input]: value,
            }
        })
    }

    return (
        <div>
            {error && <ErrorModal close={closeModalHandler} title={error.title} message={error.message} />}
            <Card className={classes.input}>
                <form className={classes.Form} onSubmit={submitHandler}>
                    <label htmlFor="username">User Name</label>
                    <input onChange={(event) => inputChangeHandler('name', event.target.value)}
                        value={userData.name}
                        id="username"
                        type="text" />
                    <label htmlFor="age">Age (Years)</label>
                    <input onChange={(event) => inputChangeHandler('age', event.target.value)}
                        value={userData.age}
                        id="age"
                        type="number" />
                    <Button onClick={closeModalHandler} type="submit">Add User</Button>
                </form>
            </Card>
        </div>
    );
}

export default AddUser;