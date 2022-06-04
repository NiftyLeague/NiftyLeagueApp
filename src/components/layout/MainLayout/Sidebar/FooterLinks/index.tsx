import { Link, List, ListItem, ListItemText } from '@mui/material';

export interface FooterLinksProps {}

const FooterLinks: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<FooterLinksProps>>
> = () => {
  return (
    <List sx={{ mb: 4 }}>
      <ListItem sx={{ textAlign: 'center', p: 0 }}>
        <ListItemText>
          <Link
            variant="paragraphXXSmall"
            target="_blank"
            href="#"
            underline="always"
            rel="noopener noreferrer"
          >
            Docs
          </Link>
        </ListItemText>
      </ListItem>
      <ListItem sx={{ textAlign: 'center', p: 0 }}>
        <ListItemText>
          <Link
            variant="paragraphXXSmall"
            target="_blank"
            href="#"
            underline="always"
            rel="noopener noreferrer"
          >
            Main Website
          </Link>
        </ListItemText>
      </ListItem>
      <ListItem sx={{ textAlign: 'center', p: 0 }}>
        <ListItemText>
          <Link
            variant="paragraphXXSmall"
            target="_blank"
            href="#"
            underline="always"
            rel="noopener noreferrer"
          >
            Add NFTL to MetaMask
          </Link>
        </ListItemText>
      </ListItem>
    </List>
  );
};

export default FooterLinks;
