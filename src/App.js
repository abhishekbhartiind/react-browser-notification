import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  Container,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from '@chakra-ui/react';

async function notifyUser(
  notificationText = 'Thank you for enabling notifications'
) {
  let notification;
  if (!('Notification' in window)) {
    alert("Browser doesn't support notifications");
  } else if (Notification.permission === 'granted') {
    notification = new Notification(notificationText);
  } else if (Notification.permission !== 'denied') {
    await Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        notification = new Notification(notificationText);
      }
    });
  }

  return notification;
}

function App() {
  const [userResponsed, setUserResponsed] = useState(false);

  const enableNotifAndClose = async () => {
    await notifyUser().then(() => {
      setUserResponsed(true);
    });
  };

  const disableNotifAndClose = () => {
    setUserResponsed(true);
  };

  return !userResponsed && !(Notification.permission === 'granted') ? (
    <ChakraProvider theme={theme}>
      <Container>
        <Alert status="success">
          <AlertIcon />
          <Box>
            <AlertTitle>Notification</AlertTitle>
            <AlertDescription>
              Would you like to enable notification
            </AlertDescription>
          </Box>
          <Button colorScheme="teal" size="sm" onClick={enableNotifAndClose}>
            Sure!
          </Button>
          <Button colorScheme="teal" size="sm" onClick={disableNotifAndClose}>
            No thanks!
          </Button>
        </Alert>
      </Container>
    </ChakraProvider>
  ) : Notification.permission === 'granted' ? (
    <ChakraProvider theme={theme}>
      <Container>
        <h1>Testing Notification</h1>
        <Button
          colorScheme="green"
          size="sm"
          onClick={() => notifyUser('Notification is working great!!')}
        >
          Click to show message !
        </Button>
      </Container>
    </ChakraProvider>
  ) : (
    <>
      <h1>You have disabled notification</h1>
    </>
  );
}

export default App;
