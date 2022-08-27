import React from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Download as DownloadIcon } from "../../../icons/download";

export default function ProductCard({ product, ...rest }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      {...rest}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar alt="Product" src={product.media} variant="square" />
        </Box>
        <Typography align="center" color="textPrimary" gutterBottom variant="h5">
          {product.title}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {product.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
