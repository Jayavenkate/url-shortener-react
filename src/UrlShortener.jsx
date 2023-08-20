import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card, CardActions } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { API } from "../global";

const formValidationSchema = yup.object({
  url: yup.string().url().required("Enter Valid Url"),
});


function checkFunction(response) {
  if (response.status === 401) {
    throw Error("unauthorized");
  } else {
    return response.json();
  }
}
export const UrlShortener = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        url: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        fetch(`${API}/shorten`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "content-type": "application/json",
          },
        }).then(() => getUrls());

        const getUrls = () => {
          fetch(`${API}/urls`)
            .then((response) => checkFunction(response))
            .then((data) => setData(data));
        };
        useEffect(() => {
          if (show) {
            getUrls();
          }
        }, [show]);
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <Card className="input-container">
        <TextField
          name="url"
          value={values.url}
          onChange={handleChange}
          label="Long Url"
          placeholder="Paste Url"
          variant="outlined"
          onBlur={handleBlur}
          error={touched.url && errors.url}
          helperText={touched.url && errors.url ? errors.url : null}
        />
        <CardActions className="btn-actions">
          <Button
            onClick={() => {
              setShow(true);
            }}
            color="success"
            variant="contained"
            type="submit"
          >
            Shorten
          </Button>
        </CardActions>
      </Card>
      <div>
        {data.map((ele) => (
          <Url
            key={ele._id}
            shortUrl={ele.short_url}
            count={count}
            setCount={setCount}
          />
        ))}
      </div>
    </form>
  );
};
const Url = ({ shortUrl, count, setCount }) => {
  return (
    <Card className="url-container">
      <span className="url-container-subhead">Shorten Link</span>
      <a href={`${API}/${shortUrl}`}>{`${API}/${shortUrl}`}</a>
      <Badge badgeContent={count} className="touch-icon" color="primary">
        <IconButton
          sx={{ padding: 0 }}
          onClick={() => setCount(count + 1)}
          aria-label="Touch-icon"
        >
          <TouchAppIcon />
        </IconButton>
      </Badge>
    </Card>
  );
};
