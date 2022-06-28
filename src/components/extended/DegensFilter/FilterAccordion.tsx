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
        // backgroundColor: `${theme.palette.grey[800]}3d`,
        // marginTop: 1,
        width: '100%',
        '& .MuiAccordionSummary-gutters': {
          p: 0,
          borderBottom: `1px solid ${theme.palette.grey[800]}`,
          minHeight: '50px',
          mb: 3,
          '& .MuiAccordionSummary-contentGutters': {
            my: 4,
          },
        },
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
