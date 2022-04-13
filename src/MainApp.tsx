import { AppBar, Divider, styled, Toolbar, Typography } from "@mui/material";
import { MedicalTable } from "./components/MedicalTable";
import { MedicalForm } from "./components/MedicalForm";
import { Box } from "@mui/system";

export const RowContainer = styled('div')(() => ({
  display: 'flex',
  margin: '0 20px',
  '@media screen and (max-width: 900px)': {
    flexDirection: 'column'
  },
}));

export const MainApp = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Registros
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider />
      <Box sx={{ my: 10}}>
        <RowContainer>
          <MedicalTable />
          <MedicalForm />
        </RowContainer>
      </Box>
    </>
  )
}
