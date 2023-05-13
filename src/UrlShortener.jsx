import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
export function UrlShortener() {
  return (
    <Card className="url-short" elevation={3}>
      <TextField label="Long Url" placeholder="PasteUrl" variant="outlined" />
      <Button className="btn" variant="contained">
        Contained
      </Button>
    </Card>
  );
}
