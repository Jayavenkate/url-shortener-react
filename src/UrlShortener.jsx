import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card, CardActions } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { API } from "../global";
// import { ShortUrl } from "./ShortUrl";

const formValidationSchema = yup.object({
  url: yup.string().url().required("Enter Valid Url"),
});

export function UrlShortener() {
  const [data, setData] = useState([]);
  const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        url: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        console.log(values);
        fetch(`${API}/create`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "content-type": "application/json" },
        }).then(() => getUrl());
        const getUrl = () => {
          fetch(`${API}/url`)
            .then((res) => res.json())
            .then((data) => setData(data));
        };
        useEffect(() => {
          getUrl();
        }, []);
      },
    });

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
            Submit
          </Button>
        </CardActions>
      </Card>
      <div>
        {data.map((dt) => (
          <ShortUrl key={dt._id} shortUrl={dt.short_url} />
        ))}
      </div>
    </form>
  );
}

function ShortUrl({ shortUrl }) {
  return (
    <Card className="short-link" elevation={3}>
      <h2>Shorten Link</h2>

      <a href={`${API}/${shortUrl}`}>{`${API}/${shortUrl}`}</a>
    </Card>
  );
}
