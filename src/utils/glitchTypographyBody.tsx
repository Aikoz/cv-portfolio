import PropTypes from 'prop-types';
import './GlitchTypographyBody.css'; // Asegúrate de incluir el CSS en tu proyecto

const GlitchTypographyBody = ({ children, fontSize }: any) => {
  return (
    <div
      className="glitch"
      style={{ fontSize: fontSize }}
      data-text={children}
    >
      {children}
    </div>
  );
};

GlitchTypographyBody.propTypes = {
  children: PropTypes.node.isRequired,
  fontSize: PropTypes.string,
};

GlitchTypographyBody.defaultProps = {
  fontSize: '100px', // tamaño de letra predeterminado
};

export default GlitchTypographyBody;
