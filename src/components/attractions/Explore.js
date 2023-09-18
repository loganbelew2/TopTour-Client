import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { apiKey } from "../../assets/apiKey";
export const Explore = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8000/search?query=tourist+attractions+in+${query}`, {
        headers: {
            "Authorization": ` Token ${localStorage.getItem('tt_token')}`
        }
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  return (
    <div>
      <TextField
        label="Search for Tourist Attractions"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      <Grid container spacing={3}>
        {results.map((result) => (
          <Grid item xs={12} sm={6} md={4} key={result.place_id}>
            <Card>
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

