// src/components/SkillCard.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const SkillCard = ({ icon, className, title, description }) => (
    <div className={`skill-card ${className}`}>
        <FontAwesomeIcon icon={icon} />
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

SkillCard.propTypes = {
    icon: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default SkillCard;