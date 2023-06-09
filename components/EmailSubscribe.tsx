import React, { useEffect, useRef, useState } from 'react';
import { Link, Box, Typography } from '@mui/material';

import EastIcon from '@mui/icons-material/East';
import Script from 'next/script';

const EmailSubscribe = (): JSX.Element => {
  useEffect(() => {
    if ((window as any).CustomSubstackWidget) {
      return;
    }
    (window as any).CustomSubstackWidget = {
      substackUrl: 'eipsfun.substack.com',
      placeholder: 'example@gmail.com',
      buttonText: 'Submit',
      theme: 'custom',
      colors: {
        primary: '#437EF7',
        input: '#fff',
        email: '#333',
        text: '#fff',
      },
    };
  }, []);
  return (
    <>
      <Script src="https://substackapi.com/widget.js" async></Script>

      <Box className="contentleft">
        <Typography variant="h3">
          Not miss a beat of EIPs&rsquo; update?
        </Typography>
        <Typography variant="body1" marginBottom="10px" marginTop="10px">
          Subscribe EIPs Fun to receive the latest updates of EIPs Good for
          Buidlers to follow up.
        </Typography>
        <Link href="#" color="#437EF7" fontWeight={600} underline="hover">
          View all <EastIcon sx={{ width: 14, verticalAlign: 'middle' }} />
        </Link>
      </Box>
      <Box className="contentRight">
        {/* <form
          action="https://gmail.us11.list-manage.com/subscribe/post?u=d991f001a9a6097d6659412d6&id=8be65ec859&f_id=00a495e0f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          target="_blank"
        >
          <SubInput
            type="email"
            name="EMAIL"
            placeholder="Enter your email"
            size="small"
          />
          <Button
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              height: 40,
            }}
            variant="contained"
            size="medium"
            type="submit"
          >
            Submit
          </Button>
        </form> */}
        <div id="custom-substack-embed"></div>
      </Box>
    </>
  );
};

export default EmailSubscribe;
