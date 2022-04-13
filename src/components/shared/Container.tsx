import { styled } from "@mui/material";

export const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '15px 30px'
}));

export const CenterContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '40%',
}));