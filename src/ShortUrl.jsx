import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import { API } from "../global";

export function ShortUrl({shortUrl}) {
  // const [url, setUrl] = useState([]);
  // const geturl = async() => {
  //   await fetch(`${API}/url`)
  //     .then((res) => res.json())
  //     .then((data) =>setUrl(data));
  // };
  // useEffect(() => {
  //   geturl();
  // }, [url]);
  return (
    <Card className="short-link" elevation={3}>
      <h2>Shorten Link</h2>
      {/* {url.map((dt, index) => (
        <div key={index}> */}
          <a href={`${shortUrl}`}>{`${shortUrl}`}</a>
        {/* </div>
      ))} */}
    </Card>
  );
}
