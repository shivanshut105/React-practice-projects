import Card from "../UI/Card/Card";
import classes from './UserList.module.css';

const UsersList = (props) => {
    return (
        <Card className={classes.users}>
            <ul>
                {
                    props.users.map((user) => {
                        return <li key={user.name+user.age+Math.random()}>{user.name} ({user.age} years old)</li>
                    })
                }
            </ul>
        </Card>
    );
}

export default UsersList;