// src/components/ServiceCard.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const ServiceCard = ({ icon, title, description }) => (
    <div className="service-card">
        <FontAwesomeIcon icon={icon} />
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

ServiceCard.propTypes = {
    icon: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default ServiceCard;