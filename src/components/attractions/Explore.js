import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { getAttractionByPlaceId, getAttractionsBySearch } from "../../managers/googleApi/AttractionManager";
import { useNavigate } from "react-router-dom";
import { postAttraction } from "../../managers/attractions/AttractionManager";

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
      .then(res => {
        postAttraction(res);
        // Delay the navigation by 3 seconds
        setTimeout(() => {
          navigate('/makePost');
        }, 1000); // 3000 milliseconds = 3 seconds
      });
  };
  

  return (
    <div className="mt-5">
      <Typography className="pb-3" variant="h5" component="div" color="secondary">Find an attraction to post</Typography>
      <TextField
        label="Search by name, city, state or country"
        variant="outlined"
        color="secondary"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="pt-3">
      <Button component="div" variant="contained" color="secondary" onClick={handleSearch}>
        Search
      </Button>
      </div>
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
