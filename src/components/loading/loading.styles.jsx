import styled from 'styled-components';

export const AjaxModal = styled.div`
  background-attachment:fixed;
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 100000; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0, 0.4); /* Black w/opacity/see-through */
`;
// background-color: rgb(50, 50, 46); /* Fallback color */
// background-color: rgba(50, 50, 46, 0.5); /* Black w/ opacity */

export const AjaxModalContent = styled.div`
  margin: 21% auto; /* 15% from the top and centered */
  padding: 20px;
  width: auto; /* Could be more or less, depending on screen size */
`;
const imagenBg = "https://firebasestorage.googleapis.com/v0/b/oracle-football-league.appspot.com/o/ORACLE_Original.jpg?alt=media&token=c81ca3bd-83fa-44ac-bd72-30733cbcf787";
export const BgImage = styled.div`
  /* The image used */
  background-image: url(${imagenBg});
  
  /* Add the blur effect */
  filter: blur(8px);
  -webkit-filter: blur(8px);
  
  /* Full height */
  height: 100%; 
  
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const BgText = styled.div`
  color: white;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 80%;
  padding: 20px;
  text-align: center;
`;