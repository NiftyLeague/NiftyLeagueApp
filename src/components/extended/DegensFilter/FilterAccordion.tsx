import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from '@mui/material';
import { IconChevronDown } from '@tabler/icons';
import { ReactNode } from 'react';

interface Props {
  summary: ReactNode;
  children: ReactNode;
}

const FilterAccordion = ({ summary, children }: Props): JSX.Element => {
  const theme = useTheme();
  return (
    <Accordion
      defaultExpanded
      sx={{
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          backgroundColor: theme.palette.grey[800],
        },
        marginTop: 0,
      }}
    >
      <AccordionSummary expandIcon={<IconChevronDown />}>
        {summary}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default FilterAccordion;
