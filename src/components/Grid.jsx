import React, { useEffect, useState } from "react";
import GridItem from "./GridItem";
import classes from "./Grid.module.css";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
//import { useLocation, useParams } from "react-router-dom";
import usePagination from "./Pagination/usePagination";
import Stack from "@mui/material/Stack";

const Grid = ({ category }) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/products/${
          category === "none" ? "" : category
        }`
      )
      .then((response) => {
        setProductList(response.data.filter((p) => p.stock > 0));
      })
      .catch((error) => {
        console.log("entré por error");
      });
  }, [category]);

  const [page, setPage] = React.useState(1);
  const per_page = 12;

  const count = Math.ceil(productList.length / per_page);

  const _DATA = usePagination(productList, per_page);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <div>
      <h1 className={classes.gridTitle}>
        {category === "none" ? "" : category}
      </h1>
      <div className={classes.flexcontainer}>
        {_DATA.currentData().map((item) => (
          <div key={item.id} className={classes.flexitem}>
            <GridItem product={item} />
          </div>
        ))}
      </div>
      <Stack spacing={2}>
        <Pagination
          page={page}
          count={count}
          style={{ display: "flex", justifyContent: "center" }}
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
};

export default Grid;
