import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card, CardActions } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
export function UrlShortener() {
  const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        url: "",
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
            Contained
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
