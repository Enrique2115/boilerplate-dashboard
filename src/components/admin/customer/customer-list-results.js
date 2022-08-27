import { useState, useEffect } from "react";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { map } from "lodash";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const BasicModal = dynamic(() => import("@/common/Modal/BasicModal"));
const BasicDialog = dynamic(() => import("@/common/Dialog/BasicDialog"));

function CustomerListResults(props) {
  const { listClient } = props;
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(+event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Apellido y Nombres</TableCell>
                <TableCell>Celular</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Direccion</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {map(listClient.slice(page * limit, page * limit + limit), (client) => (
                <TableRow hover key={client.id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >{`${client.lastName} ${client.name}`}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.address}</TableCell>
                  <TableCell>
                    <Options
                      document={client.document}
                      idClient={client.id}
                      // callback={callback}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <TablePagination
        component="div"
        page={page}
        count={listClient.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Filas por página"
      />
    </Card>
  );
}

CustomerListResults.propTypes = {
  listClient: PropTypes.array.isRequired,
};

function Options({ document, idClient }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const ITEM_HEIGHT = 30;

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  //Estados para controlar el modal
  const [showModal, setShowModal] = useState(false);
  const onShowModal = () => setShowModal(true);

  //Estado para controlar el dialog
  const [openDialog, setOpenDialog] = useState(false);
  const onShowDialog = () => setOpenDialog(true);

  const actionAccept = (id) => {
    console.log(`eliminar de la bd ${id}`);
    setOpenDialog(false);
  };

  const buttonDelete = {
    color: "red",
    border: `1px solid red`,
    "&:hover": {
      color: "white",
      backgroundColor: "red",
      border: `1px solid red`,
    },
    label: { textTransform: "none" },
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "18ch",
          },
        }}
      >
        <NextLink href={`/admin/customer/detail/${document}`} passHref>
          <MenuItem onClick={handleClose}>
            <Button color="primary" variant="contained" fullWidth>
              Ver Informacion
            </Button>
          </MenuItem>
        </NextLink>
        <MenuItem onClick={handleClose}>
          <Button fullWidth sx={buttonDelete} onClick={onShowDialog}>
            Eliminar
          </Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button color="primary" variant="contained" onClick={onShowModal} fullWidth>
            Modal multiuso
          </Button>
        </MenuItem>
      </Menu>

      <BasicModal show={showModal} setShow={setShowModal} title="Modal para cualquier accion">
        <UpdateClient idClient={idClient} />
      </BasicModal>
      <BasicDialog
        show={openDialog}
        setShow={setOpenDialog}
        actionAccept={() => actionAccept(idClient)}
        title="Desea dar de baja al cliente?"
      />
    </>
  );
}

Options.propTypes = {
  document: PropTypes.string.isRequired,
  idClient: PropTypes.number.isRequired,
};

function UpdateClient(props) {
  const { idClient } = props;

  console.log(typeof idClient);
  return <h1>{idClient}</h1>;
}

UpdateClient.propTypes = {
  idClient: PropTypes.number.isRequired,
};

export default CustomerListResults;
