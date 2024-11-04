import { Box, SxProps, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

type CountdownProps = {
  counter: number;
  sx?: SxProps;
};

const Countdown = ({ counter, sx }: CountdownProps) => (
  <Box sx={{ minHeight: 96, ...sx }}>
    <AnimatePresence>
      <motion.div
        key={counter}
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
        }}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        <Typography
          sx={{
            opacity: 0.4,
            color: 'white',
            textShadow: '4px 4px 6px rgba(66, 68, 90, 1)',
            fontSize: 96,
            fontWeight: 900,
          }}
        >
          {counter}
        </Typography>
      </motion.div>
    </AnimatePresence>
  </Box>
);

export default Countdown;
