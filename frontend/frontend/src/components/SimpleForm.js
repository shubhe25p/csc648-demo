// simple form in mui that has a text field and a button


import * as React from 'react';
import { TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserService from "../services/user.service";

export default function SimpleForm() {

  const [data, setData] = React.useState([]);

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log(data.get("item"));
      UserService.sendData(data.get("item"))
    .then(
      response => {
        console.log(response.data);
        UserService.fetchData().then(
          response => {
            console.log(response.data);
            setData(response.data);
          }
        )
        }
    )
      .catch(error => {
        console.log(error);
    });
    };
    
    return (
      <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        DEMO FRONTEND
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          id="item"
          label="item"
          name="item"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add TODO
        </Button>
        
      </Box>
      <div>
        {data.map((item, index) => (
          <div key={index}>
            <h1>{item.item}</h1>
          </div>
        ))}
      </div>
     
    </Box>
    );
}
