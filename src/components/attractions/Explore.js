import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { getAttractionsBySearch } from "../../managers/googleApi/AttractionManager";

export const Explore = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    try {
      getAttractionsBySearch(query).then(res => setResults(res))
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <TextField
        label={'search by name, city, state or country'}
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
