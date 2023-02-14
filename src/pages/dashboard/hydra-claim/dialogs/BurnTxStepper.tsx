import React, { useEffect, useState } from 'react';
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
import Typography from '@mui/material/Typography';

import { DoneAll, VerifiedUser, Whatshot } from '@mui/icons-material';
import NFTL from 'assets/images/logo.png';

const icons: { [index: string]: React.ReactElement } = {
  1: <img src={NFTL} alt="NFTL" width={30} />,
  2: <VerifiedUser />,
  3: <Whatshot />,
  4: <DoneAll />,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage: 'linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage: 'linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage: 'linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage: 'linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
  },
});

function ColorlibStepIcon({ active, completed, icon }: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(icon)]}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    stepper: {
      backgroundColor: 'transparent',
      marginBottom: 10,
    },
    labelDark: {
      color: 'white !important',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

function getSteps() {
  return [
    'Select 8 DEGENs',
    'Approve contract as DEGEN spender',
    'Send DEGENS to burn',
    'HYDRA Claimed!',
  ];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return 'Please go back and select 8 DEGENs.';
    case 1:
      return 'Note: burning requires two transactions because the HydraDistributor contract is not approved to transfer your DEGENs.';
    case 2:
      return 'HydraDistributor contract approved, please submit burn & claim request below.';
    default:
      return '';
  }
}

export default function RenameStepper({
  approvedForAll,
  claimSuccess,
  incorrectDegenSelection,
}: {
  approvedForAll: boolean;
  claimSuccess: boolean;
  incorrectDegenSelection: boolean;
}): JSX.Element {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  useEffect(() => {
    if (claimSuccess) setActiveStep(3);
    else if (incorrectDegenSelection) setActiveStep(0);
    else setActiveStep(approvedForAll ? 2 : 1);
  }, [approvedForAll, incorrectDegenSelection, claimSuccess]);

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
                label: classes.labelDark,
              }}
              StepIconComponent={ColorlibStepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <em style={{ textAlign: 'center' }}>
        {activeStep !== steps.length ? (
          <Typography className={classes.instructions}>
            {getStepContent(activeStep)}
          </Typography>
        ) : null}
      </em>
    </div>
  );
}
