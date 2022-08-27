import { useState } from "react";
import dynamic from "next/dynamic";
import { v4 as uuid } from "uuid";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "src/layout/dashboard-layout";
import Seo from "@/common/Seo";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProductListToolbar = dynamic(() =>
  import("src/components/admin/product/product-list-toolbar")
);
const ProductListResults = dynamic(() =>
  import("src/components/admin/product/product-list-results")
);

/* A mock data to simulate the response of the API.. */
const listproducts = [
  {
    id: uuid(),
    createdAt: "27/03/2019",
    description:
      "Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.",
    title: "Dropbox",
    totalDownloads: "594",
  },
  {
    id: uuid(),
    createdAt: "31/03/2019",
    description:
      "Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.",
    title: "Medium Corporation",
    totalDownloads: "625",
  },
  {
    id: uuid(),
    createdAt: "03/04/2019",
    description:
      "Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.",
    title: "Slack",
    totalDownloads: "857",
  },
  {
    id: uuid(),
    createdAt: "04/04/2019",
    description: "Lyft is an on-demand transportation company based in San Francisco, California.",
    title: "Lyft",
    totalDownloads: "406",
  },
  {
    id: uuid(),
    createdAt: "04/04/2019",
    description: "GitHub is a web-based hosting service for version control of code using Git.",
    title: "GitHub",
    totalDownloads: "835",
  },
  {
    id: uuid(),
    createdAt: "04/04/2019",
    description:
      "Squarespace provides software as a service for website building and hosting. Headquartered in NYC.",
    title: "Squarespace",
    totalDownloads: "835",
  },
];

export default function Products() {
  const [products, setProducts] = useState(listproducts);
  const [searchStr, setSearchStr] = useState("");

  function search(list) {
    return list.filter((item) => {
      return item.title.toLowerCase().includes(searchStr.toLowerCase());
    });
  }

  return (
    <DashboardLayout>
      <Seo title="Productos" description="Lista de productos" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar callback={setSearchStr} />
          <ProductListResults products={search(products)} />
        </Container>
      </Box>
    </DashboardLayout>
  );
}
