'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import { StepIconProps } from '@mui/material/StepIcon';
import Step from '@mui/material/Step';
import StepConnector from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 6,
    left: 'calc(-50% + 7px)',
    right: 'calc(50% + 7px)',
  },
  active: {
    '& $line': {
      backgroundColor: '#5820D6',
    },
  },
  completed: {
    '& $line': {
      backgroundColor: '#5820D6',
    },
  },
  line: {
    height: 4,
    border: 0,
    backgroundColor: '#717171',
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#717171',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    zIndex: 1,
    color: '#fff',
    width: 15,
    height: 15,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#5820D6',
  },
  completed: {
    backgroundColor: '#5820D6',
  },
});

function ColorlibStepIcon({ active, completed }: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    />
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 'calc(100% + 170px)',
      marginLeft: '-86px',
      [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 0,
        marginTop: theme.spacing(10),
      },
    },
    stepper: {
      backgroundColor: 'transparent',
    },
    label: {
      color: 'white !important',
      marginTop: '6px !important',
      fontSize: '10px !important',
    },
  }),
);

const steps = ['Connect Wallet', 'Check Balance', 'Success'];

export default function RentStepper({
  rentSuccess,
  checkBalance,
}: {
  rentSuccess: boolean;
  checkBalance: boolean;
}): JSX.Element {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (rentSuccess) setActiveStep(2);
    else if (checkBalance) setActiveStep(1);
  }, [checkBalance, rentSuccess]);

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        classes={{ root: classes.stepper }}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              classes={{
                label: classes.label,
              }}
              StepIconComponent={ColorlibStepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
