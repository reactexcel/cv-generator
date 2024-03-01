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
              {Array.from(new Array(numPages), (el, index) => (
                <Stack key={`page_${index + 1}`} >
                  <Page pageNumber={pageNumber} width={600} />
                  <p>
                    Page {pageNumber} of {numPages}
                  </p>
                </Stack>
              ))}
              </Stack>
            </Document>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
