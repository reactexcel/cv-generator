import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Document, Page, pdfjs } from "react-pdf";
import { Stack } from "@mui/material";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width:{md:"auto",xs:'90%'}
};

export default function ModalComponent({ link }) {
  const [open, setOpen] = React.useState(false);
  const [numPages, setNumPages] = React.useState();
  const [pageNumber, setPageNumber] = React.useState(1);

  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
    setNumPages(null);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPreviousPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages));
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <VisibilityIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Document file={link} onLoadSuccess={onDocumentLoadSuccess}>
              <Stack sx={{height:'600px', overflow:'auto'}}>
                <Page pageNumber={pageNumber} width={600} />
                <p>
                  Page {pageNumber} of {numPages}
                </p>
              </Stack>
            </Document>
            <Stack direction="row" spacing={2} sx={{justifyContent:'center'}}>
              <Button onClick={goToPreviousPage} disabled={pageNumber <= 1}>
                Previous
              </Button>
              <Button onClick={goToNextPage} disabled={pageNumber >= numPages}>
                Next
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
