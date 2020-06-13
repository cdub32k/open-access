import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

import { parseHashtags, removeHashtags } from "../utils/helpers";

const useStyles = makeStyles((theme) => ({
  container: {},
}));

const SearchBar = (props) => {
  useEffect(() => {
    setRedirect(false);
  });
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const [query, setQuery] = useState("");

  if (redirect) {
    let link = "/search?";
    let tags = parseHashtags(query);
    let s = null;
    let h = null;
    if (tags.length) {
      h = tags.join(",");
    }
    let terms = removeHashtags(query);
    if (terms.length) {
      s = terms.join(",");
    }
    s && (link += `s=${s}`);
    h && (link += (s ? "&" : "") + `h=${h}`);

    return <Redirect to={link} />;
  }
  return (
    <div className={`${classes.container} search-bar`}>
      <CustomInput
        value={query}
        name="query"
        onChange={(e) => setQuery(e.target.value)}
      />
      <CustomButton text="Search" onClick={() => setRedirect(true)} />
    </div>
  );
};

export default SearchBar;
