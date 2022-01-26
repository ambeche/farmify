import React, { useState } from 'react';
import { Box, Button, FormHelperText, Typography } from '@mui/material';
import { CHART_COLORS } from '../utils';

interface FileUploadFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FileUploadForm = () => {
  const [csvFile, setFile] = useState<File>();
  const [helperText, setHelperText] = useState<string>( 'No file choosen');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.validity.valid)
      setFile(event.target.files[0]);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          border: `solid ${CHART_COLORS.rainfall.max}`,
          borderRadius: 2,
          padding: '2% 2%',
        }}
      >
        <Box
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          component="form"
          onSubmit={onSubmit}
          noValidate
          autoComplete="off"
        >
          <Button
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            component="label"
          >
            <input
              id="farmdata"
              required
              type="file"
              name="farmdata"
              accept=".csv"
              hidden
              onChange={handleChange}
            />
            Upload csv file
          </Button>

          <FormHelperText sx={{ textAlign: 'center' }}>
           {helperText}
          </FormHelperText>
          <Button type="submit" variant="outlined">
            create farm
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FileUploadForm;
