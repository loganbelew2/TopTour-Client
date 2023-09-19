import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { getAttractionByPlaceId, getAttractionsBySearch, postAttraction } from "../../managers/googleApi/AttractionManager";
import { useNavigate } from "react-router-dom";

export const Explore = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    try {
      getAttractionsBySearch(query).then((res) => setResults(res));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleMakePost = (placeId) => {
    getAttractionByPlaceId(placeId)
    .then(res => postAttraction(res))
    navigate('/makePost')
  };

  return (
    <div className="mt-5">
      <TextField
        label="Search by name, city, state or country"
        variant="outlined"
        color="secondary"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleSearch}>
        Search
      </Button>
      <Grid container spacing={3}>
        {results.map((result) => (
          <Grid item xs={12} sm={6} md={4} key={result.name}>
            <Card key={result.name}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {result.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {result.formatted_address}
                </Typography>
                <Button
                  onClick={() => {
                    handleMakePost(result.place_id);
                  }}
                  variant="text"
                  color="secondary"
                >
                  Make post
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
