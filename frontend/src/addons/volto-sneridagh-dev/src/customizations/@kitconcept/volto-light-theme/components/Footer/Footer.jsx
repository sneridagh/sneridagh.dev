// SemanticUI-free pre-@plone/components
import { Logo } from '@plone/volto/components';
import Container from '@kitconcept/volto-light-theme/components/Atoms/Container/Container';

const Footer = () => {
  return (
    <footer id="footer">
      <Container className="footer">
        <div className="logo">
          <Logo />
        </div>
        <div className="footer-message">Resistance is Futile</div>
        <a className="item powered-by" href="https://plone.org">
          Powered by Plone
        </a>
        <div className="footer-branding">
          Made with{' '}
          <span role="img" aria-label="love" style={{ color: 'red' }}>
            ❤️
          </span>{' '}
          by <a href="https://github.com/sneridagh">@sneridagh</a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
