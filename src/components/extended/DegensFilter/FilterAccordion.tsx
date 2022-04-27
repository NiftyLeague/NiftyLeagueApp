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
  expanded?: boolean;
}

const FilterAccordion = ({
  summary,
  children,
  expanded = true,
}: Props): JSX.Element => {
  const theme = useTheme();
  return (
    <Accordion
      defaultExpanded={expanded}
      sx={{
        backgroundColor: `${theme.palette.grey[800]}3d`,
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
