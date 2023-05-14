import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card, CardActions } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
export function UrlShortener() {
  const [data, setData] = useState([]);
  const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        url: "",
      },
      onSubmit: async (values) => {
        await fetch("http://localhost:4001/short", {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "content-type": "application/json" },
        }).then(() => getUrl());
        
      },
    });
    const getUrl = () => {
      fetch("http://localhost:4001/url")
       .then((res) => res.json())
       .then((data) => console.log(data));
   };
   useEffect(() => {
     getUrl();
   }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Card className="url-short" elevation={3}>
        <TextField
          name="url"
          value={values.url}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Long Url"
          placeholder="Paste Url"
          variant="outlined"
          error={touched.url && errors.url}
          helperText={touched.url && errors.url ? errors.url : null}
        />
        <CardActions className="btn">
          <Button type="submit" variant="contained">
            Contained
          </Button>
        </CardActions>
      </Card>
      <div>
        {data.map((dt) => (
          <Url key={dt._id} shortUrl={dt.short_url} />
        ))}
      </div>
    </form>
  );
}

function Url({ shortUrl }) {
  return (
    <Card>
      <h2>Shorten Link</h2>
      <a href={`http://localhost:4001/${shortUrl}`}>
        {`http://localhost:4001/${shortUrl}`}
      </a>
    </Card>
  );
}
