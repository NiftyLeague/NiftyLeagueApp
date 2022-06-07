import { Link, List, ListItem, ListItemText } from '@mui/material';

export interface FooterLinksProps {}

const FooterLinks: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<FooterLinksProps>>
> = () => {
  const referLinks = [
    {
      title: 'Docs',
      url: 'www.somewhere.com',
    },
    {
      title: 'Main Website',
      url: 'www.somewhere.com',
    },
    {
      title: 'Add NFTL to MetaMask',
      url: 'www.somewhere.com',
    },
  ];

  return (
    <List sx={{ mb: 4 }}>
      {referLinks.map(({ title, url }) => (
        <ListItem key={url} sx={{ textAlign: 'center', p: 0 }}>
          <ListItemText>
            <Link
              variant="paragraphXXSmall"
              target="_blank"
              href={url}
              underline="always"
              rel="noopener noreferrer"
            >
              {title}
            </Link>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default FooterLinks;
