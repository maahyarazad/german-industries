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
    messageType:""
  });

  // Assign the "signal" function
  snackbarSignal.open = ({ message = "", messageType= "" }) => {
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
        <>
            <span
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
                style={{ cursor: 'pointer' }}
            >
                <IoMdClose fontSize="24px" />
            </span>
        </>
    );

  return (
    <MuiSnackbar
       autoHideDuration={99999}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={state.open}
      onClose={handleClose}
      TransitionComponent={SlideTransition} // always use Slide
      ContentProps={{
      sx: {
        backgroundColor:
          state.messageType === true ? "#4caf50" : "#f44336", // green or red
        color: "#fff", // text color
      },
    }}
       message={
               
                <div className='d-flex justify-content-between w-100' style={{minWidth:400 , maxWidth: 600}}>
                    <div className='d-flex justify-content-center align-items-center'>
                        <div className="d-flex justify-content-center align-items-center">
                            {
                                state.messageType === 'success' ?
                            
                                   <></>
                                    :
                                    <></>
                            }
                        </div>
                        <div className='ps-2 d-flex justify-content-center align-items-center' >
                            {state.message}
                        </div>
                    </div>
                    
                    <div className='d-flex justify-content-center align-items-center'>
                        {action}
                    </div>
                </div>
            }
      
    />
  );
}
