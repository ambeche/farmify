import React, { useState } from 'react';
import { Box, Button, FormHelperText, Typography } from '@mui/material';
import { CHART_COLORS } from '../utils';

interface FileUploadFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FileUploadForm = () => {
  const [csvFile, setFile] = useState<File>();
  const [helperText, setHelperText] = useState<string>('No file choosen');
  const [error, setError] = useState<boolean>(false);

  // validates file as csv before uploading to the server
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.validity.valid) {
      const file = event.target.files[0];
      const extension = file.name
        ? file.name.substring(file.name.length - 4)
        : 'none';
      console.log('file', file.name);
      if (extension !== '.csv') {
        setError(true);
        return setHelperText(
          `Invalid file type "${file.name}", only '.csv' file type allowed!`
        );
      }
      setError(false);
      setHelperText(`${file.name}  ${file.size}bytes`);
      setFile(file);
    }
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
          <Typography
            sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 2 }}
          >
            Upload your farm data as a comma separated csv file!
          </Typography>
          <Button
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            component="label"
            variant="outlined"
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

          <FormHelperText error={error} sx={{ textAlign: 'center' }}>
            {helperText}
          </FormHelperText>
          <Button type="submit" variant="contained" disabled={!csvFile?.name}>
            create farm
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FileUploadForm;
