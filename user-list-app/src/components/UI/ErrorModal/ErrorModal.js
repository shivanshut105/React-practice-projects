import Button from "../Button/Button";
import Card from "../Card/Card";
import classes from './ErrorModal.module.css';

const ErrorModal = (props) => {
    return (
        <div>
            <div className={classes.backdrop} onClick={props.close} />
            <Card className={classes.modal}>
                <header className={classes.header}>
                    <h2>{props.title}</h2>
                </header>
                <div className={classes.content}>
                    <p>{props.message}</p>
                </div>
                <footer className={classes.footer}>
                    <Button onClick={props.close}>Okay</Button>
                </footer>
            </Card>
        </div>
    );
}

export default ErrorModal;