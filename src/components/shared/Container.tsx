import { styled } from "@mui/material";

export const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '15px 30px',
  '@media screen and (max-width: 900px)': {
    margin: 0,
  },
}));

export const CenterContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
}));