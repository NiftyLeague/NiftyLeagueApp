'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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

import DoneAll from '@mui/icons-material/DoneAll';
import BurnIcon from '@mui/icons-material/Whatshot';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const icons: { [index: string]: React.ReactElement } = {
  1: <Image src="/images/NFTL.png" alt="NFTL" width={30} height={30} />,
  2: <VerifiedUserIcon />,
  3: <BurnIcon />,
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
    'Obtain 1000+ NFTL',
    'Approve contract as NFTL spender',
    'Burn NFTL',
    'Ticket(s) Claimed!',
  ];
}

function getStepContent(step: number) {
  switch (step) {
    case 0: {
      return '1000 NFTL minimum required for raffle tickets. Please either claim NFTL from your degen(s) or use Sushiswap to purchase.';
    }
    case 1:
      return 'Note: renaming requires two transactions since the NFTL Raffle contract is not already an approved spender.';
    case 2:
      return 'Spender approved, deposit and burn NFTL';
    default:
      return '';
  }
}

export default function TicketStepper({
  insufficientAllowance,
  purchaseSuccess,
  insufficientBalance,
}: {
  insufficientAllowance: boolean;
  purchaseSuccess: boolean;
  insufficientBalance: boolean;
}): JSX.Element {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  useEffect(() => {
    if (purchaseSuccess) setActiveStep(3);
    else if (insufficientBalance) setActiveStep(0);
    else setActiveStep(insufficientAllowance ? 1 : 2);
  }, [insufficientAllowance, insufficientBalance, purchaseSuccess]);

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

TicketStepper.defaultProps = { redirectToWallet: false };
