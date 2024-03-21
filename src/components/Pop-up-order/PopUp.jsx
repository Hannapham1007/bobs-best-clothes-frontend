
import { Button, Modal } from 'react-bootstrap';


function PopUp({show, setShow, placeOrder}) {

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>You are not logged in</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your order will be placed but not stored</Modal.Body>
        <Modal.Footer>
        <div className="d-flex justify-content-between w-100">
        <Button className="btn btn-dark"variant="secondary" onClick={() => {
              window.location.href = '/authentication';
          setShow(false)
        }}>
            Log in to save your order
        </Button>
        <Button className="btn btn-dark" variant="secondary" onClick={() => {
          placeOrder();
          setShow(false)
        }
        }>
            Continue as guest
          </Button>
        </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopUp;
