import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

export const HomePageFilters = ({searchString, setSearchString, setSelectedCategory, setFilterOn, setIsSearchOn, selectedCategory, categories}) => {
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        if (event.target.value == "off") setFilterOn(false);
        else setFilterOn(true)
      }
      
      const handlePostSearch = (event) => {
        setSearchString(event.target.value)
        event.target.value.length > 0? setIsSearchOn(true): setIsSearchOn(false);
      }


    return (
        <div className="flex justify-between mb-5">
        <div className="w-1/3">
          <FormControl variant="outlined" fullWidth>
              <InputLabel>Category</InputLabel>
              <Select  
                  variant="standard"               
                  color="secondary"
                  label="Category"
                  value={selectedCategory}
                  onChange={ handleCategoryChange}
              >
                <MenuItem value="off">No filter</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={`c--${category}`} value={category}>
                        {category}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
        </div>

        <div>
          <TextField
           variant="outlined" 
           color="secondary"
           value={searchString}
           onChange={ handlePostSearch}
           label="search for attraction"/>
        </div>
      </div>
    )
}