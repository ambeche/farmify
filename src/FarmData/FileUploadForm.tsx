import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormHelperText,
  Typography,
  CircularProgress,
} from '@mui/material';
import { CHART_COLORS } from '../utils';
import { UploadFile } from '@mui/icons-material';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '..';

interface FileUploadFormProps {
  handleFileUpload: (file: File) => void;
  closeDialog?: () => void;
  label: string;
}

const FileUploadForm = ({
  handleFileUpload,
  label,
  closeDialog,
}: FileUploadFormProps) => {
  const { message, code, open } = useSelector(
    (state: RootState) => state.notice
  );
  const [csvFile, setFile] = useState<File>();
  const [helperText, setHelperText] = useState<string>('No file choosen');
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (open && code === 'success') {
      closeDialog && closeDialog();
      setError(false);
      setLoading(false);
      setHelperText('');
      setFile(undefined);
    }
    if (code === 'error') {
      setError(true);
      setHelperText(message);
      setLoading(false);
      setFile(undefined);
      return;
    }
  }, [code, open, message, isLoading]);

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
        setFile(undefined);
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
    // file upload and server-side validation
    if (csvFile) handleFileUpload(csvFile);
    setLoading(true);
  };

  const Loading = () => {
    if (!isLoading) return null;
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}
      >
        <CircularProgress />
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {open && code === 'success' && <Navigate to="/" replace={true} />}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          border: `solid ${CHART_COLORS.rainfall.max}`,
          borderRadius: 2,
          pl: ' 7%',
          pt: '2%',
          pb: '2%',
        }}
      >
        <Box
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          component="form"
          encType="multipart/form-data"
          onSubmit={onSubmit}
          noValidate
          autoComplete="off"
        >
          <Typography
            sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 2 }}
          >
            Upload your farm data as a comma separated csv file! Any invalid
            records in the file will be discarded. Only temperature, ph, and
            rainfall metrics are allowed.
          </Typography>
          <Loading />
          <Button
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            startIcon={<UploadFile />}
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
            {label}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FileUploadForm;
