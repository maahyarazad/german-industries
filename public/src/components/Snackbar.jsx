import * as React from "react";
import MuiSnackbar from "@mui/material/Snackbar"; // rename the import
import Slide from "@mui/material/Slide";
import { IoMdClose } from "react-icons/io";
// Create a "signal" to control the Snackbar externally
export const snackbarSignal = {
    open: null, // this will be assigned inside the component
    messageType: null, // this will be assigned inside the component
};

// Slide transition function
function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
}

// Rename the component to avoid conflict
export default function AppSnackbar() {
    const [state, setState] = React.useState({
        open: false,
        message: "",
        messageType: ""
    });

    // Assign the "signal" function
    snackbarSignal.open = ({ message = "", messageType = "" }) => {
        console.log(messageType);
        setState({
            open: true,
            message,
            messageType
        });
    };

    const handleClose = () => {
        setState((prev) => ({ ...prev, open: false }));
    };

    const action = (
        <span
            aria-label="close"
            onClick={handleClose}
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
            <IoMdClose fontSize="20px" />
        </span>
    );

    return (
        <MuiSnackbar
            autoHideDuration={99999}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={state.open}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
            ContentProps={{
                sx: {
                    width: { xs: "100%", sm: "auto" }, // full width on mobile
                    maxWidth: "100%",
                    borderRadius: { xs: 1, sm: 1 },
                    backgroundColor: state.messageType ? "#4caf50" : "#f44336",
                    color: "#fff",
                },
            }}
            message={
                <div className="d-flex align-items-center" style={{ minWidth: 300, maxWidth: 600 }}>
                    {/* Optional icon based on messageType */}
                    <div className="d-flex align-items-center pe-2">
                        {state.messageType === "success" ? <></> : <></>}
                    </div>
                    <div>{state.message}</div>
                </div>
            }
            action={action} // ✅ close button in the right slot
        />
    );
}
